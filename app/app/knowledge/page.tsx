import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getKnowledge, relativeTime } from "@/lib/queries";
import { addKnowledge } from "@/app/app/actions";

export default async function KnowledgePage() {
  const workspace = await getWorkspace();
  const items = workspace ? await getKnowledge(workspace.id) : [];

  return (
    <>
      <AppTopbar title="Knowledge" eyebrow="Shared memory" />
      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-[1240px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <div className="card p-6">
            <h3 className="text-[15px] font-semibold tracking-tight">Pinned facts</h3>
            <p className="text-[12.5px] text-[color:var(--fg-muted)] mt-1">Things every agent should know about your business. Scoped per-agent if needed.</p>
            {items.length === 0 ? (
              <p className="mt-6 text-[13px] text-[color:var(--fg-muted)]">Nothing pinned yet. Add a fact from the panel on the right.</p>
            ) : (
              <ul className="mt-5 space-y-2">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-soft)]/40 p-3.5 hover:bg-[color:var(--surface)] transition-colors">
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium truncate">{it.title}</div>
                      <div className="text-[11.5px] text-[color:var(--fg-subtle)] mt-0.5 truncate">
                        {it.kind}{it.agent ? ` · used by ${it.agent.name}` : ""} · updated {relativeTime(it.updated_at)}
                      </div>
                    </div>
                    <button type="button" className="btn btn-ghost h-7 px-2.5 text-[11px]">Open</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="space-y-4">
            <div className="card p-6">
              <h3 className="text-[14px] font-semibold tracking-tight">Add a fact</h3>
              <form action={addKnowledge} className="mt-3 space-y-3">
                <input type="hidden" name="workspace_id" value={workspace?.id ?? ""} />
                <input
                  name="title"
                  placeholder="Short title (e.g. Q3 board meeting moved)"
                  required
                  className="w-full h-10 px-3 rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[13px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)]"
                />
                <textarea
                  name="body"
                  rows={4}
                  placeholder="Details. Agents read this when relevant."
                  className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--surface)] p-3 text-[13px] outline-none focus:border-[color:var(--brand)] focus:ring-4 focus:ring-[color:var(--brand-ring)] resize-none"
                />
                <button type="submit" className="btn btn-primary w-full h-9 text-[13px]">Pin to fleet memory</button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
