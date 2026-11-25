# smbautomation.io

Marketing site for SMB Automation: AI phone answering and website chat (the Front Desk Assistant) for small and midsize businesses.

The site has two goals: start a 30-day free trial or book a demo. Both are GoHighLevel (GHL) booking calendars with their signup forms attached inside GHL. GHL owns contact details, SMS consent, appointments, and trial dates; the site explains the offer and links into the right calendar. The GHL chat widget on every page also demos the product.

## Tech Stack

- **Next.js 14** with App Router, CSS Modules, and `next/font` (Barlow)
- **TypeScript**, **vitest** for lib unit tests
- **MDX** for blog posts (`next-mdx-remote`)
- **Resend** for transactional email
- **Google Sheets** as the CRM (service-account JWT, no extra dependency)
- **GoHighLevel (LeadConnector)** for the trial and demo booking calendars and the chat widget
- **Railway** for deployment

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything no-ops gracefully when missing
npm run dev
```

Useful scripts:

```bash
npm run test        # vitest unit tests (lib/)
npm run lint        # next lint
npm run build       # production build
npm run check:copy  # fails on em dashes in tsx
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero with both CTAs and the example roofing chat, the problem, how it works (`#how-it-works`), pricing (`#pricing`), closing CTA (`#contact`). |
| `/` (structure) | The homepage sections are shared components in `components/sections/Sections.tsx`; every industry page reuses them in the same order, with its own copy plus a "See it work" block of example calls (`components/industry/ScenarioTabs.tsx`). |
| `/industries/property-management` | Property Management landing page, built to stand alone for ad traffic. |
| `/industries/home-services` | Home Services (HVAC, plumbing, electrical) landing page, same structure. New industry pages are registered in `lib/industries.ts` (nav and footer) and `app/sitemap.ts`. |
| `/start-trial` | Embeds the GHL free trial calendar (signup form, optional SMS consent, onboarding call). Booking the onboarding call starts the 30-day trial. noindex. |
| `/book-demo` | Embeds the GHL demo calendar. A demo booking does not start a trial. noindex. |
| `/blog` and `/blog/[slug]` | MDX blog, statically generated from `content/blog/`. |
| `/privacy`, `/terms` | Legal pages. |
| `/roofers`, `/roofers/thank-you` | Paid-traffic landing page for the roofer Meta campaign (noindex, no site nav, not in the sitemap). Audit form, then the thank-you page embeds Calendly prefilled with the lead's name and email. |
| `/api/roofer-audit` | Roofer audit form handler: validates, writes a row to the `RooferAudit` sheet, emails both sides, and sends a server-side Meta `Lead` event that deduplicates against the browser pixel by `event_id`. |
| `/api/contact` | Legacy contact form handler, no longer linked from the site (cleanup scoped separately): validates, writes a row to the `Contact` sheet, sends the internal notification and the visitor acknowledgement. |
| `/api/log-404` | Client-side 404 logging. |

## Environment Variables

Every integration is optional in development: when its env vars are missing the code logs a warning and continues, so the site always builds and runs.

| Variable | Used for | Setup |
| --- | --- | --- |
| `RESEND_API_KEY` | Transactional email | [resend.com](https://resend.com). Verify smbautomation.io (SPF, DKIM, DMARC) before launch. Without it, submissions still succeed and the email is logged instead of sent. |
| `EMAIL_FROM` | Sender address | Defaults to `SMB Automation <notifications@smbautomation.io>` |
| `CONTACT_EMAIL` | Internal notification recipient | Defaults to jesse@smbautomation.io |
| `GOOGLE_SHEETS_ID` | CRM spreadsheet | Create a spreadsheet with a `Contact` tab. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_PRIVATE_KEY` | Sheets auth | Google Cloud service account with Sheets API enabled; share the spreadsheet with the service account email. Paste the private key with `\n` escapes. |
| `NEXT_PUBLIC_GA4_ID` | GA4 | Falls back to the existing hardcoded property until set. |
| `NEXT_PUBLIC_GADS_ID` | Google Ads conversion tracking | Optional. |
| `NEXT_PUBLIC_META_PIXEL_ID` / `META_CAPI_TOKEN` | Meta Pixel + Conversions API | Optional. |
| `NEXT_PUBLIC_CALENDLY_URL` | Booking link on `/roofers/thank-you` and in the audit email | Defaults to the 30-minute event. Point it at the dedicated 20-minute audit event. |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs in emails | Defaults to https://smbautomation.io |

The `Contact` sheet row is written in this column order: timestamp, name, business, email, phone, interests, message, utm_source, utm_medium, utm_campaign, landing_page.

The `RooferAudit` sheet row is written in this column order: timestamp, name, company, phone, email, monthly_leads, utm_source, utm_medium, utm_campaign, utm_content, landing_page.

## Key Flows

- **Booking flows** (`lib/booking.ts`, `components/BookingLink.tsx`, `components/BookingCalendar.tsx`) — every trial CTA links to `/start-trial` and every demo CTA to `/book-demo`. Each page embeds its GHL calendar with `form_embed.js` (which resizes the iframe) and a direct booking link as a fallback. Calendar and form IDs live in `lib/booking.ts`. Trial timing copy always uses `TRIAL_START_COPY`.
- **Chat** (`components/ChatWidget.tsx`) — GHL widget `6b04c0d3e6cd500e966e2168`, rendered once from the root layout. Opening straight to Live Chat is a GHL setting.
- **Attribution** — first-touch UTMs + landing page stored 90 days in the `sa_attr` cookie (`lib/attribution.ts`) and attached to every submission.
- **Analytics events** — see `lib/analytics.ts`. The live events are `booking_cta_click` (`flow`, `location`) and `blog_cta_click`. A CTA click or a booking page visit is never counted as a booking: the GHL calendar does not report completed bookings to the site, so track bookings in GHL.

## Adding Blog Posts

Create a `.mdx` file in `/content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-03-01"
tag: "Local Services"
excerpt: "One sentence summary shown on the blog index."
slug: "your-post-slug"
ctaType: "workflow"   # optional; "workflow" leads with the follow-up automation CTA, default is the broad CTA
---
```

## Copy and Design Conventions

- Two CTAs sitewide: start a free trial (orange) and book a demo (outlined or text link). The design source is the Paper file "SMB Automation Site Rebuild".
- No em dashes in rendered copy (`npm run check:copy` enforces it). Since the 2026-11 redesign the (site) pages use the rounded light-glass system in `app/globals.css` (`.site` tokens); /roofers keeps the original square Barlow look.
- Bands alternate white / `--bg` / dark. The follow-up timeline on `/` is the page's signature element: it is ordered by the customer lifecycle, which is why the sequential treatment is used there and nowhere else.

## Railway Deployment

1. Push to GitHub and create a Railway project from the repo
2. Add the environment variables above in Railway's dashboard
3. Railway auto-detects Next.js and deploys using `railway.toml`
4. Point smbautomation.io at Railway; keep www and apex on one canonical host
5. Permanent redirects for every removed route live in `next.config.js`. After deploying, resubmit the sitemap in Search Console so the retired URLs are recrawled.
