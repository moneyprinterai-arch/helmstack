import { AppTopbar } from "@/components/app-topbar";
import { approvals } from "@/lib/demo-data";

export default function ApprovalsPage() {
  return (
    <>
      <AppTopbar title="Approvals" eyebrow={`${approvals.length} pending`} />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[960px]">
        {approvals.map((a) => (
          <div key={a.id} className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[11.5px] text-[color:var(--fg-subtle)]">
                  <span className="font-medium text-[color:var(--fg-muted)]">{a.agent}</span>
                  <span>·</span>
                  <span>{a.receivedAt}</span>
                  <span className={`chip ${a.prio === "P0" ? "chip-brand" : ""}`}>{a.prio}</span>
                </div>
                <h3 className="mt-2 text-[16px] font-semibold tracking-tight">{a.action}</h3>
                <p className="mt-2 text-[13.5px] text-[color:var(--fg-muted)] leading-relaxed">{a.context}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[color:var(--bg-soft)]/70 border border-[color:var(--border)] p-4">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">Reply note (optional)</div>
              <textarea
                placeholder="Add context, conditions, or a redirect — gets passed back to the agent."
                rows={2}
                className="mt-2 w-full bg-transparent text-[13px] outline-none resize-none text-[color:var(--fg)] placeholder:text-[color:var(--fg-subtle)]"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="btn btn-primary h-9 px-4 text-[13px]">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Approve
              </button>
              <button className="btn btn-secondary h-9 px-4 text-[13px]">Approve with note</button>
              <button className="btn btn-ghost h-9 px-4 text-[13px]">Reject</button>
              <button className="btn btn-ghost h-9 px-4 text-[13px] ml-auto">View full context</button>
            </div>
          </div>
        ))}

        <div className="card p-8 text-center text-[13px] text-[color:var(--fg-muted)]">
          That's the queue. Helmstack will ping you on Slack when the next one lands.
        </div>
      </main>
    </>
  );
}
