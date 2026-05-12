export function HeroPreview() {
  return (
    <div className="relative mt-20 mx-auto max-w-[1100px]">
      <div className="absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-br from-[color:var(--brand-soft)] via-transparent to-[color:var(--brand-soft)] opacity-60 blur-2xl" />
      <div className="card card-lift overflow-hidden floaty rounded-[22px]">
        <div className="flex items-center justify-between px-4 h-10 border-b border-[color:var(--border)] bg-[color:var(--surface-alt)]/60">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--danger)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--warn)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--good)]/70" />
          </div>
          <div className="text-[11px] text-[color:var(--fg-subtle)] font-mono">app.helmstack.ai / fleet</div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-[200px_1fr] min-h-[420px]">
          <aside className="border-r border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-3 text-[13px]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] px-2 py-1">Fleet</div>
            {[
              { label: "Overview", active: true, icon: "M3 12h18M3 6h18M3 18h18" },
              { label: "Agents", count: 12, icon: "M16 11a4 4 0 10-8 0M5 21v-1a7 7 0 0114 0v1" },
              { label: "Connectors", count: 8, icon: "M9 9h6v6H9z M3 9h6 M15 9h6 M3 15h6 M15 15h6" },
              { label: "Approvals", count: 3, badge: true, icon: "M5 12l5 5L20 7" },
              { label: "Scheduled", icon: "M12 8v4l3 2 M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Knowledge", icon: "M4 4h16v16H4z M4 9h16" },
              { label: "Activity", icon: "M3 12h4l3-8 4 16 3-8h4" },
            ].map((it) => (
              <div
                key={it.label}
                className={`flex items-center justify-between rounded-lg px-2 py-1.5 ${it.active ? "bg-[color:var(--brand-soft)] text-[color:var(--brand)]" : "text-[color:var(--fg-muted)]"}`}
              >
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d={it.icon} /></svg>
                  {it.label}
                </span>
                {it.count !== undefined && (
                  <span className={`text-[10px] ${it.badge ? "bg-[color:var(--warn)]/20 text-[color:var(--warn)] px-1.5 rounded-full" : ""}`}>{it.count}</span>
                )}
              </div>
            ))}
          </aside>

          <main className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)]">Tuesday morning</div>
                <div className="text-lg font-medium tracking-tight">Your fleet is steady — 3 things want a glance.</div>
              </div>
              <div className="chip"><span className="dot text-[color:var(--good)] pulse-dot" />Live</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Running", value: "12", trend: "+2", good: true },
                { label: "Approvals", value: "3", trend: "needs you", warn: true },
                { label: "Today's tasks", value: "48", trend: "92% auto" },
                { label: "Spend", value: "$12.40", trend: "−18%" },
              ].map((k) => (
                <div key={k.label} className="card p-3">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--fg-subtle)]">{k.label}</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-xl font-semibold tracking-tight">{k.value}</span>
                    <span className={`text-[10px] ${k.good ? "text-[color:var(--good)]" : k.warn ? "text-[color:var(--warn)]" : "text-[color:var(--fg-subtle)]"}`}>{k.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">Needs review</div>
                <div className="text-[11px] text-[color:var(--fg-subtle)]">3 pending</div>
              </div>
              <div className="space-y-2">
                {[
                  { agent: "Ada · ops", action: "Send vendor renewal email", prio: "P1" },
                  { agent: "Stripe billing watcher", action: "Refund $1,240 to acme.co", prio: "P0" },
                  { agent: "Notion gardener", action: "Archive 47 stale pages", prio: "P3" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-2.5">
                    <div className="min-w-0">
                      <div className="text-[12.5px] font-medium truncate">{r.action}</div>
                      <div className="text-[11px] text-[color:var(--fg-subtle)]">{r.agent}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`chip ${r.prio === "P0" ? "chip-brand" : ""}`}>{r.prio}</span>
                      <button className="btn btn-primary h-7 px-2.5 text-[11px]">Approve</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
