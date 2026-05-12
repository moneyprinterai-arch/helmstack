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
    features: ["1 connected agent", "Up to 3 connectors", "30-day activity log", "Email approvals", "Community Discord"],
  },
  {
    name: "Team",
    price: "$49",
    cadence: "per seat / mo",
    desc: "When the side project becomes a real fleet. Bring your colleagues onto the deck.",
    cta: "Start 14-day trial",
    href: "/signup?plan=team",
    featured: true,
    features: ["Up to 25 agents", "Unlimited connectors", "90-day activity log", "Slack & email approvals", "Role-based access", "Audit log export", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "let's talk",
    desc: "Self-hosted or VPC, SSO, audit, custom retention, dedicated support.",
    cta: "Talk to sales",
    href: "mailto:sales@helmstack.ai",
    featured: false,
    features: ["Unlimited agents", "SAML SSO + SCIM", "Self-hosted or VPC", "Custom data retention", "Bring-your-own LLM provider", "Dedicated security review", "99.95% SLA"],
  },
];

export default function PricingPage() {
  return (
    <>
      <MarketingNav />
      <main className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Pricing</div>
          <h1 className="mt-3 text-[40px] sm:text-[56px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
            Pay per seat. Not per call.
          </h1>
          <p className="mt-5 text-base text-zinc-600 leading-relaxed">
            Helmstack charges for the humans on the deck — not the agents you connect, the tools you wire up, or the runs they make.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl border bg-white/70 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl ${t.featured ? "border-zinc-900/20 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.2),0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]" : "border-white/50"}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-700">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
                  Most teams pick this
                </span>
              )}
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{t.name}</div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-[44px] font-bold tracking-tight text-zinc-900 leading-none">{t.price}</span>
                <span className="text-sm text-zinc-500">{t.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{t.desc}</p>
              <Link
                href={t.href}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium ${t.featured ? "bg-zinc-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:bg-zinc-700" : "border border-white/50 bg-white/70 text-zinc-900 backdrop-blur-xl hover:bg-white/95"}`}
              >
                {t.cta}
              </Link>
              <ul className="mt-7 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span className="text-zinc-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-3xl rounded-3xl border border-white/50 bg-white/70 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <h2 className="text-base font-semibold text-zinc-900">Frequently asked</h2>
          <dl className="mt-6 space-y-6 text-sm">
            <div>
              <dt className="font-medium text-zinc-900">What counts as an "agent"?</dt>
              <dd className="mt-1.5 text-zinc-600">A distinct workspace or runtime registered with Helmstack — a Claude Code instance, an OpenAI Assistant, a homegrown HTTP worker. Multi-skill agents count once.</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900">Do you charge per LLM call?</dt>
              <dd className="mt-1.5 text-zinc-600">No. You bring your own LLM provider keys. Helmstack never sits in the inference path unless you ask it to.</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900">Is there a free tier for hobby projects?</dt>
              <dd className="mt-1.5 text-zinc-600">Yes — Solo is free forever for one agent, no credit card required.</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-900">Can I self-host?</dt>
              <dd className="mt-1.5 text-zinc-600">On Enterprise, yes. You get a Helm chart, a Terraform module, and a real engineer on speed dial.</dd>
            </div>
          </dl>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
