# Website Update V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild smbautomation.io per `docs/SMB_Automation_Website_Update.md` (the single source of truth for all copy and behavior): audit-led homepage with one CTA, /apply auto-qualification flow, $495 Stripe flow, gated sample audit, all launch-blocker routes plus the three industry pages, Resend emails, Google Sheets CRM, analytics scaffolding, and redirects.

**Architecture:** Next.js 14 App Router (existing). New routes live in `app/(site)/`. Shared mechanics live in `lib/` as small pure modules (qualification, UTM attribution, sheets, emails, analytics) so they are unit-testable. All copy is taken verbatim from Part One of the update doc — the plan references sections rather than duplicating copy; where the doc has no copy (about, results, how-it-works, implementation, contact, privacy, terms, industry pages) the implementer drafts it from the update doc + `docs/SMB_Automation_Business_Plan_v2.md` in the same voice, obeying Global Rules.

**Tech Stack:** Next.js 14, CSS Modules + `app/globals.css` tokens (already match spec), Resend (installed), Stripe (add `stripe`), Cloudflare Turnstile, Calendly inline embed, Google Sheets via service-account JWT (no new dep, Node `crypto`), pdfkit (installed, dev) for the sample-audit PDF, vitest (add, dev) for lib tests.

## Global Constraints

- One primary CTA across the entire homepage: **Apply for the Audit →** (exact string, every primary button). Only secondary link allowed on homepage: **See a sample audit →**.
- $495 Single Workflow Audit appears on the homepage only inside one FAQ answer.
- **No em dashes anywhere in rendered copy.**
- Barlow only, weights 300/400/500/600/700, loaded via `next/font` (replace Google Fonts CSS import).
- **Zero border radius everywhere** (inputs, buttons, images included). No gradients. Borders over shadows: 1px solid `#D4DAE8` default divider.
- Color tokens: already in `app/globals.css :root` and match the spec table exactly. Do not change them.
- Buttons: Primary = `#2540D9` fill, white text, 1px solid `#2540D9`, `0.65rem 1.75rem` padding, `0.75rem` size, weight 600, `0.1em` letter-spacing, uppercase, radius 0. Secondary = transparent, `#0A0E1A` text, 1px solid `#B0BAD0`, hover shifts border+text to `#2540D9`. Orange `#E84E1A` only for the final CTA block and 6x6px proof squares.
- Mobile-first. Breakpoints 480/768/1024/1440. Stat bar 2x2 below 768. Inputs ≥16px font. Tap targets ≥44x44. Header CTA visible on mobile.
- Semantic heading order, one h1/page, labels on all inputs, visible focus states, WCAG AA contrast.
- Out of scope (do NOT build): free assessment/quiz, $1,500 checkout, client portal, live chat, newsletter signup/popups, any second homepage CTA.
- Env placeholders for all third-party keys; every integration must no-op gracefully (log + continue) when its env is missing so dev/build never breaks.

**Copy source references** (into `docs/SMB_Automation_Website_Update.md`): Homepage L39–463, Apply page L465–508, Single Workflow Audit page L511–556, Blog CTAs L559–576, Industry template L579–604, Build spec L607–916.

---

### Task 0: Branch

- [x] `git checkout -b website-update-v2` from `main`.

### Task 1: Foundation — font, buttons, test harness, env

**Files:**
- Modify: `app/layout.tsx` (next/font Barlow), `app/globals.css` (button classes, remove Google Fonts @import)
- Create: `vitest.config.ts`, `.env.example` (extend)
- Modify: `package.json` (add `stripe` dep; `vitest` devDep; `test` script)

**Steps:**
- [x] `npm i stripe && npm i -D vitest`
- [x] Add `"test": "vitest run"` script.
- [x] Replace the `@import url('https://fonts.googleapis.com...')` line in `globals.css` with nothing; in `app/layout.tsx` add:

```tsx
import { Barlow } from 'next/font/google';
const barlow = Barlow({ subsets: ['latin'], weight: ['300','400','500','600','700'], style: ['normal','italic'], display: 'swap', variable: '--font-barlow' });
// <html lang="en" className={barlow.variable}>
```

and set `body { font-family: var(--font-barlow), sans-serif; }` in globals.css.
- [x] Update `.btn-primary` in globals.css to the spec primary (blue fill per Global Constraints), add `.btn-secondary` per spec, keep `.btn-orange` for the final CTA block only. All `border-radius: 0`.
- [x] Extend `.env.example`:

```
RESEND_API_KEY=
CONTACT_EMAIL=jesse@smbautomation.io
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_CALENDLY_URL=
GOOGLE_SHEETS_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GADS_ID=
NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_TOKEN=
```
- [x] `npm run build` passes. Commit.

### Task 2: lib/qualify.ts (TDD — the most important mechanic)

**Files:** Create `lib/qualify.ts`, `lib/qualify.test.ts`

**Produces:** `qualifies(input: { employees: string; revenue: string; volume: string }): boolean` plus exported option arrays `EMPLOYEE_OPTIONS`, `REVENUE_OPTIONS`, `VOLUME_OPTIONS`, `TIMELINE_OPTIONS` (exact strings from spec L477–489, used by both the form and the API).

Auto-qualifies when BOTH: (1) employees ∈ {5 to 10, 11 to 25, 26 to 50, 51 to 100, More than 100}; (2) revenue index ≥ index of "$1 million to $2 million" OR volume index ≥ index of "400 to 999".

- [x] Write failing tests: qualified (5 to 10 + $1M–$2M), qualified via volume only (5 to 10 + Under $500,000 + 400 to 999), not qualified (1 to 4 + $25M+), not qualified (11 to 25 + Under $500,000 + 100 to 399), unknown strings → false.
- [x] `npx vitest run` → fail. Implement by index lookup against the option arrays. → pass. Commit.

### Task 3: lib/attribution.ts + UTM capture (TDD)

**Files:** Create `lib/attribution.ts`, `lib/attribution.test.ts`, `components/AttributionCapture.tsx` (client, mounted in root layout)

**Produces:** cookie `sa_attr` (JSON: `{ utm_source, utm_medium, utm_campaign, utm_term, utm_content, landing_page, first_touch_at }`), max-age 90 days, first-touch only (never overwritten if present). `parseAttribution(cookieValue: string | undefined): Attr | null` and `buildAttr(search: string, pathname: string, now: string): Attr | null` are pure and tested. Server routes read the cookie via `req.cookies`.

- [x] Tests for `buildAttr` (utm params → object; no utms but always capture landing page on first touch) and `parseAttribution` (bad JSON → null). Implement. Commit.
- [x] `AttributionCapture` (client, `useEffect`): if no `sa_attr` cookie, set it from `location.search` + `location.pathname`. Mount in `app/layout.tsx`. Commit.

### Task 4: lib/sheets.ts — Google Sheets CRM

**Files:** Create `lib/sheets.ts`

**Produces:** `appendRow(tab: 'Applications' | 'Purchases' | 'SampleAudit' | 'Contact', values: (string|number)[]): Promise<void>`. Builds a JWT (RS256 via `crypto.createSign`) from `GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_PRIVATE_KEY`, exchanges for an access token at `https://oauth2.googleapis.com/token`, POSTs to `https://sheets.googleapis.com/v4/spreadsheets/{GOOGLE_SHEETS_ID}/values/{tab}!A1:append?valueInputOption=RAW`. If env missing: `console.warn` and return. Never throw to the caller (catch + log) — CRM failure must not fail a submission.

- [x] Implement + commit. (Verified live later in launch checklist; unit test only the JWT header/claims construction if extracted as a pure helper.)

### Task 5: lib/emails.ts — the seven Resend templates

**Files:** Create `lib/emails.ts` (move/absorb the send logic pattern from `app/(site)/api/apply/route.ts`)

**Produces:** typed senders used by API routes: `sendApplicationEmails({ submission, qualified })` (applicant confirmation w/ Calendly link OR w/ Single Workflow Audit offer, plus internal email to jesse@ with subject `New application: {company} — {QUALIFIED|NOT QUALIFIED}` → use a hyphen, not an em dash), `sendPurchaseEmails({ buyer })` (receipt + intake link to buyer; notification to jesse@), `sendContactEmails({ name, email, message })` (full submission to jesse@; acknowledgment to sender), `sendSampleAuditEmail({ name, email })` (download link). All from `SMB Automation <notifications@smbautomation.io>` (env-overridable), reply-to jesse@. Plain, Barlow-free HTML (email-safe inline styles, no rounded corners). No em dashes.

- [x] Implement + commit.

### Task 6: lib/analytics.ts + Analytics scripts

**Files:** Create `lib/analytics.ts` (client helpers), `components/AnalyticsScripts.tsx`; Modify `app/layout.tsx`

**Produces:** `track(event: string, params?: Record<string, unknown>)` firing gtag + fbq when present; `AnalyticsScripts` injects GA4 (`NEXT_PUBLIC_GA4_ID`), Google Ads (`NEXT_PUBLIC_GADS_ID`), Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) — each only when its env exists. Server: `lib/metaCapi.ts` `sendCapiEvent(name, data)` no-op without `META_CAPI_TOKEN`. Event names (exact): `application_start`, `application_submit`, `application_qualified`, `application_unqualified`, `fit_call_booked`, `sample_audit_view`, `workflow_audit_checkout_start`, `workflow_audit_purchase`, `contact_submit`, `blog_cta_click` (param `article_slug`).

- [x] Implement + commit.

### Task 7: Homepage rewrite

**Files:** Modify `app/(site)/page.tsx`, `app/(site)/page.module.css`, `components/Nav.tsx`, `components/Footer.tsx`, and rewrite section components (`ProblemSection`, `AuditSection` → new sections, `FounderSection`, `HomeFaq`); Create new section components as needed: `CredibilityBar`, `OutcomeSection`, `DeliverablesSection`, `OfferSection`, `ImplementationSection`, `HowItWorksSection`, `IndustrySection`, `ResultsSection`, `PhilosophySection`. Delete homepage `ApplicationForm` embed (form moves to /apply).

Copy verbatim from spec L39–443. Structure: Hero (H1 "Find the work your business should stop doing *manually.*", italic blue on "manually.") → Credibility bar (blue bg, 4 cells, white numbers, 1px white-15% dividers, caption) → Problem → Outcome → Deliverables (+ "See a sample audit →" link) → Offer ($1,500 block, findings-guarantee callout: blue-lt bg + 3px left blue border, credit note, fit line) → Implementation → How It Works (6 steps) → Industries (Property Management featured larger card first; links to the three industry routes) → Results (3 items + "See a sample audit →") → Founder → Philosophy → FAQ (15 Qs, Single Workflow Audit link in its one FAQ answer) → Final CTA (orange block allowed here) → Footer per L445–461.

Nav: How It Works → `/how-it-works`, What You Get → `/#deliverables`, Results → `/results`, About → `/about`, Blog → `/blog`; header button `Apply for the Audit →` → `/apply`. Mobile: sticky visible CTA. Footer columns per spec; every link resolves (Services: `/#offer`→ no — Business Efficiency Audit → `/how-it-works`? Use: Business Efficiency Audit → `/apply`, Single Workflow Audit → `/single-workflow-audit`, Implementation → `/implementation`, Ongoing Optimization → `/implementation#ongoing`; Industries → the three industry routes; Company → `/how-it-works`, `/results`, `/about`, `/blog`, `/contact`).

Metadata: SEO title `Business Efficiency Audit and Automation Consulting | SMB Automation`, meta description per L46–47. JSON-LD: update Organization (remove stale offer catalog, keep sameAs LinkedIn), add Service (Business Efficiency Audit, price 1500 USD) and FAQPage built from the FAQ copy.

- [x] Build sections, wire nav/footer, update metadata/schema. `npm run build`. Visual check via `npm run dev`. Commit per logical chunk (nav/footer, hero+stats, mid sections, faq+final).

### Task 8: /apply flow

**Files:** Create `app/(site)/apply/page.tsx` + `ApplyForm.tsx` (client) + module css, `app/(site)/apply/qualified/page.tsx` (+ `CalendlyEmbed.tsx` client), `app/(site)/apply/received/page.tsx`; Rewrite `app/(site)/api/apply/route.ts`; Create `lib/freemail.ts` (+ test).

**Consumes:** `qualifies`, option arrays (Task 2), `parseAttribution` (T3), `appendRow` (T4), `sendApplicationEmails` (T5), `track` (T6).

Form: single page, fields exactly per spec L471–489 (15 fields), labels (not placeholder-only), 16px inputs, honeypot (`company_fax`, visually hidden), Turnstile widget when site key present. Free-mail soft warning (gmail/yahoo/outlook/hotmail/aol/icloud/proton list in `lib/freemail.ts`, tested): inline notice, does not block. Website field required + URL-validated (prepend https:// if missing scheme). Validation errors preserve all state (controlled inputs). `application_start` on first field interaction; `application_submit` + `application_qualified|application_unqualified` on success.

API: validate all fields; verify Turnstile server-side when secret present; honeypot filled → pretend success; compute `qualified = qualifies(...)`; `appendRow('Applications', [...all fields, qualified, utm fields, referrer])`; `sendApplicationEmails`; respond `{ qualified }`. Client redirects to `/apply/qualified?name=..&email=..&company=..` or `/apply/received`.

`/apply/qualified`: copy L493–499, Calendly inline embed (script `https://assets.calendly.com/assets/external/widget.js`, URL from `NEXT_PUBLIC_CALENDLY_URL`, prefill name/email via query params + utm passthrough). Listen for `calendly.event_scheduled` postMessage → `track('fit_call_booked')`. If no Calendly URL configured, show booking-link fallback text. `/apply/received`: copy L501–507 with `See the Single Workflow Audit →` button.

- [x] freemail test → implement. Form + pages + API. Manual test both paths locally (env-less: sheets/emails warn + skip). `npm run build`. Commit.

### Task 9: Stripe flow — /single-workflow-audit

**Files:** Create `app/(site)/single-workflow-audit/page.tsx` (+ css), `app/(site)/api/checkout/route.ts`, `app/api/stripe-webhook/route.ts`, `app/(site)/single-workflow-audit/intake/page.tsx` + `IntakeForm.tsx` + `app/(site)/api/intake/route.ts`, `app/(site)/single-workflow-audit/thank-you/page.tsx`.

Page copy L511–556. Button `Buy the Workflow Audit →` → POST `/api/checkout` → Stripe Checkout Session: `mode: 'payment'`, inline `price_data` `{ currency: 'usd', unit_amount: 49500, product_data: { name: 'Single Workflow Audit' } }`, `success_url: /single-workflow-audit/intake?session_id={CHECKOUT_SESSION_ID}`, `cancel_url: /single-workflow-audit`, metadata = attribution cookie fields. Fire `workflow_audit_checkout_start` before redirect. If `STRIPE_SECRET_KEY` missing, API returns 503 with friendly message.

Webhook (`app/api/stripe-webhook` — outside (site) group, `export const dynamic = 'force-dynamic'`): verify signature with `STRIPE_WEBHOOK_SECRET` on `checkout.session.completed` → `appendRow('Purchases', ...)`, `sendPurchaseEmails`, `sendCapiEvent('Purchase', ...)`. Intake form: ties `session_id`, asks workflow description/software/volume; POSTs to `/api/intake` → sheet + email to jesse@ → redirect `/single-workflow-audit/thank-you`. JSON-LD Service with `offers` price 495 USD on the offer page.

- [ ] Implement all; test checkout API with Stripe test key if available, else verify 503 path; `stripe listen` note added to README section of the plan-notes. Build. Commit.

### Task 10: /sample-audit — gated PDF

**Files:** Create `scripts/generate-sample-audit.js` (pdfkit, follow `scripts/generate-checklist.js` conventions), output `public/assets/smb-automation-sample-audit.pdf`; Create `app/(site)/sample-audit/page.tsx` + `SampleAuditGate.tsx` + `app/(site)/api/sample-audit/route.ts`.

PDF: a realistic anonymized Business Efficiency Audit deliverable (~10–14 pages): cover, executive summary, workflow inventory, opportunity scorecard (10 opportunities, ranked, with impact/cost/effort/risk/payback), time & financial estimates table, recommended tools, 90-day roadmap, budget ranges — for a fictional 22-employee property management company ("Meridian Property Group", clearly marked SAMPLE). Brand: Barlow-equivalent (Helvetica in pdfkit), spec colors, zero rounded rects, no em dashes.

Gate: name + email → `appendRow('SampleAudit', ...)` + `sendSampleAuditEmail` → reveal download link + fire `sample_audit_view`. All homepage `See a sample audit →` links → `/sample-audit`.

- [ ] Generate PDF, build gate + API, wire links. Commit.

### Task 11: Content pages — /about, /how-it-works, /implementation, /results, /contact, /privacy, /terms

**Files:** Create `app/(site)/about/page.tsx`, `app/(site)/how-it-works/page.tsx`, `app/(site)/implementation/page.tsx`, `app/(site)/results/page.tsx` (port/adapt `work/page.tsx` content to Results copy L337–351 + existing case studies); Modify `app/(site)/contact/page.tsx` + `api/contact/route.ts` (ack email to sender, recipient jesse@, `contact_submit` event); Create `app/(site)/privacy/page.tsx`, `app/(site)/terms/page.tsx`.

Copy drafted from the update doc sections (about ⇐ Founder L355–371 + business plan §founder; how-it-works ⇐ L285–301 expanded; implementation ⇐ L243–281 expanded + `#ongoing` anchor for Ongoing Optimization; results ⇐ L337–351). Privacy/terms: standard plain-language policies naming SMB Automation, smbautomation.io, jesse@smbautomation.io, cookies/analytics/Stripe/Calendly disclosure. Person JSON-LD on /about. One CTA per page: `Apply for the Audit →`.

- [ ] Build all seven, one commit per page or logical pair.

### Task 12: Industry pages ×3

**Files:** Create `app/(site)/property-management-automation/page.tsx`, `app/(site)/healthcare-automation/page.tsx`, `app/(site)/home-services-automation/page.tsx` + one shared `components/IndustryPage.tsx` template + data objects per vertical.

Structure per template L579–604 (10 blocks, one CTA). Vertical copy drafted from Industry Section L305–334 + business plan verticals; PM page leads on portfolio numbers in the credibility bar. Service JSON-LD + BreadcrumbList each.

- [ ] Implement + commit.

### Task 13: Redirects, 404, sitemap, robots

**Files:** Modify `next.config.js` (redirects()), `app/sitemap.ts`, `app/robots.ts`; Create `app/not-found.tsx`, `docs/redirect-map.csv`.

301s: `/services` → `/implementation`, `/services/build` → `/implementation`, `/services/scale` → `/implementation`, `/services/strategy` → `/how-it-works`, `/work` → `/results`, `/thank-you` → `/apply/received`, `/lp/strategy` → `/`. Blog URLs unchanged. Remove the old route files after redirects are in. `docs/redirect-map.csv` lists old URL, new URL, status — **flag for user sign-off before deploy**. 404: not-found.tsx with primary CTA + links home/blog/apply; log via console + a lightweight `/api/log-404` beacon. robots.ts: explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot; reference sitemap. sitemap.ts: all new routes + blog posts; drop removed routes.

- [ ] Implement + commit.

### Task 14: Blog CTAs

**Files:** Create `components/BlogCta.tsx` (two variants: `workflow` inline → `Get a Workflow Audit for $495 →` → `/single-workflow-audit`; `broad` end-of-article → `Apply for the Audit →` → `/apply`), copy L559–576; Modify `app/(site)/blog/[slug]/page.tsx` to render variant by frontmatter flag (`ctaType: workflow | broad`, default broad). Fire `blog_cta_click` with slug param.

- [ ] Implement + commit.

### Task 15: Verification sweep

- [ ] `scripts/check-copy.js`: scan `app/`, `components/` for em dashes (—, —) in JSX string literals and for `border-radius` values ≠ 0 in css modules → exit 1 on hit. Add `"check:copy"` script. Run + fix.
- [ ] `npm run test` (all vitest green), `npm run lint`, `npm run build` (all routes compile).
- [ ] `npm run dev` + curl every route in the route map → 200; confirm both /apply paths and checkout 503 fallback.
- [ ] Update `.env.example` complete; README note listing required env + Stripe webhook setup + Sheets service-account setup + Calendly URL + Turnstile keys.
- [ ] Commit; open PR to main per repo convention.

**Deferred to launch (needs user/keys, listed for the launch checklist, not this build):** live Stripe end-to-end, Resend domain SPF/DKIM/DMARC verification, GA4/Ads/Meta property setup + DebugView, Search Console, Lighthouse run on deployed host, real sample-audit PDF review, redirect-map sign-off.
