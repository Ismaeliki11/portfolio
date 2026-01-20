import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { LiquidBackground } from "@/components/liquid-background";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";

export default function Home() {
    return (
        <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden selection:bg-purple-500/30">
            <LiquidBackground />
            <Navbar />

            <div className="w-full max-w-7xl mx-auto z-10">
                <Hero />
                <About />
                <Projects />
                <Contact />

                <footer className="w-full text-center py-8 text-gray-600 text-sm">
                    © {new Date().getFullYear()} Liquid Portfolio. All rights reserved.
                </footer>
            </div>
        </main>
    );
}
