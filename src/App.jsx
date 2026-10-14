import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Resume from "./components/Resume";
import Footer from "./components/Footer";
import BackgroundGlow from "./components/BackgroundGlow";

/**
 * App
 * Main application component managing active page state (Home vs Resume),
 * synchronized with URL hash.
 * Page transitions use hardware-accelerated CSS (translate3d/opacity) for 60+ FPS zero-lag switching.
 */
export default function App() {
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash === "#resume") {
      return "resume";
    }
    return "home";
  });

  // Sync with browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#resume") {
        setActivePage("resume");
      } else {
        setActivePage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Update hash and scroll to top when page changes
  const navigateTo = (page) => {
    setActivePage(page);
    window.location.hash = page === "resume" ? "#resume" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = activePage === "home";

  return (
    <div className={`relative flex flex-col bg-[#08090d] text-zinc-100 selection:bg-purple-500/30 selection:text-white ${
      isHome 
        ? "h-screen h-[100dvh] max-h-screen overflow-hidden justify-between" 
        : "min-h-screen overflow-y-auto"
    }`}>
      {/* Dynamic 3D blurred gradient background */}
      <BackgroundGlow page={activePage} />

      {/* Top Navigation */}
      <Navbar activePage={activePage} setActivePage={navigateTo} />

      {/* Main Content Area with Pure GPU-Accelerated CSS Transitions */}
      <main className={`relative z-10 flex-1 flex flex-col w-full ${
        isHome ? "min-h-0 overflow-hidden justify-center" : ""
      }`}>
        <div key={activePage} className="animate-page-enter flex-1 flex flex-col w-full">
          {activePage === "home" ? (
            <Hero onNavigateResume={() => navigateTo("resume")} />
          ) : (
            <Resume />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer page={activePage} />
    </div>
  );
}
