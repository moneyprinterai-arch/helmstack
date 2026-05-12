import { AppTopbar } from "@/components/app-topbar";
import { getWorkspace, getKnowledge, relativeTime } from "@/lib/queries";
import { addKnowledge } from "@/app/app/actions";

export default async function KnowledgePage() {
  const workspace = await getWorkspace();
  const items = workspace ? await getKnowledge(workspace.id) : [];

  return (
    <div className="mx-auto max-w-[1240px] space-y-7 px-5 py-6 sm:px-8 sm:py-8">
      <AppTopbar title="Knowledge" eyebrow="Shared memory" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <section className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-zinc-900">Pinned facts</h2>
          <p className="mt-1 text-xs text-zinc-500">Things every agent should know about your business. Scoped per-agent if needed.</p>
          {items.length === 0 ? (
            <div className="mt-4 rounded-2xl bg-white px-4 py-8 text-center text-sm text-zinc-500">Nothing pinned yet.</div>
          ) : (
            <ul className="mt-4 space-y-2">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="rounded-2xl bg-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-zinc-900 truncate">{it.title}</div>
                      <div className="mt-0.5 text-[11px] text-zinc-500">
                        <span className="rounded-full border border-stone-200 bg-stone-50 px-1.5 py-0 font-medium text-zinc-600">{it.kind}</span>
                        {it.agent && <span className="ml-2">used by {it.agent.name}</span>}
                        <span className="ml-2 text-zinc-400">updated {relativeTime(it.updated_at)}</span>
                      </div>
                      {it.body && <div className="mt-1.5 text-xs text-zinc-600 line-clamp-2">{it.body}</div>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h2 className="text-sm font-semibold text-zinc-900">Add a fact</h2>
          <form action={addKnowledge} className="mt-3 space-y-2">
            <input type="hidden" name="workspace_id" value={workspace?.id ?? ""} />
            <input
              name="title"
              required
              placeholder="Q3 board meeting moved to Sep 14"
              className="w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            />
            <textarea
              name="body"
              rows={4}
              placeholder="Details. Agents read this when relevant."
              className="w-full resize-none rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:bg-zinc-700"
            >
              Pin to fleet memory
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
