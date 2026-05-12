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
    <footer className="mt-32 border-t border-white/40 bg-white/40 backdrop-blur-xl">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
          <div className="col-span-2 max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-zinc-600 leading-relaxed">
              The control deck for AI agent fleets. Connect any runtime, observe what they're doing, approve what matters.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-zinc-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems normal
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {col.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/40 pt-6">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Helmstack Inc. Built for operators who run real agents in production.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <Link href="/legal/privacy" className="hover:text-zinc-900">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-zinc-900">Terms</Link>
            <Link href="/security" className="hover:text-zinc-900">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
