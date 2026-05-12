import { AppTopbar } from "@/components/app-topbar";

const items = [
  { title: "Northwind brand voice", agent: "Ada", updated: "2 days ago", kind: "Pinned fact" },
  { title: "Refund policy v3", agent: "Ledger", updated: "1 week ago", kind: "Policy" },
  { title: "Engineering style guide", agent: "Mason", updated: "3 weeks ago", kind: "Reference" },
  { title: "Support macros 2026-Q2", agent: "Iris", updated: "yesterday", kind: "Snippet pack" },
  { title: "Vendor contacts directory", agent: "Ada", updated: "today", kind: "Directory" },
  { title: "Board prep checklist", agent: "Ada", updated: "1 month ago", kind: "Checklist" },
];

export default function KnowledgePage() {
  return (
    <>
      <AppTopbar title="Knowledge" eyebrow="Shared memory" />
      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="card p-6">
            <h3 className="text-[15px] font-semibold tracking-tight">Pinned facts</h3>
            <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1">Things every agent should know about your business. Scoped per-agent if needed.</p>
            <ul className="mt-5 space-y-2">
              {items.map((it) => (
                <li key={it.title} className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-3.5 hover:bg-[color:var(--surface)] transition-colors">
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium truncate">{it.title}</div>
                    <div className="text-[11.5px] text-[color:var(--fg-subtle)] mt-0.5">{it.kind} · used by {it.agent} · updated {it.updated}</div>
                  </div>
                  <button className="btn btn-ghost h-7 px-2.5 text-[11px]">Open</button>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-4">
            <div className="card p-6">
              <h3 className="text-[14px] font-semibold tracking-tight">Sources</h3>
              <div className="mt-4 space-y-3 text-[13px]">
                {[
                  { name: "Notion", count: "1,284 pages indexed", ok: true },
                  { name: "Google Drive", count: "612 files indexed", ok: true },
                  { name: "Confluence", count: "Not connected", ok: false },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="text-[color:var(--fg)]">{s.name}</span>
                    <span className={s.ok ? "text-[color:var(--fg-muted)]" : "text-[color:var(--fg-subtle)]"}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="text-[14px] font-semibold tracking-tight">Add a fact</h3>
              <textarea
                rows={4}
                placeholder="Q3 board meeting is on September 14, not 7."
                className="mt-3 w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] p-3 text-[13px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)] resize-none"
              />
              <button className="btn btn-primary w-full h-9 mt-3 text-[13px]">Pin to fleet memory</button>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
