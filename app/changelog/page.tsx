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
    tone: "violet",
    title: "Helmstack enters private beta",
    body: "The first version of the deck ships to a handful of design partners. Connect Claude Code, OpenAI, and custom HTTP agents. Approvals, connectors, and audit log included.",
  },
  {
    date: "Apr 28, 2026",
    tag: "Feature",
    tone: "emerald",
    title: "Morning Brief",
    body: "Each operator gets a 90-second written summary of what the fleet did overnight — what shipped, what blocked, what needs you.",
  },
  {
    date: "Apr 15, 2026",
    tag: "Integration",
    tone: "sky",
    title: "Stripe, QuickBooks, HubSpot",
    body: "Three new first-class connectors with scoped tokens and per-agent permissions. Refund flows are guarded by approvals out of the box.",
  },
  {
    date: "Mar 30, 2026",
    tag: "Platform",
    tone: "amber",
    title: "Self-hosted alpha",
    body: "Run Helmstack inside your own VPC. Helm chart and Terraform module available to Enterprise design partners.",
  },
];

const TAG_TONE: Record<string, string> = {
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  sky: "bg-sky-50 text-sky-700 border-sky-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function ChangelogPage() {
  return (
    <>
      <MarketingNav />
      <main className="mx-auto max-w-[840px] px-5 sm:px-8 py-20 sm:py-28">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Changelog</div>
          <h1 className="mt-3 text-[40px] sm:text-[52px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
            What's shipped.
          </h1>
          <p className="mt-4 text-base text-zinc-600">
            Honest notes. No "various improvements and bug fixes." If we shipped something boring, we still tell you what it was.
          </p>
        </div>

        <ol className="mt-14 space-y-4">
          {entries.map((e) => (
            <li
              key={e.title}
              className="rounded-3xl border border-white/50 bg-white/70 p-7 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span>{e.date}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${TAG_TONE[e.tone]}`}>{e.tag}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-900">{e.title}</h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{e.body}</p>
            </li>
          ))}
        </ol>
      </main>
      <MarketingFooter />
    </>
  );
}
