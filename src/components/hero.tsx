"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Twitter } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { fadeInUp, staggerContainer, textReveal, scaleIn } from "@/lib/animations";

export function Hero() {
    const nameLetters = "Ismael".split("");

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-12 md:pt-20 overflow-hidden">
            {/* Main Title Area */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-center z-10 flex flex-col items-center"
            >
                <div className="flex overflow-hidden mb-6">
                    {nameLetters.map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={textReveal}
                            custom={i}
                            className="text-5xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 text-glow inline-block"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                <motion.div variants={fadeInUp} className="max-w-2xl mx-auto mb-8">
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Building <span className="text-white font-medium">Scalable & Modern Web Applications</span>.
                        <br className="hidden md:block" /> Full Stack Developer passionate about quality code.
                    </p>
                </motion.div>
            </motion.div>

            {/* Glass Cards Row */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10 mt-8"
            >
                <motion.div variants={scaleIn} whileHover={{ y: -5 }} className="h-full">
                    <GlassCard className="h-full flex flex-col justify-between group cursor-pointer p-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Projects</h3>
                            <p className="text-gray-400">Explore my latest work and experiments.</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <ArrowRight className="text-white group-hover:translate-x-2 transition-transform" />
                        </div>
                    </GlassCard>
                </motion.div>

                <motion.div variants={scaleIn} whileHover={{ y: -5 }} className="h-full">
                    <GlassCard className="h-full flex flex-col justify-between group cursor-pointer bg-white/5 hover:bg-white/10 p-6">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Contact</h3>
                            <p className="text-gray-400">Let's build something flowy together.</p>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Github className="text-white hover:text-purple-400 transition-colors" />
                            <Twitter className="text-white hover:text-blue-400 transition-colors" />
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </section>
    );
}
