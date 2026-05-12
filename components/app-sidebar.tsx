"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { signOutAction } from "@/app/app/actions";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.8,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
};

type Item = { href: string; label: string; icon: React.ReactNode };

const NAV: ReadonlyArray<Item> = [
  {
    href: "/app",
    label: "Dashboard",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
      </svg>
    ),
  },
  {
    href: "/app/agents",
    label: "Agents",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8" cy="9" r="3" />
        <circle cx="17" cy="9" r="3" />
        <path d="M3 19c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
        <path d="M13 19c0-2.5 2.2-4.5 5-4.5s3 1.6 3 4.5" />
      </svg>
    ),
  },
  {
    href: "/app/connectors",
    label: "Connectors",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="9" width="6" height="6" rx="1.5" />
        <rect x="15" y="9" width="6" height="6" rx="1.5" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    href: "/app/approvals",
    label: "Approvals",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <path d="M9 3.5h6v3h-6z" />
        <path d="M9.5 13l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    href: "/app/scheduled",
    label: "Scheduled",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 9v4l2.5 2" />
        <path d="M9 3h6" />
      </svg>
    ),
  },
  {
    href: "/app/activity",
    label: "Activity",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 12h3.5l2.5-7 4 14 2.5-7H21" />
      </svg>
    ),
  },
  {
    href: "/app/knowledge",
    label: "Knowledge",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M5 4.5h9a4 4 0 014 4v11" />
        <path d="M5 4.5v15a3 3 0 013-3h10" />
      </svg>
    ),
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1A1.7 1.7 0 0015 4.6a1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9c0 .7.4 1.3 1 1.5h.1a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" />
      </svg>
    ),
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/app") return pathname === "/app";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({
  workspaceName,
  userEmail,
  userName,
  pendingApprovals = 0,
}: {
  workspaceName: string;
  userEmail: string;
  userName: string;
  pendingApprovals?: number;
}) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-60 lg:flex-col lg:border-r lg:border-white/40 lg:bg-white/55 lg:px-4 lg:py-6 lg:backdrop-blur-2xl lg:shadow-[inset_1px_0_0_rgba(255,255,255,0.6)] z-30">
      <div className="px-2 pb-5">
        <Logo />
        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Workspace
        </div>
        <div className="mt-0.5 text-sm font-medium text-zinc-900 truncate">{workspaceName}</div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const badge = item.href === "/app/approvals" && pendingApprovals > 0 ? pendingApprovals : undefined;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-zinc-900 text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
                  : "text-zinc-600 hover:bg-white/50 hover:text-zinc-900",
              ].join(" ")}
            >
              <span aria-hidden>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {badge && (
                <span className={`rounded-full px-1.5 py-px text-[10px] font-semibold ${active ? "bg-white/20 text-white/80" : "bg-amber-100 text-amber-700"}`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 space-y-3">
        <div className="rounded-3xl border border-white/50 bg-white/65 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl">
          <div className="text-xs font-medium text-zinc-900">You're on the free plan</div>
          <div className="text-[11px] text-zinc-500 mt-0.5">1 agent included</div>
          <Link
            href="/pricing"
            className="mt-2.5 inline-flex rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-zinc-700"
          >
            Upgrade
          </Link>
        </div>
        <div className="flex items-center gap-2.5 px-1">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-300 to-orange-200 grid place-items-center text-[11px] font-bold uppercase text-zinc-900">
            {userName.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-zinc-900 truncate">{userName}</div>
            <div className="text-[10px] text-zinc-500 truncate">{userEmail}</div>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-full p-1.5 text-zinc-500 hover:bg-white/70 hover:text-zinc-900"
              title="Sign out"
              aria-label="Sign out"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 17l5-5-5-5 M21 12H9 M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
