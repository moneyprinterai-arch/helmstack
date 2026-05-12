-- Seed function: populate a workspace with realistic demo data on first sign-in.
-- The signup app calls this once per new user to make the dashboard feel alive.

create or replace function public.seed_demo_data(ws uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  ada_id uuid; ledger_id uuid; scout_id uuid; mason_id uuid; iris_id uuid; atlas_id uuid;
begin
  if not public.is_member(ws) then
    raise exception 'not a member of workspace %', ws;
  end if;

  -- Skip if already seeded
  if exists (select 1 from public.agents where workspace_id = ws) then
    return;
  end if;

  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values
    (ws, 'Ada', 'claude-code', 'Chief of staff — drafts replies, runs the morning brief', 'running', now() - interval '2 minutes', 1, 96)
    returning id into ada_id;
  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values (ws, 'Ledger', 'openai', 'Reconciles Stripe + QuickBooks daily', 'needs_review', now() - interval '12 minutes', 2, 99)
    returning id into ledger_id;
  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values (ws, 'Scout', 'http', 'Crawls competitors weekly and writes the brief', 'idle', now() - interval '3 hours', 0, 92)
    returning id into scout_id;
  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values (ws, 'Mason', 'claude-code', 'Reviews PRs on the engineering monorepo', 'running', now(), 0, 88)
    returning id into mason_id;
  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values (ws, 'Iris', 'langgraph', 'Inbox triage for support@', 'running', now() - interval '30 seconds', 0, 94)
    returning id into iris_id;
  insert into public.agents (workspace_id, name, runtime, role, status, last_activity_at, pending_count, success_rate)
  values (ws, 'Atlas', 'openai', 'Cleans up stale Notion pages', 'error', now() - interval '1 hour', 0, 71)
    returning id into atlas_id;

  insert into public.connectors (workspace_id, provider, display_name, category, status, account) values
    (ws, 'notion', 'Notion', 'Docs', 'connected', 'demo.notion.so'),
    (ws, 'drive', 'Google Drive', 'Docs', 'connected', 'demo@example.co'),
    (ws, 'slack', 'Slack', 'Messaging', 'connected', 'demo'),
    (ws, 'gmail', 'Gmail', 'Messaging', 'needs_reauth', 'demo@example.co'),
    (ws, 'github', 'GitHub', 'Engineering', 'connected', 'demo-labs'),
    (ws, 'linear', 'Linear', 'Engineering', 'connected', 'demo'),
    (ws, 'stripe', 'Stripe', 'Money', 'connected', 'Demo Inc.'),
    (ws, 'qb', 'QuickBooks', 'Money', 'connected', 'Demo Inc.'),
    (ws, 'hubspot', 'HubSpot', 'Sales', 'not_configured', null),
    (ws, 'calendly', 'Calendly', 'Calendar', 'connected', 'demo'),
    (ws, 'postgres', 'Postgres', 'Data', 'connected', 'prod-readonly'),
    (ws, 's3', 'S3', 'Data', 'error', 'demo-archive');

  insert into public.approvals (workspace_id, agent_id, action, context, priority, status) values
    (ws, ledger_id, 'Refund $1,240 to acme.co (charge ch_3R1...)', 'Charge disputed 4 days ago. Reason: ''duplicate''. Subscription cancelled last week. Matches refund policy.', 'P0', 'pending'),
    (ws, ledger_id, 'Mark invoice INV-2293 as bad debt', 'Customer 92 days past due. Three contact attempts failed. Outside ToS for further automation.', 'P1', 'pending'),
    (ws, ada_id, 'Send vendor renewal email to legal@cloudflare', 'Contract renews on 2026-06-01. Drafted reply confirms current tier and asks for 12-month commit pricing.', 'P2', 'pending');

  insert into public.activity (workspace_id, agent_id, kind, message, occurred_at) values
    (ws, iris_id, 'dispatch', 'Replied to support#4821 with refund policy', now() - interval '1 minute'),
    (ws, mason_id, 'dispatch', 'Approved PR #1283 — formatting only', now() - interval '2 minutes'),
    (ws, ledger_id, 'approval', 'Asked for human approval on $1,240 refund', now() - interval '3 minutes'),
    (ws, iris_id, 'dispatch', 'Routed support#4820 to billing queue', now() - interval '4 minutes'),
    (ws, ada_id, 'memory', 'Pinned fact: Q3 board meeting moved to Sep 14', now() - interval '6 minutes'),
    (ws, atlas_id, 'error', 'Notion connector returned 429 — backing off 5m', now() - interval '8 minutes'),
    (ws, mason_id, 'schedule', 'Scheduled nightly PR review pass for 22:00 PT', now() - interval '10 minutes'),
    (ws, ada_id, 'dispatch', 'Drafted morning brief — 92% auto', now() - interval '12 minutes'),
    (ws, ledger_id, 'dispatch', 'Reconciled 14 Stripe charges with QuickBooks', now() - interval '15 minutes'),
    (ws, iris_id, 'dispatch', 'Triaged 8 new support tickets', now() - interval '18 minutes');

  insert into public.schedules (workspace_id, agent_id, intent, cron, next_run_at, active) values
    (ws, ada_id, 'Generate morning brief', '0 7 * * 1-5', now() + interval '14 hours', true),
    (ws, ledger_id, 'Reconcile Stripe + QB', '0 9 * * *', now() + interval '16 hours', true),
    (ws, scout_id, 'Crawl competitor blogs', '0 6 * * 1', now() + interval '4 days', true),
    (ws, mason_id, 'Nightly PR review pass', '0 22 * * 1-5', now() + interval '12 hours', true),
    (ws, atlas_id, 'Archive stale Notion pages', '0 3 * * 0', now() + interval '5 days', false);

  insert into public.knowledge (workspace_id, agent_id, title, kind, body) values
    (ws, ada_id, 'Northwind brand voice', 'Pinned fact', 'Plain, direct, no marketing-speak. Lowercase ''ai'' unless beginning a sentence.'),
    (ws, ledger_id, 'Refund policy v3', 'Policy', 'Refunds within 30 days are auto-approved up to $500. Above that, escalate to ops.'),
    (ws, mason_id, 'Engineering style guide', 'Reference', 'Prefer integration tests over mocks. No premature abstractions.'),
    (ws, iris_id, 'Support macros 2026-Q2', 'Snippet pack', 'Updated quarterly. Templates for billing, refund, password reset, downtime.'),
    (ws, ada_id, 'Vendor contacts directory', 'Directory', 'Maintained in Notion: vendor name → primary contact, renewal date, notes.'),
    (ws, ada_id, 'Board prep checklist', 'Checklist', 'Numbers, narrative, decisions needed, asks. Drafted by Ada, finalized by ops.');
end;
$$;

revoke all on function public.seed_demo_data(uuid) from public;
grant execute on function public.seed_demo_data(uuid) to authenticated;
