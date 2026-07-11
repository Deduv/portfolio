'use client';

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import GlowCard from '@/components/ui/GlowCard';
import TechBadge from '@/components/ui/TechBadge';
import { SAAS_PROJECT } from '@/lib/constants';
import { GithubIcon } from '@/components/ui/SocialIcons';
import {
  ExternalLink,
  FileCode,
  Server,
  Database,
  Shield,
  Globe,
  Container,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Arquitetura', 'Infraestrutura', 'Stack', 'Links'] as const;
type Tab = (typeof TABS)[number];

const INFRA_ICONS: Record<string, React.ElementType> = {
  Vercel: Globe,
  'AWS EC2': Server,
  Docker: Container,
  Nginx: Shield,
  'SSL/HTTPS': Shield,
  JWT: Shield,
};

function ArchBlock({
  icon: Icon,
  name,
  detail,
}: {
  icon: React.ElementType;
  name: string;
  detail: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#0d0f14] p-4 text-center">
      <Icon className="h-6 w-6 text-[#7c5cfc]" />
      <span className="text-sm font-bold text-[#f2f2f2]">{name}</span>
      <span className="text-xs text-[#848a9a]">{detail}</span>
    </div>
  );
}

function ArchArrow() {
  return (
    <>
      <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-[#7c5cfc] md:block" />
      <ArrowRight className="h-5 w-5 flex-shrink-0 rotate-90 text-[#7c5cfc] md:hidden" />
    </>
  );
}

function TabArquitetura() {
  const { frontend, api, database } = SAAS_PROJECT.architecture;
  return (
    <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
      <ArchBlock icon={FileCode} name={frontend.name} detail={frontend.detail} />
      <ArchArrow />
      <ArchBlock icon={Server} name={api.name} detail={api.detail} />
      <ArchArrow />
      <ArchBlock icon={Database} name={database.name} detail={database.detail} />
    </div>
  );
}

function TabInfraestrutura() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {SAAS_PROJECT.infrastructure.map((item) => {
        const Icon = INFRA_ICONS[item.name] ?? Server;
        return (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-[#0d0f14] p-4 text-center"
          >
            <Icon className="h-5 w-5 text-[#1bd4d4]" />
            <span className="text-sm font-bold text-[#f2f2f2]">{item.name}</span>
            <span className="text-xs text-[#848a9a]">{item.role}</span>
          </div>
        );
      })}
    </div>
  );
}

function TabStack() {
  return (
    <div className="flex flex-wrap gap-2">
      {SAAS_PROJECT.stack.map((tech, i) => (
        <TechBadge
          key={tech}
          label={tech}
          variant={i % 2 === 0 ? 'accent' : 'cyan'}
        />
      ))}
    </div>
  );
}

function TabLinks() {
  const links = [
    {
      label: 'Testar MVP',
      href: SAAS_PROJECT.links.mvp,
      icon: ExternalLink,
      primary: true,
    },
    {
      label: 'API Docs',
      href: SAAS_PROJECT.links.apiDocs,
      icon: ExternalLink,
      primary: false,
    },
    {
      label: 'Código Frontend',
      href: SAAS_PROJECT.links.frontend,
      icon: GithubIcon,
      primary: false,
    },
    {
      label: 'Código Backend',
      href: SAAS_PROJECT.links.backend,
      icon: GithubIcon,
      primary: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors ${
              link.primary
                ? 'bg-[#7c5cfc] text-white hover:bg-[#6a4ee8]'
                : 'border border-[#7c5cfc] text-[#7c5cfc] hover:bg-[#7c5cfc]/10'
            }`}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

const tabContent: Record<Tab, () => React.JSX.Element> = {
  Arquitetura: TabArquitetura,
  Infraestrutura: TabInfraestrutura,
  Stack: TabStack,
  Links: TabLinks,
};

export function SaasShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('Arquitetura');
  const ActivePanel = tabContent[activeTab];

  return (
    <section id="saas" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle title="Produto em Produção" />

        <AnimateOnScroll>
          <GlowCard className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/10 px-3 py-1 text-xs font-medium text-[#22c55e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  {SAAS_PROJECT.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#f2f2f2]">
                  {SAAS_PROJECT.name}
                </h3>
              </div>
            </div>

            <p className="mb-6 text-sm text-[#848a9a]">
              {SAAS_PROJECT.description}
            </p>

            {/* Tab selector */}
            <div className="mb-6 flex gap-1 rounded-xl bg-[#0d0f14] p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative rounded-lg px-4 py-2 text-sm transition-colors ${
                    activeTab === tab
                      ? 'bg-[#1e2230] text-[#f2f2f2]'
                      : 'text-[#848a9a] hover:text-[#f2f2f2]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ActivePanel />
              </motion.div>
            </AnimatePresence>

            {/* Challenges */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#848a9a]">
                Desafios Resolvidos
              </h4>
              <div className="flex flex-wrap gap-2">
                {SAAS_PROJECT.challenges.map((challenge) => (
                  <span
                    key={challenge}
                    className="rounded-full border border-white/5 bg-[#0d0f14] px-3 py-1 text-xs text-[#848a9a]"
                  >
                    {challenge}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
