export function Testimonial() {
  return (
    <section className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24">
      <figure className="mx-auto max-w-4xl rounded-3xl border border-white/50 bg-white/70 p-10 sm:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
        <svg viewBox="0 0 32 32" className="h-8 w-8 text-violet-400" fill="currentColor"><path d="M10 8c-3 0-5 2-5 5v8h8v-8H8c0-3 2-4 4-4V8h-2zm12 0c-3 0-5 2-5 5v8h8v-8h-5c0-3 2-4 4-4V8h-2z" /></svg>
        <blockquote className="mt-6 text-[20px] sm:text-[26px] font-medium tracking-tight leading-snug text-zinc-900">
          "We had nine agents scattered across three repos and a Notion full of cron jobs. Helmstack pulled them onto one deck in an afternoon. The morning brief alone paid for the year."
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4 text-sm">
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-300 to-orange-200" />
          <div>
            <div className="font-semibold text-zinc-900">Mira Halverson</div>
            <div className="text-zinc-500">Head of Ops, Northwind Labs</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
