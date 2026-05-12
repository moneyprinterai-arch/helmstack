import Link from "next/link";
import { HeroPreview } from "./hero-preview";

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Link
            href="/changelog"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[11px] font-medium text-zinc-700 backdrop-blur-xl transition-colors hover:bg-white/95"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Now in private beta — read the launch note
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>

          <h1 className="mt-8 text-[44px] sm:text-[68px] lg:text-[78px] font-bold tracking-tight text-zinc-900 leading-[0.98]">
            The control deck for
            <br />
            your <span className="text-zinc-500">AI agent fleet</span>
          </h1>

          <p className="mt-7 text-[17px] sm:text-[18px] text-zinc-600 leading-relaxed max-w-2xl">
            Connect any agent runtime — Claude Code, OpenAI, your homegrown
            stack — and run them like a real operations team. Observe, approve,
            schedule, and ship outcomes from one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-colors hover:bg-zinc-700"
            >
              Start free
            </Link>
            <Link
              href="/docs"
              className="rounded-full border border-white/50 bg-white/70 px-6 py-3 text-sm font-medium text-zinc-900 backdrop-blur-xl transition-colors hover:bg-white/95"
            >
              Read the docs
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-5 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Free for 1 agent
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              No credit card
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Self-host ready
            </span>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}
