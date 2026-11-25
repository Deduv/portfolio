"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NAV_ITEMS, PERSONAL, PROJECTS } from "@/lib/constants";

export const OPEN_PALETTE_EVENT = "open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

type Action = {
  id: string;
  group: "navegar" | "projetos" | "contato";
  label: string;
  hint: string;
  run: () => void | Promise<void>;
};

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const actions = useMemo<Action[]>(() => {
    const nav: Action[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.href}`,
      group: "navegar",
      label: `cd ${item.label}`,
      hint: "seção",
      run: () => scrollTo(item.href),
    }));
    const repos: Action[] = PROJECTS.flatMap((p) =>
      p.links.map((l) => ({
        id: `link-${p.id}-${l.label}`,
        group: "projetos" as const,
        label: `open ${p.name.toLowerCase()} · ${l.label}`,
        hint: new URL(l.href).hostname,
        run: () => openUrl(l.href),
      })),
    );
    const contact: Action[] = [
      {
        id: "copy-email",
        group: "contato",
        label: "copiar e-mail",
        hint: PERSONAL.email,
        run: async () => {
          await navigator.clipboard.writeText(PERSONAL.email);
          setToast("E-mail copiado");
        },
      },
      { id: "cv", group: "contato", label: "abrir currículo (PDF)", hint: "curriculo.pdf", run: () => openUrl(PERSONAL.cv) },
      { id: "gh", group: "contato", label: "abrir GitHub", hint: "github.com/Deduv", run: () => openUrl(PERSONAL.links.github) },
      { id: "in", group: "contato", label: "abrir LinkedIn", hint: "linkedin.com", run: () => openUrl(PERSONAL.links.linkedin) },
      { id: "x", group: "contato", label: "abrir X / Twitter", hint: "x.com/eduruntime", run: () => openUrl(PERSONAL.links.twitter) },
    ];
    return [...nav, ...repos, ...contact];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.hint} ${a.group}`.toLowerCase().includes(q));
  }, [actions, query]);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActive(0);
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, open);
    };
  }, [open, close]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.getElementById(`cmd-${filtered[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  const runAction = async (a: Action | undefined) => {
    if (!a) return;
    close();
    await a.run();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAction(filtered[active]);
    }
  };

  let lastGroup = "";

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Paleta de comandos"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-0 mx-auto mt-[12vh] w-[min(92vw,36rem)] max-w-none overflow-hidden rounded-lg border border-ink-600 bg-ink-900 p-0 text-fg shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 border-b border-ink-700 px-4">
          <span className="font-mono text-sm text-term-green">❯</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="buscar seção, repositório ou ação…"
            aria-label="Buscar comando"
            aria-controls="cmd-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            className="h-12 flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-fg-dim focus:outline-none"
          />
          <kbd className="rounded border border-ink-600 px-1.5 py-0.5 font-mono text-[11px] text-fg-dim">esc</kbd>
        </div>
        <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-sm text-fg-dim">
              nenhum comando para &quot;{query}&quot;
            </li>
          )}
          {filtered.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={a.id} role="presentation">
                {header && <p className="px-4 pb-1 pt-3 font-mono text-[11px] text-fg-dim">{header}</p>}
                <button
                  id={`cmd-${a.id}`}
                  role="option"
                  aria-selected={i === active}
                  tabIndex={-1}
                  onMouseMove={() => setActive(i)}
                  onClick={() => runAction(a)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left font-mono text-sm ${
                    i === active ? "bg-ink-800 text-fg" : "text-fg-muted"
                  }`}
                >
                  <span className="truncate">
                    <span className={i === active ? "text-term-green" : "text-transparent"}>› </span>
                    {a.label}
                  </span>
                  <span className="shrink-0 truncate text-xs text-fg-dim">{a.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 border-t border-ink-700 px-4 py-2 font-mono text-[11px] text-fg-dim">
          <span>↑↓ navegar</span>
          <span>↵ executar</span>
        </div>
      </dialog>
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-md border border-ink-600 bg-ink-800 px-4 py-2 font-mono text-sm text-term-green transition-opacity ${
          toast ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {toast ? `✓ ${toast}` : ""}
      </div>
    </>
  );
}
