import React, { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";
import { personalData } from "../data";

/**
 * FloatingPdfButton
 * Floating action button at bottom-right of the resume page.
 * Uses exact glass-card background as project cards.
 * Directly downloads the exact live resume as a PDF file:
 * - Hidden behind root (z-index: -9999, top: 0, left: 0) so the screen NEVER flashes white
 * - Captured at document coordinates (0, 0) so the PDF is fully rendered (NEVER empty)
 * - Compact margins prevent extra blank trailing pages
 * - Contact text line-height prevents any clipping
 */
export default function FloatingPdfButton() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDirectDownload = async () => {
    const resumeEl = document.querySelector(".resume-container");
    if (!resumeEl) {
      window.print();
      return;
    }

    setDownloading(true);

    let wrapper = null;

    try {
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default || html2pdfModule;

      // 1. Create a background wrapper positioned at (0, 0) behind the dark website
      wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.top = "0";
      wrapper.style.left = "0";
      wrapper.style.width = "780px";
      wrapper.style.zIndex = "-9999";
      wrapper.style.pointerEvents = "none";
      wrapper.style.backgroundColor = "#ffffff";
      wrapper.style.overflow = "visible";

      // 2. Clone the live resume container
      const clone = resumeEl.cloneNode(true);
      clone.classList.add("pdf-export-mode");
      clone.style.width = "100%";
      clone.style.margin = "0";

      // Remove interactive / floating UI elements from the clone
      const noPrintElements = clone.querySelectorAll(".no-print, .floating-pdf-btn, button");
      noPrintElements.forEach((el) => el.remove());

      // Ensure all elements in the clone have opacity: 1 and no animation delays
      clone.querySelectorAll("*").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.transition = "none";
        el.style.animation = "none";
      });

      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Give browser a micro-tick to compute styles
      await new Promise((resolve) => setTimeout(resolve, 80));

      const cleanName = (personalData.fullName || personalData.name || "Резюме").replace(/\s+/g, "_");

      const opt = {
        margin: [6, 8, 6, 8],
        filename: `${cleanName}_Резюме.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: 800,
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        // Prevents extra trailing blank page
        pagebreak: { mode: ["css", "legacy"] },
      };

      await html2pdf().set(opt).from(clone).save();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.warn("Direct PDF export fallback:", err);
      window.print();
    } finally {
      if (wrapper && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
      setDownloading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print floating-pdf-btn">
      <button
        onClick={handleDirectDownload}
        disabled={downloading}
        title="Скачать резюме в PDF"
        aria-label="Скачать резюме в PDF"
        className="glass-card rounded-full flex items-center gap-2 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium text-zinc-200 hover:text-white hover:border-emerald-500/40 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all duration-200 group select-none cursor-pointer disabled:opacity-75"
      >
        {downloading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span className="text-emerald-400 font-semibold tracking-wider">Создание PDF...</span>
          </>
        ) : downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span className="text-emerald-400 font-semibold tracking-wider">Скачано</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
            <span className="font-semibold tracking-wider">PDF</span>
          </>
        )}
      </button>
    </div>
  );
}
