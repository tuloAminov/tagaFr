import React from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

/**
 * EducationCard
 * Represents an education entry: Degree, University, Year, Major/Field.
 */
export default function EducationCard({ education }) {
  const { degree, institution, year, major } = education;

  return (
    <div className="glass-card rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/70 group relative overflow-hidden">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              {degree}
            </h3>
            <p className="text-sm font-semibold text-emerald-400 mt-0.5">
              {institution}
            </p>
          </div>
        </div>

        {/* Year badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 whitespace-nowrap">
          <Calendar className="w-3 h-3 text-emerald-400" />
          <span>{year}</span>
        </div>
      </div>

      {major && (
        <p className="text-zinc-300 text-sm mt-3 pl-11">
          <span className="text-zinc-500 font-mono text-xs block mb-0.5 uppercase tracking-wide">
            Специализация:
          </span>
          {major}
        </p>
      )}
    </div>
  );
}
