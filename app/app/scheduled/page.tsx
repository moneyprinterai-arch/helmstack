import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getSchedules } from "@/lib/queries";
import { toggleSchedule } from "@/app/app/actions";

function untilLabel(iso: string | null): string {
  if (!iso) return "";
  const ms = new Date(iso).getTime() - Date.now();
  if (Number.isNaN(ms) || ms < 0) return "due";
  const m = Math.floor(ms / 60000);
  if (m < 1) return "<1m";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export default async function ScheduledPage() {
  const workspace = await getWorkspace();
  const schedules = workspace ? await getSchedules(workspace.id) : [];

  return (
    <div className="mx-auto max-w-[1240px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar
        title="Scheduled runs"
        eyebrow="Triggers"
        action={
          <button
            type="button"
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:bg-zinc-700"
          >
            New trigger
          </button>
        }
      />

      <section className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
        {schedules.length === 0 ? (
          <div className="rounded-2xl bg-white px-4 py-8 text-center text-sm text-zinc-500">No scheduled fires.</div>
        ) : (
          <div className="space-y-2">
            {schedules.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <div className="w-24 shrink-0">
                  <div className="text-sm font-semibold text-zinc-900">
                    {s.next_run_at ? new Date(s.next_run_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                    in {untilLabel(s.next_run_at)}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-zinc-900">{s.agent?.name ?? "—"} · {s.intent}</div>
                  <div className="mt-0.5 text-[11px] font-mono text-zinc-500 truncate">{s.cron}</div>
                </div>
                <form action={toggleSchedule} className="shrink-0">
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="active" value={String(s.active)} />
                  <button
                    type="submit"
                    aria-label={s.active ? "Disable" : "Enable"}
                    className={`inline-flex h-5 w-9 rounded-full p-0.5 transition-colors ${s.active ? "bg-emerald-500" : "bg-stone-300"}`}
                  >
                    <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${s.active ? "translate-x-4" : ""}`} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
