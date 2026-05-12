const runtimes = [
  "Claude Code",
  "OpenAI Agents",
  "LangGraph",
  "CrewAI",
  "AutoGen",
  "Cursor Agents",
  "Codex CLI",
  "Custom HTTP",
];

export function LogoCloud() {
  return (
    <section className="border-y border-[color:var(--border)] bg-[color:var(--bg-soft)]/60">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-10">
        <p className="text-center text-[11px] uppercase tracking-[0.22em] text-[color:var(--fg-subtle)]">
          Connects to every agent runtime
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-[color:var(--fg-muted)]">
          {runtimes.map((r) => (
            <span
              key={r}
              className="font-medium tracking-tight opacity-70 hover:opacity-100 transition-opacity"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
