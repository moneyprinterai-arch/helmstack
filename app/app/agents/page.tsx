import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getAgents, relativeTime } from "@/lib/queries";

const runtimeLabel: Record<string, string> = {
  "claude-code": "Claude Code",
  openai: "OpenAI",
  langgraph: "LangGraph",
  crewai: "CrewAI",
  autogen: "AutoGen",
  http: "HTTP",
  other: "Custom",
};

const runtimeBorder: Record<string, string> = {
  "claude-code": "border-l-sky-500",
  openai: "border-l-emerald-500",
  langgraph: "border-l-violet-500",
  crewai: "border-l-amber-500",
  autogen: "border-l-blue-500",
  http: "border-l-stone-400",
  other: "border-l-stone-300",
};

export default async function AgentsPage() {
  const workspace = await getWorkspace();
  const agents = workspace ? await getAgents(workspace.id) : [];

  const filters = [
    { key: "all", label: "All", count: agents.length },
    { key: "running", label: "Running", count: agents.filter((a) => a.status === "running").length },
    { key: "awaiting", label: "Awaiting", count: agents.filter((a) => a.pending_count > 0).length },
    { key: "idle", label: "Idle", count: agents.filter((a) => a.status === "idle").length },
    { key: "error", label: "Error", count: agents.filter((a) => a.status === "error").length },
  ];

  return (
    <div className="mx-auto max-w-[1320px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar
        title="Agents"
        eyebrow="Fleet"
        action={
          <button
            type="button"
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:bg-zinc-700"
          >
            Add agent
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f, i) => {
          const active = i === 0;
          return (
            <button
              key={f.key}
              type="button"
              className={[
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-zinc-900 text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                  : "border border-white/50 bg-white/60 text-zinc-600 backdrop-blur-xl hover:bg-white/85 hover:text-zinc-900",
              ].join(" ")}
            >
              <span>{f.label}</span>
              <span
                className={[
                  "rounded-full px-1.5 py-px text-[10px] font-semibold",
                  active ? "bg-white/20" : "bg-zinc-900/5 text-zinc-500",
                ].join(" ")}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {agents.length === 0 ? (
        <div className="rounded-3xl border border-white/50 bg-white/70 p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h3 className="text-base font-semibold text-zinc-900">No agents yet</h3>
          <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto">Connect an agent runtime — Claude Code, OpenAI, or anything HTTP — and it shows up here.</p>
          <button type="button" className="mt-5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white hover:bg-zinc-700">
            Add your first agent
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {agents.map((a) => {
            const dot =
              a.status === "running" ? "bg-emerald-500 animate-pulse" :
              a.status === "needs_review" ? "bg-amber-500" :
              a.status === "error" ? "bg-red-500" :
              "bg-stone-400";
            return (
              <div
                key={a.id}
                className={`relative block h-[72px] w-[200px] shrink-0 rounded-2xl border-l-2 bg-white px-4 py-3 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.07)] ${runtimeBorder[a.runtime] ?? "border-l-stone-300"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate pr-4 text-sm font-semibold text-zinc-900">{a.name}</span>
                  <span className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                </div>
                <div className="mt-1 truncate text-[11px] leading-snug text-zinc-500">
                  {runtimeLabel[a.runtime] ?? a.runtime} · {relativeTime(a.last_activity_at)}
                </div>
                {a.pending_count > 0 && (
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-amber-600">
                    {a.pending_count} awaiting
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
