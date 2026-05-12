export type IntegrationMeta = {
  name: string;
  slug: string;
  color: string;
  group: string;
};

// Simple Icons slug + brand hex (no #). Drives both marketing and app surfaces.
export const INTEGRATIONS: ReadonlyArray<IntegrationMeta> = [
  { name: "Notion", slug: "notion", color: "000000", group: "Docs" },
  { name: "Google Drive", slug: "googledrive", color: "4285F4", group: "Docs" },
  { name: "Confluence", slug: "confluence", color: "172B4D", group: "Docs" },

  { name: "Slack", slug: "slack", color: "4A154B", group: "Messaging" },
  { name: "Microsoft Teams", slug: "microsoftteams", color: "6264A7", group: "Messaging" },
  { name: "Gmail", slug: "gmail", color: "EA4335", group: "Messaging" },
  { name: "Outlook", slug: "microsoftoutlook", color: "0078D4", group: "Messaging" },

  { name: "GitHub", slug: "github", color: "181717", group: "Engineering" },
  { name: "GitLab", slug: "gitlab", color: "FC6D26", group: "Engineering" },
  { name: "Linear", slug: "linear", color: "5E6AD2", group: "Engineering" },
  { name: "Jira", slug: "jira", color: "0052CC", group: "Engineering" },

  { name: "Stripe", slug: "stripe", color: "635BFF", group: "Money" },
  { name: "QuickBooks", slug: "quickbooks", color: "2CA01C", group: "Money" },

  { name: "HubSpot", slug: "hubspot", color: "FF7A59", group: "Sales" },
  { name: "Salesforce", slug: "salesforce", color: "00A1E0", group: "Sales" },
  { name: "Pipedrive", slug: "pipedrive", color: "1A1A1A", group: "Sales" },

  { name: "Calendly", slug: "calendly", color: "006BFF", group: "Calendar" },
  { name: "Google Calendar", slug: "googlecalendar", color: "4285F4", group: "Calendar" },

  { name: "Zapier", slug: "zapier", color: "FF4A00", group: "Ops" },
  { name: "Make", slug: "make", color: "6D00CC", group: "Ops" },

  { name: "Postgres", slug: "postgresql", color: "4169E1", group: "Data" },
  { name: "BigQuery", slug: "googlebigquery", color: "669DF6", group: "Data" },
  { name: "Snowflake", slug: "snowflake", color: "29B5E8", group: "Data" },
  { name: "S3", slug: "amazons3", color: "569A31", group: "Data" },
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
  // try direct name match (case-insensitive)
  for (const [n, m] of BY_NAME) {
    if (n.toLowerCase() === key.toLowerCase()) return m;
  }
  return null;
}

export function logoUrl(meta: IntegrationMeta, size = 32): string {
  // Simple Icons CDN — free, no key, SVG. Color appended as hex (no #).
  return `https://cdn.simpleicons.org/${meta.slug}/${meta.color}?size=${size}`;
}
