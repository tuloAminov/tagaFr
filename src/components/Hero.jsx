import React, { useState } from "react";
import { motion } from "framer-motion";
import { personalData } from "../data";
import { 
  FileText, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Code2, 
  Terminal, 
  Sparkles 
} from "lucide-react";
import { GithubIcon, TelegramIcon } from "./Icons";

/**
 * Hero
 * Main landing page hero section with high-impact typography,
 * developer-friendly aesthetics, and interactive call-to-action buttons.
 */
export default function Hero({ onNavigateResume }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.contacts.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-full flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 py-2 sm:py-4 my-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col items-center justify-center my-auto"
      >
        {/* Large Logo / Nickname */}
        <motion.div variants={itemVariants} className="mb-2 sm:mb-3">
          <div className="relative inline-block group">
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 select-none">
              &lt;{personalData.brand} /&gt;
            </h2>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-md opacity-40 group-hover:opacity-100 transition duration-500 -z-10" />
          </div>
        </motion.div>

        {/* Full Name in Title Case (First letter capitalized, reduced size) */}
        <motion.h1
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-snug selection:bg-purple-500/30"
        >
          {personalData.name}
        </motion.h1>

        {/* Specialization */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-zinc-400 font-medium mb-5 sm:mb-6 max-w-xl"
        >
          {personalData.specialization.split("•").map((part, index, array) => (
            <React.Fragment key={index}>
              <span className="text-zinc-200 font-semibold hover:text-purple-300 transition-colors">
                {part.trim()}
              </span>
              {index < array.length - 1 && (
                <span className="text-purple-500/60 font-bold">•</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-none mb-5 sm:mb-6"
        >
          {/* Resume Page Button */}
          <button
            onClick={onNavigateResume}
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/30"
          >
            <FileText className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span>Резюме</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>

          {/* Telegram Button */}
          <a
            href={personalData.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-cyan-500/40 hover:shadow-md hover:shadow-cyan-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
          >
            <TelegramIcon className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:translate-x-0.5" />
            <span>Telegram</span>
          </a>

          {/* GitHub Button */}
          <a
            href={personalData.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-purple-500/40 hover:shadow-md hover:shadow-purple-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 backdrop-blur-sm"
          >
            <GithubIcon className="w-3.5 h-3.5 text-purple-400 transition-transform group-hover:rotate-6" />
            <span>GitHub</span>
          </a>
        </motion.div>

        {/* Quick Email Copy Snippet */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all text-xs font-mono text-zinc-400 mb-4 sm:mb-5"
        >
          <span className="text-zinc-500">$ mailto:</span>
          <span className="text-zinc-300">{personalData.contacts.email}</span>
          <button
            onClick={handleCopyEmail}
            title="Скопировать email"
            className="ml-1.5 p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </motion.div>

        {/* Minimalist Tech Badges Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg text-zinc-500 text-[11px] font-mono"
        >
          {["React 19", "TypeScript", "Node.js", "TailwindCSS", "PostgreSQL", "Docker", "Python"].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-zinc-900/50 border border-white/5 hover:border-white/15 hover:text-zinc-300 transition-colors"
            >
              #{tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
