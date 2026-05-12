export type IntegrationMeta = {
  name: string;
  group: string;
  src: string; // Full <img src> URL. Mix of Simple Icons + Google favicon fallback.
};

// Simple Icons URL builder. They serve brand-colored SVGs.
const si = (slug: string, color: string): string =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

// Google s2 favicon fallback — used for brands Simple Icons has removed
// (Slack, Microsoft products, Salesforce, Pipedrive, S3, etc.).
const fv = (domain: string): string =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const INTEGRATIONS: ReadonlyArray<IntegrationMeta> = [
  { name: "Notion", group: "Docs", src: si("notion", "000000") },
  { name: "Google Drive", group: "Docs", src: si("googledrive", "4285F4") },
  { name: "Confluence", group: "Docs", src: si("confluence", "172B4D") },

  { name: "Slack", group: "Messaging", src: fv("slack.com") },
  { name: "Microsoft Teams", group: "Messaging", src: fv("teams.microsoft.com") },
  { name: "Gmail", group: "Messaging", src: si("gmail", "EA4335") },
  { name: "Outlook", group: "Messaging", src: fv("outlook.com") },

  { name: "GitHub", group: "Engineering", src: si("github", "181717") },
  { name: "GitLab", group: "Engineering", src: si("gitlab", "FC6D26") },
  { name: "Linear", group: "Engineering", src: si("linear", "5E6AD2") },
  { name: "Jira", group: "Engineering", src: si("jira", "0052CC") },

  { name: "Stripe", group: "Money", src: si("stripe", "635BFF") },
  { name: "QuickBooks", group: "Money", src: si("quickbooks", "2CA01C") },

  { name: "HubSpot", group: "Sales", src: si("hubspot", "FF7A59") },
  { name: "Salesforce", group: "Sales", src: fv("salesforce.com") },
  { name: "Pipedrive", group: "Sales", src: fv("pipedrive.com") },

  { name: "Calendly", group: "Calendar", src: si("calendly", "006BFF") },
  { name: "Google Calendar", group: "Calendar", src: si("googlecalendar", "4285F4") },

  { name: "Zapier", group: "Ops", src: si("zapier", "FF4A00") },
  { name: "Make", group: "Ops", src: si("make", "6D00CC") },

  { name: "Postgres", group: "Data", src: si("postgresql", "4169E1") },
  { name: "BigQuery", group: "Data", src: si("googlebigquery", "669DF6") },
  { name: "Snowflake", group: "Data", src: si("snowflake", "29B5E8") },
  { name: "S3", group: "Data", src: fv("aws.amazon.com") },
];

// Map DB provider keys (and a few aliases) to a meta entry.
const PROVIDER_ALIAS: Record<string, string> = {
  notion: "Notion",
  drive: "Google Drive",
  googledrive: "Google Drive",
  confluence: "Confluence",
  slack: "Slack",
  teams: "Microsoft Teams",
  microsoftteams: "Microsoft Teams",
  gmail: "Gmail",
  outlook: "Outlook",
  microsoftoutlook: "Outlook",
  github: "GitHub",
  gitlab: "GitLab",
  linear: "Linear",
  jira: "Jira",
  stripe: "Stripe",
  qb: "QuickBooks",
  quickbooks: "QuickBooks",
  hubspot: "HubSpot",
  salesforce: "Salesforce",
  pipedrive: "Pipedrive",
  calendly: "Calendly",
  googlecalendar: "Google Calendar",
  zapier: "Zapier",
  make: "Make",
  postgres: "Postgres",
  postgresql: "Postgres",
  bigquery: "BigQuery",
  snowflake: "Snowflake",
  s3: "S3",
  amazons3: "S3",
};

const BY_NAME = new Map(INTEGRATIONS.map((i) => [i.name, i]));

export function metaFor(key: string | null | undefined): IntegrationMeta | null {
  if (!key) return null;
  const k = key.toLowerCase().replace(/\s+/g, "");
  const name = PROVIDER_ALIAS[k];
  if (name) return BY_NAME.get(name) ?? null;
  for (const [n, m] of BY_NAME) {
    if (n.toLowerCase() === key.toLowerCase()) return m;
  }
  return null;
}
