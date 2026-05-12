import Link from "next/link";
import { AppTopbar } from "@/components/app-topbar";
import { agents, approvals, activity } from "@/lib/demo-data";

const kpis = [
  { label: "Running", value: agents.filter((a) => a.status === "running").length, sub: "+2 vs yesterday", tone: "good" as const },
  { label: "Needs review", value: approvals.length, sub: "1 P0 waiting", tone: "warn" as const },
  { label: "Today's tasks", value: 83, sub: "92% completed unattended" },
  { label: "Spend today", value: "$12.40", sub: "−18% vs 7-day avg" },
];

export default function AppHome() {
  return (
    <>
      <AppTopbar title="Your fleet is steady" eyebrow="Tuesday morning" />
      <main className="px-6 lg:px-10 py-8 space-y-8 max-w-[1320px]">
        <section className="card card-lift p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[color:var(--brand-soft)] blur-3xl opacity-70" />
          <div className="relative flex items-start justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="section-eyebrow"><span className="dot pulse-dot" />Morning brief · 09:42</div>
              <h2 className="hero-h1 mt-3 text-[28px] sm:text-[34px]">Ada has the deck. Three things want a glance.</h2>
              <p className="mt-3 text-[15px] text-[color:var(--fg-muted)] leading-relaxed">
                Overnight: Iris cleared 41 support tickets, Mason approved 22 PRs, Ledger reconciled the books. Atlas hit a Notion rate limit and backed off — non-blocking. The Stripe refund needs you.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/app/approvals" className="btn btn-primary h-9 px-3.5 text-[13px]">
                  Review 3 approvals
                </Link>
                <Link href="/app/activity" className="btn btn-secondary h-9 px-3.5 text-[13px]">
                  See full audit log
                </Link>
              </div>
            </div>
            <div className="card p-4 w-full sm:w-[280px]">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">Health</div>
              <div className="mt-3 space-y-2.5">
                {[
                  { label: "Agents online", value: "5 / 6", good: true },
                  { label: "Connectors", value: "10 / 12 healthy" },
                  { label: "P0 incidents", value: "0", good: true },
                  { label: "Last brief", value: "On time" },
                ].map((h) => (
                  <div key={h.label} className="flex items-center justify-between text-[12.5px]">
                    <span className="text-[color:var(--fg-muted)]">{h.label}</span>
                    <span className={`font-medium ${h.good ? "text-[color:var(--good)]" : "text-[color:var(--fg)]"}`}>{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="card p-5">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">{k.label}</div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-[28px] font-semibold tracking-tight">{k.value}</span>
              </div>
              <div className={`mt-1 text-[12px] ${k.tone === "good" ? "text-[color:var(--good)]" : k.tone === "warn" ? "text-[color:var(--warn)]" : "text-[color:var(--fg-subtle)]"}`}>{k.sub}</div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold tracking-tight">Needs review</h3>
              <Link href="/app/approvals" className="text-[12px] text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]">All approvals →</Link>
            </div>
            <div className="space-y-2.5">
              {approvals.map((a) => (
                <div key={a.id} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13.5px] font-medium leading-snug">{a.action}</div>
                      <div className="text-[11.5px] text-[color:var(--fg-subtle)] mt-0.5">{a.agent} · {a.receivedAt}</div>
                    </div>
                    <span className={`chip ${a.prio === "P0" ? "chip-brand" : ""}`}>{a.prio}</span>
                  </div>
                  <div className="text-[12.5px] text-[color:var(--fg-muted)] mt-2 leading-relaxed">{a.context}</div>
                  <div className="mt-3 flex gap-2">
                    <button className="btn btn-primary h-7 px-2.5 text-[11px]">Approve</button>
                    <button className="btn btn-secondary h-7 px-2.5 text-[11px]">Reply with note</button>
                    <button className="btn btn-ghost h-7 px-2.5 text-[11px]">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold tracking-tight">Live activity</h3>
              <span className="chip"><span className="dot text-[color:var(--good)] pulse-dot" />Streaming</span>
            </div>
            <ol className="space-y-2.5">
              {activity.slice(0, 8).map((ev) => (
                <li key={ev.id} className="flex items-start gap-3 text-[12.5px]">
                  <span className="font-mono text-[11px] text-[color:var(--fg-subtle)] tabular-nums pt-0.5">{ev.ts}</span>
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${
                      ev.kind === "error"
                        ? "bg-[color:var(--danger)]"
                        : ev.kind === "approval"
                          ? "bg-[color:var(--warn)]"
                          : ev.kind === "memory" || ev.kind === "schedule"
                            ? "bg-[color:var(--accent)]"
                            : "bg-[color:var(--good)]"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="font-medium">{ev.agent}</span>
                    <span className="text-[color:var(--fg-muted)]"> · {ev.message}</span>
                  </span>
                </li>
              ))}
            </ol>
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
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] grid place-items-center text-[color:var(--on-brand)] font-semibold text-[12px]">
                      {a.name.slice(0, 2)}
                    </span>
                    <div>
                      <div className="text-[13.5px] font-semibold tracking-tight">{a.name}</div>
                      <div className="text-[10.5px] text-[color:var(--fg-subtle)] uppercase tracking-[0.15em]">{a.runtime}</div>
                    </div>
                  </div>
                  <span className={`chip ${
                    a.status === "running" ? "text-[color:var(--good)]" :
                    a.status === "needs_review" ? "chip-brand" :
                    a.status === "error" ? "text-[color:var(--danger)]" :
                    ""
                  }`}>
                    <span className="dot" />
                    {a.status.replace("_", " ")}
                  </span>
                </div>
                <p className="mt-3 text-[12.5px] text-[color:var(--fg-muted)] line-clamp-2 leading-snug">{a.role}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                  <span><span className="text-[color:var(--fg-subtle)]">Last </span><span className="text-[color:var(--fg)]">{a.lastActivity}</span></span>
                  <span><span className="text-[color:var(--fg-subtle)]">Today </span><span className="text-[color:var(--fg)]">{a.todayTasks}</span></span>
                  <span><span className="text-[color:var(--fg-subtle)]">Success </span><span className="text-[color:var(--fg)]">{a.successRate}%</span></span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
