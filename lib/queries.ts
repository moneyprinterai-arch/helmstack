import { createClient } from "@/lib/supabase/server";

export type Workspace = { id: string; name: string; slug: string };

export type Agent = {
  id: string;
  name: string;
  runtime: "claude-code" | "openai" | "langgraph" | "crewai" | "autogen" | "http" | "other";
  role: string | null;
  status: "running" | "idle" | "error" | "needs_review" | "paused";
  last_activity_at: string | null;
  pending_count: number;
  success_rate: number | null;
};

export type Connector = {
  id: string;
  provider: string;
  display_name: string;
  category: string;
  status: "connected" | "needs_reauth" | "error" | "not_configured";
  account: string | null;
};

export type Approval = {
  id: string;
  action: string;
  context: string | null;
  priority: "P0" | "P1" | "P2" | "P3";
  status: "pending" | "approved" | "rejected" | "expired";
  created_at: string;
  agent: { name: string } | null;
};

export type Activity = {
  id: string;
  kind: "dispatch" | "approval" | "error" | "memory" | "schedule";
  message: string;
  occurred_at: string;
  agent: { name: string } | null;
};

export type Schedule = {
  id: string;
  intent: string;
  cron: string;
  next_run_at: string | null;
  active: boolean;
  agent: { name: string } | null;
};

export type KnowledgeItem = {
  id: string;
  title: string;
  kind: string;
  body: string | null;
  updated_at: string;
  agent: { name: string } | null;
};

export async function getWorkspace(): Promise<Workspace | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("id, name, slug")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function getAgents(workspaceId: string): Promise<Agent[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("agents")
    .select("id, name, runtime, role, status, last_activity_at, pending_count, success_rate")
    .eq("workspace_id", workspaceId)
    .order("name");
  return (data as Agent[]) ?? [];
}

export async function getConnectors(workspaceId: string): Promise<Connector[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("connectors")
    .select("id, provider, display_name, category, status, account")
    .eq("workspace_id", workspaceId)
    .order("category")
    .order("display_name");
  return (data as Connector[]) ?? [];
}

export async function getPendingApprovals(workspaceId: string): Promise<Approval[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("approvals")
    .select("id, action, context, priority, status, created_at, agent:agents(name)")
    .eq("workspace_id", workspaceId)
    .eq("status", "pending")
    .order("priority")
    .order("created_at", { ascending: false });
  return ((data ?? []) as unknown) as Approval[];
}

export async function getActivity(workspaceId: string, limit = 20): Promise<Activity[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("activity")
    .select("id, kind, message, occurred_at, agent:agents(name)")
    .eq("workspace_id", workspaceId)
    .order("occurred_at", { ascending: false })
    .limit(limit);
  return ((data ?? []) as unknown) as Activity[];
}

export async function getSchedules(workspaceId: string): Promise<Schedule[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("schedules")
    .select("id, intent, cron, next_run_at, active, agent:agents(name)")
    .eq("workspace_id", workspaceId)
    .order("next_run_at", { ascending: true });
  return ((data ?? []) as unknown) as Schedule[];
}

export async function getKnowledge(workspaceId: string): Promise<KnowledgeItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("knowledge")
    .select("id, title, kind, body, updated_at, agent:agents(name)")
    .eq("workspace_id", workspaceId)
    .order("updated_at", { ascending: false });
  return ((data ?? []) as unknown) as KnowledgeItem[];
}

export function relativeTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const t = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - t);
  const s = Math.floor(diff / 1000);
  if (s < 45) return "just now";
  if (s < 90) return "1 min ago";
  const m = Math.floor(s / 60);
  if (m < 45) return `${m} min ago`;
  if (m < 90) return "1 hour ago";
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hours ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} days ago`;
  const w = Math.floor(d / 7);
  return `${w} weeks ago`;
}
