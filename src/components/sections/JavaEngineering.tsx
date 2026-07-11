'use client';

import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import TechBadge from '@/components/ui/TechBadge';
import { JAVA_PROJECTS } from '@/lib/constants';
import {
  Folder,
  FileCode,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

type TreeNode = {
  name: string;
  type: 'folder' | 'file';
  children?: readonly TreeNode[];
};

function renderTree(nodes: readonly TreeNode[], depth = 0) {
  return nodes.map((node) => {
    const paddingLeft = depth * 16;

    if (node.type === 'folder') {
      return (
        <div key={`${depth}-${node.name}`}>
          <div
            className="flex items-center gap-1.5 py-0.5 font-mono text-sm"
            style={{ paddingLeft }}
          >
            <Folder className="h-4 w-4 flex-shrink-0 text-[#7c5cfc]" />
            <span className="text-[#848a9a]">{node.name}</span>
          </div>
          {node.children && renderTree(node.children, depth + 1)}
        </div>
      );
    }

    return (
      <div
        key={`${depth}-${node.name}`}
        className="flex items-center gap-1.5 py-0.5 font-mono text-sm"
        style={{ paddingLeft }}
      >
        <FileCode className="h-4 w-4 flex-shrink-0 text-[#1bd4d4]" />
        <span className="text-[#848a9a]/70">{node.name}</span>
      </div>
    );
  });
}

export function JavaEngineering() {
  return (
    <section id="java" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle title="Projetos Java" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {JAVA_PROJECTS.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={index * 0.15}>
              <div className="overflow-hidden rounded-xl border border-white/5">
                {/* Title bar */}
                <div className="flex h-10 items-center border-b border-white/5 bg-[#0d0f14] px-4">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="mx-auto font-mono text-xs text-[#848a9a]">
                    {project.name}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col bg-[#111318] md:flex-row">
                  {/* File explorer */}
                  <div className="max-h-80 w-full overflow-y-auto border-b border-white/5 p-4 md:w-2/5 md:border-b-0 md:border-r">
                    {renderTree(project.directoryTree)}
                  </div>

                  {/* Patterns */}
                  <div className="w-full p-4 md:w-3/5">
                    <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#848a9a]">
                      Padrões Aplicados
                    </h4>

                    <ul className="space-y-2">
                      {project.patterns.map((pattern) => (
                        <li
                          key={pattern}
                          className="flex items-start gap-2"
                        >
                          <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7c5cfc]" />
                          <span className="text-sm text-[#f2f2f2]/80">
                            {pattern}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <TechBadge
                          key={tech}
                          label={tech}
                          variant={i % 2 === 0 ? 'accent' : 'cyan'}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-white/5 bg-[#111318] px-4 py-3">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#7c5cfc] transition-colors hover:underline"
                  >
                    Ver Repositório
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
