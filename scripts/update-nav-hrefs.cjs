/**
 * Updates nav/footer/hero hrefs from #anchors to /routes across all locale files.
 * Run: node scripts/update-nav-hrefs.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const localesDir = path.join(process.cwd(), "content", "locales");

/** Exact href replacements (order matters for more specific patterns first). */
const REPLACEMENTS = [
  ["#ecommerce-retail", "/ecommerce-retail"],
  ["#education-training", "/education-training"],
  ["#healthcare", "/healthcare"],
  ["#logistics-operations", "/logistics-operations"],
  ["#mvps-launches", "/mvps-launches"],
  ["#legacy-modernisation", "/legacy-modernisation"],
  ["#api-first", "/api-first"],
  ["#design-systems-ux", "/design-systems-ux"],
  ["#custom-software", "/custom-software"],
  ["#web-applications", "/web-applications"],
  ["#mobile-apps", "/mobile-apps"],
  ["#databases", "/databases"],
  ["#apis-webhooks", "/apis-webhooks"],
  ["#cloud-deployment", "/cloud-deployment"],
  ["#security-compliance", "/security-compliance"],
  ["#support-sla", "/support-sla"],
  ["#discovery", "/discovery"],
  ["#sprints-releases", "/sprints-releases"],
  ["#qa-observability", "/qa-observability"],
  ["#post-launch", "/post-launch"],
  ["#tech-stack", "/tech-stack"],
  ["#support-plans", "/support-plans"],
  ["#careers", "/careers"],
  ["#solutions", "/solutions"],
  ["#services", "/services"],
  ["#delivery", "/delivery"],
  ["#stories", "/stories"],
  ["#platform", "/platform"],
  ["#domains", "/domains"],
  ["#capabilities", "/capabilities"],
  ["#partners", "/partners"],
  ["#about", "/about"],
  ["#team", "/team"],
  ["#insights", "/insights"],
  ["#contact", "/contact"],
];

/** Per-locale label → href for mega menu items that all pointed at generic anchors. */
const MEGA_LABEL_HREFS = {
  "E‑commerce & retail": "/ecommerce-retail",
  "Education & training": "/education-training",
  "Healthcare & appointments": "/healthcare",
  "Logistics & operations": "/logistics-operations",
  "MVPs & fast launches": "/mvps-launches",
  "Legacy modernisation": "/legacy-modernisation",
  "API‑first ecosystems": "/api-first",
  "Design systems & UX": "/design-systems-ux",
  "Custom software": "/custom-software",
  "Web applications": "/web-applications",
  "Mobile (iOS / Android)": "/mobile-apps",
  "Databases & performance": "/databases",
  "APIs & webhooks": "/apis-webhooks",
  "Cloud & deployment": "/cloud-deployment",
  "Security & compliance": "/security-compliance",
  "Support & SLA": "/support-sla",
  "Discovery & prototyping": "/discovery",
  "Sprints & releases": "/sprints-releases",
  "QA & observability": "/qa-observability",
  "Post‑launch improvements": "/post-launch",
  "Tech stack notes": "/tech-stack",
  "Support plans": "/support-plans",
  "Freelance & contract roles": "/careers",
  "Overview": "/about",
  "Team & leadership": "/team",
  "Contact & office": "/contact",
  "Case highlights": "/stories",
  "Platform pillars": "/platform",
  "Domain capability grid": "/domains",
  "Platform triad": "/platform",
  "Delivery capabilities": "/capabilities",
  "Partner network": "/partners",
  "Become a partner": "/partners",
  "Interns & learning": "/insights",
  "Media & partnerships": "/partners",
  "Project brief (PDF template)": "/contact",
};

function walk(obj, fn) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => walk(item, fn));
  } else if (obj && typeof obj === "object") {
    fn(obj);
    Object.values(obj).forEach((v) => walk(v, fn));
  }
}

function updateLocale(file) {
  const raw = fs.readFileSync(file, "utf8");
  let text = raw;

  for (const [from, to] of REPLACEMENTS) {
    text = text.split(`"href": "${from}"`).join(`"href": "${to}"`);
  }

  const data = JSON.parse(text);

  walk(data, (node) => {
    if (typeof node.label === "string" && typeof node.href === "string" && MEGA_LABEL_HREFS[node.label]) {
      node.href = MEGA_LABEL_HREFS[node.label];
    }
  });

  // Featured CTAs and top-level nav
  if (data.nav?.ctaHref === "#contact") data.nav.ctaHref = "/contact";
  if (data.hero?.primaryCta?.href === "#contact") data.hero.primaryCta.href = "/contact";
  if (data.hero?.secondaryCta?.href === "#services") data.hero.secondaryCta.href = "/services";
  if (data.ctaBand?.primaryCta?.href === "#contact") data.ctaBand.primaryCta.href = "/contact";

  // Mega featured blocks
  walk(data.nav?.items ?? [], (node) => {
    if (node.mega?.featured) {
      const f = node.mega.featured;
      if (f.href === "#stories") f.href = "/stories";
      if (f.href === "#services") f.href = "/services";
      if (f.href === "#capabilities") f.href = "/capabilities";
      if (f.href === "#about") f.href = "/about";
    }
  });

  if (data.nav?.items) {
    for (const item of data.nav.items) {
      if (item.id === "insights" && item.href === "#insights") item.href = "/insights";
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("Updated", path.basename(file));
}

for (const name of fs.readdirSync(localesDir)) {
  if (name.endsWith(".json")) updateLocale(path.join(localesDir, name));
}
