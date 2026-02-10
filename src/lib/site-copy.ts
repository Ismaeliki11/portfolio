export type SiteLocale = "es" | "en";

export function isSiteLocale(value: string | null): value is SiteLocale {
  return value === "es" || value === "en";
}

export type NavItem = {
  id: "hero" | "projects" | "about" | "contact";
  key: string;
  label: string;
};

export type ProjectItem = {
  title: string;
  type: string;
  summary: string;
  stack: string[];
  impact: string;
};

export type ExperienceItem = {
  year: string;
  title: string;
  detail: string;
};

type SiteCopy = {
  languageLabel: string;
  header: {
    brand: string;
    availability: string;
  };
  nav: NavItem[];
  hero: {
    kicker: string;
    titleTop: string;
    titleBottom: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  signalBoard: {
    title: string;
    subtitle: string;
    metrics: {
      rendering: string;
      runtime: string;
      stack: string;
      interaction: string;
      renderingValue: string;
      runtimeValue: string;
      stackValue: string;
      interactionValue: string;
    };
  };
  projects: {
    kicker: string;
    title: string;
    description: string;
    items: ProjectItem[];
  };
  about: {
    kicker: string;
    title: string;
    experiences: ExperienceItem[];
  };
  skillReactor: {
    kicker: string;
    core: string;
    orbitSkills: string[];
  };
  contact: {
    kicker: string;
    title: string;
    description: string;
    openChannel: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  commandPalette: {
    trigger: string;
    quickActions: string;
    openProjectsTitle: string;
    openProjectsDetail: string;
    openProfileTitle: string;
    openProfileDetail: string;
    openContactTitle: string;
    openContactDetail: string;
    copyEmailTitle: string;
    copyEmailDetail: string;
  };
};

const sharedStacks = {
  nebula: ["Next.js", "Server Actions", "Stripe", "R3F"],
  pulse: ["React 19", "Motion", "Prisma", "Postgres"],
  astra: ["TypeScript", "tRPC", "OpenTelemetry", "Edge"],
};

export const siteCopy: Record<SiteLocale, SiteCopy> = {
  es: {
    languageLabel: "Idioma",
    header: {
      brand: "Ismael.dev",
      availability: "Disponible para proyectos",
    },
    nav: [
      { id: "hero", label: "Inicio", key: "01" },
      { id: "projects", label: "Trabajo", key: "02" },
      { id: "about", label: "Perfil", key: "03" },
      { id: "contact", label: "Contacto", key: "04" },
    ],
    hero: {
      kicker: "Ingeniero de producto fluido",
      titleTop: "Liquid Glass",
      titleBottom: "Presencia digital",
      description:
        "Portfolio experimental con direccion visual premium. Arquitectura moderna en Next.js, animacion avanzada y escena WebGL para una identidad unica que no parece plantilla.",
      ctaPrimary: "Ver case studies",
      ctaSecondary: "Iniciar proyecto",
    },
    signalBoard: {
      title: "Signal Board",
      subtitle: "Interfaces que se sienten fisicas.",
      metrics: {
        rendering: "Repositorios",
        runtime: "Seguidores",
        stack: "Contribuciones",
        interaction: "Último Commit",
        renderingValue: "---",
        runtimeValue: "---",
        stackValue: "---",
        interactionValue: "---",
      },
    },
    projects: {
      kicker: "Trabajo seleccionado",
      title: "Proyectos Reales",
      description: "Cada proyecto combina arquitectura escalable, motion system y experiencia visual orientada a objetivos de negocio.",
      items: [
        {
          title: "Gran Casino Totana",
          type: "Institucional & Patrimonio",
          summary:
            "Plataforma digital para una institución centenaria. Incluye timeline histórico interactivo, gestión de socios y sistema de diseño 'LiquidGlass'.",
          stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
          impact: "Digitalización Legado 1917",
        },
        {
          title: "WebP Lab Pro",
          type: "Image Optimization Suite",
          summary:
            "Motor de procesamiento de imágenes de alto rendimiento con optimización por lotes, smart cropping y edición acelerada por hardware.",
          stack: ["Next.js 15", "Sharp", "SVGO", "TypeScript"],
          impact: "Procesamiento Sin Latencia",
        },
        {
          title: "Ayto. de Totana",
          type: "Administración Pública",
          summary:
            "Modernización del portal ciudadano enfocada en la transparencia, agenda cultural dinámica y digitalización de servicios municipales.",
          stack: ["Next.js", "React 19", "Tailwind v4", "Lucide"],
          impact: "UX Ciudadana Mejorada",
        },
        {
          title: "Karma Estética",
          type: "E-commerce & Servicios",
          summary:
            "Presencia digital premium para clínica estética. Sistema de reservas integrado, catálogo de tratamientos y narrativa visual inmersiva.",
          stack: ["Next.js", "Framer Motion", "Tailwind v4", "Vercel"],
          impact: "Identidad Visual Elevada",
        },
        {
          title: "TimeTracker",
          type: "Productivity App",
          summary:
            "Aplicación web avanzada para el registro y análisis de periodos de tiempo, diseñada para el control total de la productividad diaria.",
          stack: ["React", "TypeScript", "Node.js", "Zustand"],
          impact: "Control de Tiempos Preciso",
        },
        {
          title: "Pomodoro App",
          type: "Focused Work Tool",
          summary:
            "Herramienta interconectada con TimeTracker para gestionar sesiones de enfoque mediante la técnica Pomodoro con sincronización en tiempo real.",
          stack: ["Next.js", "Motion", "Web API", "Tailwind"],
          impact: "Flujo de Enfoque Continuo",
        },
      ],
    },
    about: {
      kicker: "Trayectoria",
      title: "Perfil en movimiento",
      experiences: [
        {
          year: "2026",
          title: "Frontend Engineer",
          detail: "Diseno y desarrollo de experiencias web orientadas a producto con animacion de alto nivel.",
        },
        {
          year: "2025",
          title: "Freelance Product Dev",
          detail: "Entrega de productos end-to-end para startups con foco en UX, rendimiento y arquitectura.",
        },
        {
          year: "2024",
          title: "Creative Dev",
          detail: "Proyectos interactivos en WebGL, UI narrativa y sistemas de componentes para marketing premium.",
        },
      ],
    },
    skillReactor: {
      kicker: "Skill Reactor",
      core: "Liquid Core",
      orbitSkills: ["Next.js", "TypeScript", "React 19", "Tailwind v4", "Framer Motion", "Sharp", "Node.js", "UI/UX", "Vercel", "SVGO"],
    },
    contact: {
      kicker: "Contact Orb",
      title: "Construyamos algo inolvidable.",
      description:
        "Si quieres una web con presencia real, animacion con criterio y arquitectura profesional, arrancamos esta semana.",
      openChannel: "Canal abierto",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado!",
        error: "Hubo un error. Inténtalo de nuevo.",
      },
    },
    commandPalette: {
      trigger: "CMD/CTRL + K",
      quickActions: "Acciones rapidas",
      openProjectsTitle: "Abrir proyectos",
      openProjectsDetail: "Ir a los case studies",
      openProfileTitle: "Abrir perfil",
      openProfileDetail: "Ver trayectoria y habilidades",
      openContactTitle: "Abrir contacto",
      openContactDetail: "Ir al contact orb",
      copyEmailTitle: "Copiar email",
      copyEmailDetail: "ismael.dev@portfolio.com",
    },
  },
  en: {
    languageLabel: "Language",
    header: {
      brand: "Ismael.dev",
      availability: "Available for projects",
    },
    nav: [
      { id: "hero", label: "Start", key: "01" },
      { id: "projects", label: "Work", key: "02" },
      { id: "about", label: "About", key: "03" },
      { id: "contact", label: "Contact", key: "04" },
    ],
    hero: {
      kicker: "Fluid product engineer",
      titleTop: "Liquid Glass",
      titleBottom: "Digital presence",
      description:
        "Experimental portfolio with premium visual direction. Modern Next.js architecture, advanced motion, and a WebGL scene for a truly distinct identity.",
      ctaPrimary: "Explore case studies",
      ctaSecondary: "Start a project",
    },
    signalBoard: {
      title: "Signal Board",
      subtitle: "Interfaces that feel physical.",
      metrics: {
        rendering: "Repositories",
        runtime: "Followers",
        stack: "Contributions",
        interaction: "Last Commit",
        renderingValue: "---",
        runtimeValue: "---",
        stackValue: "---",
        interactionValue: "---",
      },
    },
    projects: {
      kicker: "Selected work",
      title: "Real Projects",
      description: "Each project blends scalable architecture, motion systems, and visual design built around business outcomes.",
      items: [
        {
          title: "Gran Casino Totana",
          type: "Institutional & Heritage",
          summary:
            "Digital platform for a century-old institution. Features an interactive historical timeline, membership management, and the 'LiquidGlass' design system.",
          stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
          impact: "1917 Legacy Digitalized",
        },
        {
          title: "WebP Lab Pro",
          type: "Image Optimization Suite",
          summary:
            "High-performance image processing engine featuring batch optimization, smart entropy cropping, and hardware-accelerated editing.",
          stack: ["Next.js 15", "Sharp", "SVGO", "TypeScript"],
          impact: "Zero-Latency Processing",
        },
        {
          title: "Totana Town Hall",
          type: "Public Administration",
          summary:
            "Citizen portal modernization focused on transparency, dynamic cultural agenda, and digitization of municipal services.",
          stack: ["Next.js", "React 19", "Tailwind v4", "Lucide"],
          impact: "Enhanced Citizen UX",
        },
        {
          title: "Karma Aesthetics",
          type: "E-commerce & Services",
          summary:
            "Premium digital presence for an aesthetic clinic. Integrated booking system, treatment catalog, and immersive visual storytelling.",
          stack: ["Next.js", "Framer Motion", "Tailwind v4", "Vercel"],
          impact: "Elevated Visual Identity",
        },
        {
          title: "TimeTracker",
          type: "Productivity App",
          summary:
            "Advanced web application for time tracking and analysis, designed for total control over daily productivity and workflows.",
          stack: ["React", "TypeScript", "Node.js", "Zustand"],
          impact: "Precise Time Control",
        },
        {
          title: "Pomodoro App",
          type: "Focused Work Tool",
          summary:
            "Productivity tool interconnected with TimeTracker to manage focus sessions using the Pomodoro technique with real-time sync.",
          stack: ["Next.js", "Motion", "Web API", "Tailwind"],
          impact: "Seamless Focus Flow",
        },
      ],
    },
    about: {
      kicker: "Trajectory",
      title: "Profile stream",
      experiences: [
        {
          year: "2026",
          title: "Frontend Engineer",
          detail: "Designing and building product-first web experiences with high-fidelity motion systems.",
        },
        {
          year: "2025",
          title: "Freelance Product Dev",
          detail: "Shipping end-to-end products for startups with a focus on UX, performance, and architecture.",
        },
        {
          year: "2024",
          title: "Creative Dev",
          detail: "Interactive WebGL projects, narrative UI, and component systems for premium digital brands.",
        },
      ],
    },
    skillReactor: {
      kicker: "Skill Reactor",
      core: "Liquid Core",
      orbitSkills: ["Next.js", "TypeScript", "React 19", "Tailwind v4", "Framer Motion", "Sharp", "Node.js", "UI/UX", "Vercel", "SVGO"],
    },
    contact: {
      kicker: "Contact Orb",
      title: "Let us build something unforgettable.",
      description:
        "If you want a site with real presence, thoughtful animation, and professional architecture, we can start this week.",
      openChannel: "Open channel",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent!",
        error: "Something went wrong. Try again.",
      },
    },
    commandPalette: {
      trigger: "CMD/CTRL + K",
      quickActions: "Quick actions",
      openProjectsTitle: "Open projects",
      openProjectsDetail: "Jump to selected case studies",
      openProfileTitle: "Open profile",
      openProfileDetail: "Show timeline and capabilities",
      openContactTitle: "Open contact",
      openContactDetail: "Go to the contact orb",
      copyEmailTitle: "Copy email",
      copyEmailDetail: "ismael.dev@portfolio.com",
    },
  },
};
