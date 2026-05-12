import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--brand)] text-[color:var(--on-brand)] shadow-[0_8px_24px_-8px_var(--brand-ring)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3M6 6l2.2 2.2M15.8 15.8L18 18M6 18l2.2-2.2M15.8 8.2L18 6" />
        </svg>
        <span className="absolute -inset-px rounded-xl ring-1 ring-inset ring-white/20" aria-hidden />
      </span>
      <span className="font-semibold tracking-tight text-[color:var(--fg)] text-[15px]">
        Helmstack
      </span>
    </Link>
  );
}
