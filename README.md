# smbautomation.io

Marketing site for SMB Automation: websites, SEO, and paid advertising that bring in customers, plus automated lead, invoice, AR, and review follow-up for small and midsize businesses.

The site is a single landing page plus a blog. Everything the visitor needs is on `/`, and the only conversion point is the contact form at `/#contact`.

## Tech Stack

- **Next.js 14** with App Router, CSS Modules, and `next/font` (Barlow)
- **TypeScript**, **vitest** for lib unit tests
- **MDX** for blog posts (`next-mdx-remote`)
- **HighLevel (LeadConnector)** for every lead touchpoint: the homepage contact form, the roofer audit form, the roofer booking calendar, and the chat widget. Contacts, SMS consent, notifications, and follow-up all live there; the site stores no lead data.
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
npm run check:copy  # fails on em dashes in tsx or non-zero border-radius in css
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | The landing page. Hero, the problem, four demand channels, the follow-up timeline, outcomes, fit, philosophy, contact form. |
| `/blog` and `/blog/[slug]` | MDX blog, statically generated from `content/blog/`. |
| `/privacy`, `/terms` | Legal pages. |
| `/roofers`, `/roofers/thank-you` | Paid-traffic landing page for the roofer Meta campaign (noindex, no site nav, not in the sitemap). HighLevel audit form that redirects to the thank-you page, which fires the Meta `Lead` / GA4 `generate_lead` event once per session and embeds the HighLevel audit calendar. |
| `/api/log-404` | Client-side 404 logging. |

## Environment Variables

Every integration is optional in development: when its env vars are missing the code logs a warning and continues, so the site always builds and runs.

| Variable | Used for | Setup |
| --- | --- | --- |
| `NEXT_PUBLIC_GA4_ID` | GA4 | Falls back to the existing hardcoded property until set. |
| `NEXT_PUBLIC_GADS_ID` | Google Ads conversion tracking | Optional. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel | Optional. |


HighLevel form and calendar IDs are not env vars: set them in `HIGHLEVEL_FORMS` (`components/HighLevelForm.tsx`) and `HIGHLEVEL_CALENDARS` (`components/HighLevelCalendar.tsx`) from each embed code. An empty ID renders a call/email fallback instead of a broken form.

## Key Flows

- **Contact form** (`components/HighLevelForm.tsx`) — a HighLevel form embedded at `/#contact`. Submissions, including the two optional SMS consent checkboxes (service texts and promotional texts), go straight to the contact in HighLevel, where texts are sent and STOP is enforced. Fields, checkbox wording, notifications, and the thank-you message are all configured in HighLevel's form builder, not in this repo. Set `HIGHLEVEL_FORM_ID` in that component.
- **Attribution** — first-touch UTMs + landing page stored 90 days in the `sa_attr` cookie (`lib/attribution.ts`) and attached to every submission.
- **Analytics events** — see `lib/analytics.ts`. The live event is `blog_cta_click`. `contact_submit` no longer fires from the site because the contact form is a HighLevel iframe; track form conversions in HighLevel.

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

- One primary CTA sitewide: `Talk to Us →`, pointing at `/#contact`. Orange is reserved for the hero beat markers, the timeline nodes, the fit markers, and the final `Let's Talk` submit button.
- No em dashes in rendered copy. Zero border radius everywhere. `npm run check:copy` enforces both.
- Bands alternate white / `--bg` / dark. The follow-up timeline on `/` is the page's signature element: it is ordered by the customer lifecycle, which is why the sequential treatment is used there and nowhere else.

## Railway Deployment

1. Push to GitHub and create a Railway project from the repo
2. Add the environment variables above in Railway's dashboard
3. Railway auto-detects Next.js and deploys using `railway.toml`
4. Point smbautomation.io at Railway; keep www and apex on one canonical host
5. Permanent redirects for every removed route live in `next.config.js`. After deploying, resubmit the sitemap in Search Console so the retired URLs are recrawled.
