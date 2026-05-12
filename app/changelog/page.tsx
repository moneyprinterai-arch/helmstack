import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's shipped in Helmstack.",
};

const entries = [
  {
    date: "May 12, 2026",
    tag: "Launch",
    title: "Helmstack enters private beta",
    body: "The first version of the deck ships to a handful of design partners. Connect Claude Code, OpenAI, and custom HTTP agents. Approvals, connectors, and audit log included.",
  },
  {
    date: "Apr 28, 2026",
    tag: "Feature",
    title: "Morning Brief",
    body: "Each operator gets a 90-second written summary of what the fleet did overnight — what shipped, what blocked, what needs you. Beats reading the audit log with coffee.",
  },
  {
    date: "Apr 15, 2026",
    tag: "Integration",
    title: "Stripe, QuickBooks, HubSpot",
    body: "Three new first-class connectors with scoped tokens and per-agent permissions. Refund flows are guarded by approvals out of the box.",
  },
  {
    date: "Mar 30, 2026",
    tag: "Platform",
    title: "Self-hosted alpha",
    body: "Run Helmstack inside your own VPC. Helm chart and Terraform module available to Enterprise design partners.",
  },
];

export default function ChangelogPage() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <MarketingNav />
      <main className="mx-auto max-w-[840px] px-5 sm:px-8 py-20 sm:py-28">
        <div>
          <div className="section-eyebrow"><span className="dot" />Changelog</div>
          <h1 className="hero-h1 mt-4 text-[40px] sm:text-[56px]">What's shipped.</h1>
          <p className="mt-4 text-[16px] text-[color:var(--fg-muted)]">
            Honest notes. No "various improvements and bug fixes." If we shipped something boring, we still tell you what it was.
          </p>
        </div>

        <ol className="mt-14 space-y-5">
          {entries.map((e) => (
            <li key={e.title} className="card p-7">
              <div className="flex items-center gap-3 text-[12px] text-[color:var(--fg-subtle)]">
                <span>{e.date}</span>
                <span className="chip chip-brand">{e.tag}</span>
              </div>
              <h2 className="mt-3 text-[20px] font-semibold tracking-tight">{e.title}</h2>
              <p className="mt-2 text-[14.5px] text-[color:var(--fg-muted)] leading-relaxed">{e.body}</p>
            </li>
          ))}
        </ol>
      </main>
      <MarketingFooter />
    </>
  );
}
