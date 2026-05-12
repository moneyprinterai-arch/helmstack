import Link from "next/link";
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing for agent fleets. Start free, scale when you're ready.",
};

const tiers = [
  {
    name: "Solo",
    price: "$0",
    cadence: "forever",
    desc: "Run a single agent for your own work. Everything except the bigger fleet limits.",
    cta: "Start free",
    href: "/signup",
    featured: false,
    features: [
      "1 connected agent",
      "Up to 3 connectors",
      "30-day activity log",
      "Email approvals",
      "Community Discord",
    ],
  },
  {
    name: "Team",
    price: "$49",
    cadence: "per seat / mo",
    desc: "When the side project becomes a real fleet. Bring your colleagues onto the deck.",
    cta: "Start 14-day trial",
    href: "/signup?plan=team",
    featured: true,
    features: [
      "Up to 25 agents",
      "Unlimited connectors",
      "90-day activity log",
      "Slack & email approvals",
      "Role-based access",
      "Audit log export",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "let's talk",
    desc: "Self-hosted or VPC, SSO, audit, custom retention, dedicated support.",
    cta: "Talk to sales",
    href: "mailto:sales@helmstack.ai",
    featured: false,
    features: [
      "Unlimited agents",
      "SAML SSO + SCIM",
      "Self-hosted or VPC",
      "Custom data retention",
      "Bring-your-own LLM provider",
      "Dedicated security review",
      "99.95% SLA",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <MarketingNav />
      <main className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-eyebrow justify-center"><span className="dot" />Pricing</div>
          <h1 className="hero-h1 mt-4 text-[40px] sm:text-[60px]">
            Pay per seat. Not per call.
          </h1>
          <p className="mt-5 text-[17px] text-[color:var(--fg-muted)] leading-relaxed">
            Helmstack charges for the humans on the deck — not the agents you connect, the tools you wire up, or the runs they make.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative card p-8 ${t.featured ? "card-lift border-[color:var(--brand)]/40" : ""}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 chip chip-brand">
                  <span className="dot text-[color:var(--brand)] pulse-dot" />
                  Most teams pick this
                </span>
              )}
              <div className="text-[13px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="hero-h1 text-[44px]">{t.price}</span>
                <span className="text-sm text-[color:var(--fg-subtle)]">{t.cadence}</span>
              </div>
              <p className="mt-3 text-[14px] text-[color:var(--fg-muted)] leading-relaxed">{t.desc}</p>
              <Link
                href={t.href}
                className={`mt-6 btn w-full ${t.featured ? "btn-primary" : "btn-secondary"}`}
              >
                {t.cta}
              </Link>
              <ul className="mt-7 space-y-2.5 text-[14px] text-[color:var(--fg)]">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none text-[color:var(--brand)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="text-[color:var(--fg-muted)]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 card p-8 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold tracking-tight">Frequently asked</h2>
          <dl className="mt-6 space-y-6 text-sm">
            <div>
              <dt className="font-medium text-[color:var(--fg)]">What counts as an "agent"?</dt>
              <dd className="mt-1.5 text-[color:var(--fg-muted)]">A distinct workspace or runtime registered with Helmstack — a Claude Code instance, an OpenAI Assistant, a homegrown HTTP worker. Multi-skill agents count once.</dd>
            </div>
            <div>
              <dt className="font-medium text-[color:var(--fg)]">Do you charge per LLM call?</dt>
              <dd className="mt-1.5 text-[color:var(--fg-muted)]">No. You bring your own LLM provider keys. Helmstack never sits in the inference path unless you ask it to.</dd>
            </div>
            <div>
              <dt className="font-medium text-[color:var(--fg)]">Is there a free tier for hobby projects?</dt>
              <dd className="mt-1.5 text-[color:var(--fg-muted)]">Yes — Solo is free forever for one agent, no credit card required.</dd>
            </div>
            <div>
              <dt className="font-medium text-[color:var(--fg)]">Can I self-host?</dt>
              <dd className="mt-1.5 text-[color:var(--fg-muted)]">On Enterprise, yes. You get a Helm chart, a Terraform module, and a real engineer on speed dial.</dd>
            </div>
          </dl>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
