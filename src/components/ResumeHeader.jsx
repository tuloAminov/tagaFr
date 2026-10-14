import React from "react";
import { personalData } from "../data";
import { Mail, Send, MapPin } from "lucide-react";

/**
 * ResumeHeader
 * Top header of the resume page: Name, 2-3 sentences bio, and contact badges.
 */
export default function ResumeHeader() {
  const { name, bio, contacts } = personalData;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 mb-12 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Name & Introduction */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
              Резюме
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              {personalData.fullName || name}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-medium mt-1">
              {personalData.specialization}
            </p>
          </div>
        </div>

        {/* Bio description / Intro */}
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {bio}
        </p>

        {/* Contact info grid (3 columns: Email, Telegram, Location) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
          {/* Email */}
          <a
            href={`mailto:${contacts.email}`}
            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-500/30 transition-all text-zinc-300 hover:text-white group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1 leading-normal pb-0.5">
              <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider mb-0.5">Email</span>
              <span className="font-mono text-xs block text-zinc-200 group-hover:text-white break-all leading-relaxed">{contacts.email}</span>
            </div>
          </a>

          {/* Telegram */}
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-500/30 transition-all text-zinc-300 hover:text-white group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1 leading-normal pb-0.5">
              <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider mb-0.5">Telegram</span>
              <span className="font-mono text-xs block text-zinc-200 group-hover:text-white leading-relaxed">{contacts.telegramHandle}</span>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1 leading-normal pb-0.5">
              <span className="block text-[10px] uppercase font-mono text-zinc-500 tracking-wider mb-0.5">Локация</span>
              <span className="text-xs block text-zinc-200 leading-relaxed">{contacts.location}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
