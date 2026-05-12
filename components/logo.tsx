import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`text-lg font-bold tracking-tight text-zinc-900 ${className}`}
    >
      Helmstack
    </Link>
  );
}
