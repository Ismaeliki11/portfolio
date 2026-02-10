"use client";

import clsx from "clsx";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";
import type { NavItem } from "@/lib/site-copy";

type FloatingDockProps = {
  navItems: NavItem[];
  activeId: string;
};

export function FloatingDock({ navItems, activeId }: FloatingDockProps) {
  const activeIndex = useMemo(() => navItems.findIndex((i) => i.id === activeId), [navItems, activeId]);

  // Físicas: Muy reactivas pero con inercia para que parezca líquido pesado
  const xSpring = useSpring(activeIndex, {
    stiffness: 350,
    damping: 30,
    mass: 1.1
  });

  useEffect(() => {
    xSpring.set(activeIndex);
  }, [activeIndex, xSpring]);

  // Factor de estiramiento horizontal (chiche)
  const stretchX = useTransform(xSpring, (val) => {
    const d = Math.abs(val - Math.round(val));
    return 1 + d * 1.5;
  });

  // Factor de compresión vertical (conservación de masa)
  const stretchY = useTransform(xSpring, (val) => {
    const d = Math.abs(val - Math.round(val));
    return 1 - d * 0.3;
  });

  return (
    <>
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="liquid-mercury-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -14"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <nav className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] z-50 flex justify-center px-4">
        <div className="pointer-events-auto glass-card relative mx-auto flex h-14 w-full max-w-[32.5rem] items-center justify-between rounded-full p-1 shadow-2xl">

          <div
            className="absolute inset-1 pointer-events-none overflow-hidden rounded-full"
            style={{ filter: "var(--dock-filter, url(#liquid-mercury-goo))" }}
          >
            {/* Wells: Dynamic liquid bases */}
            <div className="flex h-full w-full items-center justify-around">
              {navItems.map((_, idx) => (
                <div
                  key={`well-${idx}`}
                  className={clsx(
                    "h-8 w-8 rounded-full transition-all duration-500",
                    activeIndex === idx ? "bg-[#83f8d2] opacity-60" : "opacity-0"
                  )}
                />
              ))}
            </div>

            {/* The Drop: Traveling mercury */}
            <motion.div
              className="absolute top-1/2 h-10 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7ce2ff] via-[#8dfad4] to-[#99b4ff]"
              style={{
                left: useTransform(xSpring, (val) => `${(val / navItems.length) * 100 + (100 / navItems.length / 2)}%`),
                width: `${100 / navItems.length}%`,
                translateX: "-50%",
                scaleX: stretchX,
                scaleY: stretchY,
              }}
            />
          </div>

          {/* Nav Items layer */}
          <div className="relative z-10 flex w-full h-full items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={clsx(
                    "flex flex-1 items-center justify-center h-full text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 md:text-[11px]",
                    isActive ? "text-[#041524]" : "text-[#c5d4f1] hover:text-white"
                  )}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="md:hidden">{item.label}</span>
                  <span className="hidden md:inline">{item.key || (navItems.indexOf(item) + 1).toString().padStart(2, '0')}</span>
                  <span className="ml-2 hidden tracking-[0.08em] md:inline">{item.label}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
