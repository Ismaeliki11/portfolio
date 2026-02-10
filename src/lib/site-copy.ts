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
      title: "Case Studies",
      description: "Cada proyecto combina arquitectura escalable, motion system y experiencia visual orientada a objetivos de negocio.",
      items: [
        {
          title: "Nebula Commerce",
          type: "E-commerce en tiempo real",
          summary:
            "Storefront con streaming de inventario, checkout desacoplado y animaciones fluidas para una tasa de conversion mas alta.",
          stack: sharedStacks.nebula,
          impact: "+29% conversion",
        },
        {
          title: "Pulse Studio",
          type: "Plataforma para creadores",
          summary:
            "Panel para creadores con editor visual, previews instantaneas y sistema de plantillas escalable para equipos.",
          stack: sharedStacks.pulse,
          impact: "3x velocidad de publicacion",
        },
        {
          title: "Astra Ops",
          type: "Dashboard SaaS",
          summary:
            "Observabilidad operativa con estados en vivo, rutas de incidentes y visualizaciones adaptadas al rol de usuario.",
          stack: sharedStacks.astra,
          impact: "-42% tiempo de respuesta",
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
      orbitSkills: ["Next.js", "TypeScript", "Three.js", "R3F", "Shaders", "Framer Motion", "Node", "Postgres", "Design Systems", "Performance"],
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
      title: "Case Studies",
      description: "Each project blends scalable architecture, motion systems, and visual design built around business outcomes.",
      items: [
        {
          title: "Nebula Commerce",
          type: "Realtime e-commerce",
          summary:
            "Storefront with live inventory streaming, decoupled checkout, and fluid animation tuned for higher conversion rates.",
          stack: sharedStacks.nebula,
          impact: "+29% conversion",
        },
        {
          title: "Pulse Studio",
          type: "Creator platform",
          summary:
            "Creator dashboard with a visual editor, instant previews, and a scalable template system for growing teams.",
          stack: sharedStacks.pulse,
          impact: "3x publishing speed",
        },
        {
          title: "Astra Ops",
          type: "SaaS dashboard",
          summary:
            "Operational observability with live state updates, incident routing, and role-aware visualizations.",
          stack: sharedStacks.astra,
          impact: "-42% response time",
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
      orbitSkills: ["Next.js", "TypeScript", "Three.js", "R3F", "Shaders", "Framer Motion", "Node", "Postgres", "Design Systems", "Performance"],
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
