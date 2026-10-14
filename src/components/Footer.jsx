import React from "react";
import { personalData } from "../data";
import { Mail, Sparkles, Heart } from "lucide-react";

/**
 * Footer
 * Minimalist developer footer with copyright, email contact,
 * and AI-assistant x Developer attribution line.
 */
export default function Footer({ page = "home" }) {
  const currentYear = new Date().getFullYear();
  const isResume = page === "resume";
  const isHome = page === "home";

  return (
    <footer className={`w-full mt-auto border-t border-white/[0.06] text-zinc-400 text-xs sm:text-sm no-print ${
      isHome ? "py-2 sm:py-3" : "py-8 sm:py-12"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">
        
        {/* Left: Copyright & Name */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-zinc-400">
          <span>
            © {currentYear} {personalData.footer.copyrightName}
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <a
            href={`mailto:${personalData.contacts.email}`}
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors duration-200 group"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
            <span className="font-mono text-xs">{personalData.contacts.email}</span>
          </a>
        </div>

        {/* Right: AI-Assistant x Developer credit */}
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
          <span>Сайт разработан</span>
          <span className={`inline-flex items-center gap-1 font-medium ${isResume ? "text-emerald-300" : "text-purple-300"}`}>
            <Sparkles className="w-3 h-3" />
            {personalData.footer.aiAssistantName} (AI-ассистент)
          </span>
          <span>x</span>
          <span className="text-zinc-200 font-medium">{personalData.footer.developerName}</span>
        </div>

      </div>
    </footer>
  );
}
