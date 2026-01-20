"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

// Placeholder data - User needs to provide real data later
const projects = [
    {
        title: "Project Alpha",
        description: "A futuristic dashboard with real-time data visualization.",
        tags: ["Next.js", "Tremor", "Supabase"],
        image: "/placeholder-project-1.jpg",
        href: "#",
    },
    {
        title: "Neon Commerce",
        description: "E-commerce platform with 3D product previews.",
        tags: ["React", "Three.js", "Stripe"],
        image: "/placeholder-project-2.jpg",
        href: "#",
    },
    {
        title: "Liquid Chat",
        description: "Real-time messaging app with fluid aesthetics.",
        tags: ["Socket.io", "Framer Motion", "Redis"],
        image: "/placeholder-project-3.jpg",
        href: "#",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl mx-auto"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={scaleIn}
                            whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full flex flex-col group p-0 overflow-hidden active:scale-95 transition-transform duration-200">
                                {/* Image Area - simplified for now without real images */}
                                <div className="h-48 bg-gradient-to-br from-white/10 to-transparent relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono text-xs z-10">
                                        [Project Preview]
                                    </div>
                                    <div className="absolute inset-0 bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium">
                                            <Github className="w-4 h-4" /> Code
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 transition-colors text-sm font-medium text-purple-200">
                                            <ExternalLink className="w-4 h-4" /> Demo
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
