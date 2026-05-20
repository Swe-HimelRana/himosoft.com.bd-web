/**
 * Generates content/pages/en.json with marketing page copy.
 * Run: node scripts/generate-marketing-pages.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const nav = {
  backLabel: "Back to home",
  onThisPageLabel: "On this page",
};

const cta = {
  title: "Ready to discuss your project?",
  subtitle:
    "Tell us about scope, timeline, and constraints — we will respond with a clear roadmap and honest estimates.",
  label: "Contact HimoSoft",
  href: "/contact",
};

function meta(title, description) {
  return { title: `${title} | HimoSoft`, description };
}

function sec(id, title, paragraphs, extra = {}) {
  return { id, title, paragraphs, ...extra };
}

function P(...lines) {
  return lines;
}

const pages = {};

function add(slug, data) {
  pages[slug] = { nav, cta, ...data };
}

// —— Hubs ——
add("solutions", {
  meta: meta(
    "Solutions & industries",
    "Industry-focused software solutions, delivery styles, and digital platforms from HimoSoft.",
  ),
  eyebrow: "Solutions",
  title: "Solutions & industries",
  intro:
    "We do not sell one-size templates. HimoSoft shapes product roadmaps and architecture with you — from retail and education to healthcare and logistics — using delivery styles that match your risk tolerance and timeline.",
  sections: [
    sec("overview", "How we approach solutions", P(
      "Every engagement starts with your constraints: budget, team skills, regulatory context, and what “success” means in six months versus two years.",
      "We map those constraints to a solution shape — MVP, modernisation, API ecosystem, or design-system-led product — then staff a single squad across discovery, build, and run.",
    )),
    sec("industries", "Industries & use cases", P("Explore vertical patterns we implement most often:"), {
      cards: [
        { title: "E‑commerce & retail", description: "Catalogues, orders, and payment flows tuned for conversion.", href: "/ecommerce-retail", linkLabel: "Learn more" },
        { title: "Education & training", description: "Learning portals, cohorts, and progress tracking.", href: "/education-training", linkLabel: "Learn more" },
        { title: "Healthcare & appointments", description: "Affordable patient flows with safer data handling.", href: "/healthcare", linkLabel: "Learn more" },
        { title: "Logistics & operations", description: "Dashboards and near real‑time tracking for ops teams.", href: "/logistics-operations", linkLabel: "Learn more" },
      ],
    }),
    sec("styles", "Delivery styles", P("Match pace and risk to your stage:"), {
      cards: [
        { title: "MVPs & fast launches", description: "Something usable in weeks, not quarters.", href: "/mvps-launches", linkLabel: "Learn more" },
        { title: "Legacy modernisation", description: "Incremental rewrites and safer migrations.", href: "/legacy-modernisation", linkLabel: "Learn more" },
        { title: "API‑first ecosystems", description: "Connect partners and internal tools cleanly.", href: "/api-first", linkLabel: "Learn more" },
        { title: "Design systems & UX", description: "Consistent UI that scales with your teams.", href: "/design-systems-ux", linkLabel: "Learn more" },
      ],
    }),
  ],
  relatedLinks: [
    { label: "Services", href: "/services" },
    { label: "Case highlights", href: "/stories" },
    { label: "Contact", href: "/contact" },
  ],
});

add("services", {
  meta: meta("Services", "Custom software, web and mobile apps, APIs, cloud, security, and support from HimoSoft."),
  eyebrow: "Services",
  title: "Software development services",
  intro:
    "Engage HimoSoft end‑to‑end or as focused modules — from product discovery through engineering, integration, deployment, and long-term maintenance.",
  sections: [
    sec("overview", "What we offer", P(
      "Our service pillars cover the full product lifecycle: bespoke applications, modern web stacks, mobile experiences, data layers, integrations, cloud operations, security hardening, and SLA-backed support.",
      "Each pillar can be purchased alone or combined under one roadmap with shared architecture and documentation.",
    )),
    sec("engineering", "Engineering", P("Core build capabilities:"), {
      cards: [
        { title: "Custom software", description: "Solutions anchored to your domain rules and workflows.", href: "/custom-software", linkLabel: "Details" },
        { title: "Web applications", description: "Responsive, fast, SEO‑friendly sites and apps.", href: "/web-applications", linkLabel: "Details" },
        { title: "Mobile (iOS / Android)", description: "Native and cross‑platform with cohesive UX.", href: "/mobile-apps", linkLabel: "Details" },
        { title: "Databases & performance", description: "Modelling, indexing, and query optimisation.", href: "/databases", linkLabel: "Details" },
      ],
    }),
    sec("platform", "Integration & platform", P("Connect and run in production:"), {
      cards: [
        { title: "APIs & webhooks", description: "Third‑party services wired with clear contracts.", href: "/apis-webhooks", linkLabel: "Details" },
        { title: "Cloud & deployment", description: "CI/CD, hosting, and observability.", href: "/cloud-deployment", linkLabel: "Details" },
        { title: "Security & compliance", description: "Roles, audit trails, and hardening.", href: "/security-compliance", linkLabel: "Details" },
        { title: "Support & SLA", description: "Maintenance and incident response you can rely on.", href: "/support-sla", linkLabel: "Details" },
      ],
    }),
  ],
  relatedLinks: [
    { label: "Delivery process", href: "/delivery" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Domains", href: "/domains" },
  ],
});

add("delivery", {
  meta: meta("Delivery & quality", "Discovery, sprints, QA, observability, and post-launch improvement at HimoSoft."),
  eyebrow: "Delivery",
  title: "Delivery & quality",
  intro:
    "Clear roadmaps, weekly syncs, and scalable architecture — lightweight workflows that keep stakeholders aligned and shipping predictable.",
  sections: [
    sec("model", "Operating model", P(
      "We favour small, releasable increments over big-bang launches. Each sprint ends with something demonstrable — even if it is behind a feature flag.",
      "Architecture decisions are documented as ADRs so future teams understand trade-offs, not just outcomes.",
    )),
    sec("phases", "Phases of delivery", P("Typical flow from idea to steady-state operations:"), {
      cards: [
        { title: "Discovery & prototyping", description: "Sharpen requirements before code piles up.", href: "/discovery", linkLabel: "Read more" },
        { title: "Sprints & releases", description: "Controlled risk through frequent releases.", href: "/sprints-releases", linkLabel: "Read more" },
        { title: "QA & observability", description: "Test pyramid, logs, tracing, and alerts.", href: "/qa-observability", linkLabel: "Read more" },
        { title: "Post‑launch improvements", description: "Iterate from real usage metrics.", href: "/post-launch", linkLabel: "Read more" },
      ],
    }),
    sec("resources", "Resources", P("Supporting material and ongoing engagement options:"), {
      list: [
        "Tech stack notes and reference architectures — see Insights and Tech stack page",
        "Project brief template available on request via Contact",
        "Support plans tailored to your uptime and response needs",
        "Partner and referral programmes for agencies and integrators",
      ],
    }),
  ],
  relatedLinks: [
    { label: "Support plans", href: "/support-plans" },
    { label: "Tech stack", href: "/tech-stack" },
    { label: "Capabilities", href: "/capabilities" },
  ],
});

const hubPages = [
  ["stories", "Cases & patterns", "Where technology moves the needle — short narratives of places we frequently add leverage for retail, manufacturing, services, HR, logistics, and engineering velocity.", [
    sec("patterns", "Success patterns", P(
      "Clients come to HimoSoft when spreadsheets, disconnected tools, or legacy monoliths slow growth. We document the before/after: fewer manual steps, clearer ownership, and metrics that leadership actually watches.",
    )),
    sec("examples", "Example focus areas", P("Representative problem spaces:"), {
      list: [
        "Retail operations automation — inventory and orders in one dashboard",
        "Manufacturing digitisation — shift tracking and QC traceability",
        "Services bookings & payments — mobile-first scheduling and reminders",
        "HR & procurement workflows — approvals with audit trails",
        "Logistics decision support — routes and cargo signals visualised",
        "Development velocity — CI, staging, and quality gates the whole team follows",
      ],
    }),
  ]],
  ["platform", "Platform mindset", "Build · Lean on design & data · Govern & run — three pillars for sustainable software delivery.", [
    sec("build", "Build", P("Apps, integrations, and toolchain owned by one squad — frontend, backend, and DevOps with rapid iterations and testable releases.")),
    sec("design", "Design & data", P("UX/UI and data architecture designed together so day‑one decisions still make sense at day thousand.")),
    sec("govern", "Govern & run", P("Monitoring, security playbooks, and SLAs that protect business hours and customer trust.")),
  ]],
  ["domains", "Domains & functions", "When every function shares the same data fabric — we pair code with usage patterns and measurable outcomes.", [
    sec("grid", "Capability grid", P("Cross-functional domains we implement inside products:"), {
      list: [
        "Data & analytics — models, dashboards, event tracking",
        "Customer experience — landing through onboarding",
        "Workflows & approvals — multi-step chains with notifications",
        "E-commerce & payments — catalogues, checkout, reconciliation",
        "Integration hub — unified gateway across vendors",
        "Industrial operations — shifts, inventory, ticketing",
        "Team orchestration — roles, tasks, timelines",
        "Security & compliance — RBAC, logging, retention",
      ],
    }),
  ]],
  ["capabilities", "Platform capabilities", "Healthy glue between data, apps, and teams — faster paths from decisions to shipped software.", [
    sec("pillars", "Four pillars", P("How we structure long-running programmes:"), {
      cards: [
        { title: "Planning & architecture", description: "Scalable, secure, maintainable foundations from day zero." },
        { title: "Delivery & quality", description: "Iterative releases with reviews and automated testing." },
        { title: "Integration", description: "Bridging legacy and modern stacks — APIs first." },
        { title: "Operations & support", description: "Monitoring, patching, and proactive care." },
      ],
    }),
  ]],
  ["partners", "Partner network", "Co-deliver with design, infra, and domain specialists so your core team stays focused.", [
    sec("network", "Ecosystem", P(
      "HimoSoft partners with extension integrators, agencies, and technology vendors. Joint go-to-market and referral models stay lightweight — clear scopes and shared client success metrics.",
    )),
    sec("types", "Partner types", P("Who we collaborate with:"), {
      list: [
        "Cloud, payments, and marketing stack integrators",
        "Agencies and studios ready for implementation at scale",
        "Referral partners with aligned quality standards",
      ],
    }),
  ]],
  ["about", "About HimoSoft", "Client‑centric software studio — shipping disciplined engineering since 2020.", [
    sec("story", "Our story", P(
      "Founded in 2020, HimoSoft helps organisations reshape digital presence and operations as a focused software studio.",
      "Developers, designers, and project managers collaborate tightly to ship high-quality solutions that unlock growth and efficiency.",
    )),
    sec("approach", "How we work", P(
      "We zero in on your unique challenges so customised outcomes routinely exceed expectations.",
      "Documentation, handover, and training are part of “done”. Security and usability are non-negotiable.",
    )),
  ]],
  ["team", "Team & leadership", "Meet the specialists behind HimoSoft delivery.", [
    sec("leadership", "Who owns delivery", P(
      "A compact leadership layer keeps architecture coherent and communication direct. Day-to-day delivery is handled by engineers and PMs who know your product context.",
    )),
  ], { showTeam: true }],
  ["insights", "Insights & resources", "Workshops, guides, articles, and events — practical notes from our delivery practice.", [
    sec("content", "What you will find here", P(
      "Placeholder topics today — swap in your blog, YouTube, or live event URLs anytime. We publish on discovery labs, mobile release checklists, legacy modernisation, Dhaka/online meetups, and monthly delivery notes.",
    )),
    sec("topics", "Current topics", P("Representative assets:"), {
      list: [
        "Product discovery lab — remote or onsite",
        "Mobile release checklist for store and beta quality",
        "Modernising legacy systems — strangler patterns and pitfalls",
        "Dev meetup — Dhaka / online with live code review",
        "Monthly tech & delivery newsletter",
      ],
    }),
  ]],
  ["contact", "Contact HimoSoft", "Start a project thread — scope, timelines, budget, and next steps.", [
    sec("start", "Start a conversation", P(
      "Use the Contact HimoSoft button below to view our email and phone numbers. A short discovery call is enough — we bring clarity on stack, timelines, and risks.",
      "For careers and partnerships, mention your intent in the subject line so we route you to the right person quickly.",
    )),
    sec("expect", "What to expect", P("After you reach out:"), {
      list: [
        "Acknowledgement within one business day",
        "Optional NDA and brief template for sensitive scopes",
        "Proposal with phases, assumptions, and ballpark effort",
        "No pressure — we only proceed when the fit is mutual",
      ],
    }),
  ], {
    contactModal: {
      title: "Get in touch",
      description: "Choose email or phone — we typically reply within one business day.",
      closeLabel: "Close",
    },
  }],
];

for (const [slug, title, intro, sections, extra] of hubPages) {
  add(slug, {
    meta: meta(title, intro.slice(0, 155)),
    eyebrow: title.split("—")[0].trim().split("&")[0].trim(),
    title,
    intro,
    sections,
    relatedLinks: [{ label: "Contact", href: "/contact" }],
    ...extra,
  });
}

// —— Industry pages ——
const industries = [
  ["ecommerce-retail", "E‑commerce & retail", "Catalogues, checkout, inventory, and payment flows tuned for conversion and operational clarity."],
  ["education-training", "Education & training", "Learning portals, cohort management, assessments, and progress tracking for institutions and trainers."],
  ["healthcare", "Healthcare & appointments", "Patient booking, reminders, and staff workflows with attention to data minimisation and access control."],
  ["logistics-operations", "Logistics & operations", "Dashboards, dispatch, and near real‑time tracking for fleets, warehouses, and field teams."],
];

for (const [slug, title, intro] of industries) {
  add(slug, {
    meta: meta(title, intro),
    eyebrow: "Industry",
    title,
    intro,
    sections: [
      sec("challenges", "Typical challenges", P(
        "Teams in this space juggle legacy tools, manual reconciliation, and channels that outgrew their first platform. We start by mapping critical user journeys — not every feature in a competitor site.",
      )),
      sec("solutions", "How HimoSoft helps", P("Common deliverables include:"), {
        list: [
          "Unified admin for catalogue, pricing, and promotions",
          "Order and fulfilment visibility with exception handling",
          "Payment gateway integration (local and international providers)",
          "Reporting aligned to finance and operations cadence",
          "Role-based access for stores, HQ, and partners",
        ],
      }),
      sec("outcomes", "Outcomes we target", P(
        "Faster checkout, fewer support tickets, and dashboards leadership trusts. We measure success with your KPIs — conversion, margin, SLA, or completion rates — not vanity releases.",
      )),
    ],
    relatedLinks: [
      { label: "All solutions", href: "/solutions" },
      { label: "Services", href: "/services" },
      { label: "Stories", href: "/stories" },
    ],
  });
}

// —— Delivery style pages ——
const styles = [
  ["mvps-launches", "MVPs & fast launches", "Ship something usable in weeks — validate assumptions before committing to a full platform build."],
  ["legacy-modernisation", "Legacy modernisation", "Incremental rewrites, strangler patterns, and safer migrations without freezing the business."],
  ["api-first", "API‑first ecosystems", "Clean contracts for partners, mobile apps, and internal tools — one source of truth behind many surfaces."],
  ["design-systems-ux", "Design systems & UX", "Reusable components and guidelines so product and engineering scale without visual drift."],
];

for (const [slug, title, intro] of styles) {
  add(slug, {
    meta: meta(title, intro),
    eyebrow: "Delivery style",
    title,
    intro,
    sections: [
      sec("when", "When this fits", P(intro, "We align scope to learning goals — what must be true before the next funding gate, season, or compliance deadline.")),
      sec("process", "Our process", P("Typical steps:"), {
        list: [
          "Stakeholder workshops and journey mapping",
          "Thin vertical slice to production or staging",
          "Instrumentation for the metrics that matter",
          "Retrospective and roadmap for the next increment",
        ],
      }),
    ],
    relatedLinks: [{ label: "Delivery overview", href: "/delivery" }],
  });
}

// —— Service detail pages ——
const serviceDetails = [
  ["custom-software", "Custom software", "Purpose-built applications anchored to your domain rules, integrations, and approval flows."],
  ["web-applications", "Web applications", "Responsive websites and web apps on modern stacks — performance, accessibility, and SEO considered from the start."],
  ["mobile-apps", "Mobile apps (iOS / Android)", "Native and cross-platform mobile experiences with shared design language and reliable release pipelines."],
  ["databases", "Databases & performance", "Schema design, migrations, indexing, and query tuning for reliable performance under real load."],
  ["apis-webhooks", "APIs & webhooks", "REST, GraphQL, and event-driven integrations with versioning, auth, and observability."],
  ["cloud-deployment", "Cloud & deployment", "CI/CD, infrastructure as code, environments, and cost-aware hosting choices."],
  ["security-compliance", "Security & compliance", "Authentication, authorisation, audit trails, encryption, and practices aligned to GDPR-aware delivery."],
  ["support-sla", "Support & SLA", "Incident response, patching, and proactive maintenance with clear response times."],
];

for (const [slug, title, intro] of serviceDetails) {
  add(slug, {
    meta: meta(title, intro),
    eyebrow: "Service",
    title,
    intro,
    sections: [
      sec("scope", "Scope", P(intro, "We document boundaries, interfaces, and acceptance criteria before major build phases so expectations stay aligned.")),
      sec("deliverables", "Typical deliverables", P("Depending on engagement size:"), {
        list: [
          "Technical specification and architecture overview",
          "Implementation with automated tests on critical paths",
          "Deployment runbooks and environment configuration",
          "Handover session and written operational guide",
        ],
      }),
    ],
    relatedLinks: [{ label: "All services", href: "/services" }],
  });
}

// —— Delivery phase pages ——
const phases = [
  ["discovery", "Discovery & prototyping", "Sharpen requirements, validate UX, and de-risk technical choices before large code investment."],
  ["sprints-releases", "Sprints & releases", "Time-boxed delivery with demoable increments and controlled release risk."],
  ["qa-observability", "QA & observability", "Automated testing, logging, metrics, and tracing so production behaviour is understandable."],
  ["post-launch", "Post‑launch improvements", "Iterate from analytics, support tickets, and user interviews — not guesswork."],
];

for (const [slug, title, intro] of phases) {
  add(slug, {
    meta: meta(title, intro),
    eyebrow: "Delivery",
    title,
    intro,
    sections: [
      sec("activities", "Key activities", P(intro)),
      sec("artifacts", "Artifacts you receive", P("Examples include:"), {
        list: [
          "Workshop notes and prioritised backlog",
          "Release notes and deployment checklist",
          "Test reports and monitoring dashboards",
          "Improvement backlog ranked by impact",
        ],
      }),
    ],
    relatedLinks: [{ label: "Delivery overview", href: "/delivery" }],
  });
}

// —— Resource pages ——
add("tech-stack", {
  meta: meta("Tech stack", "Languages, frameworks, and infrastructure HimoSoft uses for pragmatic delivery."),
  eyebrow: "Resources",
  title: "Tech stack notes",
  intro:
    "We choose boring technology where possible and exciting technology where it earns its keep. Stacks vary by project; below is a representative set.",
  sections: [
    sec("frontend", "Frontend", P("TypeScript, React, Next.js, and modern CSS. We favour component libraries and design tokens when products need long-term UI consistency.")),
    sec("backend", "Backend", P("Node.js, Python, and PHP where legacy requires it. APIs are documented with OpenAPI or equivalent; auth uses industry-standard patterns.")),
    sec("data", "Data & infra", P("PostgreSQL, MySQL, Redis, and cloud object storage. Deployments on AWS, Azure, GCP, or VPS providers common in Bangladesh — with CI/CD via GitHub Actions or similar.")),
  ],
  relatedLinks: [{ label: "Insights", href: "/insights" }],
});

add("support-plans", {
  meta: meta("Support plans", "Maintenance and SLA options after go-live with HimoSoft."),
  eyebrow: "Resources",
  title: "Support plans",
  intro:
    "Software value compounds when production stays healthy. We offer tiered support after launch — from business-hours assistance to 24/7 critical incident response.",
  sections: [
    sec("tiers", "Plan tiers", P("Plans are tailored; typical dimensions include:"), {
      list: [
        "Response time targets (e.g. 4h / 1h for critical)",
        "Included hours for small enhancements",
        "Security patch cadence and dependency updates",
        "Monthly health report and uptime summary",
      ],
    }),
    sec("engage", "How to engage", P("Support can start at handover or after a warranty period. We review logs and incident history to recommend a realistic tier.")),
  ],
  relatedLinks: [{ label: "Support & SLA service", href: "/support-sla" }],
});

add("careers", {
  meta: meta("Careers", "Freelance, contract, and collaboration opportunities with HimoSoft."),
  eyebrow: "Work with us",
  title: "Freelance & contract roles",
  intro:
    "HimoSoft works with trusted specialists on defined scopes. If you have a strong portfolio and clear availability, we would like to hear from you.",
  sections: [
    sec("roles", "What we look for", P("We periodically need help in engineering, QA, design, and specialised domains (payments, mobile, DevOps). Engagements are project-based with written agreements.")),
    sec("apply", "How to apply", P("Email via Contact with subject “Careers”, attach portfolio or GitHub, and note timezone and hourly or fixed engagement preference. We reply when there is a matching active need.")),
  ],
  relatedLinks: [{ label: "Contact", href: "/contact" }, { label: "Interns & learning", href: "/insights" }],
});

const outPath = path.join(process.cwd(), "content", "pages", "en.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(pages, null, 2) + "\n");
console.log(`Wrote ${Object.keys(pages).length} pages to ${outPath}`);
