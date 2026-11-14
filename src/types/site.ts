export type NavLink = { label: string; href: string };

export type Cta = { label: string; href: string };

export type MegaMenuLink = {
  label: string;
  href: string;
  description?: string;
};

export type MegaMenuColumn = {
  title?: string;
  links: MegaMenuLink[];
};

export type MegaMenuPanel = {
  featured?: {
    eyebrow?: string;
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  };
  columns: MegaMenuColumn[];
};

/** Simple nav link (in-page anchor or external URL) */
export type NavItemLink = {
  id: string;
  label: string;
  href: string;
  /** Opens in a new tab when true or when href is http(s) */
  external?: boolean;
};

/** Top-level item that opens a mega panel (SAP-style) */
export type NavItemMega = {
  id: string;
  label: string;
  href?: string;
  mega: MegaMenuPanel;
};

export type NavItem = NavItemLink | NavItemMega;

export type StoryCard = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type PlatformTriadItem = {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export type DomainTile = {
  title: string;
  description: string;
  href: string;
};

export type PartnerTile = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type InsightCard = {
  badge: string;
  title: string;
  description?: string;
  href: string;
  linkLabel: string;
};

export type SiteContent = {
  meta: {
    siteTitle: string;
    siteDescription: string;
    locale: string;
    copyright: string;
  };
  nav: {
    brand: string;
    menuLabel: string;
    a11y: {
      mainNav: string;
      mobileNav: string;
      megaLinkGroup: string;
      closeMenuBackdrop: string;
    };
    items: NavItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    aside: {
      title: string;
      body: string;
      cards: { label: string; value: string }[];
    };
  };
  webPresence: {
    eyebrow: string;
    title: string;
    visitLabel: string;
    items: {
      host: string;
      region: string;
      description: string;
      href: string;
      flagSrc: string;
    }[];
  };
  trustStrip: {
    headline: string;
    stats: { value: string; label: string }[];
  };
  stories: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: StoryCard[];
  };
  spotlights: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: { title: string; description: string; linkLabel: string; href: string }[];
  };
  platformTriad: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: PlatformTriadItem[];
  };
  services: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: { title: string; description: string }[];
  };
  domains: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    linkHint: string;
    items: DomainTile[];
  };
  capabilities: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    pillars: { title: string; description: string }[];
  };
  partners: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: PartnerTile[];
  };
  about: {
    sectionEyebrow: string;
    sectionTitle: string;
    paragraphs: string[];
  };
  team: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    members: { name: string; role: string }[];
  };
  insights: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: InsightCard[];
  };
  ctaBand: {
    title: string;
    subtitle: string;
    primaryCta: Cta;
  };
  faq: {
    sectionEyebrow: string;
    sectionTitle: string;
    sectionSubtitle: string;
    items: { question: string; answer: string }[];
  };
  sitemap: {
    pageTitle: string;
    metaDescription: string;
    intro: string;
    xmlNote: string;
    homeLabel: string;
    groupPages: string;
    groupSections: string;
    groupLegal: string;
    groupExternal: string;
    privacyLabel: string;
    termsLabel: string;
    cookiesLabel: string;
  };
  floatingContact: {
    buttonLabel: string;
    chatTitle: string;
    chatSubtitle: string;
    welcomeMessage: string;
    onlineLabel: string;
    closeLabel: string;
    loadingLabel: string;
    placeholder: string;
    sendLabel: string;
    typingLabel: string;
    errorLabel: string;
    contactHint: string;
  };
  cookieConsent: {
    title: string;
    description: string;
    detailsLabel: string;
    privacyLinkLabel: string;
    categories: { title: string; description: string }[];
    necessaryNote: string;
    rightsNote: string;
    retentionNote: string;
    acceptLabel: string;
    rejectLabel: string;
  };
  footer: {
    tagline: string;
    registrationLicense: string;
    contactEmailLabel: string;
    contactPhoneLabel: string;
    /** EU / Romania line shown next to the Bangladesh phone. */
    contactPhoneEuLabel: string;
    columns: {
      title: string;
      links: NavLink[];
      /** Renders obfuscated email + phones (not stored in locale JSON). */
      protectedContacts?: boolean;
    }[];
    legal?: string;
  };
  newProducts: {
    modal: {
      title: string;
      subtitle: string;
      closeLabel: string;
      statusDone: string;
      statusOngoing: string;
      steps: {
        planning: string;
        requirementAnalysis: string;
        development: string;
        testing: string;
        deployment: string;
      };
    };
    playProtect: {
      name: string;
      description: string;
      href: string;
      category: string;
      status: "live" | "comingSoon";
    };
    mikrotikConnect: {
      name: string;
      description: string;
      href: string;
      category: string;
      status: "live" | "comingSoon";
    };
    linuxMirror: {
      name: string;
      description: string;
      href: string;
      category: string;
      status: "live" | "comingSoon";
    };
    liveLabel: string;
  };
  errors: {
    notFound: {
      eyebrow: string;
      title: string;
      description: string;
      homeLabel: string;
      sitemapLabel: string;
      contactLabel: string;
    };
    server: {
      eyebrow: string;
      title: string;
      description: string;
      retryLabel: string;
      homeLabel: string;
      contactLabel: string;
    };
  };
};
