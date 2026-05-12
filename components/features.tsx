const features = [
  {
    title: "Unified fleet view",
    body: "See every agent across every runtime in one place. Status, last activity, what they're working on, what they cost — without tab-hopping.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
      </svg>
    ),
  },
  {
    title: "Approvals that actually work",
    body: "High-stakes actions pause for a human. Triage from one inbox, approve with context, reply with a note. Audit log included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 3.5h6v3h-6z" />
        <path d="M9.5 13l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    title: "Connectors, not API keys",
    body: "Wire up Notion, Slack, Drive, Stripe, GitHub, Linear, Gmail, and dozens more once. Every agent on your team inherits the access it needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="3" y="9" width="6" height="6" rx="1.5" />
        <rect x="15" y="9" width="6" height="6" rx="1.5" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    title: "Scheduling & triggers",
    body: "Cron, webhooks, file drops, calendar events. Wake your agents on the right signal — and put them back to sleep when they're done.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 9v4l2.5 2" />
        <path d="M9 3h6" />
      </svg>
    ),
  },
  {
    title: "Memory & knowledge",
    body: "Shared, scoped, and audited. Pin facts, share docs, hand context between agents without leaking it to the wrong workspace.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M5 4h11l3 3v13H5z" />
        <path d="M8 4v4h8" />
        <path d="M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: "Observability built in",
    body: "Every action, every prompt, every dollar. Filter by agent, runtime, connector, or outcome. Export to your warehouse on a click.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M3 12h3.5l2.5-7 4 14 2.5-7H21" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="product" className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-2xl">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">The platform</div>
        <h2 className="mt-3 text-[32px] sm:text-[44px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
          Six primitives. Every fleet runs on them.
        </h2>
        <p className="mt-4 text-base text-zinc-600 leading-relaxed">
          Helmstack is not another agent framework. It is the operations layer the framework forgot — the parts you end up writing twice and never quite finishing.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl border border-white/50 bg-white/65 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all hover:bg-white/85 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/70 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              {f.icon}
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900">{f.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
