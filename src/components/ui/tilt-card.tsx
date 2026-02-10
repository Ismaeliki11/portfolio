"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: TiltCardProps) {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const rotateXRaw = useTransform(posY, [-0.5, 0.5], [12, -12]);
  const rotateYRaw = useTransform(posX, [-0.5, 0.5], [-12, 12]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 24, mass: 0.45 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 24, mass: 0.45 });

  return (
    <motion.article
      className={clsx("will-change-transform", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const nextX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const nextY = (event.clientY - bounds.top) / bounds.height - 0.5;
        posX.set(nextX);
        posY.set(nextY);
      }}
      onPointerLeave={() => {
        posX.set(0);
        posY.set(0);
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.article>
  );
}