"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Copy, Home, Layers, Mail, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Layers },
    { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
    const { scrollY } = useScroll();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.01)", "rgba(255, 255, 255, 0.05)"]
    );

    const navBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(8px)", "blur(16px)"]
    );

    const navBorder = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.1)"]
    );

    return (
        <header className="fixed z-50 w-full flex justify-center 
            top-auto bottom-6 md:top-6 md:bottom-auto px-4">
            <motion.nav
                style={{
                    backgroundColor: navBackground,
                    backdropFilter: navBlur,
                    WebkitBackdropFilter: navBlur,
                    borderColor: navBorder,
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center justify-around rounded-full border border-white/10 px-6 py-3 shadow-lg w-full max-w-sm md:max-w-md bg-black/20"
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group relative flex flex-col items-center justify-center p-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <item.icon className="h-6 w-6 md:h-5 md:w-5 mb-1 group-hover:scale-110 group-active:scale-95 transition-transform duration-200" />

                        {/* Desktop Label */}
                        <span className="hidden md:block text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 absolute -bottom-5 transition-opacity duration-200">
                            {item.name}
                        </span>

                        {/* Mobile Active Dot (optional, showing simple interaction for now) */}
                        <span className="md:hidden absolute -bottom-1 w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Active/Hover Glow */}
                        <span className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
                    </Link>
                ))}
            </motion.nav>
        </header>
    );
}
