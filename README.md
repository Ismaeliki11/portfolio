# Portfolio - Liquid Glass Edition

A premium, high-performance portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.  
The design adheres to a strict "Liquid Glass" aesthetic—featuring deep blacks, frosted glassmorphism, iridescent gradients, and fluid physics-based animations.

![Project Preview](/src/app/icon.png)

## 🎨 Design Philosophy: "Liquid Glass"

This project treats the UI not as static pages, but as a living, breathing environment.
-   **Glassmorphism**: Every container is a pane of glass. We use tiered blur levels and semi-transparent white borders to simulate physical thickness and light refraction.
-   **Fluidity**: The background is alive with floating liquid orbs. Scrolling is momentum-based (via **Lenis**) to give the page weight.
-   **Depth**: We use noise textures (`bg-noise`) and layered shadows to prevent the "flat" look common in web design.
-   **Interaction**: Elements don't just change color; they lift, scale, and glow. On mobile, they respond to touch with tactile feedback (`scale-95`).

## 🚀 Key Features

### 🌊 Core Experience
-   **Smooth Scrolling**: Integrated **Lenis** for a luxurious, app-like scroll feel that preserves momentum.
-   **Atmospheric Background**: A custom animated mesh gradient system (Liquid Background) that drifts and morphs over time.
-   **Sound Design (Visual)**: Subtle grain/noise overlays to mimic film stock or high-end material textures.

### 📱 Adaptive Layout
-   **Mobile Dock**: The navigation bar transforms from a top "pill" on desktop to a **Floating Bottom Dock** on mobile, mimicking modern iOS ergonomics for thumb-friendly navigation.
-   **Responsive Typography**: Font sizes automatically clamp and scale to prevent widows/orphans on vertical screens.
-   **Touch Optimization**: All interactive elements feature expanded touch targets and visual press states.

### ✨ Animations
-   **Staggered Reveals**: Sections text and cards cascade onto the screen using a custom `staggerContainer` variant.
-   **Spring Physics**: All motions use spring-based physics (not linear duration) for a natural, organic feel.
-   **Scroll-Driven Glass**: The Navbar's blur and opacity dynamically increase as you scroll down the page.

## 🛠 Technology Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Motion**: [Framer Motion](https://www.framer.com/motion/) (Complex choreography & transitions)
-   **Scroll**: [@studio-freight/react-lenis](https://github.com/darkroomengineering/lenis) (Smooth scrolling)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Utilities**: `clsx` & `tailwind-merge` for robust class handling.

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css       # Core design tokens, noise textures, and liquid animations
│   ├── layout.tsx        # Application shell & SmoothScroll provider
│   └── page.tsx          # Main entry (Hero > Projects > About > Contact)
├── components/
│   ├── ui/               # Reusable atoms (GlassCard, SmoothScroll)
│   ├── hero.tsx          # "Ismael" brand reveal section
│   ├── navbar.tsx        # Responsive Dock/Pill navigation
│   └── ...
└── lib/
    └── animations.ts     # Centralized Framer Motion variants (single source of truth for motion)
```

## ⚡ Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

---
*Created by Antigravity Agent for Ismael.*
