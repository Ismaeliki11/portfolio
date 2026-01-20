"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Laptop } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

export function About() {
    return (
        <section id="about" className="py-20 px-4">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto"
            >
                <motion.div variants={fadeInUp} className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        I'm a passionate developer who bridges the gap between design and engineering.
                        My work is defined by clean code, pixel-perfect layouts, and robust architecture.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Card 1: Main Skill */}
                    <motion.div variants={scaleIn} className="md:col-span-2 h-full">
                        <GlassCard className="h-full flex flex-col justify-center hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-full bg-white/10">
                                    <Laptop className="w-6 h-6 text-purple-300" />
                                </div>
                                <h3 className="text-2xl font-semibold">Frontend Architecture</h3>
                            </div>
                            <p className="text-gray-300">
                                Specialized in building scalable applications with Next.js, React, and TypeScript.
                                I focus on performance, accessibility, and creating intuitive user interfaces.
                            </p>
                        </GlassCard>
                    </motion.div>

                    {/* Card 2: Design */}
                    <motion.div variants={scaleIn} className="h-full">
                        <GlassCard className="h-full bg-gradient-to-br from-white/5 to-purple-500/10 hover:to-purple-500/20">
                            <div className="p-3 rounded-full bg-white/10 w-fit mb-4">
                                <Globe className="w-6 h-6 text-blue-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Modern Web</h3>
                            <p className="text-sm text-gray-400">
                                Responsive, progressive, and animated web experiences that feel alive.
                            </p>
                        </GlassCard>
                    </motion.div>

                    {/* Card 3: Backend */}
                    <motion.div variants={scaleIn} className="h-full">
                        <GlassCard className="h-full hover:bg-white/10 transition-colors">
                            <div className="p-3 rounded-full bg-white/10 w-fit mb-4">
                                <Database className="w-6 h-6 text-green-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Backend & API</h3>
                            <p className="text-sm text-gray-400">
                                Robust server-side logic using Node.js, SQL/NoSQL databases, and cloud functions.
                            </p>
                        </GlassCard>
                    </motion.div>

                    {/* Card 4: Tools */}
                    <motion.div variants={scaleIn} className="md:col-span-2 h-full">
                        <GlassCard className="h-full flex items-center justify-between hover:bg-white/10 transition-colors">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">My Toolkit</h3>
                                <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                                    <span>React</span> • <span>Next.js</span> • <span>Tailwind</span> • <span>Framer Motion</span> • <span>Node.js</span> • <span>Git</span>
                                </div>
                            </div>
                            <Code2 className="w-12 h-12 text-white/20" />
                        </GlassCard>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
