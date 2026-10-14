import React from "react";

/**
 * TechTag
 * Clean developer badge for technologies and skills.
 */
export default function TechTag({ name, category, highlighted = false }) {
  const getCategoryColor = () => {
    switch (category) {
      case "frontend":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40";
      case "backend":
        return "text-teal-400 border-teal-500/20 bg-teal-500/5 hover:border-teal-500/40";
      case "database":
        return "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40";
      case "devops":
        return "text-emerald-300 border-emerald-400/20 bg-emerald-400/5 hover:border-emerald-400/40";
      case "ai":
        return "text-emerald-300 border-emerald-400/30 bg-emerald-400/10 hover:border-emerald-400/60 font-semibold";
      default:
        return "text-zinc-300 border-white/10 bg-white/[0.03] hover:border-white/20";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono border transition-all duration-200 select-none badge-print ${getCategoryColor()} ${
        highlighted ? "ring-1 ring-emerald-500/40" : ""
      }`}
    >
      {name}
    </span>
  );
}
