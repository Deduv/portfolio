import { SKILLS } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader
        id="stack"
        command="cat stack.toml"
        title="Stack"
        description="O que uso e onde já usei. Cada item aponta o contexto real em que foi aplicado."
      />
      <div className="grid overflow-hidden rounded-lg border border-ink-700 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((g) => (
          <div
            key={g.id}
            className="border-b border-ink-700 bg-ink-900 p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <p className="font-mono text-sm">
              <span className="text-fg-dim">[</span>
              <span className="text-term-green">{g.id}</span>
              <span className="text-fg-dim">]</span>
            </p>
            <p className="mt-1 text-sm text-fg-muted">{g.label}</p>
            <ul className="mt-5 space-y-3">
              {g.items.map((s) => (
                <li key={s.name}>
                  <p className="font-mono text-sm text-fg">{s.name}</p>
                  <p className="text-xs text-fg-dim">{s.context}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
