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
    <section className="relative border-y border-[color:var(--border)] bg-[color:var(--bg-soft)]/50">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div className="lg:sticky lg:top-28 self-start">
            <div className="section-eyebrow"><span className="dot" />How it works</div>
            <h2 className="hero-h1 mt-4 text-[32px] sm:text-[44px]">
              From scattered scripts to a real ops team — in an afternoon.
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--fg-muted)] leading-relaxed">
              The agents you already wrote are good. They just need a deck to run from, a way to ask for help, and a manager that doesn't sleep.
            </p>
          </div>
          <ol className="space-y-3">
            {steps.map((s) => (
              <li key={s.n} className="card p-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-[color:var(--brand)] tracking-widest">{s.n}</span>
                  <h3 className="text-[18px] font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-3 ml-[3.4rem] text-[14px] text-[color:var(--fg-muted)] leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
