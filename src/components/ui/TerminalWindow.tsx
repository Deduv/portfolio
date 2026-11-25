import type { ReactNode } from "react";

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  /** right side of the title bar */
  meta?: ReactNode;
  /** rendered between title bar and body (e.g. tabs) */
  toolbar?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function TerminalWindow({
  title,
  children,
  meta,
  toolbar,
  className = "",
  bodyClassName = "",
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-ink-700 bg-ink-900 shadow-[0_0_0_1px_rgba(0,0,0,0.6),0_24px_60px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex h-9 items-center gap-3 border-b border-ink-700 bg-ink-800 px-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-xs text-fg-dim">{title}</p>
        {meta && <div className="shrink-0 font-mono text-xs text-fg-dim">{meta}</div>}
      </div>
      {toolbar}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
