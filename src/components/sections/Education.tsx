'use client';

import { GraduationCap, Wrench } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import TechBadge from '@/components/ui/TechBadge';
import { EDUCATION } from '@/lib/constants';

function getIcon(title: string) {
  if (title.toLowerCase().includes('mecânica') || title.toLowerCase().includes('mec')) {
    return Wrench;
  }
  return GraduationCap;
}

export function Education() {
  return (
    <section id="formacao" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle title="Formação" />

        {/* Timeline */}
        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

          {EDUCATION.map((item, idx) => {
            const Icon = getIcon(item.title);
            const isLeft = idx % 2 === 0;

            return (
              <AnimateOnScroll
                key={item.title}
                delay={idx * 0.15}
                className="relative mb-10 last:mb-0"
              >
                {/* Timeline node */}
                <div
                  className={`absolute top-6 left-0 z-10 h-4 w-4 rounded-full border-2 border-[#7c5cfc] bg-[#0d0f14] md:left-1/2 md:-translate-x-1/2`}
                />

                {/* Card */}
                <div
                  className={`ml-8 rounded-xl border border-white/5 bg-[#151821] p-5 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-6' : 'md:ml-auto md:pl-6'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <Icon size={18} className="text-[#7c5cfc]" />
                    <h3 className="font-semibold text-[#f2f2f2]">
                      {item.title}
                    </h3>
                  </div>

                  {item.institution && (
                    <p className="text-sm text-[#848a9a]">
                      {item.institution}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-[#848a9a]">
                    {item.period}
                  </p>

                  <div className="mt-3">
                    {item.status === 'em andamento' ? (
                      <TechBadge label="Em Andamento" variant="accent" />
                    ) : (
                      <TechBadge label="Concluído" variant="cyan" />
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
