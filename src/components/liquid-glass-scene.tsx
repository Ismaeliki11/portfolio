"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  twinkle: number;
  phase: number;
  depth: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
  intensity: number;
};

type LocaleBurst = {
  id: number;
  x: number;
  y: number;
};

type BurstState = {
  phase: "idle" | "implode" | "explode";
  x: number;
  y: number;
  elapsed: number;
};

type LiquidGlassSceneProps = {
  activeSection?: string;
  localeBurst?: LocaleBurst | null;
};

function createStars(width: number, height: number, isCoarsePointer: boolean) {
  const minCount = isCoarsePointer ? 90 : 140;
  const maxCount = isCoarsePointer ? 220 : 320;
  const density = isCoarsePointer ? 7800 : 6200;
  const count = Math.max(minCount, Math.min(maxCount, Math.floor((width * height) / density)));
  const stars: Star[] = [];

  for (let index = 0; index < count; index += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const depth = 0.55 + Math.random() * 1.1;

    stars.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: 0,
      vy: 0,
      size: 0.5 + Math.random() * 1.8,
      alpha: 0.28 + Math.random() * 0.62,
      twinkle: 0.5 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      depth,
    });
  }

  return stars;
}

export function LiquidGlassScene({ activeSection, localeBurst }: LiquidGlassSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    active: false,
    intensity: 0,
  });
  const coarsePointerRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0 });
  const previousSectionRef = useRef<string | undefined>(undefined);
  const warpEnergyRef = useRef(0);
  const burstRef = useRef<BurstState>({
    phase: "idle",
    x: 0,
    y: 0,
    elapsed: 0,
  });

  // Performance monitoring
  const frameTimesRef = useRef<number[]>([]);
  const isLowPerfRef = useRef(false);

  const initialX = typeof window === "undefined" ? -260 : window.innerWidth * 0.5;
  const initialY = typeof window === "undefined" ? -260 : window.innerHeight * 0.5;

  const pointerX = useMotionValue(initialX);
  const pointerY = useMotionValue(initialY);
  const pointerPresence = useMotionValue(0);

  const haloX = useSpring(pointerX, { stiffness: 86, damping: 20, mass: 0.8 });
  const haloY = useSpring(pointerY, { stiffness: 86, damping: 20, mass: 0.8 });
  const trailX = useSpring(pointerX, { stiffness: 58, damping: 20, mass: 1.1 });
  const trailY = useSpring(pointerY, { stiffness: 58, damping: 20, mass: 1.1 });
  const presence = useSpring(pointerPresence, { stiffness: 90, damping: 24, mass: 0.7 });

  const haloPrimaryX = useTransform(haloX, (value) => value - 210);
  const haloPrimaryY = useTransform(haloY, (value) => value - 210);
  const haloSecondaryX = useTransform(trailX, (value) => value - 130);
  const haloSecondaryY = useTransform(trailY, (value) => value - 130);
  const haloPrimaryOpacity = useTransform(presence, (value) => 0.2 + value * 0.56);
  const haloSecondaryOpacity = useTransform(presence, (value) => 0.08 + value * 0.45);

  useEffect(() => {
    if (!activeSection) {
      return;
    }

    if (previousSectionRef.current === undefined) {
      previousSectionRef.current = activeSection;
      return;
    }

    if (previousSectionRef.current !== activeSection) {
      previousSectionRef.current = activeSection;
    }
  }, [activeSection]);

  useEffect(() => {
    if (!localeBurst) {
      return;
    }

    const { width, height } = sizeRef.current;
    burstRef.current = {
      phase: "implode",
      x: localeBurst.x,
      y: localeBurst.y,
      elapsed: 0,
    };

    if (width > 0 && height > 0) {
      const stars = starsRef.current;

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];
        star.baseX = Math.random() * width;
        star.baseY = Math.random() * height;
      }
    }

    pointerX.set(localeBurst.x);
    pointerY.set(localeBurst.y);
    pointerPresence.set(1);
  }, [localeBurst, pointerPresence, pointerX, pointerY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: false }); // Optimization: opaque background
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let previousTime = performance.now();
    const pointerMode = window.matchMedia("(pointer: coarse)");
    const syncPointerMode = () => {
      coarsePointerRef.current = pointerMode.matches;
      if (coarsePointerRef.current) {
        pointerPresence.set(0.58);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Cap DPR for performance on hi-res integrated graphics
      dpr = Math.min(window.devicePixelRatio || 1, isLowPerfRef.current ? 1 : 1.5);
      sizeRef.current = { width, height };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      starsRef.current = createStars(width, height, coarsePointerRef.current || isLowPerfRef.current);
      pointerRef.current.x = width * 0.5;
      pointerRef.current.y = height * 0.5;
      pointerX.set(width * 0.5);
      pointerY.set(height * 0.5);
    };

    const updatePerformance = (elapsedMs: number) => {
      if (isLowPerfRef.current) return;

      const frameTimes = frameTimesRef.current;
      frameTimes.push(elapsedMs);

      if (frameTimes.length > 60) {
        const avgFrameTime = frameTimes.reduce((a, b) => a + b) / frameTimes.length;
        // If average frame time is > 30ms (~33fps), switch to low-perf
        if (avgFrameTime > 30) {
          isLowPerfRef.current = true;
          document.documentElement.setAttribute("data-low-perf", "true");
          resize(); // Re-calculate stars and DPR
        }
        frameTimes.length = 0; // Reset for periodic check
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.active = true;

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      pointerPresence.set(1);
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
      pointerPresence.set(coarsePointerRef.current ? 0.58 : 0);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      pointerRef.current.x = touch.clientX;
      pointerRef.current.y = touch.clientY;
      pointerRef.current.active = true;

      pointerX.set(touch.clientX);
      pointerY.set(touch.clientY);
      pointerPresence.set(1);
      warpEnergyRef.current = Math.max(warpEnergyRef.current, 0.72);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      pointerRef.current.x = touch.clientX;
      pointerRef.current.y = touch.clientY;
      pointerRef.current.active = true;

      pointerX.set(touch.clientX);
      pointerY.set(touch.clientY);
      pointerPresence.set(1);
    };

    const onTouchEnd = () => {
      pointerRef.current.active = false;
      pointerPresence.set(coarsePointerRef.current ? 0.58 : 0);
    };

    const drawFrame = (time: number) => {
      const elapsedMs = time - previousTime;
      const delta = Math.min(elapsedMs / 16.666, 2.2);
      const deltaSeconds = elapsedMs / 1000;
      previousTime = time;

      updatePerformance(elapsedMs);

      const stars = starsRef.current;
      const pointer = pointerRef.current;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const burst = burstRef.current;
      const coarsePointer = coarsePointerRef.current;
      const isLowPerf = isLowPerfRef.current;

      if (!pointer.active && coarsePointer) {
        const autoX = centerX + Math.cos(time * 0.00023) * width * 0.2;
        const autoY = centerY + Math.sin(time * 0.00029) * height * 0.16;
        pointer.x += (autoX - pointer.x) * 0.042 * delta;
        pointer.y += (autoY - pointer.y) * 0.042 * delta;
        pointerX.set(pointer.x);
        pointerY.set(pointer.y);
        pointerPresence.set(0.58);
      }

      const targetIntensity = pointer.active ? 1 : coarsePointer ? 0.42 : 0;
      pointer.intensity += (targetIntensity - pointer.intensity) * 0.075 * delta;
      warpEnergyRef.current = Math.max(0, warpEnergyRef.current * 0.9 - 0.002 * delta);
      const warpEnergy = warpEnergyRef.current;

      if (burst.phase !== "idle") {
        burst.elapsed += deltaSeconds;

        if (burst.phase === "implode" && burst.elapsed >= 0.46) {
          burst.phase = "explode";
          burst.elapsed = 0;
          warpEnergyRef.current = Math.max(warpEnergyRef.current, 1.08);

          for (let index = 0; index < stars.length; index += 1) {
            const star = stars[index];
            const outwardX = star.x - burst.x + (Math.random() - 0.5) * 26;
            const outwardY = star.y - burst.y + (Math.random() - 0.5) * 26;
            const magnitude = Math.hypot(outwardX, outwardY) || 1;
            const speed = 8 + Math.random() * 12;

            star.vx += (outwardX / magnitude) * speed * (0.7 + star.depth * 0.42);
            star.vy += (outwardY / magnitude) * speed * (0.7 + star.depth * 0.42);
          }
        } else if (burst.phase === "explode" && burst.elapsed >= 0.72) {
          burst.phase = "idle";
          burst.elapsed = 0;
        }
      }

      // Optimization: opaque fill instead of clearRect if not transparent
      context.fillStyle = "#060c18";
      context.fillRect(0, 0, width, height);

      if (warpEnergy > 0.02) {
        context.fillStyle = `rgba(112, 192, 255, ${warpEnergy * 0.08})`;
        context.fillRect(0, 0, width, height);
      }

      const repulseRadius = 160 + pointer.intensity * 120;
      const pointerForceScale = burst.phase === "idle" ? 1 : 0.25;

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index];
        const radialX = star.x - centerX;
        const radialY = star.y - centerY;
        const radialDistance = Math.hypot(radialX, radialY) || 1;
        const radialDirX = radialX / radialDistance;
        const radialDirY = radialY / radialDistance;

        star.vx += (star.baseX - star.x) * (0.0038 + star.depth * 0.0018) * delta;
        star.vy += (star.baseY - star.y) * (0.0038 + star.depth * 0.0018) * delta;

        const driftX = Math.cos(time * 0.00015 * star.depth + star.phase) * 0.025;
        const driftY = Math.sin(time * 0.0002 * star.depth + star.phase * 1.2) * 0.025;
        star.vx += driftX * delta;
        star.vy += driftY * delta;

        if (warpEnergy > 0.001) {
          star.vx += radialDirX * (0.12 + star.depth * 0.08) * warpEnergy * delta * 4.2;
          star.vy += radialDirY * (0.12 + star.depth * 0.08) * warpEnergy * delta * 4.2;
        }

        if (burst.phase === "implode") {
          const towardX = burst.x - star.x;
          const towardY = burst.y - star.y;
          const towardDistance = Math.hypot(towardX, towardY) || 1;
          const pull = (0.52 + star.depth * 0.36) * delta * 2.6;
          star.vx += (towardX / towardDistance) * pull;
          star.vy += (towardY / towardDistance) * pull;
        } else if (burst.phase === "explode") {
          const awayX = star.x - burst.x;
          const awayY = star.y - burst.y;
          const awayDistance = Math.hypot(awayX, awayY) || 1;
          const burstProgress = Math.min(1, burst.elapsed / 0.72);
          const push = (1 - burstProgress) * (0.16 + star.depth * 0.08) * delta * 2.2;
          star.vx += (awayX / awayDistance) * push;
          star.vy += (awayY / awayDistance) * push;
        }

        if (pointer.intensity > 0.001) {
          const dx = star.x - pointer.x;
          const dy = star.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < repulseRadius) {
            const influence = (1 - distance / repulseRadius) * (0.68 + star.depth * 0.5) * pointer.intensity;
            star.vx += (dx / distance) * influence * 2.1 * delta * pointerForceScale;
            star.vy += (dy / distance) * influence * 2.1 * delta * pointerForceScale;
          }
        }

        const damping = burst.phase === "idle" ? 0.92 : 0.9;
        star.vx *= damping;
        star.vy *= damping;
        star.x += star.vx * delta;
        star.y += star.vy * delta;

        const twinkle = 0.72 + Math.sin(time * 0.001 * star.twinkle + star.phase) * 0.28;
        const alpha = star.alpha * twinkle;

        // Skip complex star drawing on low performance
        if (!isLowPerf && warpEnergy > 0.05) {
          const streakLength = (6 + warpEnergy * 28) * (0.55 + star.depth * 0.5);
          context.beginPath();
          context.strokeStyle = `rgba(202, 232, 255, ${alpha * 0.42 * warpEnergy})`;
          context.lineWidth = star.size * 0.72;
          context.moveTo(star.x - radialDirX * streakLength, star.y - radialDirY * streakLength);
          context.lineTo(star.x + radialDirX * streakLength * 0.24, star.y + radialDirY * streakLength * 0.24);
          context.stroke();
        }

        context.beginPath();
        context.fillStyle = `rgba(214, 237, 255, ${alpha})`;
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();

        if (!isLowPerf && pointer.intensity > 0.01) {
          const distanceToPointer = Math.hypot(star.x - pointer.x, star.y - pointer.y);
          if (distanceToPointer < repulseRadius * 0.7) {
            const glow = (1 - distanceToPointer / (repulseRadius * 0.7)) * 0.7 * pointer.intensity * pointerForceScale;
            context.beginPath();
            context.fillStyle = `rgba(138, 228, 255, ${glow * 0.3})`;
            context.arc(star.x, star.y, star.size * 4.8, 0, Math.PI * 2);
            context.fill();
          }
        }
      }

      if (burst.phase !== "idle") {
        const implodeProgress = burst.phase === "implode" ? Math.min(1, burst.elapsed / 0.46) : 1;
        const explodeProgress = burst.phase === "explode" ? Math.min(1, burst.elapsed / 0.72) : 0;
        const radius =
          burst.phase === "implode"
            ? 90 * (1 - implodeProgress) + 18
            : 22 + explodeProgress * (Math.max(width, height) * 0.35);
        const opacity = burst.phase === "implode" ? 0.35 * (1 - implodeProgress * 0.65) : 0.28 * (1 - explodeProgress);

        const gradient = context.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, radius);
        gradient.addColorStop(0, `rgba(180, 241, 255, ${opacity})`);
        gradient.addColorStop(0.4, `rgba(146, 210, 255, ${opacity * 0.55})`);
        gradient.addColorStop(1, "rgba(130, 170, 255, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(burst.x, burst.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(drawFrame);
    };

    syncPointerMode();
    if (typeof pointerMode.addEventListener === "function") {
      pointerMode.addEventListener("change", syncPointerMode);
    } else {
      pointerMode.addListener(syncPointerMode);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    frameId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("blur", onPointerLeave);
      if (typeof pointerMode.removeEventListener === "function") {
        pointerMode.removeEventListener("change", syncPointerMode);
      } else {
        pointerMode.removeListener(syncPointerMode);
      }
    };
  }, [pointerPresence, pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div className="star-halo-primary" style={{ x: haloPrimaryX, y: haloPrimaryY, opacity: haloPrimaryOpacity }} />
      <motion.div
        className="star-halo-secondary"
        style={{ x: haloSecondaryX, y: haloSecondaryY, opacity: haloSecondaryOpacity }}
      />
      <div className="liquid-grain absolute inset-0" />
      <div className="aura pulse-glow -left-32 top-16 opacity-60" />
      <div className="aura pulse-glow -right-24 bottom-20 opacity-55" />
    </div>
  );
}


