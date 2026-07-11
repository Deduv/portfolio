'use client';

interface TechBadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'cyan';
}

const variantStyles: Record<
  NonNullable<TechBadgeProps['variant']>,
  { bg: string; border: string; text: string }
> = {
  default: {
    bg: 'rgba(255,255,255,0.04)',
    border: 'rgba(255,255,255,0.08)',
    text: '#848a9a',
  },
  accent: {
    bg: 'rgba(124,92,252,0.1)',
    border: 'rgba(124,92,252,0.2)',
    text: '#7c5cfc',
  },
  cyan: {
    bg: 'rgba(27,212,212,0.1)',
    border: 'rgba(27,212,212,0.2)',
    text: '#1bd4d4',
  },
};

export default function TechBadge({ label, variant = 'default' }: TechBadgeProps) {
  const style = variantStyles[variant];

  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-mono leading-none border"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
    >
      {label}
    </span>
  );
}
