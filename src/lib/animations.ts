import { Variants } from "framer-motion";

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 100,
        },
    },
};

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(5px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    },
};

export const liquidHover: Variants = {
    hover: {
        scale: 1.05,
        boxShadow: "0px 10px 30px rgba(0,0,0,0.15), 0px 0px 20px rgba(255,255,255,0.4) inset",
        transition: {
            type: "spring",
            damping: 10,
            stiffness: 400,
        },
    },
    tap: {
        scale: 0.95,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1), 0px 0px 10px rgba(255,255,255,0.2) inset",
    },
};

export const textReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            type: "spring",
            damping: 20,
            stiffness: 100,
        },
    }),
};
