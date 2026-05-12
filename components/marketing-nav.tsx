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
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/55 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <ul className="hidden md:flex items-center gap-1 text-sm text-zinc-600">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-full px-3 py-1.5 font-medium transition-colors hover:bg-white/70 hover:text-zinc-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex rounded-full px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-white/70 hover:text-zinc-900"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)] transition-colors hover:bg-zinc-700"
          >
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}
