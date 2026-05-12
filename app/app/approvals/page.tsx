import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getPendingApprovals, relativeTime } from "@/lib/queries";
import { resolveApproval } from "@/app/app/actions";

export default async function ApprovalsPage() {
  const workspace = await getWorkspace();
  const approvals = workspace ? await getPendingApprovals(workspace.id) : [];

  return (
    <>
      <AppTopbar title="Approvals" eyebrow={`${approvals.length} pending`} />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[960px]">
        {approvals.length === 0 ? (
          <div className="card p-10 text-center">
            <h3 className="text-[16px] font-semibold tracking-tight">All clear</h3>
            <p className="mt-2 text-[13px] text-[color:var(--fg-muted)]">Nothing wants your attention. Helmstack will ping you when the next one lands.</p>
          </div>
        ) : (
          approvals.map((a) => (
            <form key={a.id} action={resolveApproval} className="card p-6">
              <input type="hidden" name="id" value={a.id} />
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11.5px] text-[color:var(--fg-subtle)]">
                    <span className="font-medium text-[color:var(--fg-muted)]">{a.agent?.name ?? "Unknown"}</span>
                    <span>·</span>
                    <span>{relativeTime(a.created_at)}</span>
                    <span className={`chip ${a.priority === "P0" ? "chip-brand" : ""}`}>{a.priority}</span>
                  </div>
                  <h3 className="mt-2 text-[16px] font-semibold tracking-tight">{a.action}</h3>
                  {a.context && <p className="mt-2 text-[13.5px] text-[color:var(--fg-muted)] leading-relaxed">{a.context}</p>}
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[color:var(--bg-soft)]/70 border border-[color:var(--border)] p-4">
                <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">Reply note (optional)</div>
                <textarea
                  name="note"
                  placeholder="Add context, conditions, or a redirect — gets passed back to the agent."
                  rows={2}
                  className="mt-2 w-full bg-transparent text-[13px] outline-none resize-none text-[color:var(--fg)] placeholder:text-[color:var(--fg-subtle)]"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="submit" name="decision" value="approved" className="btn btn-primary h-9 px-4 text-[13px]">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Approve
                </button>
                <button type="submit" name="decision" value="rejected" className="btn btn-ghost h-9 px-4 text-[13px]">Reject</button>
              </div>
            </form>
          ))
        )}
      </main>
    </>
  );
}
