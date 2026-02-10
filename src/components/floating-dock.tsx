"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/site-copy";

type FloatingDockProps = {
  navItems: NavItem[];
};

export function FloatingDock({ navItems }: FloatingDockProps) {
  const [active, setActive] = useState<NavItem["id"]>(navItems[0]?.id ?? "hero");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const isCompactViewport = window.matchMedia("(max-width: 768px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const next = navItems.find((item) => item.id === entry.target.id);
            if (next) {
              setActive(next.id);
            }
          }
        });
      },
      {
        threshold: isCompactViewport ? 0.3 : 0.45,
        rootMargin: isCompactViewport ? "-12% 0px -52% 0px" : "-20% 0px -25% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.6rem)] z-50 flex justify-center px-3 sm:px-4">
      <div className="pointer-events-auto glass-card mx-auto flex w-full max-w-[32rem] items-center justify-between gap-1 rounded-full p-1.5 sm:justify-center sm:gap-2">
        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              className={clsx(
                "relative flex min-w-0 flex-1 items-center justify-center rounded-full px-2.5 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-colors sm:flex-none sm:px-3.5 sm:text-xs sm:tracking-[0.16em] md:min-w-24",
                isActive ? "text-[#041524]" : "text-[#c5d4f1]",
              )}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive ? (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7de2ff] via-[#88f8d4] to-[#95b3ff]"
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                />
              ) : null}
              <span className="relative z-10 md:hidden">{item.label}</span>
              <span className="relative z-10 hidden md:inline">{item.key}</span>
              <span className="relative z-10 ml-1.5 hidden tracking-[0.08em] md:inline">{item.label}</span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
