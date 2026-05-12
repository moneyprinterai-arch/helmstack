import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getActivity } from "@/lib/queries";

const KIND_PILL: Record<string, string> = {
  dispatch: "bg-sky-50 text-sky-700 border-sky-200",
  approval: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  memory: "bg-violet-50 text-violet-700 border-violet-200",
  schedule: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default async function ActivityPage() {
  const workspace = await getWorkspace();
  const events = workspace ? await getActivity(workspace.id, 50) : [];

  return (
    <div className="mx-auto max-w-[1100px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar
        title="Activity"
        eyebrow="Live audit log"
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/70 px-3 py-1.5 text-xs text-zinc-600 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            live
          </span>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        {["All", "Dispatches", "Approvals", "Errors", "Memory", "Schedule"].map((tab, i) => {
          const active = i === 0;
          return (
            <button
              key={tab}
              type="button"
              className={[
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-zinc-900 text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "border border-white/50 bg-white/60 text-zinc-600 backdrop-blur-xl hover:bg-white/85 hover:text-zinc-900",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <section className="rounded-3xl border border-white/50 bg-white/70 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl overflow-hidden">
        {events.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-zinc-500">No events yet.</div>
        ) : (
          <ol>
            {events.map((ev, i) => (
              <li
                key={ev.id}
                className={`flex items-start gap-4 px-5 py-3 ${i > 0 ? "border-t border-stone-200/60" : ""}`}
              >
                <span className="font-mono text-[10px] text-zinc-400 tabular-nums pt-1 w-20">
                  {new Date(ev.occurred_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider mt-0.5 ${KIND_PILL[ev.kind]}`}>
                  {ev.kind}
                </span>
                <span className="min-w-0 flex-1 text-sm pt-0.5">
                  <span className="font-medium text-zinc-900">{ev.agent?.name ?? "System"}</span>
                  <span className="text-zinc-600"> · {ev.message}</span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="text-[11px] text-zinc-500">
        Showing the last {events.length} events. Retention: 30 days on Solo, 90 days on Team, custom on Enterprise.
      </p>
    </div>
  );
}
