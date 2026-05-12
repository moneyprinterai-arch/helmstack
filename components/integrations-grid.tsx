const items = [
  { name: "Notion", group: "Docs", tone: "violet" },
  { name: "Google Drive", group: "Docs", tone: "amber" },
  { name: "Confluence", group: "Docs", tone: "sky" },
  { name: "Slack", group: "Messaging", tone: "violet" },
  { name: "Microsoft Teams", group: "Messaging", tone: "blue" },
  { name: "Gmail", group: "Messaging", tone: "red" },
  { name: "Outlook", group: "Messaging", tone: "blue" },
  { name: "GitHub", group: "Engineering", tone: "zinc" },
  { name: "GitLab", group: "Engineering", tone: "amber" },
  { name: "Linear", group: "Engineering", tone: "violet" },
  { name: "Jira", group: "Engineering", tone: "blue" },
  { name: "Stripe", group: "Money", tone: "violet" },
  { name: "QuickBooks", group: "Money", tone: "emerald" },
  { name: "HubSpot", group: "Sales", tone: "amber" },
  { name: "Salesforce", group: "Sales", tone: "sky" },
  { name: "Pipedrive", group: "Sales", tone: "emerald" },
  { name: "Calendly", group: "Calendar", tone: "sky" },
  { name: "Google Calendar", group: "Calendar", tone: "blue" },
  { name: "Zapier", group: "Ops", tone: "amber" },
  { name: "Make", group: "Ops", tone: "violet" },
  { name: "Postgres", group: "Data", tone: "sky" },
  { name: "BigQuery", group: "Data", tone: "blue" },
  { name: "Snowflake", group: "Data", tone: "sky" },
  { name: "S3", group: "Data", tone: "amber" },
] as const;

const TONE: Record<string, string> = {
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  zinc: "bg-stone-100 text-stone-700 border-stone-200",
};

export function IntegrationsGrid() {
  return (
    <section id="integrations" className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-2xl">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Integrations</div>
        <h2 className="mt-3 text-[32px] sm:text-[44px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
          The tools your team already runs.
        </h2>
        <p className="mt-4 text-base text-zinc-600 leading-relaxed">
          Connectors are first-class. OAuth once, scope per-agent, and let Helmstack handle refresh tokens, rate limits, and pagination.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div
            key={it.name}
            className="rounded-3xl border border-white/50 bg-white/65 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl flex items-center justify-between transition-all hover:bg-white/85"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`h-9 w-9 flex-none rounded-2xl border grid place-items-center text-[11px] font-bold ${TONE[it.tone]}`}>
                {it.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-zinc-900 leading-tight truncate">{it.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{it.group}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Plus a generic HTTP/Webhook connector and an SDK for the one that isn't listed.
      </p>
    </section>
  );
}
