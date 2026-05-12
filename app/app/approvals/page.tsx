import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getPendingApprovals, relativeTime } from "@/lib/queries";
import { resolveApproval } from "@/app/app/actions";

export default async function ApprovalsPage() {
  const workspace = await getWorkspace();
  const approvals = workspace ? await getPendingApprovals(workspace.id) : [];

  return (
    <div className="mx-auto max-w-[960px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar title="Approvals" eyebrow={`${approvals.length} pending`} />

      {approvals.length === 0 ? (
        <div className="rounded-3xl border border-white/50 bg-white/70 p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h3 className="text-base font-semibold text-zinc-900">All caught up</h3>
          <p className="mt-2 text-sm text-zinc-600">Nothing pending. Helmstack will ping you when something lands.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {approvals.map((a) => (
            <form
              key={a.id}
              action={resolveApproval}
              className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
            >
              <input type="hidden" name="id" value={a.id} />
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                    a.priority === "P0" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {a.priority}
                  </span>
                  <span className="text-xs font-medium text-zinc-900">{a.agent?.name ?? "Unknown"}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{relativeTime(a.created_at)}</span>
              </div>
              <h3 className="mt-3 text-base font-semibold tracking-tight text-zinc-900">{a.action}</h3>
              {a.context && (
                <div className="mt-2 rounded-xl border border-stone-200 bg-stone-50/80 p-3 text-xs text-zinc-700 leading-relaxed">
                  {a.context}
                </div>
              )}

              <div className="mt-4">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Reply note (optional)</div>
                <textarea
                  name="note"
                  rows={2}
                  placeholder="Add context, conditions, or a redirect — gets passed back to the agent."
                  className="mt-1.5 w-full resize-none rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  name="decision"
                  value="approved"
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                >
                  Mark resolved
                </button>
                <button
                  type="submit"
                  name="decision"
                  value="rejected"
                  className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-stone-50"
                >
                  Reject
                </button>
              </div>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
