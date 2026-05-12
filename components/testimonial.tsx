export function Testimonial() {
  return (
    <section className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24">
      <figure className="card card-lift p-10 sm:p-14 max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[color:var(--brand-soft)] blur-3xl opacity-60" />
        <svg viewBox="0 0 32 32" className="h-8 w-8 text-[color:var(--brand)]" fill="currentColor"><path d="M10 8c-3 0-5 2-5 5v8h8v-8H8c0-3 2-4 4-4V8h-2zm12 0c-3 0-5 2-5 5v8h8v-8h-5c0-3 2-4 4-4V8h-2z" /></svg>
        <blockquote className="mt-6 text-[20px] sm:text-[26px] font-medium tracking-tight leading-snug text-[color:var(--fg)]">
          "We had nine agents scattered across three repos and a Notion full of cron jobs. Helmstack pulled them onto one deck in an afternoon. The morning brief alone paid for the year."
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4 text-sm">
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--accent)]" />
          <div>
            <div className="font-medium">Mira Halverson</div>
            <div className="text-[color:var(--fg-subtle)]">Head of Ops, Northwind Labs</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
