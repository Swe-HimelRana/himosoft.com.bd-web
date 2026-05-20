import type { Locale } from "@/lib/locale";
import {
  ALL_MARKETING_PATHS,
  getMarketingPage,
  MARKETING_PAGE_SLUGS,
} from "@/lib/marketingPages";
import type { SiteContent } from "@/types/site";

export type SitemapLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SitemapGroup = {
  title: string;
  links: SitemapLink[];
};

/** Homepage sections also have dedicated marketing pages. */
const HOME_SECTIONS: { path: string; labelKey: keyof SiteContent }[] = [
  { path: "/stories", labelKey: "stories" },
  { path: "/services", labelKey: "services" },
  { path: "/platform", labelKey: "platformTriad" },
  { path: "/domains", labelKey: "domains" },
  { path: "/capabilities", labelKey: "capabilities" },
  { path: "/partners", labelKey: "partners" },
  { path: "/about", labelKey: "about" },
  { path: "/team", labelKey: "team" },
  { path: "/insights", labelKey: "insights" },
  { path: "/contact", labelKey: "ctaBand" },
];

function sectionLabel(
  site: SiteContent,
  key: (typeof HOME_SECTIONS)[number]["labelKey"],
): string {
  const block = site[key];
  if (key === "ctaBand" && "title" in block) return block.title;
  if ("sectionTitle" in block) return block.sectionTitle;
  return key;
}

/** Build grouped links for the HTML sitemap page (locale-aware). */
export async function buildSitemapGroups(
  site: SiteContent,
  locale: Locale,
): Promise<SitemapGroup[]> {
  const s = site.sitemap;

  const legalColumn = site.footer.columns.find((col) =>
    col.links.some((l) => l.href === "/privacy" || l.href === "/terms"),
  );

  const externalItems = site.nav.items.filter(
    (item): item is Extract<typeof item, { href: string }> =>
      "href" in item && !("mega" in item) && Boolean(item.external),
  );

  const marketingLinks = await Promise.all(
    MARKETING_PAGE_SLUGS.map(async (slug) => {
      const page = await getMarketingPage(locale, slug);
      const label = page.meta.title.replace(/ \| HimoSoft$/, "");
      return { label, href: `/${slug}` };
    }),
  );

  return [
    {
      title: s.groupPages,
      links: [
        { label: s.homeLabel, href: "/" },
        { label: s.pageTitle, href: "/sitemap" },
      ],
    },
    {
      title: s.groupSections,
      links: HOME_SECTIONS.map(({ path, labelKey }) => ({
        label: sectionLabel(site, labelKey),
        href: path,
      })),
    },
    {
      title: "Topics & services",
      links: marketingLinks.filter(
        (link) => !HOME_SECTIONS.some((section) => section.path === link.href),
      ),
    },
    {
      title: s.groupLegal,
      links: [
        { label: s.privacyLabel, href: "/privacy" },
        { label: s.termsLabel, href: "/terms" },
        { label: s.cookiesLabel, href: "/cookies" },
        ...(legalColumn?.links.filter((l) => l.href.startsWith("/")).map((l) => ({
          label: l.label,
          href: l.href,
        })) ?? []),
      ].filter(
        (link, index, arr) => arr.findIndex((l) => l.href === link.href) === index,
      ),
    },
    {
      title: s.groupExternal,
      links: externalItems.map((item) => ({
        label: item.label,
        href: item.href,
        external: true,
      })),
    },
  ];
}

/** All indexable paths for XML sitemap (no hash URLs). */
export const XML_SITEMAP_PATHS = [
  "/",
  "/sitemap",
  "/privacy",
  "/terms",
  "/cookies",
  ...ALL_MARKETING_PATHS,
] as const;
