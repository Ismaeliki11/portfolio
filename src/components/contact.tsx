"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { GlassCard } from "./ui/glass-card";
import { scaleIn } from "@/lib/animations";

export function Contact() {
    return (
        <section id="contact" className="py-20 px-4 mb-20">
            <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-xl mx-auto"
            >
                <GlassCard className="p-8 md:p-12 hover:shadow-2xl transition-shadow duration-500">
                    <h2 className="text-3xl font-bold mb-2 text-center text-white">Let's Talk</h2>
                    <p className="text-gray-400 text-center mb-8">
                        Have an idea? Let's build something liquid together.
                    </p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-white"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                            <textarea
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 resize-none text-white"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-900/20">
                            <Send className="w-5 h-5" /> Send Message
                        </button>
                    </form>
                </GlassCard>
            </motion.div>
        </section>
    );
}
