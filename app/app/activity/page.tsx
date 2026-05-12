import { AppTopbar } from "@/components/app-topbar";
import { activity } from "@/lib/demo-data";

const kindStyle: Record<string, string> = {
  dispatch: "bg-[color:var(--good)]",
  approval: "bg-[color:var(--warn)]",
  error: "bg-[color:var(--danger)]",
  memory: "bg-[color:var(--accent)]",
  schedule: "bg-[color:var(--brand)]",
};

export default function ActivityPage() {
  return (
    <>
      <AppTopbar title="Activity" eyebrow="Live audit log" />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[1100px]">
        <div className="flex items-center gap-2 flex-wrap">
          {["All", "Dispatches", "Approvals", "Errors", "Memory", "Schedule"].map((tab, i) => (
            <button key={tab} className={`btn h-8 px-3 text-[12px] ${i === 0 ? "btn-secondary" : "btn-ghost"}`}>
              {tab}
            </button>
          ))}
          <div className="ml-auto chip"><span className="dot text-[color:var(--good)] pulse-dot" />Live</div>
        </div>

        <div className="card overflow-hidden">
          <ol>
            {activity.map((ev, i) => (
              <li
                key={ev.id}
                className={`flex items-start gap-4 px-5 py-3.5 text-[13px] ${i > 0 ? "border-t border-[color:var(--border)]" : ""}`}
              >
                <span className="font-mono text-[11px] text-[color:var(--fg-subtle)] tabular-nums w-16 pt-0.5">{ev.ts}</span>
                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-none ${kindStyle[ev.kind]}`} />
                <span className="min-w-0 flex-1">
                  <span className="font-medium">{ev.agent}</span>
                  <span className="text-[color:var(--fg-muted)]"> · {ev.message}</span>
                </span>
                <span className="chip text-[10px] text-[color:var(--fg-subtle)] capitalize">{ev.kind}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-[12px] text-[color:var(--fg-subtle)]">
          Showing the last {activity.length} events. Audit log retention follows your plan: 30 days on Solo, 90 days on Team, custom on Enterprise.
        </p>
      </main>
    </>
  );
}
