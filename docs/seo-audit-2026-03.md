# Monthly SEO Audit — March 2026

**Site:** smbautomation.io
**Date:** 2026-03-23
**Scope:** On-page + technical audit of all existing pages and blog posts

---

## P1 — Critical

### 1. All blog post title tags exceed 60 characters

The blog post template appends " — SMB Automation Blog" (23 chars) to every post title, causing all rendered `<title>` tags to exceed 60 characters. Google will truncate these in SERPs.

| Post | Title tag (rendered) | Chars |
|------|---------------------|-------|
| bottleneck-audit | The Bottleneck Audit: Find What's Costing Your Business the Most — SMB Automation Blog | 88 |
| property-manager-automation | How Property Managers Are Reclaiming 15 Hours a Week with AI — SMB Automation Blog | 83 |
| speed-to-lead | Why the First Business to Respond Wins 78% of the Time — SMB Automation Blog | 77 |

**Fix:** Change the suffix in `app/blog/[slug]/page.tsx` line 20 from `" — SMB Automation Blog"` to `" | SMB Automation"` (18 chars) or just `" — SMB Auto"` to keep titles under 60 chars. Alternatively, add a separate `seoTitle` frontmatter field so each post can control its own title tag length.

### 2. Homepage meta description exceeds 155 characters

In `app/layout.tsx` line 8, the description is:
> "We help local service businesses integrate AI automation to save time, respond faster, and make more money. Custom-built workflows for real estate, HVAC, dental, agencies, and more."

**Length:** ~179 characters. Google will truncate this.

**Fix:** Shorten to under 155 chars. Suggestion: "We help local service businesses integrate AI automation to save time, respond faster, and grow revenue. Custom workflows for HVAC, dental, real estate & more." (159 — trim further or cut trailing list.)

### 3. Zero internal links between blog posts

None of the 3 existing blog posts link to any other blog post. Each post only links to the homepage (`/`) via the CTA. This is a significant missed opportunity for:
- Distributing link equity across the blog
- Reducing bounce rate
- Signaling topical relevance to search engines

**Fix:** Add at least 1-2 contextual internal links per post. Natural opportunities:
- `bottleneck-audit` → link to `speed-to-lead` (lead response is a top bottleneck candidate)
- `speed-to-lead` → link to `bottleneck-audit` ("run a bottleneck audit first")
- `property-manager-automation` → link to `bottleneck-audit` ("use the bottleneck audit to prioritize")

---

## P2 — Important

### 4. No dedicated `metaDescription` frontmatter field

Blog posts use the `excerpt` field as the meta description (`post.excerpt` in `generateMetadata`). This means the excerpt must serve double duty — SERP snippet AND blog index card text. These have different ideal lengths and messaging goals.

**Fix:** Add an optional `metaDescription` field to frontmatter. In `generateMetadata`, prefer `metaDescription` over `excerpt` when present. This lets authors optimize SERP copy independently.

### 5. Blog post CTA links point to homepage root, not `/#contact`

All 3 posts end with a "book a free consult" link pointing to `/` instead of `/#contact`. Users land on the top of the homepage rather than the contact form.

**Fix:** Update CTA links in all posts from `[book a free consult](/)` to `[book a free consult](/#contact)`.

### 6. Large inline `<style>` blocks in blog templates

Both `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` embed ~2-3KB of CSS as inline `<style>` strings. This CSS:
- Is duplicated between the two pages (nav styles, variables)
- Ships inside the JS bundle, increasing bundle size
- Cannot be cached independently by the browser

**Fix:** Extract shared styles to a CSS module or `globals.css` additions. This improves cacheability and reduces JS payload.

### 7. Google Fonts loaded via `@import` inside inline `<style>` tags

Both blog templates use `@import url('https://fonts.googleapis.com/css2?...')` inside their `<style>` blocks. This is render-blocking because the browser must:
1. Parse JS → inject `<style>` → discover `@import` → fetch font CSS → fetch font files

The layout already has `<link rel="preconnect">` for Google Fonts, but without a corresponding `<link>` tag for the actual font stylesheet, the preconnect is wasted.

**Fix:** Move the Google Fonts `<link>` tag to `app/layout.tsx` `<head>` and remove the `@import` from inline styles.

---

## P3 — Nice to Have

### 8. No images in any blog posts

All 3 blog posts are text-only with zero images. While not an SEO error, adding:
- A featured image (for OG/social sharing and blog index cards)
- Inline diagrams or screenshots where relevant

would improve social click-through rates and engagement metrics.

### 9. Blog index page has no canonical URL

The blog index (`app/blog/page.tsx`) does not set an explicit canonical URL. It inherits from `metadataBase` in layout.tsx, which should resolve correctly in Next.js, but explicitly setting `alternates.canonical` (as the post template does) is safer.

**Fix:** Add `alternates: { canonical: 'https://smbautomation.io/blog' }` to the blog index metadata.

### 10. OG metadata missing on blog index page

The blog index has `title` and `description` but no `openGraph` object. Social shares of `/blog` will fall back to the site-wide OG image rather than blog-specific copy.

**Fix:** Add `openGraph` metadata to `app/blog/page.tsx` export.

### 11. No structured data (JSON-LD)

No pages include structured data markup. Adding `Article` schema to blog posts and `Organization` schema to the homepage would improve rich snippet eligibility.

---

## Technical Checks

### Sitemap (`app/sitemap.ts`) — PASS

- Homepage included at priority 1.0 with weekly change frequency
- `/blog` index included at priority 0.8 with weekly change frequency
- All blog posts dynamically included via `getAllPosts()` at priority 0.7
- Uses `post.date` for `lastModified` on posts
- No missing pages detected

### Robots (`app/robots.ts`) — PASS

- Allows all user agents to crawl all paths (`allow: /`)
- Points to `https://smbautomation.io/sitemap.xml`
- No unnecessary disallow rules

### Images — N/A

No `<img>` or Next.js `<Image>` components found anywhere in the codebase. No alt text audit needed since no images exist.

---

## Summary

| Priority | Count | Key themes |
|----------|-------|------------|
| P1 Critical | 3 | Title tags too long, meta description too long, no internal linking |
| P2 Important | 4 | Missing metaDescription field, wrong CTA links, inline CSS, font loading |
| P3 Nice-to-have | 4 | No images, missing canonical/OG on blog index, no structured data |
