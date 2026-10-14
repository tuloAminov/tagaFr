import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle } from "lucide-react";

/**
 * ExperienceCard
 * Represents a single work experience entry with role, company, dates and bulleted duties.
 */
export default function ExperienceCard({ experience }) {
  const { role, company, period, location, responsibilities } = experience;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/70 group relative overflow-hidden">
      {/* Subtle hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/40 transition-all duration-500" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
            {role}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-emerald-400 text-sm">
              {company}
            </span>
            {location && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  {location}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Period badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 whitespace-nowrap">
          <Calendar className="w-3 h-3 text-emerald-400" />
          <span>{period}</span>
        </div>
      </div>

      {/* Responsibilities list */}
      <ul className="space-y-2 mt-4 text-zinc-300 text-sm leading-relaxed">
        {responsibilities.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/70 mt-2 shrink-0 group-hover:bg-emerald-400 transition-colors" />
            <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
