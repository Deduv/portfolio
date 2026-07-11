'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionTitle({ title, subtitle, id }: SectionTitleProps) {
  return (
    <AnimateOnScroll className="flex flex-col items-center text-center mb-12 md:mb-16">
      <h2
        id={id}
        className="text-3xl md:text-4xl font-bold text-[#f2f2f2]"
      >
        {title}
      </h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-[#7c5cfc]" />
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-[#848a9a]">
          {subtitle}
        </p>
      )}
    </AnimateOnScroll>
  );
}
