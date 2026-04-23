# Homepage V2 Design Spec

**Date:** 2026-04-21
**Scope:** Homepage (`/`) only. No other pages change.
**Source spec:** `~/Downloads/SMBAUTOMATION_HOMEPAGE_V2_UPDATES_1.md`

---

## Codebase Context

- **Framework:** Next.js 14, App Router, CSS Modules
- **Homepage file:** `app/(site)/page.tsx`
- **Homepage styles:** `app/(site)/page.module.css`
- **Global CSS vars + utilities:** `app/globals.css`
- **Components dir:** `components/`
- **Existing API pattern:** `app/(site)/api/contact/route.ts` — model new routes here
- **Email:** Resend v4.5.1 already installed; env var `RESEND_API_KEY` and `CONTACT_EMAIL`
- **Data dir:** `/data/` does not exist yet — create it with gitignored JSON fallbacks

### CSS Class Mapping

The spec references `btn-orange`. The codebase uses `btn-primary` (orange fill). Resolution: add `.btn-orange` as an alias for `.btn-primary` in `globals.css` so spec copy maps cleanly without touching every callsite.

### Section ID Mapping

| Spec reference | Current id | Action |
|---|---|---|
| `#how-we-work` | `id="process"` | Change to `id="how-we-work"` |
| `#apply` | does not exist | New — added to ApplicationForm section |

The hero secondary link currently says "See How We Work" and anchors to `#how-we-work` — that anchor will now resolve once the id is corrected.

---

## Brand Rules (enforced throughout)

- No em dashes. Use periods, commas, or colons.
- `border-radius: 0` everywhere.
- No gradient backgrounds. Solid colors only.
- No box shadows (except existing white-card-on-light-bg case).
- Palette: `--blue #2540D9`, `--orange #E84E1A`, `--ink #0A0E1A`, `--ink-mid #5A6580`, `--bg #EDF1F7`, `--border #D4DAE8`
- Font: Barlow, weights 300–700.
- Forbidden words: innovative, seamless, secure, cutting-edge, powerful, robust, best-in-class, solution, unlock, leverage.
- Specific numbers only; placeholders wrapped in `{/* TODO: ... */}` comments.

---

## Final Section Order

1. Hero
2. Stats bar + new quote row
3. Process (renamed, id `#how-we-work`)
4. What We Do (new pain/what/result cards)
5. Who This Is For + Who This Is NOT For
6. Recent Work (with metrics + attributions)
7. Founder Section (NEW)
8. Lead Magnet Gate (NEW)
9. Final CTA (with urgency + risk reversal)
10. Application Form (NEW, id `#apply`)
11. Footer (unchanged)

---

## Task 1: Hero Section

**File:** `app/(site)/page.tsx` (hero block) + `app/(site)/page.module.css`

### Changes
- Replace eyebrow, H1, sub, and CTA row.
- Remove secondary button "See How We Work". Replace with plain text link below primary button, anchored to `#how-we-work`.

### Copy
- **Eyebrow:** `GROWTH SYSTEMS FOR SMBS DOING $500K TO $20M` (uppercase, 0.16em letter-spacing, `--ink-mid`)
- **H1:** `Your team is doing by hand what your competitors' systems already handle automatically.` + `<em>We close that gap.</em>` (weight 400, letter-spacing -0.02em, italic blue on second sentence)
- **Sub:** `We audit your operation, build the systems you're missing, and stay embedded to scale what works. Most first builds ship in 2 to 4 weeks.` (weight 400, `--ink-mid`, max-width ~56ch)
- **Primary CTA:** `SHOW ME MY BIGGEST AUTOMATION GAP →` — orange (`btn-orange`), links to Calendly
- **Secondary text link:** `Or see how we work →` — 0.78rem, `--ink-mid`, underlined, anchors to `#how-we-work`

---

## Task 2: Consolidate Process Sections

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

### Changes
- Delete the "Services Overview" section (Strategy / Build / Scale three-column cards).
- Keep the "How We Work" (01/02/03) section. Change `id="process"` to `id="how-we-work"`.
- Rename section eyebrow to `THE PROCESS`, H2 to `Three phases. No surprises.`
- Add time/effort line to each step (small italic, `--ink-mid`, 0.78rem).

### Step copy
- **01 Analyze:** `One working session. We audit your SEO, follow-up workflow, CRM, and top three competitors. You leave with a ranked action plan, not a 40-page report.` / Time: `60 to 90 minutes. No homework.`
- **02 Build:** `We build the first system inside your existing stack. Email, calendar, CRM, forms, phone. Nothing new to learn.` / Time: `Most first builds ship in 2 to 4 weeks.`
- **03 Scale:** `Monthly retainer. We measure what's working, fix what's not, and add the next system in the queue.` / Time: `Month to month. Pause anytime.`

---

## Task 3: Service Cards (new "What We Do")

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

Place after the Process section. Three-column grid.

### Card structure (per card)
```
[ORANGE DOT] EYEBROW (0.68rem, uppercase)
1px border-bottom separator
[Pain H3, 1.1rem, weight 500]
[Body, 0.9rem, --ink-mid]
[1px border-top]
[RESULT tag, 0.62rem, orange, uppercase]
[Outcome, 0.9rem, weight 500, --ink]
```
No "Explore Services" links.

### Section copy
- Eyebrow: `WHAT WE DO` / H2: `Three ways we plug in.`
- **Card 1 — BUSINESS ANALYSIS:** Pain: `You don't know exactly where you're losing leads, revenue, or rankings.` / Body: `We audit your SEO, Google Business Profile, follow-up workflow, and your top three competitors. One session. Live, not async.` / Result: `A ranked action plan you can hand to your team on Monday.`
- **Card 2 — BUILDS & CUSTOM DEVELOPMENT:** Pain: `You've been quoted $80K for an MVP, or you're stuck with an AI-built prototype that won't launch.` / Body: `We ship the system that should have shipped six months ago. Working software inside your existing stack. No platform lock-in.` / Result: `Most first builds go live in 2 to 4 weeks.`
- **Card 3 — RETAINER & OPTIMIZATION:** Pain: `The system you bought last year is already outdated and nobody is measuring it.` / Body: `Monthly retainer. We track what's working, kill what's not, and build the next automation in your queue.` / Result: `Your system gets measured, maintained, and extended every month. It compounds instead of decaying.`

---

## Task 4: Who This Is For + Who This Is NOT For

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

### Changes
- Keep section structure and Industries grid.
- Replace intro copy.
- Rename "Good Fit" header.
- Add "Who This Is NOT For" block with thin left border in `--ink-mid`.

### Copy
- Eyebrow: `WHO THIS IS FOR` / H2: `Built for operators, not enterprises.`
- Intro: `This is for the owner who's past the startup grind, knows what's working, and is ready to stop being the bottleneck in their own business. If that's you, keep reading.`
- Good fit header: `You're exactly who we built this for if:`
- Good fit items: `You're doing $500K to $20M in annual revenue.` / `You've got a team but you're still the person everything routes through.` / `You've tried automations before. Some worked. Most didn't get maintained.` / `You can invest $5,000 a month in systems that compound.` / `You want a partner embedded for 12+ months, not a one-and-done project.`
- Bad fit header: `We're probably not the right fit if:`
- Bad fit items: `You're pre-revenue or still validating your offer.` / `You want a one-time project with no follow-through.` / `You're looking for the cheapest option, not the right one.` / `You need someone to decide your strategy for you. We implement. You lead.`

---

## Task 5: Recent Work Section

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

### Changes per card
- Add result metric headline above description (1.1rem, weight 500, `--ink`).
- Add client attribution line below description (0.72rem, small caps, letter-spacing 0.08em, `--ink-mid`). Format: `BUSINESS OWNER, CITY, STATE`.

### Copy (all metrics are TODO placeholders)
- **Card 1 (Real Estate):** Metric: `{/* TODO: e.g. "12 inbound referrals in 90 days" */}` / Attribution: `REALTOR, IOWA CITY, IA`
- **Card 2 (Custom Home Building):** Metric: `{/* TODO: e.g. "Saved 6 hrs/week in quote follow-up" */}` / Attribution: `CUSTOM BUILDER, LONE TREE, IA`
- **Card 3 (Local Services):** Metric: `{/* TODO: numeric result */}` / Attribution: `{/* TODO: INDUSTRY, CITY, STATE */}`

---

## Task 6: Founder Section (NEW)

**File:** `components/FounderSection.tsx` (new)

### Layout
Two-column desktop, stacked mobile. Left 40% / Right 60%.

- **Left:** `aspect-ratio: 4/5`, background `--bg-white`, 1px border `--border`. Centered dotted placeholder: text `FOUNDER PHOTO`, 0.68rem uppercase `--ink-faint`. JSX comment: `{/* TODO: replace with real photo at /public/jesse-bender.jpg when available */}`
- **Right:** Founder copy block.

### Copy
- Eyebrow: `THE FOUNDER`
- Name: `Jesse Bender` (weight 600, 1rem, `--ink`)
- Hook H3: `I've been on both sides of the machine.` + `<em>I build for the side that needs it.</em>` (1.35rem, weight 400, letter-spacing -0.01em)
- Para 1: `On one side: VP-level operations at a 1,400-unit property management company. Years inside enterprise health tech at TelePharm, where we used machine learning to build an AI pill-counting system for enterprise pharmacies, back when "AI" still meant a grant application. I know how big systems get built, sold, and measured.`
- Para 2: `On the other side: I grew up on a farm. Four years as a painting contractor. Five years in construction. I opened a restaurant in 2020 and watched the pandemic close it eighteen months later. I know what it costs when a $400 vendor invoice hits in a week you only did $2,800 in revenue.`
- Para 3: `I left corporate health tech because I was tired of lining the pockets of executives who didn't put the customer first. PE-backed companies treat employees as a number and use questionable tactics to retain customers who are trying to leave. I built SMB Automation to do the opposite: help owners grow, keep their team employed, and give their customers a reason to come back.`
- Pull quote (1px border-top `--border`, padding-top 1.25rem, italic, 1rem, `--ink`, max-width 48ch): `The through-line from the farm to the restaurant to this agency is the same. Customer experience is everything. You have to stand behind the product. The people who win are the ones who learn fast and stretch every dollar. That's who I build for.`
- Signature: `Jesse Bender, Founder` (0.78rem, `--ink-mid`)

---

## Task 7: Lead Magnet Gate (NEW)

**Files:** `components/LeadMagnetGate.tsx` (new) + `app/(site)/api/lead-magnet/route.ts` (new)

**Placement:** Above final CTA.

### UI
- Eyebrow: `FREE CHECKLIST`
- H2: `Not ready for a call? Start here.` (weight 400, letter-spacing -0.02em)
- Sub: `The 12-point SMB Automation Audit. The same framework we run in every paid strategy session. It's the fastest way to see where your business is leaking time and revenue. Free. No credit card. No call required.`
- Form: email input + submit button, horizontal desktop / stacked mobile.
  - Input: 1px border `--border`, 0.95rem, padding 0.85rem 1rem, focus border `--blue`
  - Button (`btn-primary`/`btn-orange`): `SEND ME THE CHECKLIST →`
- Below form: `We send it immediately. Unsubscribe with one click.` (0.75rem, `--ink-mid`)

### Success state (replaces form in place)
- Orange dot + `Checklist sent. Check your inbox in the next 60 seconds.`
- Secondary link: `Didn't get it? Email jesse@smbautomation.io`

### API (`POST /api/lead-magnet`)
- Send email via Resend with PDF attached. Subject: `Your SMB Automation Audit checklist`.
- PDF asset: `/public/assets/smb-automation-audit-checklist.pdf` — use placeholder PDF if real asset not available.
- Store email to `/data/leads.json` (fallback if no lead store exists). Gitignored.
- If Resend not configured: log email to console, return 200 so UI flow is testable.

---

## Task 8: Final CTA Rewrite

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

### Changes
- Add urgency line above H2.
- Replace H2, body, button.
- Add risk reversal line below button.
- Button now anchor-scrolls to `#apply` (not direct Calendly link).

### Copy
- Urgency (0.68rem, uppercase, letter-spacing 0.16em, `--orange`): `NOW BOOKING TWO WEEKS OUT. 3 STRATEGY CALL SPOTS OPEN THIS WEEK.`
- H2: `The SMBs that automate first will own the lead flow in their market. Let's see where you're exposed.`
- Body: `Book a 30-minute call. We'll walk through your follow-up workflow, your top three competitors, and the highest-leverage system you could build first. You leave with a ranked action plan whether or not we work together.`
- Button (orange, `btn-orange`): `APPLY FOR A STRATEGY CALL →` links to `#apply`
- Risk reversal (italic, 0.85rem, `--ink-mid`, max-width 56ch): `The call is free. If we don't identify at least one automation worth $10,000 in recovered time or revenue, we'll tell you straight that we're not the right fit.`

---

## Task 9: Stats Bar Copy Updates

**File:** `app/(site)/page.tsx` + `app/(site)/page.module.css`

### Changes
- Change first stat label from `REVENUE INFLUENCED` to `IN TRACKED CLIENT REVENUE`.
- Add quote row below stats bar: `--bg-white` background, 1px border `--border`, centered, max-width 64ch, italic 0.9rem.
  - Quote: `"They replaced our manual follow-up in three weeks. I got my Sundays back."`
  - Attribution (0.72rem, uppercase, letter-spacing 0.08em, `--ink-mid`): `CUSTOM BUILDER, LONE TREE, IA`
  - JSX comment: `{/* TODO: swap with real approved quote before deploy */}`

---

## Task 10: Application Form (NEW)

**Files:** `components/ApplicationForm.tsx` (new) + `app/(site)/api/apply/route.ts` (new)

**Placement:** Below final CTA. Anchor id: `apply`.

### Layout
Full-width section, max content 780px centered, background `--bg-white`, 1px top/bottom border `--border`.

### Scarcity banner
Background `--blue-pale` (#D8E0FA), 1px border `--blue`, padding 1rem 1.25rem, 0.9rem centered, no radius.
Copy: `We work with a limited number of clients to stay embedded. Not every application is accepted. This takes about 5 minutes.`

### Header
- Eyebrow: `APPLY`
- H2: `Apply for a free strategy call.`
- Sub: `Tell us about your business. If it's a fit, we'll send a Calendly link within one business day. If it's not, we'll tell you straight and point you somewhere better.`

### Fields (12 total)
All inputs: 1px border `--border`, no radius, padding 0.85rem 1rem, 0.95rem Barlow. Focus: `--blue`. Labels: 0.85rem, weight 500, `--ink`. Required `*` in `--orange`. Two-col desktop, single-col mobile.

1. First Name (required, text) — 2-col left
2. Last Name (required, text) — 2-col right
3. Email Address (required, email) — full width
4. Company Name (required, text) — 2-col left
5. Company Website (optional, url) — 2-col right
6. Your Role (required, select): Owner/Founder, CEO/President, COO/Operations, Marketing or Growth, Other
7. Company Size (required, select): Solo, 2 to 10, 11 to 50, 51 to 200, 200+
8. Annual Revenue (required, select): Under $500K, $500K to $2M, $2M to $10M, $10M to $20M, $20M+
9. Project Budget (required, select): Under $5K, $5K to $15K, $15K to $50K, $50K+, Not sure yet
10. How can we help? (required, textarea, min 3 rows)
11. What are you hoping to improve? (required, checkbox group, at least one). Custom square checkbox: 14x14px, 1px border `--border`, blue fill when checked, no radius. Options: Lead generation or sales, Customer support, Internal operations, Data processing or reporting, Content or marketing workflows, Not sure yet
12. Anything else? (optional, textarea)

### Submit
- Full-width mobile, right-aligned desktop. Orange, uppercase, letter-spacing 0.12em: `SUBMIT APPLICATION →`
- Client-side validation: required fields, email format, URL format if filled, at least one checkbox.
- Inline errors: 0.78rem, `--orange`, weight 500.

### Submit behavior
1. POST JSON to `/api/apply`
2. Disable button, swap to `SENDING...`
3. 200: replace form with success state
4. 4xx/5xx: error row above button (`--orange-pale` bg, `--orange` border): `Something went wrong. Please try again or email jesse@smbautomation.io directly.`

### Success state
- Eyebrow: `APPLICATION RECEIVED`
- H3: `Got it. We'll review and respond within one business day.`
- Body: `If it's a fit, you'll get a Calendly link to book the strategy call. If we need more context before the call, we'll email you first.`
- Secondary: `Questions in the meantime? jesse@smbautomation.io`

### API (`POST /api/apply`)
- Validate required fields + email server-side. Return 400 on failure.
- Send notification to `jesse@smbautomation.io` via Resend. Subject: `New application: {First} {Last} from {Company}`. Body: all fields as plain-text block + timestamp.
- Append to `/data/applications.json` fallback (gitignored).
- If Resend not configured: log payload to console, return 200.

---

## New Files

| File | Purpose |
|---|---|
| `components/FounderSection.tsx` | Founder bio section |
| `components/LeadMagnetGate.tsx` | Email capture for checklist |
| `components/ApplicationForm.tsx` | 12-field intake form |
| `app/(site)/api/lead-magnet/route.ts` | Lead magnet POST handler |
| `app/(site)/api/apply/route.ts` | Application POST handler |

## Existing Files Changed

| File | Changes |
|---|---|
| `app/(site)/page.tsx` | Section order, hero copy, process rename, stats label, all new component imports |
| `app/(site)/page.module.css` | New styles for all updated and new sections |
| `app/globals.css` | Add `.btn-orange` alias for `.btn-primary` |

## Data Files (gitignored)

| File | Purpose |
|---|---|
| `/data/leads.json` | Lead magnet email capture fallback |
| `/data/applications.json` | Application submissions fallback |

---

## Deferred (Do Not Build)

- Video in hero or CTA
- Real founder photo (placeholder block only)
- Real client names on case studies
- A/B testing infrastructure
- Resend integration (log fallback keeps UI testable)
- The 12-point checklist PDF content (placeholder PDF)

---

## Acceptance Checklist

- [ ] Zero em dashes in copy or JSX
- [ ] Zero `border-radius` values greater than 0
- [ ] Zero gradient backgrounds
- [ ] No forbidden words in copy
- [ ] Only palette hex values in CSS
- [ ] All TODO placeholders wrapped in visible JSX comments
- [ ] Secondary "see how we work" link scrolls to `#how-we-work`
- [ ] Lead magnet form submits and shows success state (Resend optional)
- [ ] Application form validates all required fields client-side
- [ ] Application form POST returns 200 and renders success state
- [ ] Scarcity banner uses `--blue-pale`, no rounded corners
- [ ] Final CTA `#apply` anchor scrolls to Application Form
- [ ] No new dependencies added without justification
