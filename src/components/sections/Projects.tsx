"use client";

import { useId, useRef, useState } from "react";
import { PROJECTS, type Project, type TreeNode, type Endpoint } from "@/lib/constants";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TABS = [
  { id: "arquitetura", label: "arquitetura" },
  { id: "codigo", label: "código" },
  { id: "engenharia", label: "engenharia" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const METHOD_COLOR: Record<Endpoint["method"], string> = {
  GET: "text-term-green",
  POST: "text-term-cyan",
  PUT: "text-term-amber",
  DELETE: "text-term-red",
};

function Tree({ nodes, prefix = "" }: { nodes: TreeNode[]; prefix?: string }) {
  return (
    <>
      {nodes.map((n, i) => {
        const last = i === nodes.length - 1;
        return (
          <div key={prefix + n.name}>
            <p className="whitespace-pre">
              <span className="text-fg-dim">
                {prefix}
                {prefix !== "" || nodes.length > 1 ? (last ? "└── " : "├── ") : ""}
              </span>
              <span className={n.type === "folder" ? "text-term-cyan" : "text-fg-muted"}>{n.name}</span>
            </p>
            {n.children && (
              <Tree nodes={n.children} prefix={prefix + (prefix !== "" || nodes.length > 1 ? (last ? "    " : "│   ") : "")} />
            )}
          </div>
        );
      })}
    </>
  );
}

function ArchitectureTab({ p }: { p: Project }) {
  return (
    <div className="space-y-6">
      <ol className="space-y-0">
        {p.layers.map((l, i) => (
          <li key={l.name} className="relative grid grid-cols-[6.5rem_1fr] gap-4 pb-4 last:pb-0">
            {i < p.layers.length - 1 && (
              <span aria-hidden className="absolute left-[0.3rem] top-5 h-[calc(100%-0.75rem)] w-px bg-ink-600" />
            )}
            <p className="flex items-center gap-2.5 font-mono text-xs text-fg-dim">
              <span className="relative z-10 h-[0.6875rem] w-[0.6875rem] rounded-full border border-ink-600 bg-ink-900" />
              {l.name}
            </p>
            <div>
              <p className="font-mono text-sm text-fg">{l.tech}</p>
              <p className="text-sm text-fg-muted">{l.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-1.5 border-t border-ink-700 pt-5">
        {p.stack.map((s) => (
          <span key={s} className="rounded border border-ink-700 bg-ink-800 px-2 py-0.5 font-mono text-xs text-fg-muted">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CodeTab({ p }: { p: Project }) {
  const c = p.code;
  return (
    <div className="space-y-5 font-mono text-[13px] leading-relaxed">
      {c.type === "endpoints" ? (
        <div>
          <p className="mb-2 text-xs text-fg-dim">{c.baseUrl}</p>
          <ul className="space-y-1">
            {c.endpoints.map((e) => (
              <li key={e.method + e.path} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[4rem_14rem_1fr]">
                <span className={METHOD_COLOR[e.method]}>{e.method}</span>
                <span className="truncate text-fg">{e.path}</span>
                <span className="col-start-2 text-fg-dim sm:col-start-auto">{e.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Tree nodes={c.tree} />
        </div>
      )}
      <pre className="overflow-x-auto rounded-md border border-ink-700 bg-ink px-4 py-3 text-fg-muted">
        <code>
          <span className="select-none text-term-green">$ </span>
          {c.sample}
        </code>
      </pre>
    </div>
  );
}

function EngineeringTab({ p }: { p: Project }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {p.engineering.map((g) => (
        <div key={g.title}>
          <p className="mb-3 text-sm font-medium text-fg">{g.title}</p>
          <ul className="space-y-2">
            {g.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
                <span className="mt-px font-mono text-term-green" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectInspector({ p, featured }: { p: Project; featured?: boolean }) {
  const [tab, setTab] = useState<TabId>("arquitetura");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const toolbar = (
    <div role="tablist" aria-label={`Detalhes de ${p.name}`} className="flex border-b border-ink-700 bg-ink-900 px-2">
      {TABS.map((t, i) => {
        const selected = tab === t.id;
        return (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`${baseId}-panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`relative px-3 py-2.5 font-mono text-xs transition-colors ${
              selected ? "text-fg" : "text-fg-dim hover:text-fg-muted"
            }`}
          >
            {selected && <span className="text-term-green">● </span>}
            {t.label}
            {selected && <span className="absolute inset-x-2 -bottom-px h-px bg-term-green" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <article id={`projeto-${p.id}`} className="scroll-mt-20">
      <TerminalWindow
        title={p.path}
        meta={
          p.status ? (
            <span className="flex items-center gap-1.5 text-term-green">
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" /> {p.status}
            </span>
          ) : (
            p.kind.toLowerCase()
          )
        }
        toolbar={toolbar}
      >
        <div className={`grid gap-0 ${featured ? "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" : ""}`}>
          <div className={`p-6 ${featured ? "border-b border-ink-700 lg:border-b-0 lg:border-r" : "border-b border-ink-700"}`}>
            <p className="font-mono text-xs text-fg-dim">{p.kind}</p>
            <h3 className={`mt-1.5 font-semibold tracking-tight text-fg ${featured ? "text-3xl" : "text-xl"}`}>{p.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.description}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-term-cyan underline decoration-term-cyan/30 underline-offset-4 transition-colors hover:decoration-term-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            role="tabpanel"
            id={`${baseId}-panel-${tab}`}
            aria-labelledby={`${baseId}-tab-${tab}`}
            tabIndex={0}
            className="min-h-[18rem] p-6 focus-visible:outline-offset-[-2px]"
          >
            {tab === "arquitetura" && <ArchitectureTab p={p} />}
            {tab === "codigo" && <CodeTab p={p} />}
            {tab === "engenharia" && <EngineeringTab p={p} />}
          </div>
        </div>
      </TerminalWindow>
    </article>
  );
}

export function Projects() {
  const [featured, ...rest] = PROJECTS;
  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader
        id="projetos"
        command="ls -la"
        title="Projetos"
        description="Um SaaS rodando em produção e dois projetos Java focados em arquitetura e persistência. Use as abas para ver a estrutura, o código e as decisões de cada um."
      />
      <div className="space-y-8">
        <ProjectInspector p={featured} featured />
        <div className="grid gap-8 lg:grid-cols-2">
          {rest.map((p) => (
            <ProjectInspector key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
