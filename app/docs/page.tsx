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
      <MarketingNav />
      <main className="mx-auto max-w-[1240px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Documentation</div>
          <h1 className="mt-3 text-[40px] sm:text-[52px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
            Build with Helmstack.
          </h1>
          <p className="mt-5 text-base text-zinc-600 leading-relaxed">
            These docs are for operators and engineers. Short on prose, heavy on examples. Run the snippets — they're tested.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{s.title}</div>
              <ul className="mt-5 space-y-3.5">
                {s.items.map((it) => (
                  <li key={it.href}>
                    <Link href={it.href} className="group block">
                      <div className="text-sm font-medium text-zinc-900 group-hover:text-zinc-700">
                        {it.label}
                        <span className="ml-1.5 inline-block opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-500 leading-snug">{it.desc}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-4xl rounded-3xl border border-white/50 bg-white/70 p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Quickstart</div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Adopt your first agent</h2>
          <div className="mt-6 rounded-2xl bg-zinc-950 p-5 font-mono text-[12.5px] text-zinc-100 overflow-x-auto">
            <div className="text-zinc-500"># Install the CLI</div>
            <div>curl -fsSL helmstack.ai/install | bash</div>
            <div className="mt-3 text-zinc-500"># Sign in</div>
            <div>helm login</div>
            <div className="mt-3 text-zinc-500"># Adopt a Claude Code agent in this directory</div>
            <div>helm adopt . --name ada --runtime claude-code</div>
            <div className="mt-3 text-zinc-500"># Watch it from the deck</div>
            <div>helm open</div>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            That's it. The agent keeps running where it ran before — Helmstack just adds eyes, ears, and a brake.
          </p>
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
