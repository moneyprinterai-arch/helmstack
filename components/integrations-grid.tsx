const items = [
  { name: "Notion", group: "Docs" },
  { name: "Google Drive", group: "Docs" },
  { name: "Confluence", group: "Docs" },
  { name: "Slack", group: "Messaging" },
  { name: "Microsoft Teams", group: "Messaging" },
  { name: "Gmail", group: "Messaging" },
  { name: "Outlook", group: "Messaging" },
  { name: "GitHub", group: "Engineering" },
  { name: "GitLab", group: "Engineering" },
  { name: "Linear", group: "Engineering" },
  { name: "Jira", group: "Engineering" },
  { name: "Stripe", group: "Money" },
  { name: "QuickBooks", group: "Money" },
  { name: "HubSpot", group: "Sales" },
  { name: "Salesforce", group: "Sales" },
  { name: "Pipedrive", group: "Sales" },
  { name: "Calendly", group: "Calendar" },
  { name: "Google Calendar", group: "Calendar" },
  { name: "Zapier", group: "Ops" },
  { name: "Make", group: "Ops" },
  { name: "Postgres", group: "Data" },
  { name: "BigQuery", group: "Data" },
  { name: "Snowflake", group: "Data" },
  { name: "S3", group: "Data" },
];

export function IntegrationsGrid() {
  return (
    <section id="integrations" className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-2xl">
        <div className="section-eyebrow"><span className="dot" />Integrations</div>
        <h2 className="hero-h1 mt-4 text-[32px] sm:text-[44px]">
          The tools your team already runs.
        </h2>
        <p className="mt-4 text-[16px] text-[color:var(--fg-muted)] leading-relaxed">
          Connectors are first-class. OAuth once, scope per-agent, and let Helmstack handle refresh tokens, rate limits, and pagination.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.name} className="card flex items-center justify-between p-4 hover:border-[color:var(--border-strong)] transition-colors">
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 rounded-lg bg-gradient-to-br from-[color:var(--brand-soft)] to-[color:var(--surface-alt)] border border-[color:var(--border)] grid place-items-center text-[12px] font-semibold text-[color:var(--brand)]">
                {it.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <div className="text-[13.5px] font-medium leading-tight">{it.name}</div>
                <div className="text-[11px] text-[color:var(--fg-subtle)]">{it.group}</div>
              </div>
            </div>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--fg-subtle)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-[color:var(--fg-subtle)]">
        Plus a generic HTTP/Webhook connector and an SDK for the one that isn't listed.
      </p>
    </section>
  );
}
