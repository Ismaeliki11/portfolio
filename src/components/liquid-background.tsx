import React from "react";

export function LiquidBackground() {
    return (
        <div className="liquid-bg-wrapper">
            <div className="liquid-orb orb-1" />
            <div className="liquid-orb orb-2" />
            <div className="liquid-orb orb-3" />
            <div className="liquid-orb orb-4" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}
