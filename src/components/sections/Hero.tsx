"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PERSONAL, PROJECTS, SKILLS } from "@/lib/constants";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

type Entry = { id: number; cmd: string; output: ReactNode };

const QUICK = ["whoami", "neofetch", "projetos", "contato", "help"] as const;

const K = ({ children }: { children: ReactNode }) => <span className="text-term-cyan">{children}</span>;

function render(cmd: string): ReactNode | "clear" {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return null;
    case "help":
      return (
        <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-0.5">
          {[
            ["whoami", "quem sou eu"],
            ["neofetch", "specs do sistema"],
            ["projetos", "lista de projetos"],
            ["stack", "tecnologias por área"],
            ["contato", "como falar comigo"],
            ["cv", "abre o currículo"],
            ["clear", "limpa o terminal"],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <K>{k}</K>
              <span className="text-fg-muted">{v}</span>
            </div>
          ))}
        </div>
      );
    case "whoami":
      return (
        <div className="space-y-1">
          <p className="text-fg">
            {PERSONAL.name} <span className="text-fg-dim">— {PERSONAL.tagline.toLowerCase()}</span>
          </p>
          <p className="text-fg-muted">
            {PERSONAL.location.toLowerCase()} · engenharia de software @ unifacs
          </p>
          <p className="text-fg-muted">foco: backend java, apis rest, deploy em produção</p>
          <p>
            <span className="text-term-green">●</span> <span className="text-fg-muted">{PERSONAL.status.toLowerCase()}</span>
          </p>
        </div>
      );
    case "neofetch":
      return (
        <div className="flex gap-5">
          <pre aria-hidden className="hidden leading-tight text-term-green sm:block">{`  ___ 
 | __|
 | _| 
 |___|`}</pre>
          <div className="space-y-0.5">
            <p>
              <span className="text-term-green">{PERSONAL.handle}</span>
              <span className="text-fg-dim">@</span>
              <span className="text-term-green">portfolio</span>
            </p>
            <p className="text-fg-dim">-----------------</p>
            {[
              ["os", "Engenharia de Software @ UNIFACS"],
              ["host", PERSONAL.location],
              ["kernel", "Java / Spring Boot"],
              ["shell", "Python · FastAPI"],
              ["db", "PostgreSQL, MySQL"],
              ["infra", "Docker, Nginx, AWS EC2"],
              ["uptime", "codando desde o IFBA"],
            ].map(([k, v]) => (
              <p key={k}>
                <K>{k}</K>
                <span className="text-fg-dim">: </span>
                <span className="text-fg-muted">{v}</span>
              </p>
            ))}
          </div>
        </div>
      );
    case "projetos":
    case "ls projetos":
    case "ls":
      return (
        <div className="space-y-0.5">
          {PROJECTS.map((p) => (
            <p key={p.id}>
              <a href={`#projeto-${p.id}`} className="text-term-cyan underline-offset-4 hover:underline">
                {p.path.split("/").pop()}/
              </a>
              <span className="text-fg-dim">  {p.kind.toLowerCase()}</span>
              {p.status && <span className="text-term-green">  [{p.status}]</span>}
            </p>
          ))}
        </div>
      );
    case "stack":
      return (
        <div className="space-y-0.5">
          {SKILLS.map((g) => (
            <p key={g.id}>
              <K>{g.id.padEnd(9, " ")}</K>
              <span className="text-fg-muted">{g.items.map((i) => i.name).join(", ")}</span>
            </p>
          ))}
        </div>
      );
    case "contato":
      return (
        <div className="space-y-0.5">
          <p>
            <K>email   </K>
            <a href={`mailto:${PERSONAL.email}`} className="text-fg-muted hover:text-fg">{PERSONAL.email}</a>
          </p>
          <p>
            <K>github  </K>
            <a href={PERSONAL.links.github} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">github.com/Deduv</a>
          </p>
          <p>
            <K>linkedin</K>{" "}
            <a href={PERSONAL.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">in/eduardosantsantos</a>
          </p>
        </div>
      );
    case "cv":
      if (typeof window !== "undefined") window.open(PERSONAL.cv, "_blank", "noopener,noreferrer");
      return <p className="text-fg-muted">abrindo curriculo.pdf…</p>;
    case "clear":
      return "clear";
    case "sudo hire eduardo":
    case "sudo contratar":
      return <p className="text-term-green">permissão concedida. veja <K>contato</K>.</p>;
    default:
      return (
        <p className="text-fg-muted">
          comando não encontrado: <span className="text-term-red">{c}</span>. digite <K>help</K>.
        </p>
      );
  }
}

function HeroTerminal() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState("");
  const [booted, setBooted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const exec = (cmd: string) => {
    const out = render(cmd);
    if (out === "clear") {
      setEntries([]);
      return;
    }
    setEntries((e) => [...e, { id: idRef.current++, cmd, output: out }]);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setHIndex(-1);
  };

  // single orchestrated boot moment: type `whoami`
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = "whoami";
    if (reduce) {
      exec(target);
      setBooted(true);
      return;
    }
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const step = () => {
      i++;
      setTyping(target.slice(0, i));
      if (i < target.length) timers.push(setTimeout(step, 70 + Math.random() * 50));
      else
        timers.push(
          setTimeout(() => {
            setTyping("");
            exec(target);
            setBooted(true);
          }, 260),
        );
    };
    timers.push(setTimeout(step, 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      setHIndex(Math.max(next, -1));
      setInput(next >= 0 ? history[next] : "");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const Prompt = () => (
    <span className="shrink-0 select-none whitespace-pre">
      <span className="text-term-green">~</span>
      <span className="text-fg-dim"> $ </span>
    </span>
  );

  return (
    <TerminalWindow
      title={`${PERSONAL.handle}@portfolio: ~`}
      meta="zsh"
      className="w-full"
      bodyClassName="font-mono text-[13px] leading-relaxed"
    >
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-[22rem] cursor-text overflow-y-auto px-4 py-4"
        aria-live="polite"
      >
        <p className="mb-3 text-fg-dim">
          terminal interativo. digite <span className="text-term-cyan">help</span> ou use os atalhos abaixo.
        </p>
        {entries.map((e) => (
          <div key={e.id} className="mb-3">
            <p className="flex">
              <Prompt />
              <span className="text-fg">{e.cmd}</span>
            </p>
            {e.output && <div className="mt-1">{e.output}</div>}
          </div>
        ))}
        <label className="flex items-center">
          <Prompt />
          <span className="sr-only">Comando</span>
          {!booted ? (
            <span className="text-fg">
              {typing}
              <span className="ml-px inline-block h-4 w-2 translate-y-0.5 animate-blink bg-term-green" />
            </span>
          ) : (
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 bg-transparent text-fg caret-term-green focus:outline-none"
            />
          )}
        </label>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-ink-700 px-3 py-2.5">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            disabled={!booted}
            onClick={() => exec(q)}
            className="rounded border border-ink-700 px-2 py-0.5 text-xs text-fg-muted transition-colors hover:border-ink-600 hover:bg-ink-800 hover:text-fg disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </TerminalWindow>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center pb-16 pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PERSONAL.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-md border border-ink-600"
            />
            <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-term-green opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-term-green" />
              </span>
              {PERSONAL.status}
            </p>
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-fg md:text-7xl">
            {PERSONAL.name}
          </h1>
          <p className="mt-4 font-mono text-base text-term-green md:text-lg">
            <span className="text-fg-dim">{"// "}</span>
            {PERSONAL.tagline}
          </p>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-fg-muted">{PERSONAL.summary}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="rounded-md bg-fg px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              Ver projetos
            </a>
            <a
              href={PERSONAL.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-ink-600 px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-fg-dim hover:bg-ink-800"
            >
              Abrir currículo
            </a>
            <a
              href={PERSONAL.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2.5 font-mono text-sm text-fg-muted transition-colors hover:text-fg"
            >
              github/Deduv
            </a>
          </div>
        </div>

        <HeroTerminal />
      </div>
    </section>
  );
}
