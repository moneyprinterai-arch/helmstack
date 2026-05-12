import Link from "next/link";
import { HeroPreview } from "./hero-preview";

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <Link
            href="/changelog"
            className="chip chip-brand hover:scale-[1.02] transition-transform"
          >
            <span className="dot text-[color:var(--brand)]" />
            Now in private beta — read the launch note
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>

          <h1 className="hero-h1 mt-8 text-[44px] sm:text-[68px] lg:text-[80px] text-[color:var(--fg)]">
            The control deck for
            <br />
            your <span className="gradient-text">AI agent fleet</span>
          </h1>

          <p className="mt-7 text-[17px] sm:text-[19px] text-[color:var(--fg-muted)] leading-relaxed max-w-2xl">
            Connect any agent runtime — Claude Code, OpenAI, your homegrown
            stack — and run them like a real operations team. Observe, approve,
            schedule, and ship outcomes from one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Link href="/signup" className="btn btn-primary h-11 px-6 text-[15px]">
              Start free
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="/docs" className="btn btn-secondary h-11 px-6 text-[15px]">
              Read the docs
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-5 text-xs text-[color:var(--fg-subtle)]">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--good)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Free for 1 agent
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--good)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[color:var(--good)]" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Self-host ready
            </span>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}
