import React from "react";
import { motion } from "framer-motion";
import { personalData } from "../data";
import { Sparkles } from "lucide-react";

/**
 * Navbar
 * Top navigation bar with "Главная" and "Резюме" tabs, brand indicator and active animation.
 */
export default function Navbar({ activePage, setActivePage }) {
  const isResume = activePage === "resume";

  const isHome = activePage === "home";

  return (
    <header className="sticky top-0 z-50 w-full no-print">
      <div className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${
        isHome ? "pt-2 sm:pt-3 pb-1 sm:pb-2" : "pt-4 pb-3"
      }`}>
        <nav className="glass-nav rounded-2xl px-4 py-2 sm:px-6 flex items-center justify-between border border-white/10 shadow-lg shadow-black/20">
          
          {/* Brand Logo / Nickname */}
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2.5 text-left group transition-all"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
              isResume 
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/20 shadow-lg"
                : "bg-gradient-to-br from-purple-500 to-cyan-400 text-white shadow-purple-500/20 shadow-lg"
            }`}>
              {personalData.brand.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-200 group-hover:text-white transition-colors">
                {personalData.brand}
              </span>
            </div>
          </button>

          {/* Nav Tabs: Главная & Резюме */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActivePage("home")}
              className={`relative px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activePage === "home"
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {activePage === "home" && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 border border-purple-500/30 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Главная
              </span>
            </button>

            <button
              onClick={() => setActivePage("resume")}
              className={`relative px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activePage === "resume"
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {activePage === "resume" && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 border border-emerald-500/30 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                Резюме
                <span className={`w-1.5 h-1.5 rounded-full ${isResume ? "bg-emerald-400" : "bg-purple-400"}`} />
              </span>
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}
