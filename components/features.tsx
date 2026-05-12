const features = [
  {
    title: "Unified fleet view",
    body: "See every agent across every runtime in one place. Status, last activity, what they're working on, what they cost — without tab-hopping.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: "Approvals that actually work",
    body: "High-stakes actions pause for a human. Triage from a single inbox, approve with context, reply with a note. Audit log included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Connectors, not API keys",
    body: "Wire up Notion, Slack, Drive, Stripe, GitHub, Linear, Gmail, and dozens more once. Every agent on your team inherits the access it needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Scheduling & triggers",
    body: "Cron, webhooks, file drops, calendar events. Wake your agents on the right signal — and put them back to sleep when they're done.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Memory & knowledge",
    body: "Shared, scoped, and audited. Pin facts, share docs, hand context between agents without leaking it to the wrong workspace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4z" />
        <path d="M4 10h16" />
        <path d="M8 14h4" />
      </svg>
    ),
  },
  {
    title: "Observability built in",
    body: "Every action, every prompt, every dollar. Filter by agent, runtime, connector, or outcome. Export to your warehouse on a click.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-8 4 16 3-8h4" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="product" className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-2xl">
        <div className="section-eyebrow"><span className="dot" />The platform</div>
        <h2 className="hero-h1 mt-4 text-[32px] sm:text-[44px] text-[color:var(--fg)]">
          Six primitives. Every fleet runs on them.
        </h2>
        <p className="mt-4 text-[16px] text-[color:var(--fg-muted)] leading-relaxed">
          Helmstack is not another agent framework. It is the operations layer the framework forgot — the parts you end up writing twice and never quite finishing.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-6 hover:card-lift transition-shadow">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--brand-soft)] text-[color:var(--brand)]">
              {f.icon}
            </div>
            <h3 className="mt-5 text-[17px] font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-[14px] text-[color:var(--fg-muted)] leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
