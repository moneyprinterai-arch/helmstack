export function HeroPreview() {
  return (
    <div className="relative mt-20 mx-auto max-w-[1100px]">
      <div className="rounded-3xl border border-white/50 bg-white/70 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25),0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl overflow-hidden">
        <div className="rounded-2xl overflow-hidden bg-white">
          <div className="flex items-center justify-between px-4 h-9 border-b border-stone-200/60 bg-white">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">helmstack.app / fleet</div>
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-[200px_1fr] min-h-[460px]">
            <aside className="border-r border-stone-200/60 bg-stone-50/60 p-3 text-[13px]">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-1 font-semibold">Fleet</div>
              {[
                { label: "Dashboard", active: true },
                { label: "Agents", count: 12 },
                { label: "Skills" },
                { label: "Scheduled" },
                { label: "Memory" },
                { label: "Knowledge" },
                { label: "Connectors", count: 8 },
                { label: "Activity" },
                { label: "Approvals", count: 3, awaiting: true },
              ].map((it) => (
                <div
                  key={it.label}
                  className={`flex items-center justify-between rounded-2xl px-3 py-2 my-0.5 text-sm font-medium ${
                    it.active ? "bg-zinc-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]" : "text-zinc-600"
                  }`}
                >
                  <span>{it.label}</span>
                  {it.count !== undefined && (
                    <span className={`text-[10px] font-semibold ${it.awaiting ? "text-amber-600" : it.active ? "text-white/60" : "text-zinc-400"}`}>{it.count}</span>
                  )}
                </div>
              ))}
            </aside>

            <main className="p-5 space-y-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Dashboard</div>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">Good morning, Mira.</h2>
                <p className="mt-1 text-sm text-zinc-600">3 approvals pending. 5 agents running.</p>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { label: "Agents", value: "12", color: "text-zinc-900" },
                  { label: "Running now", value: "5", color: "text-emerald-600" },
                  { label: "Awaiting", value: "3", color: "text-amber-600" },
                  { label: "Runs today", value: "48", color: "text-zinc-900" },
                ].map((k) => (
                  <div key={k.label} className="rounded-2xl border border-white/50 bg-white/65 p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
                    <div className={`text-[22px] font-semibold leading-none tracking-tight ${k.color}`}>{k.value}</div>
                    <div className="mt-1 text-[10px] text-zinc-500">{k.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/50 bg-white/70 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="text-xs font-semibold text-zinc-900">Needs your review</h3>
                  <span className="text-[10px] text-zinc-500">3 pending</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { agent: "Ledger", action: "Refund $1,240 to acme.co", status: "gated" },
                    { agent: "Ada", action: "Send vendor renewal email", status: "gated" },
                    { agent: "Mason", action: "Approve PR #1283", status: "blocked" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider ${
                            r.status === "gated"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}>
                            {r.status}
                          </span>
                          <span className="text-[11px] font-medium text-zinc-900">{r.agent}</span>
                        </div>
                        <div className="mt-0.5 text-[11px] text-zinc-700 truncate">{r.action}</div>
                      </div>
                      <button type="button" className="shrink-0 rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-medium text-white">Review</button>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
