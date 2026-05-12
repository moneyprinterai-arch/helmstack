export function AppTopbar({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="sticky top-0 z-20 border-b border-[color:var(--border)] bg-[color:var(--bg)]/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 h-16">
        <div className="min-w-0">
          {eyebrow && (
            <div className="text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--fg-subtle)] font-medium">{eyebrow}</div>
          )}
          <h1 className="text-[20px] font-semibold tracking-tight truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] text-[12.5px] text-[color:var(--fg-muted)] w-[260px]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" strokeLinecap="round" /></svg>
            <span>Jump to agent, action…</span>
            <span className="ml-auto rounded px-1 py-0.5 bg-[color:var(--bg-soft)] text-[10px] font-mono border border-[color:var(--border)]">⌘K</span>
          </div>
          <button className="btn btn-secondary h-9 px-3" title="Notifications">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9 M13.7 21a2 2 0 01-3.4 0" /></svg>
          </button>
          <button className="btn btn-primary h-9 px-3 text-[13px]">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M8 3v10M3 8h10" strokeLinecap="round" /></svg>
            New agent
          </button>
        </div>
      </div>
    </div>
  );
}
