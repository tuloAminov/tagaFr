import React, { useState } from "react";
import { 
  experiences, 
  projects, 
  educations, 
  techStack 
} from "../data";
import ResumeHeader from "./ResumeHeader";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import EducationCard from "./EducationCard";
import TechTag from "./TechTag";
import FloatingPdfButton from "./FloatingPdfButton";
import { 
  ChevronRight, 
  Layers, 
  GraduationCap, 
  Cpu
} from "lucide-react";

/**
 * Resume
 * Complete resume page view with Experience, Projects, Education, and Tech Stack.
 * Uses pure GPU-accelerated CSS animations (translate3d/opacity) for buttery smooth 60+ FPS performance.
 */
export default function Resume() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Все" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Базы данных" },
    { id: "devops", label: "DevOps / Инфра" },
    { id: "ai", label: "AI / ML" },
  ];

  const filteredTech = activeCategory === "all"
    ? techStack
    : techStack.filter((t) => t.category === activeCategory);

  return (
    <div className="resume-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header with Bio & Contacts */}
      <ResumeHeader />

      <div className="space-y-16">
        {/* 2. СЕКЦИЯ "ОПЫТ" (с иконкой стрелки >) */}
        <section 
          className="relative animate-fade-up"
          style={{ animationDelay: "40ms" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-mono font-bold">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              ОПЫТ
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent ml-4" />
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>

        {/* 3. СЕКЦИЯ "ПРОЕКТЫ" */}
        <section 
          className="relative animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-mono font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              ПРОЕКТЫ
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent ml-4" />
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* 4. СЕКЦИЯ "ОБРАЗОВАНИЕ" */}
        <section 
          className="relative animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-mono font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              ОБРАЗОВАНИЕ
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500/30 to-transparent ml-4" />
          </div>

          <div className="space-y-4">
            {educations.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
        </section>

        {/* 5. СЕКЦИЯ "СТЕК" */}
        <section 
          className="relative animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-mono font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                СТЕК
              </h2>
            </div>

            {/* Category Filter Pills (no-print) */}
            <div className="hidden sm:flex items-center gap-1.5 no-print">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all duration-150 ${
                    activeCategory === cat.id
                      ? "bg-emerald-500 text-white font-medium shadow-sm shadow-emerald-500/30"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-7">
            <div className="flex flex-wrap gap-2.5">
              {filteredTech.map((tech) => (
                <TechTag
                  key={tech.name}
                  name={tech.name}
                  category={tech.category}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Floating Bottom-Right PDF Download Button */}
      <FloatingPdfButton />
    </div>
  );
}
