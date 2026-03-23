# UX Audit — smbautomation.io — March 2026

## Priority Fix (Implemented)

### Hero Proof / "Three Stats" Section
**Before:** Three plain-text bullet points with tiny 6px orange dots. Numbers buried in sentence copy ("Leads followed up within 60 seconds — automatically"). No visual hierarchy — the stats don't pop and are easy to scroll past.

**After:** Redesigned as a 3-column stat card strip:
- Large numbers (2rem, weight 300) as the visual hero of each card
- Short labels below each number (0.72rem, ink-mid)
- White card backgrounds with border grid layout matching the site's sharp aesthetic
- First stat ("< 60s") accented in orange to draw the eye
- Stats: "< 60s" / Lead follow-up time | "0" / Manual steps to book | "30 days" / Average payback period
- Responsive: scales down gracefully at 640px with tighter padding

---

## Full Audit Findings

### Navigation (`.nav`)
- **Good:** Fixed nav with blur backdrop, clean logo treatment, proper scroll state
- **Issue — Mobile:** Nav links disappear at 640px but there is no hamburger menu or mobile nav alternative. Users on mobile have no navigation except scrolling. **Recommendation:** Add a mobile menu toggle at 640px breakpoint
- **Issue — Keyboard:** Nav links lack visible focus states. Add `outline` or `border-bottom` on `:focus-visible`

### Hero Section (`.hero`)
- **Good:** Strong headline hierarchy, italic blue emphasis on "AI Automations", clear dual CTA
- **Issue — Hero form card:** On mobile (960px), the hero collapses to single column but the form card has no top margin separation from the hero copy — they run together. Add `margin-top: 2rem` to `.hero-form-card` at the 960px breakpoint
- **Issue — Form labels:** "Biggest Time Drain" textarea label could be more benefit-focused. Consider: "What eats the most time?"
- **Minor:** The hero eyebrow ("Custom AI Automation for Local Businesses") is generic. Consider something more specific like "AI Automation for Service Businesses" or rotating per niche

### Stats Bar (`.stats-bar`)
- **Good:** Clean blue bar, proper 4-column grid with dividers
- **Issue — Redundancy:** The stats bar repeats "< 60s" and "30 days" which now also appear in the hero-proof cards above. Consider differentiating — e.g., swap stats bar to show "50+" automations built, "5 industries" served, "10-20 hrs" saved/week, "24hr" response time
- **Issue — Mobile:** At 640px, collapses to 2-column which is fine, but the stat numbers could be larger on mobile for impact (currently 2.2rem, could go to 2.5rem)

### How It Works (`.steps-grid`)
- **Good:** Clean 3-column grid, proper numbering, good hover state
- **Issue — Mobile:** At 960px collapses to single column — fine, but the step cards lose their left border context. Consider adding a top border to each card on mobile to maintain visual separation
- **Minor:** Step descriptions are a bit long. The second step ("We build around your existing tools") description could be tightened

### Workflow Diagram (`WorkflowDiagram.tsx`)
- **Good:** Animated connector dots, clear pipeline visualization, good outcome cards
- **Issue — Mobile:** The workflow canvas has `min-width: 720px` and `overflow-x: auto`, meaning mobile users must scroll horizontally. This is acceptable but not ideal. Consider a vertical/stacked layout at 768px
- **Issue — Accessibility:** Emoji icons (📞, ⚡, etc.) lack `aria-label` attributes. Screen readers will read emoji names instead of meaningful labels
- **Issue — Outcomes grid:** At 960px collapses to 2x2 — fine. At 640px stays 2-column. Could go single-column for very narrow screens

### Automations Section (`.cards`, `.tabs`)
- **Good:** Tab navigation by industry, card grid with hover states, click-to-modal flow
- **Issue — Tab overflow:** Tabs use `overflow-x: auto` for horizontal scroll, but there's no visual indicator that more tabs exist off-screen. Consider adding a fade/gradient on the right edge
- **Issue — Modal:** The automation modal's "What this solves" box uses the same generic copy for every automation. This weakens trust — it should be unique per automation or removed
- **Minor:** Card descriptions are consistently too long for scan reading. Consider truncating to 2 lines with a "Read more" indicator

### Why SMB Automation (`.diff-grid`)
- **Good:** Dark section, clean 4-column grid, emoji icons
- **Issue — Mobile:** At 640px, collapses to single column which creates a very long vertical stack. Consider keeping 2-column at 640px
- **Issue — Icons:** Emoji icons (💰, 🔧, 📐, 📊) feel slightly generic. Consider using simple SVG icons or styled text characters for a more professional look

### Blog Section (`.blog-grid`)
- **Good:** Clean 3-column cards, hover state, proper tag/title/excerpt hierarchy
- **Issue — Mobile:** At 960px, collapses to single column. The emoji placeholder images (⚡, 🏠, 🔍) look unfinished. Consider either removing the image area or adding real imagery
- **Minor:** No "View all posts" link — users can only see these 3 featured posts

### Contact Section (`.contact-section`)
- **Good:** Dark background, dual-path (Calendly + form), trust signals
- **Issue — Calendly link:** Opens in a new tab rather than embedding inline. Consider using Calendly's embed widget for a smoother experience
- **Issue — Form duplication:** The contact form is nearly identical to the hero form. If a user already filled out the hero form, they see the same fields again with no indication their first submission was received. Consider: if `submitted` is true, show a "We got your request" message instead of the duplicate form
- **Issue — Trust signals:** The checkmarks (✓) are plain text. Consider styled check icons in orange or blue for more visual weight

### Footer (`.footer`)
- **Good:** Minimal, clean
- **Issue:** No social links, no email address, no physical location indicator. For a B2B consultancy targeting local businesses, showing a location/region builds trust
- **Minor:** Footer links don't include "Blog" link to the full blog index (only has in-page anchors plus /blog)

**Edit:** Footer does include a Blog link — confirmed at line 695. Correction: it's fine.

### Blog Index (`/app/blog/page.tsx`)
- **Good:** Clean grid, proper card hover states, breadcrumb navigation
- **Issue — No CTA:** Blog index has no call-to-action. After browsing posts, there's no prompt to take the next step. Add a CTA banner below the posts grid
- **Issue — Nav:** Blog nav is a simplified version of the main nav — no links to other sections. Consider matching the main site nav for consistency

### Blog Post (`/app/blog/[slug]/page.tsx`)
- **Good:** Clean reading experience, proper typography, CTA box at bottom
- **Issue — No share buttons or reading progress indicator** — minor but would increase engagement
- **Issue — Breadcrumb truncation:** Title truncates at 200px which may cut important words. Consider 300px or showing the full title on desktop

### Global / Cross-Cutting Issues
1. **No `border-radius` violations found** — all elements correctly use sharp edges
2. **Color compliance:** All colors match the design token system. No off-brand colors detected
3. **Typography:** Barlow used consistently. Weights 300/400/500/600 used appropriately
4. **Spacing:** 5vw horizontal padding used consistently for full-width sections
5. **No favicon/OG image audit included** — out of scope but worth checking separately
6. **Performance:** Multiple `@import url()` for Google Fonts across pages — could be consolidated in layout.tsx to prevent redundant network requests
7. **Accessibility:** No skip-to-content link, no ARIA landmarks on main sections, emoji used for decorative icons without alt text

---

## Summary of Priorities

| Priority | Issue | Location |
|----------|-------|----------|
| **P0** | ~~Hero stats don't pop~~ | Fixed ✓ |
| **P1** | No mobile navigation (hamburger) | Nav |
| **P1** | Duplicate form — no "already submitted" state | Contact |
| **P1** | Generic modal copy for all automations | Automations |
| **P2** | Workflow diagram not responsive on mobile | WorkflowDiagram |
| **P2** | No CTA on blog index | Blog |
| **P2** | Missing focus-visible states | Global |
| **P3** | Stats bar redundancy with hero-proof | Stats bar |
| **P3** | Emoji placeholder images on blog cards | Blog section |
| **P3** | Missing skip-to-content / ARIA landmarks | Global |
