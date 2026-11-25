"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";
import { openCommandPalette } from "@/components/ui/CommandPalette";

function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Bahia",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useActiveSection() {
  const [active, setActive] = useState<string>("#hero");
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.querySelector(n.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const time = useClock();
  const active = useActiveSection();

  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent));
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-700 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-12 max-w-6xl items-center gap-6 px-5 font-mono text-[13px]" aria-label="Principal">
        <a href="#hero" className="flex shrink-0 items-center gap-2 text-fg">
          <span className="h-1.5 w-1.5 rounded-full bg-term-green" aria-hidden />
          <span>
            {PERSONAL.handle}
            <span className="text-fg-dim">@portfolio</span>
          </span>
        </a>

        <ul className="hidden flex-1 items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded px-2.5 py-1 transition-colors ${
                    isActive ? "bg-ink-800 text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-4 text-fg-dim">
          <span className="hidden lg:inline">git:<span className="text-term-cyan">main</span></span>
          {time && (
            <span className="hidden sm:inline" title="Horário de Salvador">
              {time} <span className="text-fg-dim">BRT</span>
            </span>
          )}
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden items-center gap-2 rounded border border-ink-600 px-2 py-1 text-fg-muted transition-colors hover:border-fg-dim hover:text-fg sm:flex"
            aria-label="Abrir paleta de comandos"
          >
            <span>buscar</span>
            <kbd className="text-[11px] text-fg-dim">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="text-fg-muted md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <ul className="border-t border-ink-700 bg-ink px-5 py-3 font-mono text-sm md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-fg-muted hover:text-fg"
              >
                <span className="text-term-green">cd</span> {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openCommandPalette();
              }}
              className="block py-2 text-fg-muted hover:text-fg"
            >
              <span className="text-term-green">❯</span> buscar comandos
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
