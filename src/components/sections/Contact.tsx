"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PERSONAL } from "@/lib/constants";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons";

const links = [
  { href: PERSONAL.links.github, label: "GitHub", handle: "Deduv", Icon: GithubIcon },
  { href: PERSONAL.links.linkedin, label: "LinkedIn", handle: "eduardosantsantos", Icon: LinkedinIcon },
  { href: PERSONAL.links.twitter, label: "X", handle: "@eduruntime", Icon: TwitterIcon },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PERSONAL.email}`;
    }
  };

  return (
    <section id="contato" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="font-mono text-sm">
            <span className="text-term-green">~/contato</span>
            <span className="mx-2 text-fg-dim">$</span>
            <span className="text-fg-muted">./falar-comigo.sh</span>
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Tem uma vaga ou um projeto em mente?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">
            Estou procurando estágio ou uma posição júnior em backend ou full stack. O caminho mais rápido é o e-mail.
          </p>
        </div>

        <TerminalWindow title="falar-comigo.sh" meta="pronto" bodyClassName="p-5 font-mono text-sm">
          <p className="text-fg-dim"># e-mail</p>
          <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-ink-700 bg-ink px-3 py-2.5">
            <a href={`mailto:${PERSONAL.email}`} className="truncate text-fg hover:text-term-cyan">
              {PERSONAL.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className={`flex shrink-0 items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors ${
                copied ? "text-term-green" : "text-fg-muted hover:bg-ink-800 hover:text-fg"
              }`}
              aria-label="Copiar e-mail"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "copiado" : "copiar"}
            </button>
          </div>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "E-mail copiado" : ""}
          </span>

          <p className="mt-6 text-fg-dim"># currículo</p>
          <a
            href={PERSONAL.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-between rounded-md border border-ink-700 px-3 py-2.5 text-fg transition-colors hover:border-ink-600 hover:bg-ink-800"
          >
            <span>curriculo.pdf</span>
            <span className="text-xs text-fg-dim">abrir</span>
          </a>

          <p className="mt-6 text-fg-dim"># redes</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {links.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-md border border-ink-700 px-3 py-2.5 text-fg-muted transition-colors hover:border-ink-600 hover:bg-ink-800 hover:text-fg"
                >
                  <Icon size={15} />
                  <span className="truncate text-xs">{handle}</span>
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </div>
    </section>
  );
}
