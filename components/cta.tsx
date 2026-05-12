import Link from "next/link";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24">
      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--brand-soft)] via-[color:var(--surface)] to-[color:var(--surface-alt)] p-10 sm:p-16">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-[color:var(--brand)]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[color:var(--accent)]/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="hero-h1 text-[34px] sm:text-[48px]">
            Take the helm.
          </h2>
          <p className="mt-4 text-[16px] text-[color:var(--fg-muted)] leading-relaxed">
            Start with one agent, free, no credit card. When you're ready to grow the fleet — we'll be ready too.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="btn btn-primary h-11 px-6 text-[15px]">
              Start free
            </Link>
            <Link href="/docs" className="btn btn-secondary h-11 px-6 text-[15px]">
              Talk to engineering
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
