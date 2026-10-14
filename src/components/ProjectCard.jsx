import React from "react";
import { ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "./Icons";
import TechTag from "./TechTag";

/**
 * ProjectCard
 * Displays a single project with title, description, tech stack tags, and external links.
 */
export default function ProjectCard({ project }) {
  const { title, description, stack, link, demo } = project;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/70 group relative overflow-hidden">
      {/* Top ambient hover line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

      <div>
        {/* Header: Title and Links */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-1.5 no-print">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub репозиторий"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-300 hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-5">
          {description}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
