export type Language = "pt" | "en";

export interface ServiceItemTranslation {
  number: string;
  title: string;
  description: string;
}

export interface ServiceCategoryTranslation {
  id: "tech" | "design";
  title: string;
  description: string;
  services: ServiceItemTranslation[];
}

export interface HomeProjectTranslation {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TechProjectTranslation {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
}

export interface DesignWorkTranslation {
  id: string;
  number: string;
  title: string;
  category: string;
}

export interface TeamMemberTranslation {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface Translations {
  nav: {
    inicio: string;
    quemSomos: string;
    projectos: string;
    letsFly: string;
    mobileSubline: string;
    menuOpen: string;
    menuClose: string;
    brandLabel: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    cta: string;
    ctaAria: string;
  };
  about: {
    quemSomosTitle: string;
    quemSomosText: string;
    teamLink: string;
    teamLinkAria: string;
    servicesTitle: string;
    services: ServiceCategoryTranslation[];
  };
  homeProjects: {
    title: string;
    subtitle: string;
    cta: string;
    ctaAria: string;
    items: HomeProjectTranslation[];
  };
  projectsGallery: {
    back: string;
    backAria: string;
    title: string;
    subtitleLine1: string;
    subtitleLine2: string;
    tabTech: string;
    tabDesign: string;
    tabTechAria: string;
    tabDesignAria: string;
    visitProject: string;
    visitProjectAria: string;
    enlargeLabel: string;
    viewLabel: string;
    lightboxClose: string;
    lightboxCloseAria: string;
    lightboxPrevAria: string;
    lightboxNextAria: string;
    lightboxHint: string;
    techProjects: TechProjectTranslation[];
    designWorks: DesignWorkTranslation[];
  };
  team: {
    back: string;
    backAria: string;
    title: string;
    subtitle: string;
    descriptionToggle: string;
    members: TeamMemberTranslation[];
  };
  letsFly: {
    title: string;
    ideaHeadline: string;
    ideaSubheadline: string;
    copyLine1: string;
    copyLine2: string;
    emailLabel: string;
    whatsappLabel: string;
    emailAria: string;
    whatsappAria: string;
  };
  footer: {
    studioTagline: string;
    instagram: string;
    instagramAria: string;
    whatsapp: string;
    whatsappAria: string;
  };
  languageSwitcher: {
    label: string;
    pt: string;
    en: string;
    selectLanguage: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      inicio: "INÍCIO",
      quemSomos: "QUEM SOMOS?",
      projectos: "PROJECTOS",
      letsFly: "LET'S FLY",
      mobileSubline: "Mindstack Design & Tecnologia",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
      brandLabel: "MindStack - Página Inicial",
    },
    hero: {
      titleLine1: "DESIGN &",
      titleLine2: "TECNOLOGIA",
      description: "Buscamos formas de unir os nossos pontos fortes em cada projecto.",
      cta: "Vamos voar?",
      ctaAria: "Vamos voar? Ir para a seção LET'S WORK",
    },
    about: {
      quemSomosTitle: "QUEM SOMOS?",
      quemSomosText:
        "Somos um grupo de jovens criativos que, em apenas um ano no mercado, tem transformado desafios em soluções simples, directas e eficazes. Unimos design e tecnologia para criar experiências digitais elegantes, funcionais e pensadas para responder às necessidades reais dos nossos clientes.",
      teamLink: "Nossa Team",
      teamLinkAria: "Conhecer a Nossa Team",
      servicesTitle: "NOSSOS SERVIÇOS",
      services: [
        {
          id: "tech",
          title: "TECNOLOGIA",
          description:
            "Desenvolvemos soluções digitais funcionais, escaláveis e orientadas para os desafios específicos de cada negócio.",
          services: [
            {
              number: "01",
              title: "Desenvolvimento de Websites",
              description:
                "Websites responsivos e personalizados, desenvolvidos para apresentar marcas, serviços e experiências digitais com clareza.",
            },
            {
              number: "02",
              title: "Sistemas Web",
              description:
                "Plataformas web funcionais para optimizar processos, centralizar informação e responder às necessidades específicas de cada negócio.",
            },
            {
              number: "03",
              title: "Desenvolvimento de Apps",
              description:
                "Aplicações digitais pensadas para proporcionar experiências simples, funcionais e adaptadas aos seus utilizadores.",
            },
            {
              number: "04",
              title: "Integrações e Soluções Digitais",
              description:
                "Integração de ferramentas e tecnologias para criar fluxos digitais mais eficientes e conectados.",
            },
          ],
        },
        {
          id: "design",
          title: "DESIGN",
          description:
            "Criamos identidades e conteúdos visuais consistentes, pensados para comunicar com clareza e fortalecer a presença das marcas.",
          services: [
            {
              number: "01",
              title: "UI/UX Design",
              description:
                "Interfaces claras e experiências digitais estruturadas para equilibrar estética, usabilidade e consistência.",
            },
            {
              number: "02",
              title: "Cartazes e Flyers",
              description:
                "Materiais impressos e digitais de comunicação visual, desenvolvidos para atrair atenção e transmitir mensagens com impacto.",
            },
            {
              number: "03",
              title: "Banners e Conteúdo Visual",
              description:
                "Conteúdo visual para plataformas digitais e redes sociais, criado para fortalecer a identidade e aumentar o alcance das marcas.",
            },
            {
              number: "04",
              title: "Edição de Imagem e Vídeo",
              description:
                "Pós-produção de imagem e vídeo para campanhas, redes sociais e apresentações, com foco em qualidade e consistência visual.",
            },
          ],
        },
      ],
    },
    homeProjects: {
      title: "PROJECTOS",
      subtitle: "Seleção de Trabalhos Recentes / 01 — 05",
      cta: "VER PROJECTOS",
      ctaAria: "Ver todos os projectos",
      items: [
        {
          id: "orbitta-11",
          number: "01",
          title: "Orbitta-11",
          description:
            "Uma plataforma para descobrir e explorar sites úteis, organizados por diferentes categorias e interesses.",
        },
        {
          id: "debate-club",
          number: "02",
          title: "Debate Club",
          description:
            "Um poster criado para divulgar um evento de debate online, com uma comunicação simples, clara e objetiva.",
        },
        {
          id: "shop-sync",
          number: "03",
          title: "Shop Sync",
          description:
            "Um poster promocional criado para apresentar uma página de venda de contas de streaming de forma simples e visualmente atrativa.",
        },
        {
          id: "talent-hub",
          number: "04",
          title: "Talent Hub",
          description:
            "Uma plataforma que conecta clientes a profissionais, tornando mais fácil encontrar e contratar serviços.",
        },
        {
          id: "campustore",
          number: "05",
          title: "CampuStore",
          description:
            "Um marketplace feito para estudantes comprarem, venderem, trocarem ou doarem materiais de forma simples.",
        },
      ],
    },
    projectsGallery: {
      back: "Voltar",
      backAria: "Voltar para a página anterior",
      title: "PROJECTS",
      subtitleLine1: "Uma selecção dos nossos trabalhos",
      subtitleLine2: "em Design e Tecnologia.",
      tabTech: "TECH",
      tabDesign: "DESIGN",
      tabTechAria: "Ver projectos de Tecnologia",
      tabDesignAria: "Ver projectos de Design",
      visitProject: "Visitar Projecto",
      visitProjectAria: "Visitar website do projecto",
      enlargeLabel: "+ Ampliar",
      viewLabel: "[ Ver ]",
      lightboxClose: "Fechar",
      lightboxCloseAria: "Fechar visualização ampliada (Escape)",
      lightboxPrevAria: "Imagem anterior (Seta para a esquerda)",
      lightboxNextAria: "Próxima imagem (Seta para a direita)",
      lightboxHint: "Navegar com setas ← → ou clique fora para fechar",
      techProjects: [
        {
          id: "orbitta-11",
          number: "01",
          title: "Orbitta-11",
          category: "Web Application / Diretório",
          description:
            "Uma plataforma para descobrir e explorar sites úteis, organizados por diferentes categorias e interesses.",
        },
        {
          id: "campustore",
          number: "02",
          title: "CampuStore",
          category: "Marketplace Estudantil",
          description:
            "Um marketplace feito para estudantes comprarem, venderem, trocarem ou doarem materiais de forma simples.",
        },
        {
          id: "sweet-world",
          number: "03",
          title: "Sweet World",
          category: "E-Commerce / Confeitaria",
          description:
            "Plataforma digital para apresentação e encomenda de sobremesas e confeitaria artesanal com interface fluida.",
        },
        {
          id: "take-away-rui-jr",
          number: "04",
          title: "Take Away Rui Jr",
          category: "Food Service / Pedidos Online",
          description:
            "Sistema digital para pedidos e takeaway com experiência simplificada e direta ao cliente.",
        },
        {
          id: "talent-hub",
          number: "05",
          title: "Talent Hub",
          category: "Plataforma de Talentos & Serviços",
          description:
            "Uma plataforma que conecta clientes a profissionais, tornando mais fácil encontrar e contratar serviços.",
        },
      ],
      designWorks: [
        {
          id: "dia-vitoria",
          number: "01",
          title: "Dia da Vitória",
          category: "Poster Editorial / Tipografia",
        },
        {
          id: "shopsync-poster",
          number: "02",
          title: "ShopSync Poster",
          category: "Visual Design & Advertising",
        },
        {
          id: "absolute-cinema-ticket",
          number: "03",
          title: "Absolute Cinema — Ticket",
          category: "Ticket & Graphic Identity",
        },
        {
          id: "debate-club",
          number: "04",
          title: "Debate Club",
          category: "Event Poster / Comunicação",
        },
        {
          id: "cinema",
          number: "05",
          title: "Cinema Poster",
          category: "Editorial & Film Artwork",
        },
        {
          id: "1-de-maio",
          number: "06",
          title: "1 de Maio",
          category: "Poster Tipográfico / Editorial",
        },
        {
          id: "apple-service",
          number: "07",
          title: "Apple Service",
          category: "Brand Editorial / Design",
        },
        {
          id: "apple-service-122",
          number: "08",
          title: "Apple Service 1.22",
          category: "Visual Concept & Poster",
        },
        {
          id: "bag-packaging",
          number: "09",
          title: "Packaging Design",
          category: "Brand Collateral & Mockup",
        },
        {
          id: "capa-de-musica",
          number: "10",
          title: "Capa de Música",
          category: "Music Artwork & Cover Design",
        },
        {
          id: "citacao-editorial",
          number: "11",
          title: "Citação Editorial",
          category: "Poster Tipográfico Minimalista",
        },
        {
          id: "coconut-oil",
          number: "12",
          title: "Coconut Oil",
          category: "Logotipo & Identidade Visual",
        },
      ],
    },
    team: {
      back: "Voltar",
      backAria: "Voltar para a página anterior",
      title: "TEAM",
      subtitle: "As pessoas por trás das ideias, do design e da tecnologia.",
      descriptionToggle: "Descrição",
      members: [
        {
          id: "theo",
          name: "Theo",
          role: "CEO e Fundador",
          description:
            "Responsável pela visão estratégica da Mindstack e por orientar cada projecto desde a definição da ideia até à sua execução final.",
        },
        {
          id: "steph",
          name: "Steph",
          role: "Frontend e Designer Gráfico",
          description:
            "“Einstein” da equipa, actua no desenvolvimento frontend e no design gráfico, assegurando uma comunicação visual consistente e uma experiência de utilização clara em cada projecto.",
        },
        {
          id: "tobias",
          name: "Tobias",
          role: "Backend e Analista de Negócios de TI",
          description:
            "Actua no desenvolvimento backend e na análise do negócio de TI, acompanhando a lógica dos processos, a estrutura das soluções e a sua aplicação no contexto comercial.",
        },
        {
          id: "tony",
          name: "Tony",
          role: "Fullstack",
          description:
            "Assegura a integração entre frontend e backend, garantindo que as diferentes partes de cada projecto funcionem de forma alinhada e coerente com os seus objectivos.",
        },
      ],
    },
    letsFly: {
      title: "LET'S FLY",
      ideaHeadline: "Tem uma ideia?",
      ideaSubheadline: "Vamos transformar a ideia em algo real.",
      copyLine1: "Estamos disponíveis para novos projectos,",
      copyLine2: "ideias e colaborações.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      emailAria: "Enviar email para mindstack258@proton.me",
      whatsappAria: "Contactar no WhatsApp (+258 83 457 7714)",
    },
    footer: {
      studioTagline: "Design & Tecnologia",
      instagram: "Instagram",
      instagramAria: "Perfil do Instagram da Mindstack (abre numa nova aba)",
      whatsapp: "WhatsApp",
      whatsappAria: "WhatsApp da Mindstack (abre numa nova aba)",
    },
    languageSwitcher: {
      label: "Idioma",
      pt: "Português",
      en: "English",
      selectLanguage: "Selecionar idioma",
    },
  },
  en: {
    nav: {
      inicio: "HOME",
      quemSomos: "ABOUT US",
      projectos: "PROJECTS",
      letsFly: "LET'S FLY",
      mobileSubline: "Mindstack Design & Technology",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      brandLabel: "MindStack - Homepage",
    },
    hero: {
      titleLine1: "DESIGN &",
      titleLine2: "TECHNOLOGY",
      description: "We bring our greatest strengths together in every project.",
      cta: "Ready to fly?",
      ctaAria: "Ready to fly? Go to LET'S WORK section",
    },
    about: {
      quemSomosTitle: "WHO WE ARE",
      quemSomosText:
        "We are a collective of young creatives who, in just one year, have been turning challenges into simple, direct, and effective solutions. We blend design and technology to craft digital experiences that are elegant, functional, and built for real-world impact.",
      teamLink: "Our Team",
      teamLinkAria: "Meet Our Team",
      servicesTitle: "OUR SERVICES",
      services: [
        {
          id: "tech",
          title: "TECHNOLOGY",
          description:
            "We engineer functional, scalable digital solutions tailored to the distinct challenges of every business.",
          services: [
            {
              number: "01",
              title: "Website Development",
              description:
                "Custom responsive websites built to present brands, services, and digital experiences with absolute clarity.",
            },
            {
              number: "02",
              title: "Web Systems",
              description:
                "Functional web platforms that streamline workflows, centralize information, and solve specific business needs.",
            },
            {
              number: "03",
              title: "App Development",
              description:
                "Digital applications designed for intuitive, seamless, and user-centered everyday experiences.",
            },
            {
              number: "04",
              title: "Integrations & Digital Solutions",
              description:
                "Seamlessly connecting tools and modern stacks into efficient, interconnected digital workflows.",
            },
          ],
        },
        {
          id: "design",
          title: "DESIGN",
          description:
            "We craft cohesive identities and visual content designed to communicate clearly and elevate brand presence.",
          services: [
            {
              number: "01",
              title: "UI/UX Design",
              description:
                "Clear interfaces and structured digital experiences that balance aesthetics, usability, and brand consistency.",
            },
            {
              number: "02",
              title: "Posters & Flyers",
              description:
                "Print and digital collateral crafted to capture attention and communicate messages with bold visual impact.",
            },
            {
              number: "03",
              title: "Banners & Visual Content",
              description:
                "Engaging visual assets for digital channels and social platforms that reinforce brand identity and maximize reach.",
            },
            {
              number: "04",
              title: "Photo & Video Editing",
              description:
                "High-caliber post-production for campaigns, social channels, and presentations, focused on visual excellence.",
            },
          ],
        },
      ],
    },
    homeProjects: {
      title: "PROJECTS",
      subtitle: "Selected Recent Works / 01 — 05",
      cta: "VIEW PROJECTS",
      ctaAria: "View all projects",
      items: [
        {
          id: "orbitta-11",
          number: "01",
          title: "Orbitta-11",
          description:
            "A curated platform to discover and explore useful websites, organized by categories and interests.",
        },
        {
          id: "debate-club",
          number: "02",
          title: "Debate Club",
          description:
            "A promotional poster designed for an online debate event, delivering clear and direct visual communication.",
        },
        {
          id: "shop-sync",
          number: "03",
          title: "Shop Sync",
          description:
            "A promotional poster introducing a streaming accounts platform with clean, engaging visual appeal.",
        },
        {
          id: "talent-hub",
          number: "04",
          title: "Talent Hub",
          description:
            "A talent platform connecting clients with professionals, streamlining service discovery and hiring.",
        },
        {
          id: "campustore",
          number: "05",
          title: "CampuStore",
          description:
            "A dedicated student marketplace to buy, sell, trade, or donate academic supplies effortlessly.",
        },
      ],
    },
    projectsGallery: {
      back: "Back",
      backAria: "Back to previous page",
      title: "PROJECTS",
      subtitleLine1: "A curated selection of our work",
      subtitleLine2: "in Design and Technology.",
      tabTech: "TECH",
      tabDesign: "DESIGN",
      tabTechAria: "View Technology projects",
      tabDesignAria: "View Design projects",
      visitProject: "Visit Project",
      visitProjectAria: "Visit project website",
      enlargeLabel: "+ Enlarge",
      viewLabel: "[ View ]",
      lightboxClose: "Close",
      lightboxCloseAria: "Close enlarged view (Escape)",
      lightboxPrevAria: "Previous image (Left arrow)",
      lightboxNextAria: "Next image (Right arrow)",
      lightboxHint: "Navigate with arrow keys ← → or click outside to close",
      techProjects: [
        {
          id: "orbitta-11",
          number: "01",
          title: "Orbitta-11",
          category: "Web Application / Directory",
          description:
            "A curated platform to discover and explore useful websites, organized by categories and interests.",
        },
        {
          id: "campustore",
          number: "02",
          title: "CampuStore",
          category: "Student Marketplace",
          description:
            "A dedicated student marketplace to buy, sell, trade, or donate academic supplies effortlessly.",
        },
        {
          id: "sweet-world",
          number: "03",
          title: "Sweet World",
          category: "E-Commerce / Bakery",
          description:
            "A digital showcase and ordering platform for artisanal desserts and confectionery with a fluid user interface.",
        },
        {
          id: "take-away-rui-jr",
          number: "04",
          title: "Take Away Rui Jr",
          category: "Food Service / Online Orders",
          description:
            "A digital ordering and takeaway system built for a fast, straightforward customer experience.",
        },
        {
          id: "talent-hub",
          number: "05",
          title: "Talent Hub",
          category: "Talent & Services Platform",
          description:
            "A talent platform connecting clients with professionals, streamlining service discovery and hiring.",
        },
      ],
      designWorks: [
        {
          id: "dia-vitoria",
          number: "01",
          title: "Dia da Vitória",
          category: "Editorial Poster / Typography",
        },
        {
          id: "shopsync-poster",
          number: "02",
          title: "ShopSync Poster",
          category: "Visual Design & Advertising",
        },
        {
          id: "absolute-cinema-ticket",
          number: "03",
          title: "Absolute Cinema — Ticket",
          category: "Ticket & Graphic Identity",
        },
        {
          id: "debate-club",
          number: "04",
          title: "Debate Club",
          category: "Event Poster / Communication",
        },
        {
          id: "cinema",
          number: "05",
          title: "Cinema Poster",
          category: "Editorial & Film Artwork",
        },
        {
          id: "1-de-maio",
          number: "06",
          title: "1 de Maio",
          category: "Typography Poster / Editorial",
        },
        {
          id: "apple-service",
          number: "07",
          title: "Apple Service",
          category: "Brand Editorial / Design",
        },
        {
          id: "apple-service-122",
          number: "08",
          title: "Apple Service 1.22",
          category: "Visual Concept & Poster",
        },
        {
          id: "bag-packaging",
          number: "09",
          title: "Packaging Design",
          category: "Brand Collateral & Mockup",
        },
        {
          id: "capa-de-musica",
          number: "10",
          title: "Capa de Música",
          category: "Music Artwork & Cover Design",
        },
        {
          id: "citacao-editorial",
          number: "11",
          title: "Editorial Quote",
          category: "Minimalist Typography Poster",
        },
        {
          id: "coconut-oil",
          number: "12",
          title: "Coconut Oil",
          category: "Logo & Visual Identity",
        },
      ],
    },
    team: {
      back: "Back",
      backAria: "Back to previous page",
      title: "TEAM",
      subtitle: "The people behind the ideas, design, and technology.",
      descriptionToggle: "Description",
      members: [
        {
          id: "theo",
          name: "Theo",
          role: "CEO & Founder",
          description:
            "Responsible for Mindstack's strategic vision and guiding each project from initial concept to final execution.",
        },
        {
          id: "steph",
          name: "Steph",
          role: "Frontend & Graphic Designer",
          description:
            "The team's 'Einstein', leading frontend development and graphic design, ensuring consistent visual language and an intuitive user experience across every project.",
        },
        {
          id: "tobias",
          name: "Tobias",
          role: "Backend & IT Business Analyst",
          description:
            "Focuses on backend engineering and IT business analysis, managing workflow logic, solution architecture, and strategic commercial viability.",
        },
        {
          id: "tony",
          name: "Tony",
          role: "Fullstack Developer",
          description:
            "Bridges frontend and backend engineering, ensuring all project components work in seamless harmony to achieve business goals.",
        },
      ],
    },
    letsFly: {
      title: "LET'S FLY",
      ideaHeadline: "Have an idea?",
      ideaSubheadline: "Let's turn that idea into reality.",
      copyLine1: "We are available for new projects,",
      copyLine2: "ideas, and collaborations.",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      emailAria: "Send email to mindstack258@proton.me",
      whatsappAria: "Contact via WhatsApp (+258 83 457 7714)",
    },
    footer: {
      studioTagline: "Design & Technology",
      instagram: "Instagram",
      instagramAria: "Mindstack Instagram profile (opens in new tab)",
      whatsapp: "WhatsApp",
      whatsappAria: "Mindstack WhatsApp (opens in new tab)",
    },
    languageSwitcher: {
      label: "Language",
      pt: "Português",
      en: "English",
      selectLanguage: "Select language",
    },
  },
};
