import Link from "next/link";
import { Logo } from "./logo";

const cols = [
  {
    title: "Product",
    items: [
      { href: "/#product", label: "Overview" },
      { href: "/#integrations", label: "Integrations" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Developers",
    items: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/sdk", label: "SDK" },
      { href: "/docs/api", label: "API reference" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="relative mt-32 border-t border-[color:var(--border)] bg-[color:var(--bg-soft)]/60">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
          <div className="col-span-2 max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-[color:var(--fg-muted)] leading-relaxed">
              The control deck for AI agent fleets. Connect any runtime, observe what they're doing, approve what matters.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-[color:var(--fg-subtle)]">
              <span className="dot text-[color:var(--good)] pulse-dot" />
              All systems normal
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[color:var(--border)] pt-6">
          <p className="text-xs text-[color:var(--fg-subtle)]">
            © {new Date().getFullYear()} Helmstack Inc. Built for operators who run real agents in production.
          </p>
          <div className="flex items-center gap-4 text-xs text-[color:var(--fg-subtle)]">
            <Link href="/legal/privacy" className="hover:text-[color:var(--fg)]">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-[color:var(--fg)]">Terms</Link>
            <Link href="/security" className="hover:text-[color:var(--fg)]">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
