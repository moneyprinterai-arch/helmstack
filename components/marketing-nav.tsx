import Link from "next/link";
import { Logo } from "./logo";

const links = [
  { href: "/#product", label: "Product" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40">
      <div className="absolute inset-0 backdrop-blur-xl bg-[color:var(--bg)]/70 border-b border-[color:var(--border)]" aria-hidden />
      <nav className="relative mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden md:flex items-center gap-1 text-sm text-[color:var(--fg-muted)]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-3 py-2 rounded-lg hover:text-[color:var(--fg)] hover:bg-[color:var(--surface-alt)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn btn-ghost hidden sm:inline-flex">
            Sign in
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Start free
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
