import Link from "next/link";
import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getAgents, getPendingApprovals, getActivity, relativeTime } from "@/lib/queries";

const ICON = {
  agents: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <circle cx="16" cy="10" r="2.5" />
      <path d="M14.5 19c0-2.2 2-4 4.5-4" />
    </svg>
  ),
  running: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  awaiting: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  queue: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" />
    </svg>
  ),
  runs: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M4 14a8 8 0 1116 0" /><path d="M12 14V6" /><path d="M8 18h8" />
    </svg>
  ),
};

const runtimeLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  openai: "OpenAI",
  langgraph: "LangGraph",
  crewai: "CrewAI",
  autogen: "AutoGen",
  http: "HTTP",
  other: "Custom",
};

const runtimeBorder: Record<string, string> = {
  "claude-code": "border-l-sky-500",
  openai: "border-l-emerald-500",
  langgraph: "border-l-violet-500",
  crewai: "border-l-amber-500",
  autogen: "border-l-blue-500",
  http: "border-l-stone-400",
  other: "border-l-stone-300",
};

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Good evening";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default async function AppHome() {
  const workspace = await getWorkspace();
  if (!workspace) {
    return (
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 py-8">
        <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl max-w-xl">
          <h2 className="text-lg font-semibold text-zinc-900">No workspace yet</h2>
          <p className="mt-2 text-sm text-zinc-600">Your workspace is being provisioned. Refresh in a moment.</p>
        </div>
      </div>
    );
  }

  const [agents, approvals, activity] = await Promise.all([
    getAgents(workspace.id),
    getPendingApprovals(workspace.id),
    getActivity(workspace.id, 8),
  ]);

  const running = agents.filter((a) => a.status === "running").length;
  const awaiting = approvals.length;
  const runsToday = agents.filter((a) => {
    if (!a.last_activity_at) return false;
    return Date.now() - new Date(a.last_activity_at).getTime() < 24 * 60 * 60 * 1000;
  }).length;

  const tiles = [
    { label: "Agents", value: agents.length, accent: "text-zinc-900", icon: ICON.agents },
    { label: "Running now", value: running, accent: running > 0 ? "text-emerald-600" : "text-zinc-900", icon: ICON.running },
    { label: "Awaiting approval", value: awaiting, accent: awaiting > 0 ? "text-amber-600" : "text-zinc-900", icon: ICON.awaiting },
    { label: "Queue depth", value: 0, accent: "text-zinc-900", icon: ICON.queue },
    { label: "Runs today", value: runsToday, accent: "text-zinc-900", icon: ICON.runs },
  ];

  const userFirstName = "there";
  const summary =
    awaiting > 0
      ? `${awaiting} approval${awaiting === 1 ? "" : "s"} pending. ${running} agent${running === 1 ? "" : "s"} running.`
      : running > 0
        ? `${running} agent${running === 1 ? "" : "s"} running. Fleet steady.`
        : "Fleet idle.";

  return (
    <div className="mx-auto max-w-[1320px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Dashboard</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{greeting()}, {userFirstName}.</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/app/approvals"
              className="rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-medium text-zinc-900 backdrop-blur-xl transition-colors hover:bg-white/95"
            >
              Review approvals
            </Link>
            <Link
              href="/app/activity"
              className="rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-medium text-zinc-900 backdrop-blur-xl transition-colors hover:bg-white/95"
            >
              Open audit log
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-3xl border border-white/50 bg-white/65 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              {t.icon}
            </div>
            <div className={`mt-5 text-[34px] font-semibold leading-none tracking-tight ${t.accent}`}>{t.value}</div>
            <div className="mt-2 text-xs text-zinc-500">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <header className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold text-zinc-900">Needs your review</h2>
            <Link href="/app/approvals" className="text-xs text-zinc-500 hover:text-zinc-900">See all →</Link>
          </header>
          <div className="mt-4 space-y-2">
            {approvals.length === 0 ? (
              <div className="rounded-2xl bg-white px-4 py-6 text-center text-xs text-zinc-500">All caught up.</div>
            ) : (
              approvals.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${a.priority === "P0" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                        {a.priority}
                      </span>
                      <span className="text-xs font-medium text-zinc-900">{a.agent?.name ?? "—"}</span>
                      <span className="text-[10px] text-zinc-400">{relativeTime(a.created_at)}</span>
                    </div>
                    <div className="mt-1 truncate text-sm text-zinc-700">{a.action}</div>
                  </div>
                  <Link
                    href="/app/approvals"
                    className="shrink-0 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
                  >
                    Review
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <header className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold text-zinc-900">Live activity</h2>
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              live
            </span>
          </header>
          <div className="mt-4 space-y-2">
            {activity.length === 0 ? (
              <div className="rounded-2xl bg-white px-4 py-6 text-center text-xs text-zinc-500">No events yet.</div>
            ) : (
              activity.map((ev) => (
                <div key={ev.id} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <span className="font-mono text-[10px] text-zinc-400 tabular-nums pt-0.5 w-14">
                    {new Date(ev.occurred_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                  </span>
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${
                    ev.kind === "error" ? "bg-red-500" :
                    ev.kind === "approval" ? "bg-amber-500" :
                    ev.kind === "memory" ? "bg-violet-500" :
                    ev.kind === "schedule" ? "bg-sky-500" :
                    "bg-emerald-500"
                  }`} />
                  <span className="min-w-0 flex-1 text-xs">
                    <span className="font-medium text-zinc-900">{ev.agent?.name ?? "System"}</span>
                    <span className="text-zinc-600"> · {ev.message}</span>
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <section>
        <header className="flex items-baseline justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-zinc-900">Your fleet</h2>
          <Link href="/app/agents" className="text-xs text-zinc-500 hover:text-zinc-900">All agents →</Link>
        </header>
        {agents.length === 0 ? (
          <div className="rounded-3xl border border-white/50 bg-white/70 p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
            <h3 className="text-base font-semibold text-zinc-900">No agents yet</h3>
            <p className="mt-2 text-sm text-zinc-600">Connect a runtime to start.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {agents.map((a) => {
              const dot =
                a.status === "running" ? "bg-emerald-500 animate-pulse" :
                a.status === "needs_review" ? "bg-amber-500" :
                a.status === "error" ? "bg-red-500" :
                "bg-stone-400";
              const dotLabel =
                a.status === "running" ? "running" :
                a.status === "needs_review" ? `${a.pending_count} awaiting` :
                a.status === "error" ? "error" :
                "idle";
              return (
                <Link
                  key={a.id}
                  href="/app/agents"
                  title={`${a.name} — ${a.role ?? ""}\n${dotLabel}`}
                  className={`block h-[72px] w-[176px] shrink-0 rounded-2xl border-l-2 bg-white px-4 py-3 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.07)] ${runtimeBorder[a.runtime] ?? "border-l-stone-300"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate pr-4 text-sm font-semibold text-zinc-900">{a.name}</span>
                    <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-label={dotLabel} />
                  </div>
                  <div className="mt-1 truncate text-[11px] leading-snug text-zinc-500">{runtimeLabel[a.runtime] ?? a.runtime}</div>
                  {a.pending_count > 0 && (
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-amber-600">
                      {a.pending_count} awaiting
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
