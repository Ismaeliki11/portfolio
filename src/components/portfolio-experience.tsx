"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { CommandPalette } from "@/components/command-palette";
import { FloatingDock } from "@/components/floating-dock";
import { LiquidGlassScene } from "@/components/liquid-glass-scene";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { isSiteLocale, siteCopy, type SiteLocale } from "@/lib/site-copy";
import { ContactForm } from "@/components/contact-form";
import { useGitHubStats } from "@/lib/hooks/use-github-stats";

const supportedLocales: SiteLocale[] = ["es", "en"];
const sectionIds = ["hero", "projects", "about", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

type LocaleSwitchOrigin = {
  x: number;
  y: number;
};

type LocaleSwitchProps = {
  locale: SiteLocale;
  label: string;
  onChange: (locale: SiteLocale, origin: LocaleSwitchOrigin) => void;
};

function LocaleSwitch({ locale, label, onChange }: LocaleSwitchProps) {
  const activeIndex = locale === "es" ? 0 : 1;

  return (
    <div className="relative flex items-center rounded-full border border-[#8fbbff3b] bg-[#0b1428b8] p-1">
      <span className="px-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#90aad6] uppercase">{label}</span>
      <div className="relative ml-1 flex items-center rounded-full bg-[#071324cc] p-1">
        <motion.span
          className="pointer-events-none absolute left-1 top-1 h-7 w-12 rounded-full bg-gradient-to-r from-[#79e0ff] via-[#8bf8d4] to-[#99b4ff] shadow-[0_0_20px_rgba(130,220,255,0.55)]"
          animate={{
            x: activeIndex * 48,
            borderRadius: activeIndex === 0 ? "16px 20px 16px 20px" : "20px 16px 20px 16px",
          }}
          transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.6 }}
        />
        <motion.span
          className="pointer-events-none absolute top-2 h-2.5 w-3.5 rounded-full bg-white/65 blur-[1px]"
          animate={{ x: activeIndex * 48 + 6, opacity: 0.9 }}
          transition={{ type: "spring", stiffness: 360, damping: 24, mass: 0.5 }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={locale}
            className="pointer-events-none absolute inset-0 rounded-full border border-[#95daff66]"
            initial={{ scale: 0.82, opacity: 0.8 }}
            animate={{ scale: 1.05, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.46, ease: "easeOut" }}
          />
        </AnimatePresence>
        {supportedLocales.map((item) => {
          const isActive = item === locale;

          return (
            <button
              type="button"
              key={item}
              className={`relative z-10 h-7 w-12 rounded-full text-[10px] font-semibold tracking-[0.16em] uppercase transition ${isActive ? "text-[#041524]" : "text-[#c6d5ee] hover:text-white"
                }`}
              onClick={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                onChange(item, {
                  x: bounds.left + bounds.width / 2,
                  y: bounds.top + bounds.height / 2,
                });
              }}
              aria-pressed={isActive}
              aria-label={item === "es" ? "Cambiar a espanol" : "Switch to english"}
            >
              <motion.span
                className="block"
                animate={{ y: isActive ? [0, -1, 0] : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {item.toUpperCase()}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type SkillPointer = {
  x: number;
  y: number;
  active: boolean;
};

type BubbleDynamics = {
  x: number;
  y: number;
  influence: number;
  scale: number;
  glow: number;
};

type ConstellationConnection = {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  width: number;
};

function getBubbleDynamics(baseX: number, baseY: number, pointer: SkillPointer): BubbleDynamics {
  const dx = pointer.x - baseX;
  const dy = pointer.y - baseY;
  const distance = Math.hypot(dx, dy);
  const influence = pointer.active ? Math.max(0, 1 - distance / 190) : 0;
  const directionX = distance > 0 ? dx / distance : 0;
  const directionY = distance > 0 ? dy / distance : 0;
  const repelStrength = 28 * influence;
  const x = baseX - directionX * repelStrength;
  const y = baseY - directionY * repelStrength;
  const scale = 1 + influence * 0.24;
  const glow = 0.24 + influence * 0.42;

  return { x, y, influence, scale, glow };
}

type OrbitBubbleProps = {
  skill: string;
  x: number;
  y: number;
  scale: number;
  glow: number;
};

function OrbitBubble({ skill, x, y, scale, glow }: OrbitBubbleProps) {
  return (
    <motion.div
      className="glass-card absolute left-1/2 top-1/2 w-[88px] -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-center text-[10px] font-semibold tracking-[0.12em] text-[#e3eeff] uppercase sm:w-[102px] sm:px-3 sm:text-[11px]"
      style={{
        boxShadow: `0 0 ${10 + glow * 24}px rgba(137, 228, 255, ${glow})`,
      }}
      initial={{ opacity: 0, x: x * 0.8, y: y * 0.8, scale: 0.86 }}
      animate={{ opacity: 1, x, y, scale }}
      transition={{ type: "spring", stiffness: 190, damping: 19, mass: 0.56 }}
    >
      <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}>
        {skill}
      </motion.span>
    </motion.div>
  );
}

type SkillReactorProps = {
  kicker: string;
  core: string;
  orbitSkills: string[];
};

function SkillReactor({ kicker, core, orbitSkills }: SkillReactorProps) {
  const reactorRef = useRef<HTMLDivElement>(null);
  const [reactorSize, setReactorSize] = useState(420);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [pointer, setPointer] = useState<SkillPointer>({ x: 0, y: 0, active: false });
  const outerRadius = Math.max(88, Math.min(148, reactorSize * 0.36));
  const innerRadius = Math.max(66, Math.min(108, reactorSize * 0.27));

  useEffect(() => {
    const element = reactorRef.current;
    if (!element || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) {
        setReactorSize(width);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointerMode = window.matchMedia("(pointer: coarse)");
    const syncPointerMode = () => setIsCoarsePointer(pointerMode.matches);

    syncPointerMode();
    if (typeof pointerMode.addEventListener === "function") {
      pointerMode.addEventListener("change", syncPointerMode);
    } else {
      pointerMode.addListener(syncPointerMode);
    }

    return () => {
      if (typeof pointerMode.removeEventListener === "function") {
        pointerMode.removeEventListener("change", syncPointerMode);
      } else {
        pointerMode.removeListener(syncPointerMode);
      }
    };
  }, []);

  const orbitPoints = useMemo(
    () =>
      orbitSkills.map((skill, index) => {
        const angle = (index / orbitSkills.length) * Math.PI * 2;
        const radius = index % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return { skill, x, y };
      }),
    [innerRadius, orbitSkills, outerRadius],
  );
  const bubblePoints = useMemo(
    () =>
      orbitPoints.map((item) => {
        const dynamics = getBubbleDynamics(item.x, item.y, pointer);
        return { ...item, ...dynamics };
      }),
    [orbitPoints, pointer],
  );
  const constellationConnections = useMemo(() => {
    const links: ConstellationConnection[] = [];

    for (let i = 0; i < bubblePoints.length; i += 1) {
      for (let j = i + 1; j < bubblePoints.length; j += 1) {
        const first = bubblePoints[i];
        const second = bubblePoints[j];
        const dx = second.x - first.x;
        const dy = second.y - first.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 180) {
          continue;
        }

        const midpointX = (first.x + second.x) * 0.5;
        const midpointY = (first.y + second.y) * 0.5;
        const pointerDistance = pointer.active ? Math.hypot(midpointX - pointer.x, midpointY - pointer.y) : 999;
        const pointerBoost = pointer.active ? Math.max(0, 1 - pointerDistance / 220) : 0.2;
        const strength = (1 - distance / 180) * 0.7 + pointerBoost * 0.65;

        if (strength < 0.2) {
          continue;
        }

        links.push({
          key: `${first.skill}-${second.skill}`,
          x1: first.x,
          y1: first.y,
          x2: second.x,
          y2: second.y,
          opacity: 0.12 + strength * 0.52,
          width: 0.55 + strength * 1.05,
        });
      }
    }

    return links.sort((a, b) => b.opacity - a.opacity).slice(0, 16);
  }, [bubblePoints, pointer]);

  const coreShiftX = pointer.active ? pointer.x * 0.1 : 0;
  const coreShiftY = pointer.active ? pointer.y * 0.1 : 0;
  const setPointerFromEvent = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    setPointer({ x, y, active: true });
  };
  const resetPointer = () => setPointer({ x: 0, y: 0, active: false });

  return (
    <div
      ref={reactorRef}
      className="glass-card relative isolate mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center overflow-hidden rounded-[2rem] p-5 sm:p-7 md:p-8"
      onPointerDown={(event) => {
        if (event.pointerType === "touch") {
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // Pointer capture is optional and may fail on some touch browsers.
          }
        }
        setPointerFromEvent(event);
      }}
      onPointerMove={(event) => {
        if (isCoarsePointer && event.pointerType === "touch" && event.buttons === 0) {
          return;
        }
        setPointerFromEvent(event);
      }}
      onPointerUp={resetPointer}
      onPointerCancel={resetPointer}
      onLostPointerCapture={resetPointer}
      onPointerLeave={() => {
        if (!isCoarsePointer) {
          resetPointer();
        }
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,217,255,0.22),transparent_65%)]" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(142,237,255,0.42),rgba(120,188,255,0.08)_65%)] blur-sm"
        style={{ marginLeft: "-72px", marginTop: "-72px" }}
        animate={{
          x: pointer.x - 6,
          y: pointer.y - 6,
          opacity: pointer.active ? 0.95 : 0,
          scale: pointer.active ? 1 : 0.84,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.64 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-44 w-44 rounded-full border border-[#9dd9ff5c] bg-[#7ed9ff1f] shadow-[0_0_70px_rgba(120,220,255,0.35)]"
        style={{ marginLeft: "-88px", marginTop: "-88px" }}
        animate={{
          x: coreShiftX,
          y: coreShiftY,
          scale: pointer.active ? 1.04 : 1,
          rotate: pointer.active ? pointer.x * 0.03 : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 16, mass: 0.6 }}
      />
      <div className="relative z-10 text-center">
        <div className="text-[11px] font-semibold tracking-[0.24em] text-[#96afd7] uppercase">{kicker}</div>
        <div className="mt-2 text-2xl font-bold text-[#e8f1ff]">{core}</div>
      </div>

      <svg viewBox="-210 -210 420 420" className="pointer-events-none absolute inset-0 h-full w-full">
        {constellationConnections.map((connection, index) => (
          <motion.line
            key={connection.key}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke="rgba(147, 224, 255, 0.75)"
            strokeWidth={connection.width}
            strokeLinecap="round"
            strokeDasharray="5 9"
            strokeDashoffset={index * 7}
            style={{ opacity: connection.opacity }}
            animate={{ strokeDashoffset: [index * 7, index * 7 - 22] }}
            transition={{ duration: 1.5 + index * 0.05, ease: "linear", repeat: Infinity }}
          />
        ))}
      </svg>

      {bubblePoints.map((item) => (
        <OrbitBubble key={item.skill} skill={item.skill} x={item.x} y={item.y} scale={item.scale} glow={item.glow} />
      ))}
    </div>
  );
}

export function PortfolioExperience() {
  const stats = useGitHubStats("ismaeliki11");
  const [locale, setLocale] = useState<SiteLocale>(() => {
    if (typeof window === "undefined") {
      return "es";
    }

    const storedLocale = window.localStorage.getItem("portfolio-locale");
    if (isSiteLocale(storedLocale)) {
      return storedLocale;
    }

    const browserLocale = window.navigator.language.toLowerCase();
    return browserLocale.startsWith("en") ? "en" : "es";
  });
  const [localeBurst, setLocaleBurst] = useState<{ id: number; x: number; y: number } | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = -1;
        let mostVisibleId: SectionId = activeSection;

        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id as SectionId;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 50) {
        setActiveSection("hero");
      } else if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Only once, as IDs don't change

  const handleLocaleChange = (nextLocale: SiteLocale, origin: LocaleSwitchOrigin) => {
    if (nextLocale === locale) {
      return;
    }

    setLocale(nextLocale);
    setLocaleBurst({
      id: Date.now() + Math.floor(Math.random() * 1000),
      x: origin.x,
      y: origin.y,
    });
  };

  const copy = siteCopy[locale];

  return (
    <SmoothScroll>
      <div className="relative isolate pb-40 md:pb-32">
        <LiquidGlassScene activeSection={activeSection} localeBurst={localeBurst} />
        <CommandPalette locale={locale} copy={copy.commandPalette} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`locale-frame-${locale}`}
            initial={{ opacity: 0.42, y: 12, scale: 0.995, filter: "blur(7px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0.35, y: -8, scale: 0.998, filter: "blur(6px)" }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="section-shell sticky top-2 z-30 mt-3 md:top-0 md:mt-6">
              <div className="glass-card flex items-center justify-between rounded-full px-3 py-2 sm:px-4 md:px-6">
                <a href="#hero" className="text-xs font-semibold tracking-[0.18em] text-[#deecff] uppercase sm:text-sm">
                  {copy.header.brand}
                </a>
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="hidden items-center gap-3 text-[11px] font-medium tracking-[0.18em] text-[#9cb2d8] uppercase md:flex">
                    <span className="h-2 w-2 rounded-full bg-[#83ffd6] shadow-[0_0_12px_#83ffd6]" />
                    {copy.header.availability}
                  </div>
                  <LocaleSwitch locale={locale} label={copy.languageLabel} onChange={handleLocaleChange} />
                </div>
              </div>
            </header>

            <main className="relative z-10 mt-6 space-y-16 pb-32 sm:mt-8 md:space-y-24 md:pb-28">
              <section
                id="hero"
                className="section-shell liquid-grain scroll-mt-28 overflow-hidden rounded-[2rem] px-5 py-11 sm:px-6 sm:py-14 md:scroll-mt-32 md:rounded-[2.4rem] md:px-10 md:py-18"
              >
                <div className="aura pulse-glow left-[-8rem] top-[-8rem]" />
                <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12">
                  <Reveal>
                    <p className="text-xs font-semibold tracking-[0.28em] text-[#8ea7d4] uppercase">{copy.hero.kicker}</p>
                    <h1 className="mt-4 pb-[0.06em] text-4xl leading-[1.12] font-semibold text-[#f5f9ff] sm:text-5xl sm:leading-[1.1] md:mt-5 md:text-7xl md:leading-[1.05]">
                      {copy.hero.titleTop}
                      <br />
                      {copy.hero.titleBottom}
                    </h1>
                    <p className="text-muted mt-5 max-w-xl text-sm leading-relaxed sm:text-base md:mt-6 md:text-lg">
                      {copy.hero.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                      <a
                        href="#projects"
                        className="rounded-full bg-gradient-to-r from-[#7ce1ff] via-[#8cfad4] to-[#96b4ff] px-6 py-3 text-center text-sm font-semibold tracking-[0.08em] text-[#061629] uppercase"
                      >
                        {copy.hero.ctaPrimary}
                      </a>
                      <a
                        href="#contact"
                        className="glass-card rounded-full px-6 py-3 text-center text-sm font-semibold tracking-[0.08em] text-[#d7e6ff] uppercase"
                      >
                        {copy.hero.ctaSecondary}
                      </a>
                    </div>
                  </Reveal>

                  <Reveal delay={0.15} className="h-full">
                    <motion.div
                      className="glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6 md:p-7"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute -right-12 -top-12 h-42 w-42 rounded-full bg-[#8cdcff44] blur-2xl" />
                      <div className="text-xs font-semibold tracking-[0.24em] text-[#95aed7] uppercase">{copy.signalBoard.title}</div>
                      <p className="mt-4 text-2xl leading-[1.14] font-semibold text-[#edf4ff] sm:mt-5 sm:text-3xl sm:leading-[1.1]">
                        {copy.signalBoard.subtitle}
                      </p>
                      <div className="divider-line mt-6" />
                      <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:gap-4 sm:text-sm">
                        <div>
                          <div className="text-muted">{copy.signalBoard.metrics.rendering}</div>
                          <motion.div
                            key={stats.repos}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-1 text-lg font-semibold text-[#ebf2ff] sm:text-xl"
                          >
                            {stats.loading ? "..." : stats.repos}
                          </motion.div>
                        </div>
                        <div>
                          <div className="text-muted">{copy.signalBoard.metrics.runtime}</div>
                          <motion.div
                            key={stats.followers}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-1 text-lg font-semibold text-[#ebf2ff] sm:text-xl"
                          >
                            {stats.loading ? "..." : stats.followers}
                          </motion.div>
                        </div>
                        <div>
                          <div className="text-muted">{copy.signalBoard.metrics.stack}</div>
                          <motion.div
                            key={stats.contributions}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-1 text-lg font-semibold text-[#ebf2ff] sm:text-xl"
                          >
                            {stats.loading ? "..." : `+${stats.contributions}`}
                          </motion.div>
                        </div>
                        <div>
                          <div className="text-muted">{copy.signalBoard.metrics.interaction}</div>
                          <motion.div
                            key={stats.lastCommit}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mt-1 text-lg font-semibold text-[#ebf2ff] sm:text-xl"
                          >
                            {stats.loading ? "..." : stats.lastCommit}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                </div>
              </section>

              <section id="projects" className="section-shell scroll-mt-28 space-y-6 md:scroll-mt-32 md:space-y-8">
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.24em] text-[#90a8d3] uppercase">{copy.projects.kicker}</p>
                      <h2 className="mt-3 pb-[0.04em] text-3xl leading-[1.12] text-[#f2f7ff] sm:text-4xl sm:leading-[1.08] md:text-5xl md:leading-[1.05]">
                        {copy.projects.title}
                      </h2>
                    </div>
                    <p className="text-muted max-w-lg text-sm leading-relaxed md:text-base">{copy.projects.description}</p>
                  </div>
                </Reveal>

                <div className="grid gap-5 md:grid-cols-3">
                  {copy.projects.items.map((project, index) => (
                    <Reveal key={project.title} delay={index * 0.08}>
                      <TiltCard className="h-full rounded-[1.6rem]">
                        <div className="glass-card flex h-full flex-col rounded-[1.6rem] p-5 sm:p-6">
                          <p className="text-[11px] font-semibold tracking-[0.22em] text-[#87a3d1] uppercase">{project.type}</p>
                          <h3 className="mt-3 text-xl text-[#eef4ff] sm:text-2xl">{project.title}</h3>
                          <p className="text-muted mt-4 text-sm leading-relaxed">{project.summary}</p>

                          <div className="mt-5 flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-[#95c8ff5e] bg-[#0f1c3580] px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-[#d8e5ff] uppercase"
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto pt-7 text-sm font-semibold text-[#8de9d8]">{project.impact}</div>
                        </div>
                      </TiltCard>
                    </Reveal>
                  ))}
                </div>
              </section>

              <section
                id="about"
                className="section-shell scroll-mt-28 grid gap-6 md:scroll-mt-32 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-8"
              >
                <Reveal>
                  <div className="glass-card rounded-[2rem] p-6 md:p-8">
                    <p className="text-xs font-semibold tracking-[0.24em] text-[#8ea7d3] uppercase">{copy.about.kicker}</p>
                    <h2 className="mt-3 pb-[0.04em] text-3xl leading-[1.12] text-[#f0f6ff] sm:text-4xl sm:leading-[1.08]">
                      {copy.about.title}
                    </h2>
                    <div className="mt-7 space-y-6">
                      {copy.about.experiences.map((item) => (
                        <div key={item.year + item.title} className="relative pl-5">
                          <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-[#8ef0da] shadow-[0_0_12px_rgba(142,240,218,0.8)]" />
                          <div className="text-[11px] font-semibold tracking-[0.2em] text-[#8aa5d3] uppercase">{item.year}</div>
                          <div className="mt-1 text-lg font-semibold text-[#eaf2ff] sm:text-xl">{item.title}</div>
                          <p className="text-muted mt-2 text-sm leading-relaxed">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.12}>
                  <SkillReactor
                    kicker={copy.skillReactor.kicker}
                    core={copy.skillReactor.core}
                    orbitSkills={copy.skillReactor.orbitSkills}
                  />
                </Reveal>
              </section>

              <section id="contact" className="section-shell scroll-mt-28 md:scroll-mt-32">
                <Reveal>
                  <div className="glass-card relative overflow-hidden rounded-[2rem] p-6 sm:p-8 md:rounded-[2.2rem] md:p-10">
                    <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#89dfff42] blur-2xl" />
                    <div className="absolute -left-20 -bottom-24 h-56 w-56 rounded-full bg-[#83ffc63a] blur-2xl" />



                    <div className="relative z-10 grid gap-10 md:grid-cols-[1fr_1fr] md:items-start md:gap-14">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.24em] text-[#8ea9d4] uppercase">{copy.contact.kicker}</p>
                        <h2 className="mt-3 pb-[0.06em] text-3xl leading-[1.12] text-[#eff5ff] sm:text-4xl sm:leading-[1.08] md:text-5xl md:leading-[1.05]">
                          {copy.contact.title}
                        </h2>
                        <p className="text-muted mt-5 max-w-xl text-sm leading-relaxed md:text-base">{copy.contact.description}</p>

                        <div className="mt-8 flex flex-col items-start gap-4">
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#83ffd6] shadow-[0_0_10px_#83ffd6]" />
                            <span className="text-[11px] font-semibold tracking-[0.16em] text-[#9cb2d8] uppercase">{copy.contact.openChannel}</span>
                          </div>
                          <a className="text-xl font-medium text-[#f5f9ff] transition-colors hover:text-[#7ce1ff]" href="mailto:ismael.dev@portfolio.com">
                            ismael.dev@portfolio.com
                          </a>
                          <div className="flex gap-6 pt-2">
                            {[
                              {
                                name: "Github",
                                href: "https://github.com/ismaeliki11",
                                icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                )
                              },
                              {
                                name: "LinkedIn",
                                href: "https://linkedin.com",
                                icon: (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                )
                              }
                            ].map((social) => (
                              <a
                                key={social.name}
                                className="group flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#8ea9d4] uppercase transition-all hover:text-[#f5f9ff]"
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="transition-transform group-hover:scale-110 group-hover:text-[#7ce1ff]">
                                  {social.icon}
                                </span>
                                {social.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-[#9cc5ff24] bg-[#0b162b4d] p-6 md:p-8">
                        <ContactForm copy={copy.contact.form} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            </main>
          </motion.div>
        </AnimatePresence>
        <FloatingDock navItems={copy.nav} activeId={activeSection} />
      </div>
    </SmoothScroll>
  );
}
