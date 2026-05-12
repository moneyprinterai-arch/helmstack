import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getActivity } from "@/lib/queries";

const kindStyle: Record<string, string> = {
  dispatch: "bg-[color:var(--good)]",
  approval: "bg-[color:var(--warn)]",
  error: "bg-[color:var(--danger)]",
  memory: "bg-[color:var(--accent)]",
  schedule: "bg-[color:var(--brand)]",
};

export default async function ActivityPage() {
  const workspace = await getWorkspace();
  const events = workspace ? await getActivity(workspace.id, 50) : [];

  return (
    <>
      <AppTopbar title="Activity" eyebrow="Live audit log" />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[1100px]">
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Dispatches", "Approvals", "Errors", "Memory", "Schedule"].map((tab, i) => (
            <button type="button" key={tab} className={`btn h-8 px-3 text-[12px] ${i === 0 ? "btn-secondary" : "btn-ghost"}`}>{tab}</button>
          ))}
          <div className="ml-auto chip"><span className="dot text-[color:var(--good)] pulse-dot" />Live</div>
        </div>

        {events.length === 0 ? (
          <div className="card p-10 text-center text-[13px] text-[color:var(--fg-muted)]">No events yet.</div>
        ) : (
          <div className="card overflow-hidden">
            <ol>
              {events.map((ev, i) => (
                <li
                  key={ev.id}
                  className={`flex items-start gap-4 px-5 py-3.5 text-[13px] ${i > 0 ? "border-t border-[color:var(--border)]" : ""}`}
                >
                  <span className="font-mono text-[11px] text-[color:var(--fg-subtle)] tabular-nums w-20 pt-0.5">
                    {new Date(ev.occurred_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                  </span>
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${kindStyle[ev.kind]}`} />
                  <span className="min-w-0 flex-1">
                    <span className="font-medium">{ev.agent?.name ?? "System"}</span>
                    <span className="text-[color:var(--fg-muted)]"> · {ev.message}</span>
                  </span>
                  <span className="chip text-[10px] text-[color:var(--fg-subtle)] capitalize">{ev.kind}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-[12px] text-[color:var(--fg-subtle)]">
          Showing the last {events.length} events. Audit log retention follows your plan: 30 days on Solo, 90 days on Team, custom on Enterprise.
        </p>
      </main>
    </>
  );
}
