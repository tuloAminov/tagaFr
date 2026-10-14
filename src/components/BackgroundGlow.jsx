import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * BackgroundGlow (Гибридный интерактивный фон):
 * 1. Главная страница: Вариант 2 — Интерактивная цифровая точечная матрица (Dot Matrix Grid)
 *    с неоновой фиолетово-голубой подсветкой при движении курсора.
 * 2. Страница резюме: Вариант 3 — Усиленные частицы-созвездия (Constellation Particles)
 *    в кибер-изумрудной палитре: более крупные, яркие микрочастицы и четкие связывающие паутинки.
 */
export default function BackgroundGlow({ page = "home" }) {
  const canvasRef = useRef(null);
  const isHome = page === "home";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
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
    // ВАРИАНТ 2: ИНТЕРАКТИВНАЯ ТОЧЕЧНАЯ МАТРИЦА (ДЛЯ ГЛАВНОЙ)
    // =========================================================================
    let tick = 0;
    const spacing = 36;
    const dotMouseRadius = 175;

    const paletteHome = {
      baseDot: "rgba(255, 255, 255, 0.08)",
      activeDot: "rgba(168, 85, 247, ",     // purple
      glowAccent: "rgba(56, 189, 248, ",   // cyan
      ring: "rgba(168, 85, 247, 0.16)",
    };

    const renderDotMatrix = () => {
      tick += 0.02;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // Faint spotlight halo under mouse
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 10,
          mouse.x, mouse.y, dotMouseRadius
        );
        gradient.addColorStop(0, paletteHome.ring);
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

          const ambientWave = Math.sin(tick + (c + r) * 0.2) * 0.3;

          let dotX = originX;
          let dotY = originY;
          let radius = 1.0;
          let alpha = 0.08 + ambientWave * 0.03;
          let fillStyle = paletteHome.baseDot;

          if (mouse.active && dist < dotMouseRadius) {
            const factor = 1 - dist / dotMouseRadius;
            const easeFactor = factor * factor;

            dotX -= (dx / dist) * easeFactor * 10;
            dotY -= (dy / dist) * easeFactor * 10;

            radius = 1.0 + easeFactor * 2.4;
            alpha = 0.15 + easeFactor * 0.85;

            fillStyle = easeFactor > 0.4
              ? `${paletteHome.activeDot}${alpha})`
              : `${paletteHome.glowAccent}${alpha})`;

            ctx.shadowBlur = easeFactor * 8;
            ctx.shadowColor = `${paletteHome.activeDot}0.6)`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillStyle;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };

    // =========================================================================
    // ВАРИАНТ 3: УСИЛЕННЫЕ ЧАСТИЦЫ И СОЗВЕЗДИЯ (ДЛЯ РЕЗЮМЕ)
    // Увеличенные, более яркие частицы и четкие связывающие паутинки
    // =========================================================================
    const particleCount = Math.min(Math.floor((width * height) / 12000), 90);
    const connectionDistance = 145; // Дистанция соединений созвездий
    const particleMouseRadius = 200; // Увеличенный радиус взаимодействия с мышью

    const paletteResume = {
      primary: "rgba(16, 185, 129, ",   // Cyber Emerald
      secondary: "rgba(45, 212, 191, ",  // Teal
      bright: "rgba(110, 231, 183, ",    // Mint glow
      line: "rgba(52, 211, 153, ",      // Crisp Mint Lines
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        // Увеличенный размер: 2.4px - 4.2px
        this.radius = Math.random() * 1.8 + 2.4;
        this.color = Math.random() > 0.4 ? paletteResume.primary : paletteResume.secondary;
        // Высокая базовая яркость частиц
        this.baseAlpha = Math.random() * 0.3 + 0.65;
      }

      update() {
        // Мягкое отталкивание от курсора
        if (mouse.active) {
          const dx = mouse.targetX - this.x;
          const dy = mouse.targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < particleMouseRadius) {
            const force = (1 - dist / particleMouseRadius) * 3.5;
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
        // Насыщенный неоновый ореол вокруг частицы
        ctx.shadowBlur = 12;
        ctx.shadowColor = `${paletteResume.bright}0.85)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const renderConstellations = () => {
      // Отрисовка паутинок и соединений созвездий
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
            // Мягкая, ненавязчивая линия паутинки между частицами
            const alpha = (1 - dist / connectionDistance) * 0.24;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${paletteResume.line}${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Связь частиц с курсором мыши (деликатная полупрозрачная паутинка)
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
            ctx.shadowBlur = 3;
            ctx.shadowColor = `${paletteResume.bright}0.45)`;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Небольшой мягкий центр-узел паутинки на курсоре
      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.targetX, mouse.targetY, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110, 231, 183, 0.6)";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(52, 211, 153, 0.55)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    // Main animation loop
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
      {/* Interactive Canvas (Matrix on Home, Enhanced Constellations on Resume) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Volumetric Ambient Blurred 3D Orbs */}
      <motion.div
        animate={{
          scale: isHome ? [1, 1.15, 1] : [1.1, 0.95, 1.1],
          backgroundColor: isHome 
            ? "rgba(99, 102, 241, 0.18)"  // Indigo
            : "rgba(16, 185, 129, 0.16)", // Cyber Emerald
        }}
        transition={{
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.8, ease: "easeInOut" }
        }}
        className="absolute -top-28 -left-20 w-[420px] sm:w-[620px] h-[420px] sm:h-[620px] rounded-full filter blur-[110px] sm:blur-[150px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: isHome ? [1, 1.2, 1] : [1, 1.1, 1],
          backgroundColor: isHome 
            ? "rgba(168, 85, 247, 0.20)"  // Purple
            : "rgba(20, 184, 166, 0.18)", // Teal
        }}
        transition={{
          scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.8, ease: "easeInOut" }
        }}
        className="absolute top-1/3 -right-28 w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full filter blur-[120px] sm:blur-[160px] mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95],
          backgroundColor: isHome 
            ? "rgba(56, 189, 248, 0.12)"  // Cyan
            : "rgba(6, 182, 212, 0.14)",  // Mint
        }}
        transition={{
          scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          backgroundColor: { duration: 0.8, ease: "easeInOut" }
        }}
        className="absolute -bottom-32 left-1/4 w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full filter blur-[100px] sm:blur-[130px] mix-blend-screen"
      />

      {/* Subtle vignette layer */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#08090d]/85 pointer-events-none" />
    </div>
  );
}
