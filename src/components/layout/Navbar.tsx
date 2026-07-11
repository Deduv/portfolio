'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, PERSONAL } from '@/lib/constants';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-[rgba(13,15,20,0.7)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="text-lg font-bold text-[#f2f2f2]"
        >
          Eduardo Santana
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-[#848a9a] transition hover:text-[#f2f2f2]"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="rounded-lg border border-[#7c5cfc] px-4 py-2 text-sm text-[#7c5cfc] transition hover:bg-[#7c5cfc]/10"
            >
              Contato
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#f2f2f2] md:hidden"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/80 backdrop-blur-md md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 text-[#f2f2f2]"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xl text-[#848a9a] transition hover:text-[#f2f2f2]"
            >
              {item.label}
            </a>
          ))}

          <a
            href={`mailto:${PERSONAL.email}`}
            className="rounded-lg border border-[#7c5cfc] px-4 py-2 text-sm text-[#7c5cfc] transition hover:bg-[#7c5cfc]/10"
          >
            Contato
          </a>
        </div>
      )}
    </header>
  );
}
