# smbautomation.io

Audit-led marketing site for SMB Automation: business efficiency audits, workflow automation, and implementation for established small and midsize businesses.

## Tech Stack

- **Next.js 14** with App Router, CSS Modules, and `next/font` (Barlow)
- **TypeScript**, **vitest** for lib unit tests
- **MDX** for blog posts (`next-mdx-remote`)
- **Resend** for all transactional email
- **Stripe Checkout** for the $495 Single Workflow Audit
- **Cloudflare Turnstile** for spam protection on /apply
- **Calendly** inline embed on /apply/qualified
- **Google Sheets** as the CRM (service-account JWT, no extra dependency)
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
node scripts/generate-sample-audit.js   # regenerate public/assets/smb-automation-sample-audit.pdf
```

## Environment Variables

Every integration is optional in development: when its env vars are missing the code logs a warning and continues, so the site always builds and runs.

| Variable | Used for | Setup |
| --- | --- | --- |
| `RESEND_API_KEY` | All transactional email | [resend.com](https://resend.com). Verify smbautomation.io (SPF, DKIM, DMARC) before launch. |
| `CONTACT_EMAIL` | Internal notification recipient | Defaults to jesse@smbautomation.io |
| `STRIPE_SECRET_KEY` | $495 checkout (`/api/checkout`) | Stripe dashboard, API keys. Without it the buy button returns a friendly 503. |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | Create a webhook endpoint for `checkout.session.completed` pointing at `/api/stripe-webhook`. Local testing: `stripe listen --forward-to localhost:3000/api/stripe-webhook`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Spam check on /apply | Cloudflare dashboard, Turnstile. Widget renders only when the site key exists. |
| `NEXT_PUBLIC_CALENDLY_URL` | Fit-call embed on /apply/qualified | Your Calendly event URL. Without it the page shows a booking-link fallback message. |
| `GOOGLE_SHEETS_ID` | CRM spreadsheet | Create a spreadsheet with tabs: `Applications`, `Purchases`, `SampleAudit`, `Contact`. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_PRIVATE_KEY` | Sheets auth | Google Cloud service account with Sheets API enabled; share the spreadsheet with the service account email. Paste the private key with `\n` escapes. |
| `NEXT_PUBLIC_GA4_ID` | GA4 | Falls back to the existing hardcoded property until set. |
| `NEXT_PUBLIC_GADS_ID` | Google Ads conversion tracking | Optional. |
| `NEXT_PUBLIC_META_PIXEL_ID` / `META_CAPI_TOKEN` | Meta Pixel + Conversions API | Optional. |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs in emails/checkout | Defaults to https://smbautomation.io |

## Key Flows

- **/apply** — 15-field application, honeypot + Turnstile, auto-qualification (`lib/qualify.ts`). Qualified applicants land on /apply/qualified with the Calendly embed; others land on /apply/received with the Single Workflow Audit offer. Every submission writes to the CRM and emails jesse@.
- **/single-workflow-audit** — $495 Stripe Checkout, success returns to the intake form tied to the Stripe session, webhook records the purchase and sends receipt + notification.
- **/sample-audit** — name/email gate in front of `public/assets/smb-automation-sample-audit.pdf` (regenerable via script).
- **Attribution** — first-touch UTMs + landing page stored 90 days in the `sa_attr` cookie (`lib/attribution.ts`) and attached to every submission and checkout.
- **Analytics events** — see `lib/analytics.ts` for the ten tracked events.

## Adding Blog Posts

Create a `.mdx` file in `/content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-03-01"
tag: "Local Services"
excerpt: "One sentence summary shown on the blog index."
slug: "your-post-slug"
ctaType: "workflow"   # optional; "workflow" shows the $495 CTA, default is the broad audit CTA
---
```

## Copy Conventions

- One primary CTA sitewide: `Apply for the Audit →`. Orange is reserved for the final CTA block.
- No em dashes in rendered copy. Zero border radius everywhere. `npm run check:copy` enforces both.

## Railway Deployment

1. Push to GitHub and create a Railway project from the repo
2. Add the environment variables above in Railway's dashboard
3. Railway auto-detects Next.js and deploys using `railway.toml`
4. Point smbautomation.io at Railway; keep www and apex on one canonical host
5. Before launch: apply `docs/redirect-map.csv` sign-off, run the launch checklist in `docs/SMB_Automation_Website_Update.md`
