import { AppTopbar } from "@/components/app-topbar";
import { agents } from "@/lib/demo-data";

const runtimeLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  "openai": "OpenAI",
  "langgraph": "LangGraph",
  "http": "HTTP",
};

export default function AgentsPage() {
  return (
    <>
      <AppTopbar title="Agents" eyebrow="Fleet" />
      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-[1320px]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {["All", "Running", "Idle", "Needs review", "Error"].map((tab, i) => (
              <button
                key={tab}
                className={`btn h-8 px-3 text-[12px] ${i === 0 ? "btn-secondary" : "btn-ghost"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary h-8 px-3 text-[12px]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 4h10M5 8h6M7 12h2" strokeLinecap="round" /></svg>
              Filter
            </button>
            <button className="btn btn-primary h-8 px-3 text-[12px]">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M8 3v10M3 8h10" strokeLinecap="round" /></svg>
              Add agent
            </button>
          </div>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--bg-soft)]/60">
              <tr className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)]">
                <th className="text-left font-medium px-5 py-3">Agent</th>
                <th className="text-left font-medium px-5 py-3">Runtime</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-left font-medium px-5 py-3">Last activity</th>
                <th className="text-right font-medium px-5 py-3">Today</th>
                <th className="text-right font-medium px-5 py-3">Success</th>
                <th className="text-right font-medium px-5 py-3 pr-6">Pending</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr
                  key={a.id}
                  className="border-t border-[color:var(--border)] hover:bg-[color:var(--surface-alt)]/60 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)] grid place-items-center text-[color:var(--on-brand)] font-semibold text-[11px]">
                        {a.name.slice(0, 2)}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-medium leading-tight">{a.name}</div>
                        <div className="text-[11.5px] text-[color:var(--fg-subtle)] line-clamp-1">{a.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[12.5px] text-[color:var(--fg-muted)]">{runtimeLabel[a.runtime]}</td>
                  <td className="px-5 py-3.5">
                    <span className={`chip ${
                      a.status === "running" ? "text-[color:var(--good)]" :
                      a.status === "needs_review" ? "chip-brand" :
                      a.status === "error" ? "text-[color:var(--danger)]" : ""
                    }`}>
                      <span className={`dot ${a.status === "running" ? "pulse-dot" : ""}`} />
                      {a.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[12.5px] text-[color:var(--fg-muted)]">{a.lastActivity}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-right tabular-nums">{a.todayTasks}</td>
                  <td className="px-5 py-3.5 text-[12.5px] text-right tabular-nums">
                    <span className={a.successRate < 80 ? "text-[color:var(--danger)]" : a.successRate < 90 ? "text-[color:var(--warn)]" : "text-[color:var(--good)]"}>
                      {a.successRate}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[12.5px] text-right tabular-nums pr-6">
                    {a.pending > 0 ? (
                      <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-[color:var(--warn)]/20 text-[color:var(--warn)] text-[11px] font-medium">
                        {a.pending}
                      </span>
                    ) : (
                      <span className="text-[color:var(--fg-subtle)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[12px] text-[color:var(--fg-subtle)]">
          Showing {agents.length} of {agents.length} agents · Helmstack adopts agents in place; we never run them for you.
        </p>
      </main>
    </>
  );
}
