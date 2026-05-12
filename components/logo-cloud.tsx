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
    <section className="border-y border-white/40 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-10">
        <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Connects to every agent runtime
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-600">
          {runtimes.map((r) => (
            <span key={r} className="font-medium tracking-tight">{r}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
