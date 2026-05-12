import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getConnectors } from "@/lib/queries";

const statusStyle: Record<string, string> = {
  connected: "text-[color:var(--good)]",
  needs_reauth: "text-[color:var(--warn)]",
  error: "text-[color:var(--danger)]",
  not_configured: "text-[color:var(--fg-subtle)]",
};

const statusLabel: Record<string, string> = {
  connected: "Connected",
  needs_reauth: "Reauth needed",
  error: "Error",
  not_configured: "Not connected",
};

export default async function ConnectorsPage() {
  const workspace = await getWorkspace();
  const connectors = workspace ? await getConnectors(workspace.id) : [];
  const groups = Array.from(new Set(connectors.map((c) => c.category)));

  return (
    <>
      <AppTopbar title="Connectors" eyebrow="Integrations" />
      <main className="px-6 lg:px-10 py-8 space-y-8 max-w-[1320px]">
        <div className="card p-5 flex items-start gap-4">
          <span className="h-10 w-10 grid place-items-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)] flex-none">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 12h6 M6 12a3 3 0 110-6 3 3 0 010 6z M18 18a3 3 0 110-6 3 3 0 010 6z" /></svg>
          </span>
          <div className="flex-1">
            <div className="text-[13.5px] font-semibold tracking-tight">OAuth once, scope per-agent</div>
            <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1 leading-relaxed">
              Helmstack mints scoped tokens for each agent that uses a connector. Rotating credentials, paginating, and rate-limit backoff happen for you.
            </p>
          </div>
          <button type="button" className="btn btn-primary h-8 px-3 text-[12px]">Add connector</button>
        </div>

        {connectors.length === 0 ? (
          <div className="card p-10 text-center">
            <h3 className="text-[16px] font-semibold tracking-tight">No connectors yet</h3>
            <p className="mt-2 text-[13px] text-[color:var(--fg-muted)] max-w-md mx-auto">
              Connect Notion, Slack, GitHub, Stripe, and more — your agents inherit the access.
            </p>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium mb-3">{g}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {connectors.filter((c) => c.category === g).map((c) => (
                  <div key={c.id} className="card p-5 flex items-start gap-4">
                    <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-[color:var(--brand-soft)] to-[color:var(--surface-alt)] border border-[color:var(--border)] grid place-items-center text-[12px] font-semibold text-[color:var(--brand)] flex-none">
                      {c.display_name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[13.5px] font-semibold tracking-tight truncate">{c.display_name}</div>
                        <span className={`text-[11px] font-medium ${statusStyle[c.status]}`}>{statusLabel[c.status]}</span>
                      </div>
                      {c.account && <div className="text-[11.5px] text-[color:var(--fg-subtle)] mt-0.5 truncate">{c.account}</div>}
                      <div className="mt-3 flex items-center justify-end">
                        {c.status === "not_configured" ? (
                          <button type="button" className="btn btn-secondary h-7 px-2.5 text-[11px]">Connect</button>
                        ) : c.status === "needs_reauth" || c.status === "error" ? (
                          <button type="button" className="btn btn-primary h-7 px-2.5 text-[11px]">Reconnect</button>
                        ) : (
                          <button type="button" className="btn btn-ghost h-7 px-2.5 text-[11px]">Manage</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </>
  );
}
