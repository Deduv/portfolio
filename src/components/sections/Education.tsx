import { EDUCATION } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Education() {
  return (
    <section id="formacao" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeader id="formacao" command="git log --oneline formacao" title="Formação" />
      <ol className="max-w-3xl font-mono text-sm">
        {EDUCATION.map((e, i) => {
          const ongoing = e.status === "em andamento";
          return (
            <li key={e.title} className="relative grid grid-cols-[1.25rem_1fr] gap-4 pb-8 last:pb-0">
              {i < EDUCATION.length - 1 && (
                <span aria-hidden className="absolute left-[0.4rem] top-5 h-[calc(100%-0.5rem)] w-px bg-ink-600" />
              )}
              <span
                aria-hidden
                className={`mt-1 h-[0.875rem] w-[0.875rem] rounded-full border-2 ${
                  ongoing ? "border-term-green bg-term-green/20" : "border-ink-600 bg-ink"
                }`}
              />
              <div>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-fg-dim">{e.period}</span>
                  <span
                    className={`rounded px-1.5 py-px text-[11px] ${
                      ongoing ? "bg-term-green/10 text-term-green" : "bg-ink-800 text-fg-dim"
                    }`}
                  >
                    {ongoing ? "HEAD → em andamento" : "concluído"}
                  </span>
                </p>
                <p className="mt-2 font-sans text-lg font-medium text-fg">{e.title}</p>
                <p className="font-sans text-fg-muted">{e.institution}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
