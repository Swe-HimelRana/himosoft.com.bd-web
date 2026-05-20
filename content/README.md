# Site content (locale JSON)

All copy and structure live under **`locales/*.json`**. Supported codes match `src/lib/locale-options.ts`:

| File | Language |
|------|----------|
| **`locales/en.json`** | English (default) |
| **`locales/bn.json`** | Bengali |
| **`locales/de.json`** | German |
| **`locales/it.json`** | Italian |
| **`locales/ro.json`** | Romanian |
| **`locales/pl.json`** | Polish |

The navbar **language** control sets the **`himosoft.locale`** cookie. Labels and flag emojis for the picker are defined in code (`SITE_LOCALES`), not in JSON.

### Anchor links

Keep fragment links as in English (e.g. **`#contact`**, **`#services`**). Do not translate the hash target.

### Regenerating machine translations

From the repo root (needs network):

```bash
npm run translate-locales
```

Only some targets:

```bash
TARGETS=ro,pl node scripts/machine-translate.cjs
```

Caches live under `scripts/i18n/.cache/` (gitignored).

### After edits

Refresh in dev. For production run `next build`.

### Mega menu (`nav.items`)

- Simple link: `{ "id": "insights", "label": "...", "href": "#insights" }`
- Mega panel: `"mega"` with optional `featured` + `columns`
- Keep each `id` unique.

### Homepage sections

`stories`, `platformTriad`, `domains` (with `linkHint`), `partners`, `insights`, etc. must share the **same shape** across every locale file.

### SEO

Set **`NEXT_PUBLIC_SITE_URL`** in production (see `.env.example`). The app exposes:

- **`/sitemap`** — HTML site map (localized; implemented at `/site-map` with a rewrite)
- **`/sitemap.xml`** and **`/robots.txt`** — static files in `public/`, regenerated on `npm run build` via `scripts/write-public-seo-files.cjs`
- Open Graph + Twitter cards (`/opengraph-image` social preview)
- JSON-LD: Organization (all pages), WebSite + ProfessionalService (home), Breadcrumbs (legal pages)
- Per-locale keywords and metadata via `src/lib/seo.ts` and locale `meta` in JSON

### Legal pages (`/privacy`, `/terms`, `/cookies`)

Full policy text lives under **`content/legal/{locale}/`** (`privacy.json`, `terms.json`, `cookies.json`). English (`en`) is authoritative; other locales fall back to English until translated. The privacy notice is structured for **GDPR** (legal bases, data subject rights, transfers, breach notification). Footer and mega menu link to these routes.

### Cookie consent (first visit)

Copy lives in each locale file under **`cookieConsent`** (intro, **`categories`**, rights/retention notes). The banner is a **non-blocking** bottom bar — the rest of the page stays clickable. Choice is stored in **`himosoft.cookie-consent`** (`accepted` or `rejected`) for one year.

### Payment partners marquee (after hero)

Logo strip is driven by **`payment-partners.json`** at the repo root of `content/` (not per locale). Add entries with `id`, `name`, `icon` (path under `public/`), and optional `href`. Optional `label` sets the screen-reader section name only (no visible heading). Place matching SVG/PNG assets in `public/partners/`.
