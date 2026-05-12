-- Helmstack schema — workspaces own everything, RLS scopes by membership.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Profiles (mirror of auth.users with display fields)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles self read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles self update"
  on public.profiles for update
  using (auth.uid() = id);

-- Create profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_workspace uuid;
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));

  -- Auto-create a personal workspace and add the new user as owner
  insert into public.workspaces (name, slug, created_by)
  values (
    coalesce(new.raw_user_meta_data->>'workspace_name', split_part(new.email, '@', 1) || '''s workspace'),
    lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9]+', '-', 'g')) || '-' || substr(new.id::text, 1, 6),
    new.id
  )
  returning id into new_workspace;

  insert into public.workspace_members (workspace_id, user_id, role)
  values (new_workspace, new.id, 'owner');

  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Workspaces
-- ---------------------------------------------------------------------------
create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

alter table public.workspace_members enable row level security;

-- Helper: is the current user a member of this workspace?
create or replace function public.is_member(ws uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = ws and user_id = auth.uid()
  );
$$;

create policy "workspaces visible to members"
  on public.workspaces for select
  using (public.is_member(id));

create policy "workspaces owner update"
  on public.workspaces for update
  using (created_by = auth.uid());

create policy "workspace_members self read"
  on public.workspace_members for select
  using (user_id = auth.uid() or public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Agents
-- ---------------------------------------------------------------------------
create table public.agents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  runtime text not null check (runtime in ('claude-code', 'openai', 'langgraph', 'crewai', 'autogen', 'http', 'other')),
  role text,
  status text not null default 'idle' check (status in ('running', 'idle', 'error', 'needs_review', 'paused')),
  last_activity_at timestamptz,
  last_activity_note text,
  pending_count int not null default 0,
  success_rate numeric(5,2),
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create index agents_workspace_idx on public.agents (workspace_id);
alter table public.agents enable row level security;

create policy "agents member read" on public.agents for select using (public.is_member(workspace_id));
create policy "agents member insert" on public.agents for insert with check (public.is_member(workspace_id));
create policy "agents member update" on public.agents for update using (public.is_member(workspace_id));
create policy "agents member delete" on public.agents for delete using (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Connectors
-- ---------------------------------------------------------------------------
create table public.connectors (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  provider text not null,
  display_name text not null,
  category text not null,
  account text,
  status text not null default 'not_configured' check (status in ('connected', 'needs_reauth', 'error', 'not_configured')),
  metadata jsonb not null default '{}'::jsonb,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (workspace_id, provider)
);

create index connectors_workspace_idx on public.connectors (workspace_id);
alter table public.connectors enable row level security;

create policy "connectors member read" on public.connectors for select using (public.is_member(workspace_id));
create policy "connectors member insert" on public.connectors for insert with check (public.is_member(workspace_id));
create policy "connectors member update" on public.connectors for update using (public.is_member(workspace_id));
create policy "connectors member delete" on public.connectors for delete using (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Approvals
-- ---------------------------------------------------------------------------
create table public.approvals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  action text not null,
  context text,
  priority text not null default 'P2' check (priority in ('P0', 'P1', 'P2', 'P3')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
  resolved_by uuid references auth.users(id),
  resolved_at timestamptz,
  resolution_note text,
  created_at timestamptz not null default now()
);

create index approvals_workspace_idx on public.approvals (workspace_id, status);
alter table public.approvals enable row level security;

create policy "approvals member read" on public.approvals for select using (public.is_member(workspace_id));
create policy "approvals member insert" on public.approvals for insert with check (public.is_member(workspace_id));
create policy "approvals member update" on public.approvals for update using (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Activity log
-- ---------------------------------------------------------------------------
create table public.activity (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  kind text not null check (kind in ('dispatch', 'approval', 'error', 'memory', 'schedule')),
  message text not null,
  payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index activity_workspace_idx on public.activity (workspace_id, occurred_at desc);
alter table public.activity enable row level security;

create policy "activity member read" on public.activity for select using (public.is_member(workspace_id));
create policy "activity member insert" on public.activity for insert with check (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Schedules
-- ---------------------------------------------------------------------------
create table public.schedules (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  intent text not null,
  cron text not null,
  next_run_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index schedules_workspace_idx on public.schedules (workspace_id);
alter table public.schedules enable row level security;

create policy "schedules member read" on public.schedules for select using (public.is_member(workspace_id));
create policy "schedules member insert" on public.schedules for insert with check (public.is_member(workspace_id));
create policy "schedules member update" on public.schedules for update using (public.is_member(workspace_id));
create policy "schedules member delete" on public.schedules for delete using (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Knowledge (pinned facts)
-- ---------------------------------------------------------------------------
create table public.knowledge (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  title text not null,
  kind text not null default 'fact',
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index knowledge_workspace_idx on public.knowledge (workspace_id);
alter table public.knowledge enable row level security;

create policy "knowledge member read" on public.knowledge for select using (public.is_member(workspace_id));
create policy "knowledge member insert" on public.knowledge for insert with check (public.is_member(workspace_id));
create policy "knowledge member update" on public.knowledge for update using (public.is_member(workspace_id));

-- ---------------------------------------------------------------------------
-- Auth trigger — create profile + workspace on signup
-- ---------------------------------------------------------------------------
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
