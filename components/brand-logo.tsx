import { metaFor, logoUrl, type IntegrationMeta } from "@/lib/integrations";

type Props = {
  // Pass either a known provider key (notion / drive / qb / …) or a display name.
  provider?: string | null;
  meta?: IntegrationMeta;
  fallback?: string;
  size?: number;
  className?: string;
};

export function BrandLogo({ provider, meta, fallback, size = 18, className = "" }: Props) {
  const m = meta ?? metaFor(provider ?? null);
  if (m) {
    return (
      <img
        src={logoUrl(m, size * 2)}
        alt={m.name}
        width={size}
        height={size}
        loading="lazy"
        className={className}
        style={{ width: size, height: size }}
      />
    );
  }
  // Fallback to two-letter chip when we don't recognize the provider.
  const initials = (fallback ?? provider ?? "??").slice(0, 2).toUpperCase();
  return (
    <span
      className={`grid place-items-center font-bold text-zinc-600 ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.45) }}
    >
      {initials}
    </span>
  );
}
