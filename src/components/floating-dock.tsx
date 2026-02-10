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
        threshold: 0.45,
        rootMargin: "-20% 0px -25% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <nav className="pointer-events-none fixed bottom-5 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
      <div className="pointer-events-auto glass-card mx-auto flex items-center justify-center gap-1 rounded-full p-1.5 md:gap-2">
        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "relative flex min-w-20 items-center justify-center rounded-full px-3.5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors md:min-w-24",
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
              <span className="relative z-10">{item.key}</span>
              <span className="relative z-10 ml-1.5 hidden tracking-[0.08em] md:inline">{item.label}</span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
