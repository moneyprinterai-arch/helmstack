import { INTEGRATIONS } from "@/lib/integrations";
import { BrandLogo } from "@/components/brand-logo";

export function IntegrationsGrid() {
  return (
    <section id="integrations" className="relative mx-auto max-w-[1240px] px-5 sm:px-8 py-24 sm:py-32">
      <div className="max-w-2xl">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Integrations</div>
        <h2 className="mt-3 text-[32px] sm:text-[44px] font-bold tracking-tight text-zinc-900 leading-[1.05]">
          The tools your team already runs.
        </h2>
        <p className="mt-4 text-base text-zinc-600 leading-relaxed">
          Connectors are first-class. OAuth once, scope per-agent, and let Helmstack handle refresh tokens, rate limits, and pagination.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {INTEGRATIONS.map((it) => (
          <div
            key={it.name}
            className="flex items-center gap-3 rounded-3xl border border-white/50 bg-white/65 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition-all hover:bg-white/85"
          >
            <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl border border-white/60 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <BrandLogo meta={it} size={22} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium text-zinc-900 leading-tight truncate">{it.name}</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{it.group}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Plus a generic HTTP/Webhook connector and an SDK for the one that isn't listed.
      </p>
    </section>
  );
}
