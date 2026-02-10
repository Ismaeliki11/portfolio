"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { SiteLocale } from "@/lib/site-copy";

type CommandDefinition = {
  id: string;
  title: string;
  detail: string;
  action: () => void;
};

type CommandPaletteProps = {
  locale: SiteLocale;
  copy: {
    trigger: string;
    quickActions: string;
    openProjectsTitle: string;
    openProjectsDetail: string;
    openProfileTitle: string;
    openProfileDetail: string;
    openContactTitle: string;
    openContactDetail: string;
    copyEmailTitle: string;
    copyEmailDetail: string;
  };
};

function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette({ locale, copy }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const commands = useMemo<CommandDefinition[]>(
    () => [
      {
        id: "go-projects",
        title: copy.openProjectsTitle,
        detail: copy.openProjectsDetail,
        action: () => scrollToSection("projects"),
      },
      {
        id: "go-about",
        title: copy.openProfileTitle,
        detail: copy.openProfileDetail,
        action: () => scrollToSection("about"),
      },
      {
        id: "go-contact",
        title: copy.openContactTitle,
        detail: copy.openContactDetail,
        action: () => scrollToSection("contact"),
      },
      {
        id: "copy-email",
        title: copy.copyEmailTitle,
        detail: copy.copyEmailDetail,
        action: async () => {
          await navigator.clipboard.writeText("ismael.dev@portfolio.com");
        },
      },
    ],
    [copy],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        className="glass-card fixed top-3 right-3 z-40 rounded-full px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#d2def4] uppercase transition hover:text-white sm:top-4 sm:right-4 sm:px-3 sm:text-[11px] sm:tracking-[0.18em]"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={locale === "es" ? "Abrir paleta de comandos" : "Open command palette"}
      >
        {copy.trigger}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/52 px-4 pt-20 sm:pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="glass-card w-full max-w-xl rounded-3xl p-3"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-3 pb-2 text-[11px] font-semibold tracking-[0.22em] text-[#8fa9d6] uppercase">
                {copy.quickActions}
              </div>
              <div className="space-y-1">
                {commands.map((command) => (
                  <button
                    type="button"
                    key={command.id}
                    className="w-full rounded-2xl border border-transparent px-4 py-3 text-left transition hover:border-[#8ac7ff66] hover:bg-[#0f1a2fcc]"
                    onClick={() => {
                      void command.action();
                      setIsOpen(false);
                    }}
                  >
                    <div className="text-sm font-semibold text-[#ecf2ff]">{command.title}</div>
                    <div className="mt-1 text-xs text-[#95a9d0]">{command.detail}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
