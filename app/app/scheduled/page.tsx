import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getSchedules } from "@/lib/queries";
import { toggleSchedule } from "@/app/app/actions";

export default async function ScheduledPage() {
  const workspace = await getWorkspace();
  const schedules = workspace ? await getSchedules(workspace.id) : [];

  return (
    <>
      <AppTopbar title="Scheduled runs" eyebrow="Triggers" />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[1240px]">
        <div className="card p-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[13.5px] font-semibold tracking-tight">Triggers</div>
            <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-0.5">Cron, webhooks, file drops, and calendar events. One per agent intent.</p>
          </div>
          <button type="button" className="btn btn-primary h-9 px-3.5 text-[12.5px]" aria-label="New trigger">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M8 3v10M3 8h10" strokeLinecap="round" /></svg>
            New trigger
          </button>
        </div>

        {schedules.length === 0 ? (
          <div className="card p-10 text-center text-[13px] text-[color:var(--fg-muted)]">No schedules yet.</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[color:var(--bg-soft)]/60">
                <tr className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)]">
                  <th className="text-left font-medium px-5 py-3">Agent</th>
                  <th className="text-left font-medium px-5 py-3">Intent</th>
                  <th className="text-left font-medium px-5 py-3">Schedule</th>
                  <th className="text-left font-medium px-5 py-3">Next run</th>
                  <th className="text-right font-medium px-5 py-3 pr-6">Active</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((s) => (
                  <tr key={s.id} className="border-t border-[color:var(--border)] hover:bg-[color:var(--surface-alt)]/60 transition-colors">
                    <td className="px-5 py-3.5 text-[13.5px] font-medium">{s.agent?.name ?? "—"}</td>
                    <td className="px-5 py-3.5 text-[12.5px] text-[color:var(--fg-muted)]">{s.intent}</td>
                    <td className="px-5 py-3.5 text-[12px] font-mono text-[color:var(--fg-muted)]">{s.cron}</td>
                    <td className="px-5 py-3.5 text-[12.5px] text-[color:var(--fg-muted)]">
                      {s.next_run_at ? new Date(s.next_run_at).toLocaleString() : "—"}
                    </td>
                    <td className="px-5 py-3.5 pr-6 text-right">
                      <form action={toggleSchedule}>
                        <input type="hidden" name="id" value={s.id} />
                        <input type="hidden" name="active" value={String(s.active)} />
                        <button
                          type="submit"
                          className={`inline-flex h-5 w-9 rounded-full p-0.5 transition-colors ${s.active ? "bg-[color:var(--brand)]" : "bg-[color:var(--border-strong)]"}`}
                          aria-label={s.active ? "Disable" : "Enable"}
                        >
                          <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${s.active ? "translate-x-4" : ""}`} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
