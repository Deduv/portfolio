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

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 text-center text-sm text-[#848a9a]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Social icons */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#848a9a] transition hover:text-[#f2f2f2]"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Email */}
        <p className="mt-4">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="transition hover:text-[#f2f2f2]"
          >
            {PERSONAL.email}
          </a>
        </p>

        {/* Copyright */}
        <p className="mt-2">Eduardo Santana &middot; 2026</p>
      </div>
    </footer>
  );
}
