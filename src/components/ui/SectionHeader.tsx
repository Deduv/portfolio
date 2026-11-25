type SectionHeaderProps = {
  id: string;
  command: string;
  title: string;
  description?: string;
};

/** Section heading styled as a shell prompt followed by a readable title. */
export function SectionHeader({ id, command, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="font-mono text-sm text-fg-dim">
        <span className="text-term-green">~/{id}</span>
        <span className="mx-2 text-fg-dim">$</span>
        <span className="text-fg-muted">{command}</span>
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-fg-muted">{description}</p>}
    </header>
  );
}
