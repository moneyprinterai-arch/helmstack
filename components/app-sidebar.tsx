"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";

const nav = [
  { href: "/app", label: "Overview", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/app/agents", label: "Agents", icon: "M16 11a4 4 0 10-8 0M5 21v-1a7 7 0 0114 0v1" },
  { href: "/app/connectors", label: "Connectors", icon: "M9 12h6 M6 12a3 3 0 110-6 3 3 0 010 6z M18 18a3 3 0 110-6 3 3 0 010 6z" },
  { href: "/app/approvals", label: "Approvals", icon: "M9 12l2 2 4-4 M12 21a9 9 0 110-18 9 9 0 010 18z", badge: 3 },
  { href: "/app/scheduled", label: "Scheduled", icon: "M12 7v5l3 2 M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/app/activity", label: "Activity", icon: "M3 12h4l3-8 4 16 3-8h4" },
  { href: "/app/knowledge", label: "Knowledge", icon: "M4 4h16v16H4z M4 9h16 M8 14h4" },
  { href: "/app/settings", label: "Settings", icon: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1A1.7 1.7 0 0015 4.6a1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c0 .7.4 1.3 1 1.5h.1a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-60 flex-col border-r border-[color:var(--border)] bg-[color:var(--bg)]/85 backdrop-blur-xl z-30">
      <div className="h-16 flex items-center px-5 border-b border-[color:var(--border)]">
        <Logo />
      </div>

      <div className="px-3 pt-3 pb-2">
        <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">Fleet</div>
            <div className="text-[13px] font-medium tracking-tight">Northwind Labs</div>
          </div>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--fg-subtle)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5 thin-scroll overflow-y-auto">
        {nav.map((item) => {
          const active = item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13.5px] transition-colors ${
                active
                  ? "bg-[color:var(--brand-soft)] text-[color:var(--brand)] font-medium"
                  : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] hover:bg-[color:var(--surface-alt)]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                {item.label}
              </span>
              {item.badge && (
                <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-[color:var(--warn)]/20 text-[color:var(--warn)] text-[10px] font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[color:var(--border)]">
        <div className="rounded-xl bg-gradient-to-br from-[color:var(--brand-soft)] to-[color:var(--surface-alt)] p-3.5 border border-[color:var(--border)]">
          <div className="text-[12px] font-medium tracking-tight">You're on Team trial</div>
          <div className="text-[11px] text-[color:var(--fg-muted)] mt-0.5">9 days remaining</div>
          <Link href="/pricing" className="btn btn-primary h-7 px-2.5 text-[11px] mt-2.5">Upgrade</Link>
        </div>
        <div className="mt-3 flex items-center gap-2.5 px-2 py-1.5">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)]" />
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-medium truncate">Mira Halverson</div>
            <div className="text-[10.5px] text-[color:var(--fg-subtle)] truncate">mira@northwind.co</div>
          </div>
          <Link href="/" className="text-[color:var(--fg-subtle)] hover:text-[color:var(--fg)]" title="Sign out">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 17l5-5-5-5 M21 12H9 M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /></svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}
