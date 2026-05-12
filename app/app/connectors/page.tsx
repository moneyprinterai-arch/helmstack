import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getConnectors } from "@/lib/queries";

const STATUS_PILL: Record<string, string> = {
  connected: "bg-emerald-50 text-emerald-700 border-emerald-200",
  needs_reauth: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  not_configured: "bg-stone-100 text-stone-600 border-stone-200",
};

const STATUS_LABEL: Record<string, string> = {
  connected: "Connected",
  needs_reauth: "Needs reauth",
  error: "Error",
  not_configured: "Not configured",
};

const STATUS_DOT: Record<string, string> = {
  connected: "bg-emerald-500",
  needs_reauth: "bg-amber-500",
  error: "bg-red-500",
  not_configured: "bg-stone-400",
};

export default async function ConnectorsPage() {
  const workspace = await getWorkspace();
  const connectors = workspace ? await getConnectors(workspace.id) : [];
  const groups = Array.from(new Set(connectors.map((c) => c.category)));

  return (
    <div className="mx-auto max-w-[1320px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar
        title="Connectors"
        eyebrow="Integrations"
        action={
          <button
            type="button"
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:bg-zinc-700"
          >
            Add connector
          </button>
        }
      />

      {connectors.length === 0 ? (
        <div className="rounded-3xl border border-white/50 bg-white/70 p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h3 className="text-base font-semibold text-zinc-900">No connectors yet</h3>
          <p className="mt-2 text-sm text-zinc-600 max-w-md mx-auto">OAuth into Notion, Slack, GitHub, Stripe — your agents inherit the access.</p>
        </div>
      ) : (
        groups.map((g) => (
          <section key={g}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 mb-3">{g}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {connectors.filter((c) => c.category === g).map((c) => (
                <div
                  key={c.id}
                  className="rounded-3xl border border-stone-200/70 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <header className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-zinc-900">{c.display_name}</h3>
                      {c.account && <div className="mt-0.5 text-xs text-zinc-500 truncate">{c.account}</div>}
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_PILL[c.status]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[c.status]}`} />
                      {STATUS_LABEL[c.status]}
                    </span>
                  </header>
                  {(c.status === "needs_reauth" || c.status === "error") && (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-[11px] font-medium text-zinc-700 hover:bg-stone-100"
                      >
                        Reconnect
                      </button>
                    </div>
                  )}
                  {c.status === "not_configured" && (
                    <div className="mt-4">
                      <button
                        type="button"
                        className="rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-zinc-700"
                      >
                        Connect
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
