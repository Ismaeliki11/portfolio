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
  url: string;
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
      availability: "Abierto a proyectos",
    },
    nav: [
      { id: "hero", label: "Inicio", key: "01" },
      { id: "projects", label: "Trabajo", key: "02" },
      { id: "about", label: "Perfil", key: "03" },
      { id: "contact", label: "Contacto", key: "04" },
    ],
    hero: {
      kicker: "Desarrollador web frontend",
      titleTop: "Liquid Glass",
      titleBottom: "Portfolio 2026",
      description:
        "Este es mi portfolio. Lo hice desde cero con Next.js, animaciones con Framer Motion y una escena de estrellas en canvas. Nada de plantillas — cada pixel esta pensado.",
      ctaPrimary: "Ver proyectos",
      ctaSecondary: "Hablemos",
    },
    signalBoard: {
      title: "GitHub en vivo",
      subtitle: "Lo que dice mi actividad real.",
      metrics: {
        rendering: "Repositorios",
        runtime: "Seguidores",
        stack: "Contribuciones",
        interaction: "Ultimo Commit",
        renderingValue: "---",
        runtimeValue: "---",
        stackValue: "---",
        interactionValue: "---",
      },
    },
    projects: {
      kicker: "Lo que he construido",
      title: "Proyectos reales",
      description: "Webs que funcionan, para clientes reales. No son ejercicios de curso — cada una esta en produccion o ha sido entregada.",
      items: [
        {
          title: "Gran Casino Totana",
          type: "Web institucional",
          summary:
            "Web para un casino social fundado en 1917. Tiene un timeline historico interactivo, gestion de socios y el sistema de diseno que use para este portfolio.",
          stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
          impact: "En produccion",
          url: "https://gran-casino.vercel.app/",
        },
        {
          title: "WebP Lab Pro",
          type: "Herramienta de imagenes",
          summary:
            "Herramienta para convertir y optimizar imagenes en lote. Recorte inteligente, edicion basica y conversion a WebP/AVIF con Sharp por detras.",
          stack: ["Next.js 15", "Sharp", "SVGO", "TypeScript"],
          impact: "Uso personal diario",
          url: "https://web-p-lab.vercel.app/",
        },
        {
          title: "Ayto. de Totana",
          type: "Portal municipal",
          summary:
            "Rediseno del portal web del ayuntamiento. Agenda cultural, noticias, transparencia y un panel para que el equipo actualice contenido sin tocar codigo.",
          stack: ["Next.js", "React 19", "Tailwind v4", "Lucide"],
          impact: "Propuesta entregada",
          url: "https://web-totana.vercel.app/",
        },
        {
          title: "Karma Estetica",
          type: "Web de negocio",
          summary:
            "Web para una clinica de estetica local. Catalogo de tratamientos, reservas online y una estetica visual que refleja la marca del negocio.",
          stack: ["Next.js", "Framer Motion", "Tailwind v4", "Vercel"],
          impact: "Cliente satisfecho",
          url: "https://karmasalon.vercel.app/",
        },
        {
          title: "TimeTracker",
          type: "App de productividad",
          summary:
            "App que uso yo mismo para registrar en que gasto el tiempo. Cronometros, categorías, gráficas diarias y exportacion de datos.",
          stack: ["React", "TypeScript", "Node.js", "Zustand"],
          impact: "Uso propio",
          url: "https://time-tracker-ismaeliki.vercel.app/spaces",
        },
        {
          title: "Pomodoro App",
          type: "Herramienta de enfoque",
          summary:
            "Complemento del TimeTracker. Sesiones Pomodoro con temporizador, pausas automaticas y sincronizacion con el tracker principal.",
          stack: ["Next.js", "Motion", "Web API", "Tailwind"],
          impact: "Integrado con TimeTracker",
          url: "https://pomodoro-ismaeliki.vercel.app/login",
        },
      ],
    },
    about: {
      kicker: "Sobre mi",
      title: "Como he llegado hasta aqui",
      experiences: [
        {
          year: "2026",
          title: "Frontend Developer",
          detail: "Haciendo webs completas con Next.js y React. Me centro en que queden bien, carguen rapido y el codigo sea limpio.",
        },
        {
          year: "2025",
          title: "Freelance",
          detail: "Empece a hacer proyectos para clientes reales. Desde la idea hasta el deploy, todo el proceso.",
        },
        {
          year: "2024",
          title: "Aprendiendo en serio",
          detail: "El ano que pase de tutoriales a proyectos propios. WebGL, animaciones, componentes reutilizables y mucho ensayo-error.",
        },
      ],
    },
    skillReactor: {
      kicker: "Stack",
      core: "Mi stack",
      orbitSkills: ["Next.js", "TypeScript", "React 19", "Tailwind v4", "Framer Motion", "Sharp", "Node.js", "UI/UX", "Vercel", "SVGO"],
    },
    contact: {
      kicker: "Contacto",
      title: "¿Tienes algo en mente?",
      description:
        "Si necesitas una web o tienes un proyecto que te ronda la cabeza, escribeme. Sin compromiso — hablamos y vemos si encajamos.",
      openChannel: "Disponible",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Cuéntame tu idea",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        success: "¡Mensaje enviado!",
        error: "Algo ha fallado. Intentalo de nuevo.",
      },
    },
    commandPalette: {
      trigger: "CMD/CTRL + K",
      quickActions: "Acciones rapidas",
      openProjectsTitle: "Ver proyectos",
      openProjectsDetail: "Ir a la seccion de trabajo",
      openProfileTitle: "Ver perfil",
      openProfileDetail: "Mi trayectoria y stack",
      openContactTitle: "Contactar",
      openContactDetail: "Ir al formulario de contacto",
      copyEmailTitle: "Copiar email",
      copyEmailDetail: "ismael.dev@portfolio.com",
    },
  },
  en: {
    languageLabel: "Language",
    header: {
      brand: "Ismael.dev",
      availability: "Open to projects",
    },
    nav: [
      { id: "hero", label: "Home", key: "01" },
      { id: "projects", label: "Work", key: "02" },
      { id: "about", label: "About", key: "03" },
      { id: "contact", label: "Contact", key: "04" },
    ],
    hero: {
      kicker: "Frontend web developer",
      titleTop: "Liquid Glass",
      titleBottom: "Portfolio 2026",
      description:
        "This is my portfolio. Built from scratch with Next.js, Framer Motion animations and a canvas star scene. No templates — every pixel is intentional.",
      ctaPrimary: "See my work",
      ctaSecondary: "Let's talk",
    },
    signalBoard: {
      title: "Live GitHub",
      subtitle: "What my real activity says.",
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
      kicker: "What I've built",
      title: "Real projects",
      description: "Sites that work, for real clients. These aren't course exercises — each one is in production or has been delivered.",
      items: [
        {
          title: "Gran Casino Totana",
          type: "Institutional website",
          summary:
            "Website for a social club founded in 1917. Interactive historical timeline, member management and the design system I used for this portfolio.",
          stack: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
          impact: "In production",
          url: "https://gran-casino.vercel.app/",
        },
        {
          title: "WebP Lab Pro",
          type: "Image tool",
          summary:
            "Tool for batch converting and optimizing images. Smart cropping, basic editing and WebP/AVIF conversion powered by Sharp.",
          stack: ["Next.js 15", "Sharp", "SVGO", "TypeScript"],
          impact: "Daily personal use",
          url: "https://web-p-lab.vercel.app/",
        },
        {
          title: "Totana Town Hall",
          type: "Municipal portal",
          summary:
            "Redesign of the town council website. Cultural agenda, news, transparency section and a panel so staff can update content without touching code.",
          stack: ["Next.js", "React 19", "Tailwind v4", "Lucide"],
          impact: "Proposal delivered",
          url: "https://web-totana.vercel.app/",
        },
        {
          title: "Karma Aesthetics",
          type: "Business website",
          summary:
            "Website for a local aesthetics clinic. Treatment catalog, online booking and a visual style that matches the brand.",
          stack: ["Next.js", "Framer Motion", "Tailwind v4", "Vercel"],
          impact: "Happy client",
          url: "https://karmasalon.vercel.app/",
        },
        {
          title: "TimeTracker",
          type: "Productivity app",
          summary:
            "App I use myself to track where my time goes. Timers, categories, daily charts and data export.",
          stack: ["React", "TypeScript", "Node.js", "Zustand"],
          impact: "Personal use",
          url: "https://time-tracker-ismaeliki.vercel.app/spaces",
        },
        {
          title: "Pomodoro App",
          type: "Focus tool",
          summary:
            "Companion to TimeTracker. Pomodoro sessions with timer, auto breaks and sync with the main tracker.",
          stack: ["Next.js", "Motion", "Web API", "Tailwind"],
          impact: "Integrated with TimeTracker",
          url: "https://pomodoro-ismaeliki.vercel.app/login",
        },
      ],
    },
    about: {
      kicker: "About me",
      title: "How I got here",
      experiences: [
        {
          year: "2026",
          title: "Frontend Developer",
          detail: "Building full websites with Next.js and React. I focus on making them look good, load fast and keeping the code clean.",
        },
        {
          year: "2025",
          title: "Freelance",
          detail: "Started taking on real client projects. From idea to deploy, the whole process.",
        },
        {
          year: "2024",
          title: "Learning for real",
          detail: "The year I went from tutorials to my own projects. WebGL, animations, reusable components and a lot of trial and error.",
        },
      ],
    },
    skillReactor: {
      kicker: "Stack",
      core: "My stack",
      orbitSkills: ["Next.js", "TypeScript", "React 19", "Tailwind v4", "Framer Motion", "Sharp", "Node.js", "UI/UX", "Vercel", "SVGO"],
    },
    contact: {
      kicker: "Contact",
      title: "Got something in mind?",
      description:
        "If you need a website or have a project idea, drop me a message. No strings attached — let's chat and see if we're a good fit.",
      openChannel: "Available",
      form: {
        name: "Name",
        email: "Email",
        message: "Tell me about your idea",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent!",
        error: "Something went wrong. Try again.",
      },
    },
    commandPalette: {
      trigger: "CMD/CTRL + K",
      quickActions: "Quick actions",
      openProjectsTitle: "See projects",
      openProjectsDetail: "Jump to my work",
      openProfileTitle: "See profile",
      openProfileDetail: "My background and stack",
      openContactTitle: "Contact me",
      openContactDetail: "Go to the contact form",
      copyEmailTitle: "Copy email",
      copyEmailDetail: "ismael.dev@portfolio.com",
    },
  },
};
