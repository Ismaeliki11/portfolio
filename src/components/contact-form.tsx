"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = {};

function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#7ce1ff] via-[#8cfad4] to-[#96b4ff] px-6 py-3 text-sm font-semibold tracking-[0.08em] text-[#061629] uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
            <AnimatePresence mode="wait">
                {pending ? (
                    <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#061629] border-t-transparent" />
                        {loadingLabel}
                    </motion.span>
                ) : (
                    <motion.span
                        key="label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}

type ContactFormProps = {
    copy: {
        name: string;
        email: string;
        message: string;
        submit: string;
        sending: string;
        success: string;
        error: string;
    };
};

export function ContactForm({ copy }: ContactFormProps) {
    const [state, formAction] = useActionState(sendContactEmail, initialState);

    if (state.success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center"
            >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#83ffd6]/20 text-[#83ffd6] shadow-[0_0_30px_rgba(131,255,214,0.3)]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-[#f5f9ff]">{copy.success}</h3>
                <p className="text-[#9cb2d8]">{state.success ? "I'll get back to you soon!" : ""}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-semibold tracking-widest text-[#7ce1ff] uppercase hover:underline"
                >
                    Send another message
                </button>
            </motion.div>
        );
    }

    return (
        <form action={formAction} className="space-y-5">
            <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#9cb2d8] uppercase">
                    {copy.name}
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    placeholder="Tu nombre..."
                    className="w-full rounded-[1rem] border border-[#9cc5ff4a] bg-[#0b162b8e] px-4 py-3 text-sm text-[#f5f9ff] outline-none transition-all focus:border-[#7ce1ff] focus:ring-1 focus:ring-[#7ce1ff]/30"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#9cb2d8] uppercase">
                    {copy.email}
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="tu@email.com"
                    className="w-full rounded-[1rem] border border-[#9cc5ff4a] bg-[#0b162b8e] px-4 py-3 text-sm text-[#f5f9ff] outline-none transition-all focus:border-[#7ce1ff] focus:ring-1 focus:ring-[#7ce1ff]/30"
                />
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#9cb2d8] uppercase">
                    {copy.message}
                </label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="¿En qué puedo ayudarte?"
                    className="w-full resize-none rounded-[1rem] border border-[#9cc5ff4a] bg-[#0b162b8e] px-4 py-3 text-sm text-[#f5f9ff] outline-none transition-all focus:border-[#7ce1ff] focus:ring-1 focus:ring-[#7ce1ff]/30"
                />
            </div>

            <AnimatePresence>
                {state.error && (
                    <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs font-medium text-red-400"
                    >
                        {state.error}
                    </motion.p>
                )}
            </AnimatePresence>

            <SubmitButton label={copy.submit} loadingLabel={copy.sending} />
        </form>
    );
}
