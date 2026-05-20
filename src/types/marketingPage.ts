export type MarketingCard = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export type MarketingSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  cards?: MarketingCard[];
};

export type MarketingPageContent = {
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  sections: MarketingSection[];
  relatedLinks?: { label: string; href: string }[];
  cta?: {
    title: string;
    subtitle: string;
    label: string;
    href: string;
  };
  nav: {
    backLabel: string;
    onThisPageLabel: string;
  };
  /** Render team grid from locale site content */
  showTeam?: boolean;
  /** Copy for the contact-details popup (contact page only). */
  contactModal?: {
    title: string;
    description: string;
    closeLabel: string;
  };
};
