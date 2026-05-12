import Link from "next/link";
import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export const metadata: Metadata = {
  title: "Docs",
  description: "Helmstack documentation — quickstart, SDK, API reference.",
};

const sections = [
  {
    title: "Getting started",
    items: [
      { href: "/docs/quickstart", label: "Quickstart", desc: "Connect your first agent in under 10 minutes." },
      { href: "/docs/concepts", label: "Core concepts", desc: "Fleet, agent, runtime, connector, approval." },
      { href: "/docs/install", label: "Install the CLI", desc: "macOS, Linux, Windows. One curl away." },
    ],
  },
  {
    title: "Connect a runtime",
    items: [
      { href: "/docs/runtimes/claude-code", label: "Claude Code", desc: "Adopt your local CC agent without changing it." },
      { href: "/docs/runtimes/openai", label: "OpenAI Agents SDK", desc: "Bring an Assistants API agent." },
      { href: "/docs/runtimes/http", label: "Custom HTTP", desc: "Anything that speaks HTTP — Helmstack listens." },
    ],
  },
  {
    title: "Reference",
    items: [
      { href: "/docs/api", label: "REST API", desc: "Programmatic control of your fleet." },
      { href: "/docs/sdk", label: "TypeScript SDK", desc: "First-class types and event streams." },
      { href: "/docs/webhooks", label: "Webhooks", desc: "React to approvals, dispatches, errors." },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <div className="mesh-bg" aria-hidden />
      <MarketingNav />
      <main className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <div className="section-eyebrow"><span className="dot" />Documentation</div>
          <h1 className="hero-h1 mt-4 text-[40px] sm:text-[56px]">
            Build with Helmstack.
          </h1>
          <p className="mt-5 text-[17px] text-[color:var(--fg-muted)] leading-relaxed">
            These docs are for operators and engineers. Short on prose, heavy on examples. Run the snippets — they're tested.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <div key={s.title} className="card p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--brand)] font-medium">{s.title}</div>
              <ul className="mt-5 space-y-3.5">
                {s.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="group block">
                      <div className="text-[14px] font-medium text-[color:var(--fg)] group-hover:text-[color:var(--brand)] transition-colors">
                        {it.label}
                        <svg viewBox="0 0 16 16" className="inline-block ml-1.5 h-3 w-3 -translate-y-[1px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                      <div className="text-[12.5px] text-[color:var(--fg-muted)] mt-0.5 leading-snug">{it.desc}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 card p-8 max-w-4xl">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--brand)] font-medium">Quickstart</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Adopt your first agent</h2>
          <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-sunk)] p-5 font-mono text-[12.5px] text-[color:var(--fg)] overflow-x-auto thin-scroll">
            <div className="text-[color:var(--fg-subtle)]"># Install the CLI</div>
            <div>curl -fsSL helmstack.ai/install | bash</div>
            <div className="mt-3 text-[color:var(--fg-subtle)]"># Sign in</div>
            <div>helm login</div>
            <div className="mt-3 text-[color:var(--fg-subtle)]"># Adopt a Claude Code agent in this directory</div>
            <div>helm adopt . --name ada --runtime claude-code</div>
            <div className="mt-3 text-[color:var(--fg-subtle)]"># Watch it from the deck</div>
            <div>helm open</div>
          </div>
          <p className="mt-4 text-[13px] text-[color:var(--fg-muted)]">
            That's it. The agent keeps running where it ran before — Helmstack just adds eyes, ears, and a brake.
          </p>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
