import Link from "next/link";

export function CTA() {
  return (
    <section className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-10 sm:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="text-[34px] sm:text-[48px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
            Take the helm.
          </h2>
          <p className="mt-4 text-base text-zinc-600 leading-relaxed">
            Start with one agent, free, no credit card. When you're ready to grow the fleet — we'll be ready too.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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
              Talk to engineering
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
