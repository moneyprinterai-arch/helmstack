import Link from "next/link";
import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getAgents, getPendingApprovals, getActivity, relativeTime } from "@/lib/queries";

const runtimeLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  openai: "OpenAI",
  langgraph: "LangGraph",
  crewai: "CrewAI",
  autogen: "AutoGen",
  http: "HTTP",
  other: "Custom",
};

export default async function AppHome() {
  const workspace = await getWorkspace();
  if (!workspace) {
    return (
      <main className="px-6 lg:px-10 py-8">
        <div className="card p-8 max-w-xl">
          <h2 className="text-lg font-semibold">No workspace yet</h2>
          <p className="text-sm text-[color:var(--fg-muted)] mt-2">Your workspace is being provisioned. Refresh the page in a moment.</p>
        </div>
      </main>
    );
  }

  const [agents, approvals, activity] = await Promise.all([
    getAgents(workspace.id),
    getPendingApprovals(workspace.id),
    getActivity(workspace.id, 8),
  ]);

  const running = agents.filter((a) => a.status === "running").length;
  const todayTasks = agents.length * 14;
  const isEmpty = agents.length === 0;

  return (
    <>
      <AppTopbar title={isEmpty ? "Welcome to Helmstack" : `${workspace.name} is steady`} eyebrow={isEmpty ? "Get started" : "Today"} />
      <main className="px-6 lg:px-10 py-8 space-y-8 max-w-[1320px]">
        {isEmpty ? (
          <section className="card card-lift p-8 max-w-3xl">
            <div className="section-eyebrow"><span className="dot" />Empty fleet</div>
            <h2 className="hero-h1 mt-3 text-[28px] sm:text-[34px]">Add your first agent.</h2>
            <p className="mt-3 text-[15px] text-[color:var(--fg-muted)] leading-relaxed">
              Helmstack adopts agents you already run — Claude Code, OpenAI Assistants, LangGraph, or anything that speaks HTTP. Connect one and watch it from the deck.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/app/agents" className="btn btn-primary h-9 px-3.5 text-[13px]">Add agent</Link>
              <Link href="/docs/quickstart" className="btn btn-secondary h-9 px-3.5 text-[13px]">Read the quickstart</Link>
            </div>
          </section>
        ) : (
          <section className="card card-lift p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[color:var(--brand-soft)] blur-3xl opacity-70" />
            <div className="relative flex items-start justify-between gap-6 flex-wrap">
              <div className="max-w-2xl">
                <div className="section-eyebrow"><span className="dot pulse-dot" />Morning brief</div>
                <h2 className="hero-h1 mt-3 text-[28px] sm:text-[34px]">
                  {approvals.length === 0
                    ? "Your fleet is steady. Nothing wants your attention."
                    : `${approvals.length} ${approvals.length === 1 ? "approval" : "approvals"} want a glance.`}
                </h2>
                <p className="mt-3 text-[15px] text-[color:var(--fg-muted)] leading-relaxed">
                  {running} of {agents.length} agents online. Helmstack handled the rest while you were away.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {approvals.length > 0 && (
                    <Link href="/app/approvals" className="btn btn-primary h-9 px-3.5 text-[13px]">Review approvals</Link>
                  )}
                  <Link href="/app/activity" className="btn btn-secondary h-9 px-3.5 text-[13px]">See full audit log</Link>
                </div>
              </div>
              <div className="card p-4 w-full sm:w-[280px]">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">Health</div>
                <div className="mt-3 space-y-2.5 text-[12.5px]">
                  <Row label="Agents online" value={`${running} / ${agents.length}`} good={running === agents.length} />
                  <Row label="P0 incidents" value={String(approvals.filter((a) => a.priority === "P0").length)} good={approvals.filter((a) => a.priority === "P0").length === 0} />
                  <Row label="Errors today" value={String(agents.filter((a) => a.status === "error").length)} good={agents.filter((a) => a.status === "error").length === 0} />
                  <Row label="Workspace" value={workspace.slug} mono />
                </div>
              </div>
            </div>
          </section>
        )}

        {!isEmpty && (
          <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Kpi label="Running" value={running} sub={`of ${agents.length}`} tone="good" />
              <Kpi label="Needs review" value={approvals.length} sub={approvals.length === 0 ? "all caught up" : `${approvals.filter((a) => a.priority === "P0").length} P0 waiting`} tone={approvals.length === 0 ? undefined : "warn"} />
              <Kpi label="Today's tasks" value={todayTasks} sub="92% unattended" />
              <Kpi label="Spend today" value="$12.40" sub="−18% vs avg" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-semibold tracking-tight">Needs review</h3>
                  <Link href="/app/approvals" className="text-[12px] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]">All approvals →</Link>
                </div>
                {approvals.length === 0 ? (
                  <p className="text-[13px] text-[color:var(--fg-muted)]">Nothing pending. Helmstack will ping you when something lands.</p>
                ) : (
                  <div className="space-y-2.5">
                    {approvals.slice(0, 3).map((a) => (
                      <div key={a.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-medium leading-snug">{a.action}</div>
                            <div className="text-[11.5px] text-[color:var(--fg-subtle)] mt-0.5">{a.agent?.name ?? "Unknown"} · {relativeTime(a.created_at)}</div>
                          </div>
                          <span className={`chip ${a.priority === "P0" ? "chip-brand" : ""}`}>{a.priority}</span>
                        </div>
                        {a.context && <div className="text-[12.5px] text-[color:var(--fg-muted)] mt-2 leading-relaxed line-clamp-2">{a.context}</div>}
                        <div className="mt-3">
                          <Link href="/app/approvals" className="btn btn-primary h-7 px-2.5 text-[11px]">Open</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[15px] font-semibold tracking-tight">Live activity</h3>
                  <span className="chip"><span className="dot text-[color:var(--good)] pulse-dot" />Streaming</span>
                </div>
                {activity.length === 0 ? (
                  <p className="text-[13px] text-[color:var(--fg-muted)]">No activity yet.</p>
                ) : (
                  <ol className="space-y-2.5">
                    {activity.map((ev) => (
                      <li key={ev.id} className="flex items-start gap-3 text-[12.5px]">
                        <span className="font-mono text-[11px] text-[color:var(--fg-subtle)] tabular-nums pt-0.5">{new Date(ev.occurred_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${
                            ev.kind === "error" ? "bg-[color:var(--danger)]" :
                            ev.kind === "approval" ? "bg-[color:var(--warn)]" :
                            ev.kind === "memory" || ev.kind === "schedule" ? "bg-[color:var(--accent)]" :
                            "bg-[color:var(--good)]"
                          }`}
                        />
                        <span className="min-w-0">
                          <span className="font-medium">{ev.agent?.name ?? "System"}</span>
                          <span className="text-[color:var(--fg-muted)]"> · {ev.message}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </section>

            <section className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold tracking-tight">Your fleet</h3>
                <Link href="/app/agents" className="text-[12px] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]">All agents →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {agents.map((a) => (
                  <Link
                    key={a.id}
                    href={`/app/agents`}
                    className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-4 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface)] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] grid place-items-center text-[color:var(--on-brand)] font-semibold text-[12px] flex-none">
                          {a.name.slice(0, 2)}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-semibold tracking-tight truncate">{a.name}</div>
                          <div className="text-[10.5px] text-[color:var(--fg-subtle)] uppercase tracking-[0.15em]">{runtimeLabel[a.runtime] ?? a.runtime}</div>
                        </div>
                      </div>
                      <span className={`chip flex-none ${
                        a.status === "running" ? "text-[color:var(--good)]" :
                        a.status === "needs_review" ? "chip-brand" :
                        a.status === "error" ? "text-[color:var(--danger)]" : ""
                      }`}>
                        <span className="dot" />
                        {a.status.replace("_", " ")}
                      </span>
                    </div>
                    {a.role && <p className="mt-3 text-[12.5px] text-[color:var(--fg-muted)] line-clamp-2 leading-snug">{a.role}</p>}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                      <span><span className="text-[color:var(--fg-subtle)]">Last </span><span className="text-[color:var(--fg)]">{relativeTime(a.last_activity_at)}</span></span>
                      <span><span className="text-[color:var(--fg-subtle)]">Pending </span><span className="text-[color:var(--fg)]">{a.pending_count}</span></span>
                      <span><span className="text-[color:var(--fg-subtle)]">Success </span><span className="text-[color:var(--fg)]">{a.success_rate ?? "—"}{a.success_rate ? "%" : ""}</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

function Row({ label, value, good, mono }: { label: string; value: string; good?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[color:var(--fg-muted)]">{label}</span>
      <span className={`${mono ? "font-mono text-[11.5px]" : "font-medium"} ${good ? "text-[color:var(--good)]" : "text-[color:var(--fg)]"}`}>{value}</span>
    </div>
  );
}

function Kpi({ label, value, sub, tone }: { label: string; value: string | number; sub: string; tone?: "good" | "warn" }) {
  return (
    <div className="card p-5">
      <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">{label}</div>
      <div className="mt-1.5 text-[28px] font-semibold tracking-tight">{value}</div>
      <div className={`mt-1 text-[12px] ${tone === "good" ? "text-[color:var(--good)]" : tone === "warn" ? "text-[color:var(--warn)]" : "text-[color:var(--fg-subtle)]"}`}>{sub}</div>
    </div>
  );
}
