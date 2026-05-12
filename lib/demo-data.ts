export type AgentStatus = "running" | "idle" | "error" | "needs_review";

export type DemoAgent = {
  id: string;
  name: string;
  runtime: "claude-code" | "openai" | "langgraph" | "http";
  role: string;
  status: AgentStatus;
  lastActivity: string;
  pending: number;
  todayTasks: number;
  successRate: number;
};

export const agents: DemoAgent[] = [
  {
    id: "ada",
    name: "Ada",
    runtime: "claude-code",
    role: "Chief of staff — drafts replies, runs the morning brief",
    status: "running",
    lastActivity: "2 min ago",
    pending: 1,
    todayTasks: 14,
    successRate: 96,
  },
  {
    id: "ledger",
    name: "Ledger",
    runtime: "openai",
    role: "Reconciles Stripe + QuickBooks daily",
    status: "needs_review",
    lastActivity: "12 min ago",
    pending: 2,
    todayTasks: 6,
    successRate: 99,
  },
  {
    id: "scout",
    name: "Scout",
    runtime: "http",
    role: "Crawls competitors weekly and writes the brief",
    status: "idle",
    lastActivity: "3 hours ago",
    pending: 0,
    todayTasks: 0,
    successRate: 92,
  },
  {
    id: "mason",
    name: "Mason",
    runtime: "claude-code",
    role: "Reviews PRs on the engineering monorepo",
    status: "running",
    lastActivity: "just now",
    pending: 0,
    todayTasks: 22,
    successRate: 88,
  },
  {
    id: "iris",
    name: "Iris",
    runtime: "langgraph",
    role: "Inbox triage for support@",
    status: "running",
    lastActivity: "30 sec ago",
    pending: 0,
    todayTasks: 41,
    successRate: 94,
  },
  {
    id: "atlas",
    name: "Atlas",
    runtime: "openai",
    role: "Cleans up stale Notion pages",
    status: "error",
    lastActivity: "1 hour ago",
    pending: 0,
    todayTasks: 0,
    successRate: 71,
  },
];

export type DemoConnector = {
  id: string;
  name: string;
  category: string;
  status: "connected" | "needs_reauth" | "not_configured" | "error";
  account?: string;
  agents: number;
};

export const connectors: DemoConnector[] = [
  { id: "notion", name: "Notion", category: "Docs", status: "connected", account: "northwind-labs.notion.so", agents: 4 },
  { id: "drive", name: "Google Drive", category: "Docs", status: "connected", account: "ops@northwind.co", agents: 3 },
  { id: "slack", name: "Slack", category: "Messaging", status: "connected", account: "northwind", agents: 5 },
  { id: "gmail", name: "Gmail", category: "Messaging", status: "needs_reauth", account: "mira@northwind.co", agents: 2 },
  { id: "github", name: "GitHub", category: "Engineering", status: "connected", account: "northwind-labs", agents: 2 },
  { id: "linear", name: "Linear", category: "Engineering", status: "connected", account: "northwind", agents: 2 },
  { id: "stripe", name: "Stripe", category: "Money", status: "connected", account: "Northwind Labs Inc.", agents: 1 },
  { id: "qb", name: "QuickBooks", category: "Money", status: "connected", account: "Northwind Labs", agents: 1 },
  { id: "hubspot", name: "HubSpot", category: "Sales", status: "not_configured", agents: 0 },
  { id: "calendly", name: "Calendly", category: "Calendar", status: "connected", account: "mira-northwind", agents: 1 },
  { id: "postgres", name: "Postgres", category: "Data", status: "connected", account: "prod-readonly", agents: 2 },
  { id: "s3", name: "S3", category: "Data", status: "error", account: "northwind-archive", agents: 1 },
];

export type DemoApproval = {
  id: string;
  agent: string;
  agentId: string;
  action: string;
  prio: "P0" | "P1" | "P2" | "P3";
  receivedAt: string;
  context: string;
};

export const approvals: DemoApproval[] = [
  {
    id: "apr_1",
    agent: "Ledger",
    agentId: "ledger",
    action: "Refund $1,240 to acme.co (charge ch_3R1...)",
    prio: "P0",
    receivedAt: "8 min ago",
    context: "Charge disputed by customer 4 days ago. Reason: 'duplicate'. Subscription cancelled last week. Matches refund policy.",
  },
  {
    id: "apr_2",
    agent: "Ledger",
    agentId: "ledger",
    action: "Mark invoice INV-2293 as bad debt",
    prio: "P1",
    receivedAt: "45 min ago",
    context: "Customer 92 days past due. Three contact attempts failed. Outside ToS for further automation.",
  },
  {
    id: "apr_3",
    agent: "Ada",
    agentId: "ada",
    action: "Send vendor renewal email to legal@cloudflare",
    prio: "P2",
    receivedAt: "1 hour ago",
    context: "Contract renews on 2026-06-01. Drafted reply confirms current tier and asks for 12-month commit pricing.",
  },
];

export type DemoActivity = {
  id: string;
  ts: string;
  agent: string;
  kind: "dispatch" | "approval" | "error" | "memory" | "schedule";
  message: string;
};

export const activity: DemoActivity[] = [
  { id: "a1", ts: "09:42:18", agent: "Iris", kind: "dispatch", message: "Replied to support#4821 with refund policy" },
  { id: "a2", ts: "09:41:55", agent: "Mason", kind: "dispatch", message: "Approved PR #1283 — formatting only" },
  { id: "a3", ts: "09:41:02", agent: "Ledger", kind: "approval", message: "Asked for human approval on $1,240 refund" },
  { id: "a4", ts: "09:40:30", agent: "Iris", kind: "dispatch", message: "Routed support#4820 to billing queue" },
  { id: "a5", ts: "09:38:11", agent: "Ada", kind: "memory", message: "Pinned fact: Q3 board meeting moved to Sep 14" },
  { id: "a6", ts: "09:37:47", agent: "Atlas", kind: "error", message: "Notion connector returned 429 — backing off 5m" },
  { id: "a7", ts: "09:35:00", agent: "Mason", kind: "schedule", message: "Scheduled nightly PR review pass for 22:00 PT" },
  { id: "a8", ts: "09:34:21", agent: "Ada", kind: "dispatch", message: "Drafted morning brief — 92% auto" },
  { id: "a9", ts: "09:32:08", agent: "Ledger", kind: "dispatch", message: "Reconciled 14 Stripe charges with QuickBooks" },
  { id: "a10", ts: "09:30:00", agent: "Iris", kind: "dispatch", message: "Triaged 8 new support tickets" },
];

export type DemoSchedule = {
  id: string;
  agent: string;
  intent: string;
  cron: string;
  nextRun: string;
  active: boolean;
};

export const schedules: DemoSchedule[] = [
  { id: "s1", agent: "Ada", intent: "Generate morning brief", cron: "0 7 * * 1-5", nextRun: "Tomorrow 07:00", active: true },
  { id: "s2", agent: "Ledger", intent: "Reconcile Stripe + QB", cron: "0 9 * * *", nextRun: "Tomorrow 09:00", active: true },
  { id: "s3", agent: "Scout", intent: "Crawl competitor blogs", cron: "0 6 * * 1", nextRun: "Mon May 18 06:00", active: true },
  { id: "s4", agent: "Mason", intent: "Nightly PR review pass", cron: "0 22 * * 1-5", nextRun: "Today 22:00", active: true },
  { id: "s5", agent: "Atlas", intent: "Archive stale Notion pages", cron: "0 3 * * 0", nextRun: "Sun May 17 03:00", active: false },
];
