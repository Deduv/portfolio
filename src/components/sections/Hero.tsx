'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/components/ui/SocialIcons';

const socialLinks = [
  { href: PERSONAL.links.github, icon: GithubIcon, label: 'GitHub' },
  { href: PERSONAL.links.linkedin, icon: LinkedinIcon, label: 'LinkedIn' },
  { href: PERSONAL.links.twitter, icon: TwitterIcon, label: 'Twitter' },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        {/* Left — text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium tracking-wide text-emerald-400">
                {PERSONAL.statusBadge}
              </span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-bold text-[#f2f2f2] md:text-6xl"
          >
            {PERSONAL.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="mt-3 text-xl font-light text-[#848a9a] md:text-2xl"
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg text-base leading-relaxed text-[#848a9a]"
          >
            Foco em engenharia de software, arquitetura de APIs e deploy em
            produção.
          </motion.p>

          {/* Social links */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg border border-white/10 p-3 text-[#848a9a] transition hover:border-[#7c5cfc]/50 hover:bg-[#7c5cfc]/5 hover:text-[#f2f2f2]"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <a
              href="/curriculo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#7c5cfc] px-5 py-3 text-sm font-medium text-[#7c5cfc] transition hover:bg-[#7c5cfc]/10"
            >
              Visualizar CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          {/* Gradient orb */}
          <div className="absolute -z-10 h-80 w-80 rounded-full bg-gradient-radial from-[#7c5cfc]/20 to-transparent blur-3xl" />

          <Image
            src={PERSONAL.avatar}
            alt={PERSONAL.name}
            width={320}
            height={320}
            priority
            className="rounded-full ring-2 ring-[#7c5cfc]/20 ring-offset-4 ring-offset-[#0d0f14]"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <ChevronDown
          size={24}
          className="animate-bounce text-[#848a9a]/50"
        />
      </div>
    </section>
  );
}
