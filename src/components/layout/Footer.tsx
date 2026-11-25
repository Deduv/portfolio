import { PERSONAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-ink-700">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-xs text-fg-dim">
        <p>
          <span className="text-term-green">●</span> {PERSONAL.name} — {new Date().getFullYear()}
        </p>
        <p>
          feito com Next.js e Tailwind · <kbd className="text-fg-muted">Ctrl K</kbd> para navegar
        </p>
      </div>
    </footer>
  );
}
