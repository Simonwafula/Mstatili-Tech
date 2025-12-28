// src/content/siteContent.js
// Single source of truth for website copy + media + icon mapping.
// Style direction: hybrid (selective photography + clean icons + subtle patterns).
// NOTE: We intentionally avoid explicit “country-only” wording; locality is expressed visually via imagery choices.

export const siteContent = {
  // -----------------------------
  // THEME PROMPT (for Copilot + designers)
  // -----------------------------
  themePrompt: {
    name: "Mstatili Hybrid Modern",
    prompt: `
Create a uniquely modern, professional consultancy website for "Mstatili Technologies" (tech + data solutions firm).
Style must be hybrid: selective authentic photography + clean iconography + subtle geometric/pattern accents.
Overall feel: premium, confident, warm, and credible (not corporate-boring, not flashy).

VISUAL SYSTEM
- Layout: clean grid, generous whitespace, strong typographic hierarchy.
- Colors: deep neutral base (charcoal/ink), light surfaces (off-white), one primary accent (blue/teal), one secondary accent (amber/orange) used sparingly.
- Use subtle geometric textures/patterns at very low opacity (2–6%) on section backgrounds.
- Photography: authentic professional scenes (teams at work, training, fieldwork with tablets, modern city/business contexts). Avoid stereotypes.
- Icon style: outline icons (Heroicons/Lucide), consistent stroke weight.
- Components: 2xl rounded corners, soft shadows, crisp borders, hover micro-interactions.

INTERACTION
- Motion: subtle (fade/slide 8–16px), quick (150–250ms), eased; no heavy parallax.
- CTA buttons: primary filled, secondary outline; include icon + text for primary CTAs.
- Add tasteful "data-inspired" visuals: KPI cards, simple charts as illustrations, pipeline diagram motifs.

CONTENT PRESENTATION
- Progressive disclosure: short scan-friendly sections on Home, deeper detail on service pages.
- Use structured sections: Who it's for, Problems, Deliverables, Approach, Success, FAQs.

ACCESSIBILITY & PERFORMANCE
- Contrast AA+, visible focus states, keyboard-friendly nav.
- Use .webp images, lazy-load below the fold, keep hero images optimized (~200–350KB).
    `.trim(),
    implementationNotes: [
      "Use Tailwind; define typography scale and spacing tokens.",
      "Use one hero image per page + supporting images sparingly.",
      "Use background patterns as SVG with low opacity.",
      "Prefer real product visuals (dashboard mockups) over generic stock where possible.",
    ],
  },

  // -----------------------------
  // ASSETS (images/patterns/logos)
  // -----------------------------
  assets: {
    images: {
      hero: {
        home: "/images/hero/hero-home.webp",
        services: "/images/hero/hero-services.webp",
        caseStudies: "/images/hero/hero-case-studies.webp",
        insights: "/images/hero/hero-insights.webp",
        about: "/images/hero/hero-about.webp",
        contact: "/images/hero/hero-contact.webp",
      },
      sections: {
        training: "/images/sections/section-training.webp",
        fieldwork: "/images/sections/section-field-data.webp",
        dashboard: "/images/sections/section-dashboard.webp",
        workshop: "/images/sections/section-workshop.webp",
      },
      caseStudies: {
        nextstepCover: "/images/case-studies/case-nextstepke-cover.webp",
        nextstepShot1: "/images/case-studies/case-nextstepke-shot-01.webp",
        nextstepShot2: "/images/case-studies/case-nextstepke-shot-02.webp",
        frameworkCover: "/images/case-studies/case-performance-framework-cover.webp",
        frameworkMock1: "/images/case-studies/case-performance-framework-mock-01.webp",
      },
      backgrounds: {
        abstract1: "/images/backgrounds/bg-abstract-data-01.webp",
        abstract2: "/images/backgrounds/bg-abstract-data-02.webp",
      },
      og: {
        default: "/images/og/og-default.webp",
        services: "/images/og/og-services.webp",
        caseStudies: "/images/og/og-case-studies.webp",
        insights: "/images/og/og-insights.webp",
      },
    },
    patterns: {
      grid: "/images/patterns/pattern-grid.svg",
      geoLines: "/images/patterns/pattern-geo-lines.svg",
      dotMatrix: "/images/patterns/pattern-dot-matrix.svg",
    },
    brand: {
      logoMark: "/images/brand/logo-mark.svg",
      logoFull: "/images/brand/logo-full.svg",
    },
  },

  // -----------------------------
  // ICON KEYS (map to your icon library in UI layer)
  // -----------------------------
  icons: {
    // Global / UI
    primaryCTA: "CalendarCheck",
    secondaryCTA: "ArrowRight",
    phone: "Phone",
    email: "Mail",
    location: "MapPin",

    // Capabilities
    tech: "LaptopCode",
    dataStrategy: "Network",
    dashboards: "LayoutDashboard",
    me: "ClipboardCheck",
    automation: "Workflow",
    research: "FlaskConical",
    training: "GraduationCap",
    digitalStrategy: "Megaphone",

    // Trust / quality
    quality: "BadgeCheck",
    evidence: "BarChart3",
    sustainability: "LifeBuoy",
    delivery: "Wrench",
  },

  // -----------------------------
  // COMPANY (corrected: multidisciplinary + not “statistician-led”)
  // -----------------------------
  company: {
    name: "Mstatili Technologies",
    tagline: "Tech & Data Solutions for Decision-Making",

    // Tighter, clearer, “advisor + builder + expert” positioning
    positioningStatement:
      "We help Institutions,SMEs, NGOs, and researchers make better decisions by strengthening data quality, building decision-ready tools, and delivering practical digital systems—dashboards, automation pipelines, analytics, and software applications that teams can sustain.",

    // Depth + balance (tech + data + adoption)
    shortIntro:
      "Mstatili Technologies is a multidisciplinary consulting and solutions firm. We bring together computer science, data science, statistics, education expertise, and marketing/content capability to deliver end-to-end outcomes: clearer indicators, cleaner data, better tools, and workflows that turn information into action. We advise, design, and build—so organizations move from fragmented reporting to timely, trusted, accessible insight.",

    whatWeDoInOneLine:
      "We design the metrics, improve the data, build the tools, and automate the workflow—so insight becomes action.",

    whoWeServe: [
      "SMEs and private enterprises",
      "NGOs and donor-funded programs",
      "Researchers and academic projects",
      "Operations and service-delivery teams",
      "Planning, finance, and performance management functions",
    ],

    workingStyle: [
      "Expert + hybrid: advisory, implementation, and technical delivery",
      "Practical and decision-oriented: built around real review cycles",
      "Sustainable: documentation, handover, and training included",
      "Quality-driven: validation and reconciliation are built in",
    ],

    focusAreas: [
      "Tech solutions (web, apps, internal tools, integrations)",
      "Data strategy and governance (KPIs, ownership, schedules, rules)",
      "Dashboards and reporting (executive + operational views)",
      "M&E frameworks and performance analytics (scorecards, indicators)",
      "Data cleaning, validation, and reconciliation (trust in numbers)",
      "Automation and data pipelines (repeatable reporting workflows)",
      "Forecasting and scenario analysis (planning and prioritization)",
      "Surveys and digital data collection (tools and workflows)",
      "Training and capacity building (skills transfer and playbooks)",
      "Research support (study design, analysis, and reporting)",
      "Digital strategy (brand, content, UI/UX, SEO) for adoption and growth",
    ],
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  brand: {
    primaryCTA: { label: "Book a consultation", href: "/contact", icon: "CalendarCheck" },
    secondaryCTA: { label: "Explore services", href: "/services", icon: "ArrowRight" },
    credibilityBadges: [
      { label: "Multidisciplinary team", icon: "Users" },
      { label: "Evidence-driven delivery", icon: "BarChart3" },
      { label: "Advisor + builder", icon: "Wrench" },
      { label: "Quality checks built-in", icon: "BadgeCheck" },
      { label: "Documentation + training", icon: "GraduationCap" },
    ],
  },

  global: {
    outcomesWeDeliver: [
      "Timely reporting with fewer manual steps",
      "Reliable figures through validation and reconciliation checks",
      "Dashboards that support management decisions and follow-ups",
      "Automated workflows that reduce repeat work and errors",
      "Clear indicators and definitions teams interpret consistently",
      "Tools, documentation, and training to sustain delivery internally",
    ],
    credibilityStrip: [
      {
        label: "Approach",
        value: "Decision-oriented",
        icon: "Target",
        detail:
          "We begin with the decision to improve, then define indicators, workflows, and tools that make that decision easier and faster.",
      },
      {
        label: "Quality",
        value: "Consistency first",
        icon: "BadgeCheck",
        detail:
          "Validation and reconciliation checks protect consistency across linked reports, tables, and dashboards.",
      },
      {
        label: "Delivery",
        value: "Advisory + implementation",
        icon: "Wrench",
        detail:
          "We don’t stop at recommendations. We build dashboards, pipelines, templates, and systems that operationalize results.",
      },
      {
        label: "Sustainability",
        value: "Transfer + capacity",
        icon: "GraduationCap",
        detail:
          "Documentation, training, and handover are part of delivery—so internal teams can maintain and evolve the solution.",
      },
    ],
  },

  // -----------------------------
  // HOME
  // -----------------------------
  home: {
    seo: {
      title: "Mstatili Technologies | Tech & Data Solutions for Decision-Making",
      description:
        "Tech and data consultancy for SMEs, NGOs, and researchers. We build dashboards, automate reporting pipelines, clean and validate data, deliver analytics and forecasting, and develop web/app solutions.",
      ogImage: "/images/og/og-default.webp",
    },

    hero: {
      headline: "Turn data into decisions—with tools your team can sustain.",
      subheadline:
        "We help SMEs, NGOs, and researchers move from fragmented information to timely, reliable, accessible insight—through dashboards, automation pipelines, analytics, research support, and software solutions.",
      supportingPoints: [
        { icon: "Network", text: "Define KPIs and indicators, then build reporting systems around them" },
        { icon: "BadgeCheck", text: "Clean, validate, and reconcile data to improve trust in numbers" },
        { icon: "Workflow", text: "Automate workflows and build tools so insight is repeatable—not a one-off" },
      ],
      media: {
        type: "image",
        src: "/images/hero/hero-home.webp",
        alt: "A modern team collaborating on technology and data solutions",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-geo-lines.svg" },
      },
      ctas: {
        primary: { label: "Book a consultation", href: "/contact", icon: "CalendarCheck" },
        secondary: { label: "Explore services", href: "/services", icon: "ArrowRight" },
      },
      trustLine:
        "A multidisciplinary team combining technology, data science, statistics, education expertise, and content strategy—delivering both strategy and implementation.",
    },

    intro: {
      title: "Consulting and solutions delivery—end to end",
      icon: "Sparkles",
      paragraphs: [
        "Many organizations have data but lack the structure and tools to use it with confidence. Reporting becomes slow, totals don’t reconcile, and decisions rely on incomplete or inconsistent information.",
        "We bridge the gap between business needs and technology. We define indicators, improve data quality, build dashboards and reporting systems, and automate pipelines so insights are timely and usable.",
        "Where needed, we go further—developing web and mobile applications that operationalize workflows, improve access to information, and support decision-making at scale.",
      ],
    },

    servicesPreview: {
      title: "What we help you achieve",
      description:
        "Our work is organized around outcomes: clarity, consistency, and decision-ready tools. Each engagement produces practical deliverables—not just advice.",
      items: [
        {
          title: "Tech Solutions (Web & Apps)",
          icon: "LaptopCode",
          desc:
            "Build and improve digital systems that support operations and access to information—web platforms, mobile apps, and internal tools.",
          bullets: ["Web platforms and portals", "Custom tools and integrations", "Product UX improvements"],
          media: {
            type: "image",
            src: "/images/sections/section-workshop.webp",
            alt: "Product design workshop in progress",
          },
          href: "/services/tech-solutions",
        },
        {
          title: "Data Strategy & Governance",
          icon: "Network",
          desc:
            "Align objectives, define KPIs, and establish practical data rules so reporting becomes consistent and trusted across teams.",
          bullets: ["Indicator/KPI definition", "Data ownership and schedules", "Validation and reconciliation points"],
          href: "/services/data-strategy-governance",
        },
        {
          title: "Dashboards & Reporting",
          icon: "LayoutDashboard",
          desc:
            "Decision-ready dashboards and reporting packs that answer real management questions—updated on schedule.",
          bullets: ["Dashboard design and modeling", "Standardized reporting packs", "Refresh and distribution plans"],
          media: {
            type: "image",
            src: "/images/sections/section-dashboard.webp",
            alt: "Dashboard and analytics visualization",
          },
          href: "/services/dashboards-reporting",
        },
        {
          title: "M&E Frameworks & Performance Analytics",
          icon: "ClipboardCheck",
          desc:
            "Results frameworks, scorecards, and review cycles that turn activity data into accountability and learning.",
          bullets: ["Indicator frameworks and targets", "Scorecards and review packs", "Outcome tracking and analysis"],
          href: "/services/monitoring-evaluation",
        },
        {
          title: "Data Cleaning, Validation & Automation",
          icon: "Workflow",
          desc:
            "Fix messy data and automate reporting workflows so outputs are repeatable, faster, and less error-prone.",
          bullets: ["Data cleaning and validation", "Reconciliation for linked outputs", "Automation pipelines and jobs"],
          media: {
            type: "image",
            src: "/images/sections/section-field-data.webp",
            alt: "Digital data collection using a tablet",
          },
          href: "/services/data-automation",
        },
        {
          title: "Research, Forecasting & Capacity Building",
          icon: "FlaskConical",
          desc:
            "Rigorous research support and planning analytics, plus training so teams can sustain capability.",
          bullets: ["Study design and analysis", "Forecasting and scenarios", "Training and playbooks"],
          media: {
            type: "image",
            src: "/images/sections/section-training.webp",
            alt: "Professional training session",
          },
          href: "/services/research-analytics",
        },
        {
          title: "Digital Strategy (Brand, Content, UI/UX, SEO)",
          icon: "Megaphone",
          desc:
            "Strengthen visibility and adoption through structured digital strategy—messaging, content, UX, and search performance.",
          bullets: ["Messaging and content strategy", "UI/UX for clarity and conversion", "SEO foundations"],
          href: "/services/digital-strategy",
        },
      ],
    },

    process: {
      title: "How we work",
      description:
        "A disciplined approach that reduces delivery risk, improves quality early, and ensures solutions are usable and sustainable.",
      steps: [
        {
          title: "Discovery",
          icon: "Search",
          detail:
            "Clarify the decision, users, context, and constraints. Agree on scope, deliverables, timeline, and success criteria.",
        },
        {
          title: "Design",
          icon: "PencilRuler",
          detail:
            "Define indicators, workflows, validation rules, and architecture. For software, define user journeys and requirements.",
        },
        {
          title: "Build & Validate",
          icon: "Wrench",
          detail:
            "Implement dashboards, pipelines, analytics, or product features. Validate outputs using reconciliation checks and stakeholder review.",
        },
        {
          title: "Transfer & Support",
          icon: "GraduationCap",
          detail:
            "Deliver documentation, training, and handover. Optional retainer support for continuous improvement and review cycles.",
        },
      ],
    },

    finalCTA: {
      title: "Ready to strengthen decision-making in your organization?",
      description:
        "Share your context—data sources, reporting cycle, and the decisions you need to improve. We’ll propose a practical plan, timeline, and deliverables.",
      cta: { label: "Book a consultation", href: "/contact", icon: "CalendarCheck" },
    },
  },

  // -----------------------------
  // SERVICES (fix media paths + make content align to your earlier service list)
  // -----------------------------
  services: {
    seo: {
      title: "Services | Mstatili Technologies",
      description:
        "Technology and data consulting services: web/app development, data strategy, dashboards, M&E frameworks, data cleaning and validation, automation pipelines, forecasting, research support, training, and digital strategy.",
      ogImage: "/images/og/og-services.webp",
    },

    hero: {
      title: "Services designed for outcomes",
      subtitle:
        "We combine advisory and implementation to deliver usable systems—dashboards, automation, analytics, software tools, and capability building.",
      media: {
        type: "image",
        src: "/images/hero/hero-services.webp",
        alt: "A modern consulting team planning delivery and outcomes",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-grid.svg" },
      },
    },

    intro: {
      paragraphs: [
        "Our services are built around outcomes: timely reporting, reliable figures, and accessible tools that support real decisions. We combine advisory and implementation so delivery goes beyond recommendations.",
        "Each engagement produces practical deliverables—systems, workflows, templates, dashboards, scripts, documentation, and training—so the work remains usable and sustainable after handover.",
      ],
    },

    engagementModels: {
      title: "Engagement models",
      items: [
        {
          title: "Project-based delivery",
          icon: "ClipboardList",
          detail:
            "Defined scope and timeline—ideal for dashboards, automation pipelines, software builds, M&E frameworks, or research analysis and reporting.",
        },
        {
          title: "Advisory / retainer",
          icon: "Handshake",
          detail:
            "Ongoing support for analytics, reporting design, data quality reviews, product improvement, and performance review cycles.",
        },
        {
          title: "Capacity building",
          icon: "GraduationCap",
          detail:
            "Workshops plus coached implementation using your real datasets and tools—ideal for teams strengthening internal capability.",
        },
      ],
    },

    items: [
      // 1) Tech Solutions
      {
        slug: "tech-solutions",
        title: "Tech Solutions (Web & Apps)",
        icon: "LaptopCode",
        oneLiner:
          "Digital systems that operationalize workflows—web platforms, apps, and tools built for usability and sustainability.",
        media: { type: "image", src: "/images/sections/section-workshop.webp", alt: "Product and systems design workshop" },
        whoItsFor: [
          "SMEs needing operational tools and customer-facing platforms",
          "NGOs requiring portals, internal systems, or data collection tools",
          "Research teams needing structured digital workflows for capture and access",
        ],
        problemsWeSolve: [
          "Manual workflows that should be digitized",
          "Poor access to information due to fragmented systems",
          "Tools that are hard to use or difficult to maintain",
        ],
        typicalDeliverables: [
          "Web platform or application (feature-defined MVP to iterative build)",
          "Mobile application (as required by use case)",
          "Integrations and workflow automation hooks (where feasible)",
          "UI/UX improvements focused on usability and conversion",
          "Documentation, maintenance guidance, and handover",
        ],
        approach: [
          "Define workflow and user journey (requirements + success metrics)",
          "Design for usability and operational reality",
          "Build iteratively—test early with real users",
          "Document and hand over for sustainable maintenance",
        ],
        successLooksLike: [
          "A tool people actually use",
          "Reduced manual effort and clearer workflows",
          "Improved access to information and faster turnaround",
        ],
      },

      // 2) Data Strategy & Governance
      {
        slug: "data-strategy-governance",
        title: "Data Strategy & Governance",
        icon: "Network",
        oneLiner:
          "Clear KPIs, defined data sources, and practical rules that make reporting consistent and trusted across teams.",
        media: { type: "pattern", src: "/images/patterns/pattern-geo-lines.svg", alt: "Geometric pattern background" },
        whoItsFor: [
          "SMEs scaling operations and needing consistent reporting",
          "NGOs tracking results across multiple teams or locations",
          "Research groups managing repeated data collection and analysis",
        ],
        problemsWeSolve: [
          "Different teams reporting the same KPI differently",
          "Disputes over numbers due to unclear definitions and sources",
          "Lack of data ownership, schedules, and validation rules",
        ],
        typicalDeliverables: [
          "Indicator/KPI dictionary (definitions, formulas, frequency, owners)",
          "Data flow map (sources → transformations → outputs)",
          "Data processing and validation rules (quality checks)",
          "Reporting calendar and roles/responsibilities",
          "Governance recommendations that fit operating reality",
        ],
        approach: [
          "Clarify decisions and audiences for reporting",
          "Translate objectives into measurable indicators",
          "Map sources and define ownership",
          "Introduce validation and reconciliation checkpoints",
        ],
        successLooksLike: [
          "Consistent KPI interpretation across stakeholders",
          "Less manual reconciliation and fewer disputes",
          "A reporting rhythm teams can follow and sustain",
        ],
      },

      // 3) Dashboards & Reporting
      {
        slug: "dashboards-reporting",
        title: "Dashboards & Reporting",
        icon: "LayoutDashboard",
        oneLiner:
          "Decision-ready dashboards and reporting packs—designed for real meetings, real users, and reliable totals.",
        media: { type: "image", src: "/images/sections/section-dashboard.webp", alt: "Analytics dashboard visualization" },
        whoItsFor: [
          "Managers and leaders needing fast clarity",
          "Operations teams tracking follow-ups and delivery",
          "Programs needing consistent stakeholder reporting",
        ],
        problemsWeSolve: [
          "Reports that take too long to prepare and are hard to interpret",
          "Dashboards that look good but don’t match decision workflows",
          "Inconsistent figures across linked reports and tables",
        ],
        typicalDeliverables: [
          "Dashboard blueprint (KPIs, filters, drill-down structure)",
          "Data model and reporting logic documentation",
          "Executive summary dashboard + operational views (as needed)",
          "Standardized templates and review packs",
          "Refresh and distribution plan (manual → automated, as feasible)",
        ],
        approach: [
          "Start with the decision and review process",
          "Validate KPI definitions and data logic early",
          "Build iteratively with stakeholder feedback",
          "Add reconciliation checks to protect consistency",
        ],
        successLooksLike: [
          "Faster reviews with clearer actions",
          "Reduced effort compiling and correcting reports",
          "A single source of truth used consistently",
        ],
      },

      // 4) M&E frameworks / indicators
      {
        slug: "monitoring-evaluation",
        title: "M&E Frameworks, Indicators & Performance Analytics",
        icon: "ClipboardCheck",
        oneLiner:
          "Results frameworks and scorecards that connect activities to outcomes—built for consistent review cycles.",
        media: { type: "pattern", src: "/images/patterns/pattern-dot-matrix.svg", alt: "Dot matrix background pattern" },
        whoItsFor: [
          "NGOs and programs reporting to stakeholders",
          "Teams implementing performance tracking and review cycles",
          "Projects requiring structured indicator definitions and targets",
        ],
        problemsWeSolve: [
          "Indicators that are not measurable or not aligned to objectives",
          "Activity reporting that misses outcomes",
          "Reviews without consistent evidence or metrics",
        ],
        typicalDeliverables: [
          "Results framework (inputs → outputs → outcomes)",
          "Indicator set with definitions, targets, and sources",
          "Scorecards and review packs (monthly/quarterly)",
          "Performance analysis and narrative guidance",
        ],
        approach: [
          "Align objectives and logic of change (where relevant)",
          "Define measurable indicators and feasible data sources",
          "Build scorecards and templates",
          "Introduce a review rhythm and feedback loop",
        ],
        successLooksLike: [
          "Clear line of sight from activities to outcomes",
          "More effective review meetings and follow-ups",
          "Improved consistency and confidence in reporting",
        ],
      },

      // 5) Data cleaning & reconciliation + automation & data pipelines
      {
        slug: "data-automation",
        title: "Data Cleaning, Reconciliation & Automation",
        icon: "Workflow",
        oneLiner:
          "Fix messy data and automate workflows so reporting becomes repeatable, auditable, and on time.",
        media: { type: "image", src: "/images/sections/section-field-data.webp", alt: "Digital data collection in the field" },
        whoItsFor: [
          "Teams struggling with duplicates, missing values, and conflicting datasets",
          "Organizations spending too much time preparing reports manually",
          "Programs combining data from multiple sources and tools",
        ],
        problemsWeSolve: [
          "Inconsistent totals across linked tables and outputs",
          "Data quality issues that repeat every reporting cycle",
          "Manual workflows that introduce errors and delays",
        ],
        typicalDeliverables: [
          "Data cleaning plan + reproducible workflows/scripts",
          "Validation rules and reconciliation checks",
          "Cleaned datasets with documentation",
          "Automation pipelines (scheduled jobs, exports, refresh routines)",
          "Exception logging and quality assurance guidance",
        ],
        approach: [
          "Profile data and identify inconsistency drivers",
          "Implement cleaning and validation rules",
          "Add reconciliation checks for linked outputs",
          "Automate what can be sustained and documented",
        ],
        successLooksLike: [
          "Less time cleaning data every cycle",
          "More consistent outputs and fewer disputes",
          "Reporting that becomes reliable and repeatable",
        ],
      },

      // 6) Forecasting & scenario analysis + research support + surveys + training
      {
        slug: "research-analytics",
        title: "Research Support, Forecasting & Capacity Building",
        icon: "FlaskConical",
        oneLiner:
          "Rigorous research and planning analytics—plus training so teams can interpret, maintain, and extend the work.",
        media: { type: "image", src: "/images/sections/section-training.webp", alt: "Training and capacity building session" },
        whoItsFor: [
          "Researchers needing study design, analysis, and reporting support",
          "Organizations planning targets, budgets, and resource allocation",
          "Teams building internal analytics capacity",
        ],
        problemsWeSolve: [
          "Research designs that don’t align with available data",
          "Analysis that is hard to communicate to stakeholders",
          "Planning without defensible assumptions and scenarios",
          "Over-reliance on one person for analytics work",
        ],
        typicalDeliverables: [
          "Research design support (objectives, questions, methodology)",
          "Statistical analysis and reporting (clear assumptions and methods)",
          "Forecasting models and scenario analysis",
          "Survey design and digital data collection workflows",
          "Training sessions, templates, and practical playbooks",
        ],
        approach: [
          "Clarify the decision or research question and success criteria",
          "Assess data readiness and propose feasible methods",
          "Deliver analysis with validation and transparent assumptions",
          "Translate results into stakeholder-ready insights",
          "Train teams on interpretation and maintenance",
        ],
        successLooksLike: [
          "Analysis stakeholders trust and understand",
          "Forecasts and scenarios that support prioritization",
          "Improved internal capacity to manage and interpret data",
        ],
      },

      // 7) Digital strategy (from archived consulting intent) + adoption
      {
        slug: "digital-strategy",
        title: "Digital Strategy (Brand, Content, UI/UX, SEO)",
        icon: "Megaphone",
        oneLiner:
          "Digital strategy that improves visibility, usability, and conversion—grounded in clear messaging and measurable goals.",
        media: { type: "pattern", src: "/images/patterns/pattern-grid.svg", alt: "Subtle grid pattern background" },
        whoItsFor: [
          "SMEs improving online presence and lead generation",
          "Programs needing clear communication and user-friendly platforms",
          "Teams wanting better UX and content structure for adoption",
        ],
        problemsWeSolve: [
          "Weak positioning and inconsistent messaging",
          "Sites that look fine but don’t convert or communicate value",
          "Poor discoverability due to missing SEO fundamentals",
        ],
        typicalDeliverables: [
          "Positioning and messaging direction (value proposition, tone, structure)",
          "Content structure and page copy guidance",
          "UI/UX improvements and web design support",
          "SEO foundations (site structure + on-page best practices)",
        ],
        approach: [
          "Clarify goals and target audience",
          "Define messaging and content structure",
          "Improve UX for clarity and conversion",
          "Strengthen discoverability through SEO fundamentals",
        ],
        successLooksLike: [
          "Clearer messaging and stronger trust signals",
          "Better usability and conversion paths",
          "Improved visibility and consistency over time",
        ],
      },
    ],

    cta: {
      title: "Not sure which service fits?",
      description:
        "Share your context and what decision you want to improve. We’ll recommend a practical approach and outline likely deliverables.",
      button: { label: "Book a consultation", href: "/contact", icon: "CalendarCheck" },
    },
  },

  // -----------------------------
  // CASE STUDIES (fix hero image path + tighten language)
  // -----------------------------
  caseStudies: {
    seo: {
      title: "Case Studies | Mstatili Technologies",
      description:
        "Selected work across data ecosystems, dashboards, performance frameworks, automation pipelines, and decision-support tools.",
      ogImage: "/images/og/og-case-studies.webp",
    },

    hero: {
      title: "Case studies",
      subtitle:
        "Examples of decision-oriented delivery—practical tools, reliable workflows, and outcomes that reduce friction for teams.",
      media: {
        type: "image",
        src: "/images/hero/hero-case-studies.webp",
        alt: "Project review and results evaluation",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-geo-lines.svg" },
      },
    },

    intro: {
      paragraphs: [
        "These examples illustrate how we deliver: decision-oriented analytics, practical tools, and workflows that reduce friction and improve trust in outputs.",
        "Client names are not listed to respect confidentiality. Each case focuses on the problem, approach, deliverables, and outcomes.",
      ],
    },

    items: [
      {
        slug: "nextstepke-career-decision-support",
        category: "Tech Solutions",
        title: "NextstepKE — Career Decision Support Ecosystem",
        icon: "LaptopCode",
        cover: { src: "/images/case-studies/case-nextstepke-cover.webp", alt: "NextstepKE case cover (abstract)" },
        gallery: [
          { src: "/images/case-studies/case-nextstepke-shot-01.webp", alt: "Illustrative product UI mockup" },
          { src: "/images/case-studies/case-nextstepke-shot-02.webp", alt: "Illustrative insights dashboard mockup" },
        ],
        summary:
          "Designed and built an ecosystem that collects and structures fragmented career information, then delivers it through an application to support better career and job-search decisions.",
        context:
          "Users relied on scattered, inconsistent information across multiple platforms. There was no single system to aggregate, validate, and present insights in a structured way.",
        problem: [
          "Fragmented data across disjointed sources",
          "No automated pipeline for collection and processing",
          "Limited decision-support during job search and planning",
        ],
        approach: [
          "Designed a collection and processing ecosystem",
          "Implemented automation to structure and refresh data",
          "Built an application layer that makes insights accessible and actionable",
        ],
        deliverables: [
          "End-to-end data collection and processing workflow",
          "Structured outputs and update routines",
          "Decision-support application for guidance",
        ],
        outcomes: [
          "Simplified access to relevant information",
          "Improved decision support during job search and planning",
          "Demonstrated impact of combining data engineering with product delivery",
        ],
        timeline: "Iterative build (prototype to working product)",
      },

      {
        slug: "performance-reporting-framework",
        category: "M&E",
        title: "Performance & Reporting Framework",
        icon: "ClipboardCheck",
        cover: {
          src: "/images/case-studies/case-performance-framework-cover.webp",
          alt: "Performance framework cover (abstract)",
        },
        gallery: [
          { src: "/images/case-studies/case-performance-framework-mock-01.webp", alt: "Illustrative scorecard/dashboard mock" },
        ],
        summary:
          "Defined indicators, reconciled datasets, and built reporting templates and dashboards to improve consistency, trust, and reporting speed.",
        context:
          "Reporting was slow and inconsistent due to unclear indicators, manual compilation, and repeated data quality issues.",
        problem: [
          "Indicators interpreted differently across teams",
          "Manual workflows caused delays and errors",
          "Low trust in figures due to inconsistent totals",
        ],
        approach: [
          "Clarified indicators and aligned them to objectives",
          "Cleaned and reconciled datasets with validation checks",
          "Designed standardized reporting templates and dashboards",
          "Introduced repeatable workflow guidance for reporting cycles",
        ],
        deliverables: [
          "Indicator framework and definitions",
          "Validated datasets with reconciliation checks",
          "Dashboards and standardized reporting templates",
          "Workflow guidance for repeatable reporting cycles",
        ],
        outcomes: [
          "Improved consistency and trust in outputs",
          "Faster reporting cycles with fewer corrections",
          "Clearer reviews and follow-up actions",
        ],
        timeline: "4–8 weeks (scope dependent)",
      },
    ],
  },

  // -----------------------------
  // INSIGHTS (fix hero path)
  // -----------------------------
  insights: {
    seo: {
      title: "Insights | Mstatili Technologies",
      description:
        "Practical notes on data quality, dashboards, M&E, automation, forecasting, research methods, and digital strategy.",
      ogImage: "/images/og/og-insights.webp",
    },

    hero: {
      title: "Insights",
      subtitle:
        "Short, practical notes on analytics, reporting, product delivery, and decision support—focused on what works in real organizations.",
      media: {
        type: "image",
        src: "/images/hero/hero-insights.webp",
        alt: "Professional workspace with analytics planning",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-dot-matrix.svg" },
      },
    },

    intro: {
      paragraphs: [
        "We emphasize clarity, validation, and sustainable workflows over buzzwords and one-off analysis.",
        "Insights are written to support teams building reporting systems, data pipelines, dashboards, and decision-ready analytics.",
      ],
    },

    posts: [
      {
        slug: "data-quality-that-sticks",
        title: "Data quality that sticks: checks that prevent repeat errors",
        date: "2025-12-01",
        readingTime: "6 min",
        category: "Data Quality",
        icon: "BadgeCheck",
        excerpt:
          "Most data quality issues repeat because validation is not built into the workflow. This is a practical approach: definitions, checks, and reconciliation that teams can sustain.",
        markdownBody: `## Why data quality keeps failing
Data quality is often treated as a one-time clean-up. The real fix is to make validation part of the workflow.

## Step 1: Start with definitions
Agree on indicator definitions and how they are calculated. If teams interpret an indicator differently, no tool will fix the inconsistency.

## Step 2: Validate early
Introduce checks at data entry or ingestion: required fields, controlled values, and basic logic checks.

## Step 3: Reconcile linked outputs
Where tables or reports share totals, create reconciliation checks that must pass before publishing.

## Step 4: Make exceptions visible
Log exceptions. A visible exception list helps teams fix issues systematically.`,
      },
      {
        slug: "dashboards-managers-use",
        title: "Dashboards managers actually use: design for decisions, not charts",
        date: "2025-11-15",
        readingTime: "5 min",
        category: "Dashboards",
        icon: "LayoutDashboard",
        excerpt:
          "A dashboard is successful when it supports a meeting and produces a clear action. Here’s a structure that makes dashboards usable.",
        markdownBody: `## Start with the decision
Before building, ask: what decision changes if this KPI changes?

## Use a hierarchy
1) Executive summary (3–7 KPIs)
2) Drivers and drill-downs
3) Operational detail

## Add narrative cues
Highlight what changed, why it changed, and what should be checked next.

## Keep refresh realistic
Automate what can be sustained. A dashboard that breaks weekly will be abandoned.`,
      },
      {
        slug: "digital-strategy-for-trust",
        title: "Digital strategy for trust: make your services easier to understand and buy",
        date: "2025-10-10",
        readingTime: "6 min",
        category: "Digital Strategy",
        icon: "Megaphone",
        excerpt:
          "Good digital strategy is not noise—it is clarity. Here’s how to structure messaging, content, UX, and SEO to build trust and conversion over time.",
        markdownBody: `## Start with the offer
If your visitor cannot say what you do in 10 seconds, conversion drops.

## Structure content for scanning
Use headings, short paragraphs, and specific deliverables instead of long, generic claims.

## UX is credibility
Clear navigation, readable typography, and fast pages communicate professionalism.

## SEO supports discovery
Strong page structure and consistent keywords help the right clients find you.`,
      },
    ],
  },

  // -----------------------------
  // ABOUT (fix hero path)
  // -----------------------------
  about: {
    seo: {
      title: "About | Mstatili Technologies",
      description:
        "A multidisciplinary tech and data solutions firm serving SMEs, NGOs, and researchers—combining analytics, software development, automation, and digital strategy to support decision-making.",
      ogImage: "/images/og/og-default.webp",
    },

    hero: {
      title: "A multidisciplinary team delivering technology and data solutions",
      subtitle:
        "We combine data science, statistics, software engineering, education expertise, and content strategy—so solutions are technically sound and practically adoptable.",
      media: {
        type: "image",
        src: "/images/hero/hero-about.webp",
        alt: "Team collaboration in a modern work setting",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-grid.svg" },
      },
    },

    story: {
      title: "What we do and why it works",
      icon: "Compass",
      paragraphs: [
        "Organizations often face the same obstacles: unclear indicators, inconsistent data, delayed reporting, and tools that don’t match how teams operate. These challenges slow decisions and reduce confidence in results.",
        "We address both sides of the problem. We build systems and workflows, and we ensure the underlying data and methods are reliable, interpretable, and defensible.",
        "We also emphasize adoption. Good solutions are not only correct—they must be usable. That’s why documentation, training, and structured handover are part of delivery.",
      ],
    },

    principles: {
      title: "Principles",
      items: [
        {
          title: "Clarity before complexity",
          icon: "Sparkles",
          detail:
            "We clarify objectives, indicators, and workflows first. Tools should serve clarity—not replace it.",
        },
        {
          title: "Quality built into the workflow",
          icon: "BadgeCheck",
          detail:
            "Validation and reconciliation checks protect consistency across reports and linked outputs.",
        },
        {
          title: "Usability and adoption",
          icon: "MousePointerClick",
          detail:
            "We design for real users and operating conditions so the solution is used and sustained.",
        },
        {
          title: "Transfer and sustainability",
          icon: "GraduationCap",
          detail:
            "Documentation, training, and handover are part of delivery—not optional extras.",
        },
      ],
    },

    competencies: {
      title: "Core competencies",
      note:
        "We assemble capability based on the problem: technology build, data engineering, analytics and modeling, research support, and communication for adoption.",
      items: [
        { label: "Web and software development", icon: "LaptopCode" },
        { label: "Mobile applications and workflow tools", icon: "Smartphone" },
        { label: "Data processing, validation, and reconciliation", icon: "BadgeCheck" },
        { label: "Automation pipelines and scheduled reporting", icon: "Workflow" },
        { label: "Dashboards and decision support systems", icon: "LayoutDashboard" },
        { label: "Statistical analysis, forecasting, and scenario analysis", icon: "LineChart" },
        { label: "Research design, analysis, and reporting", icon: "FlaskConical" },
        { label: "Survey design and digital data collection workflows", icon: "ClipboardList" },
        { label: "Digital strategy: branding, content, UI/UX, SEO", icon: "Megaphone" },
        { label: "Training and capacity building", icon: "GraduationCap" },
      ],
    },
  },

  // -----------------------------
  // CONTACT (fix details emails + paths)
  // -----------------------------
  contact: {
    seo: {
      title: "Contact | Mstatili Technologies",
      description:
        "Contact Mstatili Technologies to discuss tech and data solutions: dashboards, automation, analytics, research support, web/app development, and digital strategy.",
      ogImage: "/images/og/og-default.webp",
    },

    hero: {
      title: "Contact us",
      subtitle:
        "Tell us what decision you want to improve. We’ll propose a practical approach, deliverables, and timeline.",
      media: {
        type: "image",
        src: "/images/hero/hero-contact.webp",
        alt: "Professional consultation setting",
        overlay: { type: "gradient", pattern: "/images/patterns/pattern-geo-lines.svg" },
      },
    },

    details: {
      // corrected as per your update (mstatili_tech@gmail.com -> mstatilitechnologies@gmail.com)
      emails: ["info@mstatilitechnologies.com", "mstatilitechnologies@gmail.com"],
      phoneWhatsApp: "+254 708 385 523",
      bookingLink: "https://calendar.app.google/Q2yec8nmeLsN9g1t8",
      contactCards: [
        {
          title: "Book a consultation",
          icon: "CalendarCheck",
          description: "Choose a suitable time using our booking link.",
          href: "https://calendar.app.google/Q2yec8nmeLsN9g1t8",
        },
        {
          title: "Email",
          icon: "Mail",
          description: "Send a brief overview and we’ll respond with next steps.",
          href: "mailto:info@mstatilitechnologies.com",
        },
        {
          title: "WhatsApp / Phone",
          icon: "Phone",
          description: "For quick coordination and clarifications.",
          href: "tel:+254708385523",
        },
      ],
    },

    booking: {
      title: "Book a consultation",
      description:
        "Prefer a call? Use the booking link to choose a suitable time. If you’re not ready, send a message and we’ll respond with next steps.",
      link: {
        label: "Book a consultation",
        icon: "CalendarCheck",
        href: "https://calendar.app.google/Q2yec8nmeLsN9g1t8",
      },
    },

    form: {
      title: "Send a message",
      description:
        "Share a brief overview of your needs. If relevant, include your reporting cycle, data sources/tools, and the decision you want to improve.",
      fields: {
        fullName: { label: "Full name", placeholder: "Your name" },
        email: { label: "Email", placeholder: "you@organization.org" },
        organization: { label: "Organization", placeholder: "Organization / institution" },
        organizationType: {
          label: "Organization type",
          options: ["SME / Private Company", "NGO / Program", "Research / Academic", "Other"],
        },
        interest: {
          label: "What do you need help with?",
          options: [
            "Tech solutions (web/app development)",
            "Data strategy & governance",
            "Dashboards & reporting",
            "M&E frameworks / indicators",
            "Data cleaning, validation & reconciliation",
            "Automation & data pipelines",
            "Forecasting & scenario analysis",
            "Surveys & data collection",
            "Training & capacity building",
            "Research support (study design, analysis, reporting)",
            "Digital strategy (brand/content/UI-UX/SEO)",
            "Other",
          ],
        },
        timeline: {
          label: "Timeline",
          options: ["Urgent (0–2 weeks)", "Short (2–6 weeks)", "Medium (6–12 weeks)", "Flexible"],
        },
        message: {
          label: "Message",
          placeholder:
            "Describe your context, data sources/tools, and what you want to achieve...",
        },
      },
      consentNote:
        "By submitting this form, you agree that we may contact you about your inquiry. We do not sell your information.",
      submit: "Send message",
      successTitle: "Message received",
      successMessage:
        "Thanks for reaching out. We’ll respond with next steps and, where relevant, a short clarification list to confirm scope.",
    },
  },

  // -----------------------------
  // FOOTER
  // -----------------------------
  footer: {
    shortStatement:
      "Tech and data solutions for decision-making: dashboards, automation, analytics, research support, digital strategy, and software systems.",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: {
      copyright: `© ${new Date().getFullYear()} Mstatili Technologies. Minding your Business.`,
      note: "Case studies may be presented in anonymized or illustrative form to respect confidentiality.",
    },
  },
};

export default siteContent;
