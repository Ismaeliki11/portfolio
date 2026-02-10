"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import clsx from "clsx";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const maxTilt = isCoarsePointer ? 8 : 12;

  const rotateXRaw = useTransform(posY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateYRaw = useTransform(posX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 24, mass: 0.45 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 24, mass: 0.45 });

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

  const setTiltFromEvent = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const nextY = (event.clientY - bounds.top) / bounds.height - 0.5;
    posX.set(nextX);
    posY.set(nextY);
  };

  const resetTilt = () => {
    posX.set(0);
    posY.set(0);
  };

  return (
    <motion.article
      className={clsx("will-change-transform", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: isCoarsePointer ? 0.992 : 1 }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") {
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
            // Touch pointer capture is optional across browsers.
          }
        }
        setTiltFromEvent(event);
      }}
      onPointerMove={(event) => {
        if (isCoarsePointer && event.pointerType === "touch" && event.buttons === 0) {
          return;
        }
        setTiltFromEvent(event);
      }}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
      onLostPointerCapture={resetTilt}
      onPointerLeave={resetTilt}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.article>
  );
}
