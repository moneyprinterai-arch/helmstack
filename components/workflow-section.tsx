const steps = [
  {
    n: "01",
    title: "Connect a runtime",
    body: "Drop in your API key, point at your local Claude Code agent, or paste a webhook. Helmstack adopts it without changing how the agent runs.",
  },
  {
    n: "02",
    title: "Wire your tools once",
    body: "OAuth into Notion, Slack, Stripe, GitHub and a dozen more. Scoped access keys are minted per-agent and rotated automatically.",
  },
  {
    n: "03",
    title: "Set the rules",
    body: "Define what each agent can do unattended, what pauses for review, and who gets paged. Codify your team's instincts.",
  },
  {
    n: "04",
    title: "Run the deck",
    body: "Watch the fleet. Approve the work. Ship the outcomes. Replay the audit log when someone asks how the agent knew that.",
  },
];

export function WorkflowSection() {
  return (
    <section className="relative border-y border-white/40 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div className="lg:sticky lg:top-28 self-start">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">How it works</div>
            <h2 className="mt-3 text-[32px] sm:text-[44px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
              From scattered scripts to a real ops team — in an afternoon.
            </h2>
            <p className="mt-4 text-[15px] text-zinc-600 leading-relaxed">
              The agents you already wrote are good. They just need a deck to run from, a way to ask for help, and a manager that doesn't sleep.
            </p>
          </div>
          <ol className="space-y-3">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-3xl border border-white/50 bg-white/65 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-zinc-400 tracking-widest">{s.n}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900">{s.title}</h3>
                </div>
                <p className="mt-3 ml-[3.4rem] text-sm text-zinc-600 leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
