export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  afterList?: string[];
};

export type LegalPageContent = {
  meta: {
    title: string;
    description: string;
    lastUpdated: string;
  };
  nav: {
    backLabel: string;
    onThisPageLabel: string;
  };
  intro: string;
  sections: LegalSection[];
};

export type LegalPageSlug = "terms" | "cookies" | "privacy";
