import React, { useEffect, useRef } from "react";

/**
 * BackgroundGlow (Высокопроизводительный гибридный интерактивный фон):
 * 1. Фоновые 3D-сферы анимируются на чистом GPU через CSS @keyframes (orbFloat1 / orbFloat2)
 *    с аппаратным ускорением translate3d — нулевая нагрузка на JS-поток.
 * 2. Canvas оптимизирован: исключен тяжелый shadowBlur, вызывавший лаги на видеокартах.
 *    - Главная: аккуратная цифровая точечная матрица (Dot Matrix).
 *    - Резюме: физические частицы и тонкие паутинки созвездий в кибер-изумрудной палитре.
 */
export default function BackgroundGlow({ page = "home" }) {
  const canvasRef = useRef(null);
  const isHome = page === "home";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smoothing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // =========================================================================
    // ГЛАВНАЯ СТРАНИЦА: ТОЧЕЧНАЯ МАТРИЦА (Оптимизирована для 120 FPS)
    // =========================================================================
    let tick = 0;
    const spacing = 38;
    const dotMouseRadius = 170;

    const paletteHome = {
      baseDot: "rgba(255, 255, 255, 0.07)",
      activeDot: "rgba(168, 85, 247, ",
      glowAccent: "rgba(56, 189, 248, ",
      halo: "rgba(168, 85, 247, 0.14)",
    };

    const renderDotMatrix = () => {
      tick += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // Один мягкий радиальный ореол под курсором (без тяжелого shadowBlur)
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 10,
          mouse.x, mouse.y, dotMouseRadius
        );
        gradient.addColorStop(0, paletteHome.halo);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dotMouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * spacing;
          const originY = r * spacing;

          const dx = mouse.x - originX;
          const dy = mouse.y - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const ambientWave = Math.sin(tick + (c + r) * 0.2) * 0.025;

          let dotX = originX;
          let dotY = originY;
          let radius = 1.0;
          let alpha = 0.07 + ambientWave;
          let fillStyle = paletteHome.baseDot;

          if (mouse.active && dist < dotMouseRadius) {
            const factor = 1 - dist / dotMouseRadius;
            const easeFactor = factor * factor;

            dotX -= (dx / dist) * easeFactor * 9;
            dotY -= (dy / dist) * easeFactor * 9;

            radius = 1.0 + easeFactor * 2.2;
            alpha = 0.15 + easeFactor * 0.85;

            fillStyle = easeFactor > 0.4
              ? `${paletteHome.activeDot}${alpha})`
              : `${paletteHome.glowAccent}${alpha})`;
          }

          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
      }
    };

    // =========================================================================
    // СТРАНИЦА РЕЗЮМЕ: СОЗВЕЗДИЯ И ПАУТИНКИ (Оптимизированы без просадок FPS)
    // =========================================================================
    const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
    const connectionDistance = 140;
    const particleMouseRadius = 185;

    const paletteResume = {
      primary: "rgba(16, 185, 129, ",   // Cyber Emerald
      secondary: "rgba(45, 212, 191, ",  // Teal
      bright: "rgba(110, 231, 183, ",    // Mint
      line: "rgba(52, 211, 153, ",      // Mint line
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 2.2;
        this.color = Math.random() > 0.4 ? paletteResume.primary : paletteResume.secondary;
        this.baseAlpha = Math.random() * 0.3 + 0.6;
      }

      update() {
        if (mouse.active) {
          const dx = mouse.targetX - this.x;
          const dy = mouse.targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < particleMouseRadius) {
            const force = (1 - dist / particleMouseRadius) * 2.8;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.baseAlpha})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const renderConstellations = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${paletteResume.line}${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Связь с курсором мыши
        if (mouse.active) {
          const dx = p1.x - mouse.targetX;
          const dy = p1.y - mouse.targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < particleMouseRadius) {
            const alpha = (1 - dist / particleMouseRadius) * 0.42;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.targetX, mouse.targetY);
            ctx.strokeStyle = `${paletteResume.bright}${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Центр-узел паутинки на курсоре
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.targetX, mouse.targetY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110, 231, 183, 0.75)";
        ctx.fill();
      }
    };

    // Главный цикл анимации
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isHome) {
        renderDotMatrix();
      } else {
        renderConstellations();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHome]);

  return (
    <div
      aria-hidden="true"
      className="bg-glow-container pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* 1. Интерактивный Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 2. Аппаратно ускоренные через чистый CSS 3D-сферы (без JS-потока) */}
      <div
        className={`absolute -top-28 -left-20 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] rounded-full filter blur-[100px] sm:blur-[140px] mix-blend-screen bg-orb-float-1 transition-colors duration-700 ${
          isHome ? "bg-indigo-600/20" : "bg-emerald-600/18"
        }`}
      />

      <div
        className={`absolute top-1/3 -right-28 w-[380px] sm:w-[560px] h-[380px] sm:h-[560px] rounded-full filter blur-[110px] sm:blur-[150px] mix-blend-screen bg-orb-float-2 transition-colors duration-700 ${
          isHome ? "bg-purple-600/22" : "bg-teal-600/18"
        }`}
      />

      <div
        className={`absolute -bottom-32 left-1/4 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full filter blur-[90px] sm:blur-[130px] mix-blend-screen transition-colors duration-700 ${
          isHome ? "bg-cyan-600/14" : "bg-emerald-400/12"
        }`}
      />

      {/* 3. Виньетка */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#08090d]/85 pointer-events-none" />
    </div>
  );
}
