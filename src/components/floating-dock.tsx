"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/site-copy";

type FloatingDockProps = {
  navItems: NavItem[];
  activeId: string;
};

export function FloatingDock({ navItems, activeId }: FloatingDockProps) {


  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.6rem)] z-50 flex justify-center px-3 sm:px-4">
      <div className="pointer-events-auto glass-card mx-auto flex w-full max-w-[32rem] items-center justify-between gap-1 rounded-full p-1.5 sm:justify-center sm:gap-2">
        {navItems.map((item) => {
          const isActive = activeId === item.id;

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
              {isActive && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-full bg-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)] backdrop-blur-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7de2ff]/90 via-[#88f8d4]/90 to-[#95b3ff]/90" />
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]" />
                </motion.span>
              )}
              <motion.span
                animate={{ color: isActive ? "#041524" : "#c5d4f1" }}
                className="relative z-10 flex items-center"
              >
                <span className="md:hidden">{item.label}</span>
                <span className="hidden md:inline">{item.key}</span>
                <span className="ml-2 hidden tracking-[0.08em] md:inline">{item.label}</span>
              </motion.span>
            </motion.a>
          );
        })}
      </div>
    </nav>
  );
}
