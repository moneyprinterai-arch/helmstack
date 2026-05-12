import { AppTopbar } from "@/components/app-topbar";

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Settings" eyebrow="Workspace" />
      <main className="px-6 lg:px-10 py-8 space-y-5 max-w-[860px]">
        <section className="card p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Workspace</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[12px] text-[color:var(--fg-muted)]">Workspace name</span>
              <input defaultValue="Northwind Labs" className="mt-1.5 block w-full h-10 px-3 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[13.5px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]" />
            </label>
            <label className="block">
              <span className="text-[12px] text-[color:var(--fg-muted)]">Slug</span>
              <input defaultValue="northwind" className="mt-1.5 block w-full h-10 px-3 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[13.5px] font-mono outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]" />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[12px] text-[color:var(--fg-muted)]">Default timezone</span>
              <select className="mt-1.5 block w-full h-10 px-3 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[13.5px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]">
                <option>America/Los_Angeles</option>
                <option>America/New_York</option>
                <option>Europe/Oslo</option>
                <option>Europe/London</option>
                <option>Asia/Singapore</option>
              </select>
            </label>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">Approval routing</h2>
          <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1">Where Helmstack sends the "needs your eyes" pings.</p>
          <div className="mt-5 space-y-3">
            {[
              { label: "Slack — #helmstack-approvals", on: true },
              { label: "Email — ops@northwind.co", on: true },
              { label: "SMS — Mira's phone", on: false },
              { label: "PagerDuty — Eng on-call", on: false },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between border-t border-[color:var(--border)] pt-3 first:border-0 first:pt-0">
                <span className="text-[13.5px]">{r.label}</span>
                <span className={`inline-flex h-5 w-9 rounded-full p-0.5 ${r.on ? "bg-[color:var(--brand)]" : "bg-[color:var(--border-strong)]"}`}>
                  <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${r.on ? "translate-x-4" : ""}`} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-[15px] font-semibold tracking-tight">LLM providers</h2>
          <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1">Bring your own keys. Helmstack never sits in the inference path.</p>
          <div className="mt-5 space-y-3">
            {[
              { provider: "Anthropic", note: "Used by Ada, Mason", ok: true },
              { provider: "OpenAI", note: "Used by Ledger, Atlas", ok: true },
              { provider: "Google Vertex", note: "Not configured", ok: false },
            ].map((p) => (
              <div key={p.provider} className="flex items-center justify-between gap-3 border-t border-[color:var(--border)] pt-3 first:border-0 first:pt-0">
                <div>
                  <div className="text-[13.5px] font-medium">{p.provider}</div>
                  <div className="text-[11.5px] text-[color:var(--fg-subtle)]">{p.note}</div>
                </div>
                <button className="btn btn-secondary h-8 px-3 text-[12px]">{p.ok ? "Rotate key" : "Add key"}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-6 border-[color:var(--danger)]/30">
          <h2 className="text-[15px] font-semibold tracking-tight text-[color:var(--danger)]">Danger zone</h2>
          <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1">Delete the workspace and disconnect every agent. Cannot be undone.</p>
          <button className="btn btn-secondary mt-4 h-9 px-3.5 text-[12.5px] border-[color:var(--danger)]/40 text-[color:var(--danger)]">Delete workspace</button>
        </section>
      </main>
    </>
  );
}
