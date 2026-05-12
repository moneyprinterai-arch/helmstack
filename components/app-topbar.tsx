export function AppTopbar({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{title}</h1>
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
