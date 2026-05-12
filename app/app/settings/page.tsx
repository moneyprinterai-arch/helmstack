import { AppTopbar } from "@/components/app-topbar";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[860px] space-y-5 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar title="Settings" eyebrow="Workspace" />

      <section className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
        <h2 className="text-sm font-semibold text-zinc-900">Workspace</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Name</span>
            <input
              defaultValue="Northwind Labs"
              className="mt-1 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Slug</span>
            <input
              defaultValue="northwind"
              className="mt-1 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm font-mono outline-none focus:border-zinc-400"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Default timezone</span>
            <select className="mt-1 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400">
              <option>America/Los_Angeles</option>
              <option>America/New_York</option>
              <option>Europe/Oslo</option>
              <option>Europe/London</option>
              <option>Asia/Singapore</option>
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
        <h2 className="text-sm font-semibold text-zinc-900">Approval routing</h2>
        <p className="mt-1 text-xs text-zinc-500">Where Helmstack sends the "needs your eyes" pings.</p>
        <div className="mt-4 space-y-2">
          {[
            { label: "Slack — #helmstack-approvals", on: true },
            { label: "Email — ops@northwind.co", on: true },
            { label: "SMS — Mira's phone", on: false },
            { label: "PagerDuty — Eng on-call", on: false },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <span className="text-sm text-zinc-900">{r.label}</span>
              <span className={`inline-flex h-5 w-9 rounded-full p-0.5 ${r.on ? "bg-emerald-500" : "bg-stone-300"}`}>
                <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${r.on ? "translate-x-4" : ""}`} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
        <h2 className="text-sm font-semibold text-zinc-900">LLM providers</h2>
        <p className="mt-1 text-xs text-zinc-500">Bring your own keys. Helmstack never sits in the inference path.</p>
        <div className="mt-4 space-y-2">
          {[
            { provider: "Anthropic", note: "Used by Ada, Mason", ok: true },
            { provider: "OpenAI", note: "Used by Ledger, Atlas", ok: true },
            { provider: "Google Vertex", note: "Not configured", ok: false },
          ].map((p) => (
            <div key={p.provider} className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div>
                <div className="text-sm font-medium text-zinc-900">{p.provider}</div>
                <div className="text-[11px] text-zinc-500">{p.note}</div>
              </div>
              <button
                type="button"
                className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[11px] font-medium text-zinc-700 hover:bg-stone-50"
              >
                {p.ok ? "Rotate key" : "Add key"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-red-200/60 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
        <h2 className="text-sm font-semibold text-red-700">Danger zone</h2>
        <p className="mt-1 text-xs text-zinc-500">Delete the workspace and disconnect every agent. Cannot be undone.</p>
        <button
          type="button"
          className="mt-4 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
        >
          Delete workspace
        </button>
      </section>
    </div>
  );
}
