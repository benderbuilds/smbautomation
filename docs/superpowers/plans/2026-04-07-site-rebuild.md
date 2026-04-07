# SMB Automation Site Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild smbautomation.io as a full Next.js App Router site with shared Nav/Footer, 10 pages, CSS Modules, and Resend contact form.

**Architecture:** Replace the monolithic inline-style `page.tsx` with CSS Modules per page/component, shared Nav and Footer components in the root layout, and server components by default. All pages use the same brand system defined in `globals.css`. The existing `lib/posts.ts`, `content/blog/`, `next.config.js`, and `railway.toml` are kept as-is.

**Tech Stack:** Next.js 14 App Router, TypeScript, CSS Modules, Barlow (Google Fonts), Resend, next-mdx-remote, gray-matter

---

## Calendly URL

Use `https://calendly.com/jesse-curvebase/30min` everywhere unless the user confirms the new URL `https://calendly.com/jesse-smbautomation/30min`. The plan uses a single constant in layout so it is easy to swap.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| REPLACE | `app/globals.css` | CSS variables, reset, global base styles |
| REPLACE | `app/layout.tsx` | Root layout with font, Nav, Footer, JSON-LD |
| CREATE | `app/layout.module.css` | Layout-level styles (skip page spacer) |
| CREATE | `components/Nav.tsx` | Shared nav (client — mobile hamburger) |
| CREATE | `components/Nav.module.css` | Nav styles |
| CREATE | `components/Footer.tsx` | Shared footer (server) |
| CREATE | `components/Footer.module.css` | Footer styles |
| CREATE | `components/HeroDiagram.tsx` | Animated SVG for homepage hero |
| REPLACE | `app/page.tsx` | Homepage (7 sections, server component) |
| CREATE | `app/page.module.css` | Homepage styles |
| CREATE | `app/services/page.tsx` | Services hub |
| CREATE | `app/services/page.module.css` | Services hub styles |
| CREATE | `app/services/strategy/page.tsx` | Strategy service detail |
| CREATE | `app/services/strategy/page.module.css` | Strategy styles |
| CREATE | `app/services/build/page.tsx` | Build service detail |
| CREATE | `app/services/build/page.module.css` | Build styles |
| CREATE | `app/services/scale/page.tsx` | Scale/retainer detail |
| CREATE | `app/services/scale/page.module.css` | Scale styles |
| CREATE | `app/work/page.tsx` | Case studies |
| CREATE | `app/work/page.module.css` | Work styles |
| CREATE | `app/contact/page.tsx` | Contact page (server wrapper) |
| CREATE | `app/contact/ContactForm.tsx` | Contact form (client component) |
| CREATE | `app/contact/page.module.css` | Contact styles |
| REPLACE | `app/api/contact/route.ts` | Updated fields: company, revenue_range, how_can_we_help |
| CREATE | `app/lp/strategy/page.tsx` | Facebook ad landing page |
| CREATE | `app/lp/strategy/page.module.css` | LP styles |
| REPLACE | `app/blog/page.tsx` | Blog index using shared Nav/Footer |
| CREATE | `app/blog/page.module.css` | Blog index styles |
| REPLACE | `app/blog/[slug]/page.tsx` | Blog post using shared Nav/Footer |
| CREATE | `app/blog/[slug]/page.module.css` | Blog post styles |
| UPDATE | `app/sitemap.ts` | Add all new pages |
| KEEP | `app/robots.ts` | No change needed |
| KEEP | `lib/posts.ts` | No change needed |
| KEEP | `next.config.js` | No change needed |
| KEEP | `railway.toml` | No change needed |

---

## Task 1: Replace globals.css with CSS variables and base reset

**Files:**
- Replace: `app/globals.css`

- [ ] **Step 1: Write new globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue:          #2540D9;
  --blue-deep:     #1A2EA8;
  --blue-pale:     #D8E0FA;
  --blue-lt:       #EBF0FF;
  --orange:        #E84E1A;
  --orange-pale:   #FDEEE8;
  --ink:           #0A0E1A;
  --ink-mid:       #5A6580;
  --ink-faint:     #9AA0B2;
  --bg:            #EDF1F7;
  --bg-white:      #FFFFFF;
  --border:        #D4DAE8;
  --border-strong: #B0BAD0;
  --dark:          #0A0E1A;
  --dark-surface:  #12172A;
  --dark-border:   rgba(255,255,255,0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Barlow', sans-serif;
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

img, svg {
  display: block;
  max-width: 100%;
}

/* Utility classes used across pages */
.eyebrow {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mid);
  display: block;
  margin-bottom: 1rem;
}

.eyebrow-light {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  display: block;
  margin-bottom: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--orange);
  color: #fff;
  padding: 0.85rem 1.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
  text-decoration: none;
}

.btn-primary:hover {
  background: #cc3e12;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  color: #fff;
  padding: 0.85rem 1.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(255,255,255,0.35);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  border-radius: 0;
  text-decoration: none;
}

.btn-secondary:hover {
  border-color: rgba(255,255,255,0.7);
  color: rgba(255,255,255,0.9);
}

.btn-blue {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--blue);
  color: #fff;
  padding: 0.85rem 1.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
  text-decoration: none;
}

.btn-blue:hover {
  background: var(--blue-deep);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 5vw;
}

.proof-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--orange);
  flex-shrink: 0;
  margin-top: 0.35em;
}
```

- [ ] **Step 2: Verify build compiles**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -20
```

Expected: build completes (some pages may warn about missing files — that is fine at this stage).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: replace Tailwind globals with CSS variables and base reset"
```

---

## Task 2: Create shared Nav component

**Files:**
- Create: `components/Nav.tsx`
- Create: `components/Nav.module.css`

- [ ] **Step 1: Create Nav.module.css**

```css
/* components/Nav.module.css */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  height: 64px;
  background: rgba(237,241,247,0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.navScrolled {
  border-bottom-color: var(--border);
}

.logo {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
}

.logoSmb {
  color: var(--blue);
}

.logoAuto {
  color: var(--ink);
}

.links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  align-items: center;
}

.links a {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-mid);
  transition: color 0.15s;
}

.links a:hover {
  color: var(--ink);
}

.cta {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--orange);
  padding: 0.6rem 1.25rem;
  text-decoration: none;
  transition: background 0.15s;
  border-radius: 0;
}

.cta:hover {
  background: #cc3e12;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--ink);
  transition: transform 0.2s, opacity 0.2s;
}

/* Mobile drawer */
.drawer {
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--bg-white);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 5vw 2rem;
  z-index: 99;
  flex-direction: column;
  gap: 0;
}

.drawerOpen {
  display: flex;
}

.drawerLinks {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.drawerLinks li {
  border-bottom: 1px solid var(--border);
}

.drawerLinks a {
  display: block;
  padding: 0.9rem 0;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-mid);
}

.drawerCta {
  display: block;
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--orange);
  padding: 0.85rem 1.5rem;
  text-decoration: none;
}

@media (max-width: 767px) {
  .links {
    display: none;
  }
  .cta {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 2: Create Nav.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import s from './Nav.module.css';

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <Link href="/" className={s.logo}>
          <span className={s.logoSmb}>SMB</span>
          <span className={s.logoAuto}> AUTOMATION</span>
        </Link>

        <ul className={s.links}>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>

        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.cta}>
          Book a Strategy Call →
        </a>

        <button
          className={s.hamburger}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${s.drawer} ${open ? s.drawerOpen : ''}`}>
        <ul className={s.drawerLinks}>
          <li><Link href="/services" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link href="/work" onClick={() => setOpen(false)}>Work</Link></li>
          <li><Link href="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
        </ul>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.drawerCta}>
          Book a Strategy Call →
        </a>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx components/Nav.module.css
git commit -m "feat: add shared Nav component with mobile drawer"
```

---

## Task 3: Create shared Footer component

**Files:**
- Create: `components/Footer.tsx`
- Create: `components/Footer.module.css`

- [ ] **Step 1: Create Footer.module.css**

```css
/* components/Footer.module.css */
.footer {
  background: var(--dark);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 3.5rem 5vw 2.5rem;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.logo {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.logoSmb {
  color: var(--blue);
}

.logoAuto {
  color: rgba(255,255,255,0.4);
}

.tagline {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
}

.copy {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.04em;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.navLinks {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 2rem;
}

.navLinks a {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  transition: color 0.15s;
  text-decoration: none;
}

.navLinks a:hover {
  color: rgba(255,255,255,0.85);
}

.contact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact a {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.45);
  transition: color 0.15s;
  text-decoration: none;
}

.contact a:hover {
  color: var(--blue);
}

@media (max-width: 767px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
```

- [ ] **Step 2: Create Footer.tsx**

```tsx
import Link from 'next/link';
import s from './Footer.module.css';

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div>
          <Link href="/" className={s.logo}>
            <span className={s.logoSmb}>SMB</span>
            <span className={s.logoAuto}> AUTOMATION</span>
          </Link>
          <p className={s.tagline}>
            Business analysis, custom builds, and growth systems for operators who are ready to scale.
          </p>
          <p className={s.copy}>© {year} SMB Automation. All rights reserved.</p>
        </div>

        <div className={s.right}>
          <ul className={s.navLinks}>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <div className={s.contact}>
            <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Strategy Call →</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx components/Footer.module.css
git commit -m "feat: add shared Footer component"
```

---

## Task 4: Update root layout.tsx

**Files:**
- Replace: `app/layout.tsx`

- [ ] **Step 1: Write new layout.tsx**

```tsx
import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: {
    template: '%s | SMB Automation',
    default: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs',
  },
  description: 'We analyze your business, build what is missing, and scale it with you. Strategic growth partner for SMBs doing $500K to $20M.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs',
    description: 'We analyze your business, build what is missing, and scale it with you.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://smbautomation.io',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  email: 'jesse@smbautomation.io',
  description: 'Business analysis, custom builds, and growth systems for SMBs doing $500K to $20M.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run build to verify no TypeScript errors**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: Build completes. The existing `page.tsx` will still work (it has its own styles).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update root layout with shared nav, footer, font, and JSON-LD"
```

---

## Task 5: Create HeroDiagram SVG component

**Files:**
- Create: `components/HeroDiagram.tsx`

- [ ] **Step 1: Create HeroDiagram.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function HeroDiagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(v => (v + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 0, label: 'DATA IN', sub: 'Operations, competitors, customers' },
    { id: 1, label: 'INSIGHT', sub: 'Gaps, leaks, opportunities' },
    { id: 2, label: 'ACTION', sub: 'Prioritized builds' },
    { id: 3, label: 'REVENUE', sub: 'Measurable growth' },
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: 400,
      padding: '2rem 1rem',
    }}>
      {nodes.map((node, i) => (
        <div key={node.id}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            background: active === i ? 'rgba(37,64,217,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${active === i ? 'rgba(37,64,217,0.5)' : 'rgba(255,255,255,0.08)'}`,
            transition: 'all 0.4s ease',
          }}>
            <div style={{
              width: 8,
              height: 8,
              background: active === i ? '#2540D9' : 'rgba(255,255,255,0.15)',
              flexShrink: 0,
              transition: 'background 0.4s ease',
            }} />
            <div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: active === i ? '#2540D9' : 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                transition: 'color 0.4s ease',
              }}>
                {node.label}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: active === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)',
                marginTop: '0.2rem',
                transition: 'color 0.4s ease',
              }}>
                {node.sub}
              </div>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div style={{
              width: 1,
              height: 24,
              background: 'rgba(255,255,255,0.08)',
              margin: '0 0 0 1.6rem',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HeroDiagram.tsx
git commit -m "feat: add HeroDiagram animated component for homepage hero"
```

---

## Task 6: Rebuild Homepage

**Files:**
- Replace: `app/page.tsx`
- Create: `app/page.module.css`

- [ ] **Step 1: Create page.module.css**

```css
/* app/page.module.css */

/* ── Hero ─────────────────────────────── */
.hero {
  background: var(--dark);
  padding: 6rem 5vw 5rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 4rem;
  align-items: center;
}

.heroHeadline {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 1.25rem;
}

.heroHeadline em {
  font-style: italic;
  color: var(--blue);
}

.heroSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 2rem;
}

.heroCtas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.heroRight {
  display: flex;
  justify-content: flex-end;
}

/* ── Proof Bar ───────────────────────── */
.proofBar {
  background: var(--blue);
}

.proofInner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 5vw;
}

.proofStat {
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(255,255,255,0.15);
  text-align: center;
}

.proofStat:last-child {
  border-right: none;
}

.proofNumber {
  font-size: 2.2rem;
  font-weight: 300;
  color: #fff;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.proofLabel {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
}

/* ── Services ────────────────────────── */
.services {
  background: var(--bg);
  padding: 5rem 5vw;
}

.sectionHeader {
  max-width: 1100px;
  margin: 0 auto 3rem;
}

.sectionHeadline {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0.5rem 0 0.75rem;
}

.sectionSub {
  font-size: 0.95rem;
  color: var(--ink-mid);
  line-height: 1.7;
  max-width: 520px;
}

.serviceGrid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
}

.serviceCard {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background 0.15s;
}

.serviceCard:last-child {
  border-right: none;
}

.serviceCard:hover {
  background: var(--blue-lt);
}

.serviceTitle {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--ink);
  padding-left: 1rem;
  border-left: 3px solid var(--blue);
  line-height: 1.3;
}

.serviceDesc {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
  flex: 1;
}

.serviceLink {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  text-decoration: none;
  transition: color 0.15s;
}

.serviceLink:hover {
  color: var(--blue-deep);
}

/* ── Process ─────────────────────────── */
.process {
  background: var(--bg-white);
  padding: 5rem 5vw;
}

.processGrid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
}

.processStep {
  padding: 2.5rem 2rem;
  border-right: 1px solid var(--border);
  position: relative;
}

.processStep:last-child {
  border-right: none;
}

.processNum {
  font-size: 4rem;
  font-weight: 300;
  color: var(--border);
  line-height: 1;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.processTitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.processDesc {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
}

/* ── Who We Work With ────────────────── */
.who {
  background: var(--dark);
  padding: 5rem 5vw;
}

.whoInner {
  max-width: 1100px;
  margin: 0 auto;
}

.whoHeadline {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 0.75rem;
}

.whoSub {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 3rem;
}

.whoGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid rgba(255,255,255,0.08);
}

.whoCol {
  padding: 2rem;
}

.whoCol:first-child {
  border-right: 1px solid rgba(255,255,255,0.08);
}

.whoColTitle {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 1.5rem;
}

.fitList {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.fitItem {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
}

.industryGroup {
  margin-bottom: 1.25rem;
}

.industryGroupTitle {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.4rem;
}

.industryList {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
}

.whoNote {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.82rem;
  color: rgba(255,255,255,0.35);
  line-height: 1.6;
  font-style: italic;
}

/* ── Case Studies Preview ────────────── */
.caseStudies {
  background: var(--bg);
  padding: 5rem 5vw;
}

.caseGrid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
}

.caseCard {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.15s;
  text-decoration: none;
}

.caseCard:last-child {
  border-right: none;
}

.caseCard:hover {
  background: var(--blue-lt);
}

.caseTag {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
}

.caseTitle {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
}

.caseResult {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.65;
  flex: 1;
}

.caseCta {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

/* ── Final CTA ───────────────────────── */
.finalCta {
  background: var(--blue);
  padding: 5rem 5vw;
  text-align: center;
}

.finalCtaHeadline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 1rem;
}

.finalCtaSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 520px;
  margin: 0 auto 2.5rem;
}

/* ── Responsive ──────────────────────── */
@media (max-width: 1099px) {
  .heroInner { grid-template-columns: 1fr; }
  .heroRight { display: none; }
  .proofInner { grid-template-columns: repeat(2, 1fr); }
  .proofStat:nth-child(2) { border-right: none; }
  .proofStat:nth-child(3) { border-right: 1px solid rgba(255,255,255,0.15); }
  .proofStat:nth-child(4) { border-right: none; }
  .serviceGrid { grid-template-columns: 1fr 1fr; }
  .serviceCard:nth-child(2) { border-right: none; }
  .serviceCard:nth-child(3) { border-top: 1px solid var(--border); border-right: none; grid-column: span 2; }
  .processGrid { grid-template-columns: 1fr; }
  .processStep { border-right: none; border-bottom: 1px solid var(--border); }
  .processStep:last-child { border-bottom: none; }
  .whoGrid { grid-template-columns: 1fr; }
  .whoCol:first-child { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .caseGrid { grid-template-columns: 1fr 1fr; }
  .caseCard:nth-child(2) { border-right: none; }
  .caseCard:nth-child(3) { border-top: 1px solid var(--border); border-right: none; grid-column: span 2; }
}

@media (max-width: 767px) {
  .hero { padding: 4rem 5vw 3rem; }
  .serviceGrid { grid-template-columns: 1fr; }
  .serviceCard { border-right: none; border-bottom: 1px solid var(--border); }
  .serviceCard:nth-child(3) { grid-column: span 1; }
  .proofInner { grid-template-columns: 1fr 1fr; padding: 0 5vw; }
  .caseGrid { grid-template-columns: 1fr; }
  .caseCard { border-right: none; border-bottom: 1px solid var(--border); grid-column: span 1; }
}
```

- [ ] **Step 2: Write new app/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroDiagram from '@/components/HeroDiagram';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs',
  description: 'We analyze your business, build what is missing, and scale it with you. Strategic growth partner for SMBs doing $500K to $20M.',
  alternates: { canonical: 'https://smbautomation.io' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div>
            <span className="eyebrow-light">Growth Partner for Small Business</span>
            <h1 className={s.heroHeadline}>
              We analyze your business, build what&apos;s missing, and{' '}
              <em>scale it with you.</em>
            </h1>
            <p className={s.heroSub}>
              Most agencies sell you tools. We study your business like we own a piece of it, then build and run the systems that drive growth.
            </p>
            <div className={s.heroCtas}>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a Strategy Call →
              </a>
              <a href="#process" className="btn-secondary">
                See How We Work →
              </a>
            </div>
          </div>
          <div className={s.heroRight}>
            <HeroDiagram />
          </div>
        </div>
      </section>

      {/* 2. Social Proof Bar */}
      <section className={s.proofBar}>
        <div className={s.proofInner}>
          {[
            { num: '$2.4M+', label: 'Revenue Influenced' },
            { num: '40+', label: 'Systems Deployed' },
            { num: '18', label: 'Industries Served' },
            { num: '< 48 hrs', label: 'Avg Time to First Insight' },
          ].map(stat => (
            <div key={stat.label} className={s.proofStat}>
              <div className={s.proofNumber}>{stat.num}</div>
              <div className={s.proofLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Services Overview */}
      <section className={s.services}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">What We Do</span>
          <h2 className={s.sectionHeadline}>Strategy. Build. Scale.</h2>
          <p className={s.sectionSub}>
            Three phases of working with us. Each one delivers standalone value, and together they compound.
          </p>
        </div>
        <div className={s.serviceGrid}>
          {[
            {
              title: 'Business Analysis & Growth Strategy',
              desc: 'We start by understanding your business at the operational level. Competitor analysis, customer journey mapping, revenue leak identification, and a prioritized growth roadmap. You walk away with a clear picture of what to fix first and what it is worth.',
              cta: 'Explore Strategy Services →',
              href: '/services/strategy',
            },
            {
              title: '0-1 MVP Builds & Custom Development',
              desc: 'We design and build the tools your business is missing. Custom automations, client-facing apps, internal dashboards, AI workflows. Every build is scoped around a measurable outcome: time saved, revenue recovered, or capacity unlocked.',
              cta: 'Explore Build Services →',
              href: '/services/build',
            },
            {
              title: 'Ongoing Optimization & Retainer',
              desc: 'We stay embedded in your business. Monthly performance reviews, system optimization, new builds as priorities shift. This is not a support contract. It is having a technical growth team on call.',
              cta: 'Explore Scale Services →',
              href: '/services/scale',
            },
          ].map(svc => (
            <div key={svc.title} className={s.serviceCard}>
              <div className={s.serviceTitle}>{svc.title}</div>
              <p className={s.serviceDesc}>{svc.desc}</p>
              <Link href={svc.href} className={s.serviceLink}>{svc.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Process */}
      <section className={s.process} id="process">
        <div className={s.sectionHeader}>
          <span className="eyebrow">How We Work</span>
          <h2 className={s.sectionHeadline}>Analyze. Build. Scale.</h2>
          <p className={s.sectionSub}>
            Every engagement follows this progression. Some clients start at step one, others jump straight to a build. We meet you where you are.
          </p>
        </div>
        <div className={s.processGrid}>
          {[
            {
              num: '01',
              title: 'Deep Business Analysis',
              desc: 'We audit your operations, competitors, and customer journey. No generic templates. We study your actual business until we understand it well enough to tell you things you do not already know.',
            },
            {
              num: '02',
              title: 'Build What Matters Most',
              desc: 'We prioritize by impact. The first build targets your highest-value bottleneck with a measurable ROI target attached. You see results before we move to the next one.',
            },
            {
              num: '03',
              title: 'Scale With You Monthly',
              desc: 'We review performance data, optimize what is running, and build the next priority. Your business evolves. Your systems evolve with it.',
            },
          ].map(step => (
            <div key={step.num} className={s.processStep}>
              <div className={s.processNum}>{step.num}</div>
              <div className={s.processTitle}>{step.title}</div>
              <p className={s.processDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Who We Work With */}
      <section className={s.who}>
        <div className={s.whoInner}>
          <span className="eyebrow-light">Who This Is For</span>
          <h2 className={s.whoHeadline}>Built for operators, not enterprises.</h2>
          <p className={s.whoSub}>
            We work best with small and mid-sized businesses that are past the startup phase and ready to invest in systems that scale.
          </p>
          <div className={s.whoGrid}>
            <div className={s.whoCol}>
              <div className={s.whoColTitle}>Good fit</div>
              <ul className={s.fitList}>
                {[
                  'Revenue between $500K and $20M',
                  'Currently relying on manual processes that should be automated',
                  'Ready to invest $5,000+/mo in growth infrastructure',
                  'Want a strategic partner, not a vendor who disappears after delivery',
                  'Decision-maker is involved in the engagement',
                ].map(item => (
                  <li key={item} className={s.fitItem}>
                    <span className="proof-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.whoCol}>
              <div className={s.whoColTitle}>Industries we know well</div>
              {[
                { group: 'Healthcare & Wellness', items: 'Med spas, weight loss clinics, TRT/HRT clinics, hair restoration' },
                { group: 'Professional Services', items: 'Immigration attorneys, tax resolution firms, senior care advisors' },
                { group: 'Home & Property', items: 'Property management, custom home builders, commercial cleaning, landscaping' },
                { group: 'Real Estate', items: 'Agents, brokerages, property investors' },
              ].map(g => (
                <div key={g.group} className={s.industryGroup}>
                  <div className={s.industryGroupTitle}>{g.group}</div>
                  <div className={s.industryList}>{g.items}</div>
                </div>
              ))}
              <div className={s.whoNote}>
                Do not see your industry? If your business runs on appointments, leads, and recurring revenue, we can probably help. Book a call and we will tell you honestly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Case Studies Preview */}
      <section className={s.caseStudies}>
        <div className={s.sectionHeader}>
          <span className="eyebrow">Recent Work</span>
          <h2 className={s.sectionHeadline}>What it looks like in practice.</h2>
        </div>
        <div className={s.caseGrid}>
          {[
            {
              tag: 'Real Estate',
              title: 'Annual Client Engagement System',
              result: '10-template automated email sequence keeping 200+ past clients engaged year-round.',
            },
            {
              tag: 'Custom Home Building',
              title: 'Growth Strategy & Online Presence Overhaul',
              result: 'Comprehensive competitor analysis, website gap audit, and four-phase growth roadmap for a regional builder.',
            },
            {
              tag: 'Local Services',
              title: 'Video Content Automation Pipeline',
              result: 'Automated before/after video production cutting content creation time by 80%.',
            },
          ].map(c => (
            <Link key={c.title} href="/work" className={s.caseCard}>
              <div className={s.caseTag}>{c.tag}</div>
              <div className={s.caseTitle}>{c.title}</div>
              <p className={s.caseResult}>{c.result}</p>
              <div className={s.caseCta}>Read the Full Story →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className={s.finalCta}>
        <h2 className={s.finalCtaHeadline}>Ready to see what is possible?</h2>
        <p className={s.finalCtaSub}>
          Book a free 30-minute strategy call. We will walk through your business, identify the biggest opportunities, and tell you exactly what we would build first.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book Your Free Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Run build**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: Build completes without TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/page.module.css components/HeroDiagram.tsx
git commit -m "feat: rebuild homepage with 7 sections and CSS modules"
```

---

## Task 7: Services hub page

**Files:**
- Create: `app/services/page.tsx`
- Create: `app/services/page.module.css`

- [ ] **Step 1: Create app/services/page.module.css**

```css
/* app/services/page.module.css */
.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 1rem;
}

.sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 520px;
}

.grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 5vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--border);
  border-top: none;
}

.card {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card:last-child {
  border-right: none;
}

.cardNum {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
}

.cardTitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ink);
  border-left: 3px solid var(--blue);
  padding-left: 0.85rem;
  line-height: 1.3;
}

.cardDesc {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
  flex: 1;
}

.cardPrice {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink);
  padding: 0.75rem 0;
  border-top: 1px solid var(--border);
}

.cardCta {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  text-decoration: none;
  transition: color 0.15s;
}

.cardCta:hover {
  color: var(--blue-deep);
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
    border: 1px solid var(--border);
    border-top: none;
  }
  .card {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .card:last-child {
    border-bottom: none;
  }
}
```

- [ ] **Step 2: Create app/services/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Business analysis, custom MVP builds, and ongoing growth retainers for SMBs doing $500K to $20M.',
  alternates: { canonical: 'https://smbautomation.io/services' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function ServicesPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">What We Do</span>
          <h1 className={s.headline}>Strategy. Build. Scale.</h1>
          <p className={s.sub}>
            Three ways to work with us. Each phase stands alone. Together, they compound.
          </p>
        </div>
      </section>

      <div className={s.grid} style={{ background: 'var(--bg)' }}>
        {[
          {
            num: '01',
            title: 'Business Analysis & Growth Strategy',
            desc: 'A deep operational audit: competitor landscape, customer journey mapping, revenue leak identification, and a prioritized roadmap with dollar values attached.',
            price: 'Starting at $2,500',
            cta: 'Explore Strategy Services →',
            href: '/services/strategy',
          },
          {
            num: '02',
            title: '0-1 MVP Builds & Custom Development',
            desc: 'Custom automations, client-facing apps, AI workflows, and internal tools. Every project is scoped around a measurable outcome before work begins.',
            price: '$5,000 to $25,000 depending on scope',
            cta: 'Explore Build Services →',
            href: '/services/build',
          },
          {
            num: '03',
            title: 'Ongoing Optimization & Retainer',
            desc: 'Monthly performance reviews, system optimization, new builds as priorities shift. A fractional technical growth team, not a support contract.',
            price: 'Starting at $5,000/mo',
            cta: 'Explore Scale Services →',
            href: '/services/scale',
          },
        ].map(card => (
          <div key={card.num} className={s.card}>
            <div className={s.cardNum}>{card.num}</div>
            <div className={s.cardTitle}>{card.title}</div>
            <p className={s.cardDesc}>{card.desc}</p>
            <div className={s.cardPrice}>{card.price}</div>
            <Link href={card.href} className={s.cardCta}>{card.cta}</Link>
          </div>
        ))}
      </div>

      <section style={{ background: 'var(--blue)', padding: '4rem 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400, letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
          Not sure where to start?
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Most clients start with the strategy engagement. It tells you exactly where to invest.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Free Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/services/page.tsx app/services/page.module.css
git commit -m "feat: add services hub page"
```

---

## Task 8: Services detail pages (strategy, build, scale)

**Files:**
- Create: `app/services/strategy/page.tsx`
- Create: `app/services/strategy/page.module.css`
- Create: `app/services/build/page.tsx`
- Create: `app/services/build/page.module.css`
- Create: `app/services/scale/page.tsx`
- Create: `app/services/scale/page.module.css`

All three share an identical CSS layout. Create the CSS module once and reuse.

- [ ] **Step 1: Create shared service detail CSS (copy to all three)**

Create `app/services/strategy/page.module.css` (then duplicate for build and scale):

```css
/* app/services/strategy/page.module.css */
.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 1rem;
}

.heroSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 2rem;
}

.section {
  padding: 4rem 5vw;
  max-width: 1100px;
  margin: 0 auto;
}

.sectionTitle {
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
}

.gridItem {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  padding: 1.5rem;
}

.gridItem:last-child {
  border-right: none;
}

.gridItem h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 0.4rem;
  border-left: 2px solid var(--blue);
  padding-left: 0.6rem;
}

.gridItem p {
  font-size: 0.82rem;
  color: var(--ink-mid);
  line-height: 1.6;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border);
  background: var(--bg-white);
}

.timelineStep {
  display: grid;
  grid-template-columns: 60px 1fr;
  border-bottom: 1px solid var(--border);
  padding: 1.25rem 1.5rem;
  align-items: start;
  gap: 1rem;
}

.timelineStep:last-child {
  border-bottom: none;
}

.timelineNum {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--blue);
  text-transform: uppercase;
  padding-top: 0.15rem;
}

.timelineText h3 {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 0.25rem;
}

.timelineText p {
  font-size: 0.82rem;
  color: var(--ink-mid);
  line-height: 1.6;
}

.investment {
  background: var(--blue-lt);
  border: 1px solid var(--blue-pale);
  padding: 2rem;
  margin-top: 2rem;
}

.investment h3 {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 0.75rem;
}

.investment p {
  font-size: 1rem;
  font-weight: 400;
  color: var(--ink);
  line-height: 1.6;
}

.ctaSection {
  background: var(--blue);
  padding: 4rem 5vw;
  text-align: center;
}

.ctaHeadline {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 0.75rem;
}

.ctaSub {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.65);
  max-width: 440px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .gridItem {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .gridItem:last-child {
    border-bottom: none;
  }
  .timelineStep {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create app/services/strategy/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Business Analysis & Growth Strategy',
  description: 'A deep operational audit, competitor analysis, and prioritized growth roadmap with dollar values attached. Engagements start at $2,500.',
  alternates: { canonical: 'https://smbautomation.io/services/strategy' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function StrategyPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 01</span>
          <h1 className={s.headline}>Business Analysis & Growth Strategy</h1>
          <p className={s.heroSub}>
            We study your business until we understand it well enough to tell you things you do not already know. You get a prioritized roadmap with dollar values attached to every recommendation.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div style={{ background: 'var(--bg)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>What is included</h2>
          <div className={s.grid}>
            {[
              { title: 'Competitor landscape analysis', desc: 'Understand exactly how you stack up and where competitors are weak.' },
              { title: 'Customer journey mapping', desc: 'Map every touchpoint from awareness through repeat purchase.' },
              { title: 'Revenue leak identification', desc: 'Find where money is being lost and estimate the dollar value of each leak.' },
              { title: 'Tech stack audit', desc: 'Identify what you have, what is redundant, and what is missing.' },
              { title: 'Prioritized growth roadmap', desc: 'Every recommendation ranked by estimated ROI and effort.' },
              { title: 'Findings presentation', desc: 'Recorded walkthrough plus a written report you can act on immediately.' },
            ].map(item => (
              <div key={item.title} className={s.gridItem}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-white)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>How it works</h2>
          <div className={s.timeline}>
            {[
              { step: 'Day 1-2', title: 'Intake and kickoff', desc: 'You complete a detailed intake form. We schedule a 60-minute kickoff call to go deeper on your business model, goals, and constraints.' },
              { step: 'Day 3-7', title: 'Research and analysis', desc: 'We conduct the full audit independently. Competitor research, customer journey reconstruction, data review, and opportunity mapping.' },
              { step: 'Day 8-10', title: 'Roadmap build', desc: 'We build your prioritized growth roadmap with estimated revenue impact and effort for each initiative.' },
              { step: 'Day 10', title: 'Presentation and walkthrough', desc: 'We deliver a recorded video walkthrough and a written PDF report. You own both assets permanently.' },
            ].map(step => (
              <div key={step.step} className={s.timelineStep}>
                <div className={s.timelineNum}>{step.step}</div>
                <div className={s.timelineText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s.investment}>
            <h3>Investment</h3>
            <p>Strategy engagements start at $2,500. Most are completed within 10 business days.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Ready to see where your business is leaking revenue?</h2>
        <p className={s.ctaSub}>Book a free 30-minute call. We will walk through your situation and tell you whether the strategy engagement is the right starting point.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Create app/services/build/page.module.css** (identical to strategy CSS)

Copy `app/services/strategy/page.module.css` to `app/services/build/page.module.css`.

```bash
cp /Users/jessebender/smbautomation/app/services/strategy/page.module.css \
   /Users/jessebender/smbautomation/app/services/build/page.module.css
```

- [ ] **Step 4: Create app/services/build/page.tsx**

```tsx
import type { Metadata } from 'next';
import s from './page.module.css';

export const metadata: Metadata = {
  title: '0-1 MVP Builds & Custom Development',
  description: 'Custom automations, client-facing apps, AI workflows, and internal tools. Every project scoped around a measurable outcome. $5K to $25K.',
  alternates: { canonical: 'https://smbautomation.io/services/build' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function BuildPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 02</span>
          <h1 className={s.headline}>0-1 MVP Builds & Custom Development</h1>
          <p className={s.heroSub}>
            We build the tools your business is missing. Every project starts with a defined ROI target. You know what success looks like before we write a single line of code.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div style={{ background: 'var(--bg)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>What we build</h2>
          <div className={s.grid}>
            {[
              { title: 'Custom automation workflows', desc: 'n8n, Make, direct API integrations. Eliminate manual steps that cost you time and accuracy.' },
              { title: 'Client-facing apps and dashboards', desc: 'Portals, booking tools, reporting dashboards. Built to match your brand and your workflow.' },
              { title: 'AI-powered tools', desc: 'Chatbots, content systems, lead scoring, and document processors trained on your business.' },
              { title: 'Internal operations tools', desc: 'Job tracking, quoting systems, team dashboards. Infrastructure your team will actually use.' },
              { title: 'Data pipelines and reporting', desc: 'Automated reporting that surfaces the numbers you need without manual exports.' },
            ].map(item => (
              <div key={item.title} className={s.gridItem}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-white)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>Our approach</h2>
          <div className={s.timeline}>
            {[
              { step: 'Discovery', title: 'Scope and ROI definition', desc: 'We agree on the outcome, the success metric, and the budget before any work begins.' },
              { step: 'Prototype', title: 'Rapid prototype', desc: 'A working prototype in 5 to 7 days so you can validate the approach before full build.' },
              { step: 'Build', title: 'Full build', desc: 'We build to production quality. No shortcuts that create technical debt you will pay for later.' },
              { step: 'Deploy', title: 'Deployment and handoff', desc: 'We deploy, document, and walk you through everything. You own the code and the infrastructure.' },
              { step: 'Measure', title: 'Results review', desc: 'Two weeks after launch, we review the numbers against the original ROI target.' },
            ].map(step => (
              <div key={step.step} className={s.timelineStep}>
                <div className={s.timelineNum}>{step.step}</div>
                <div className={s.timelineText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s.investment}>
            <h3>Investment</h3>
            <p>Build projects range from $5,000 to $25,000 depending on scope. Every project includes a defined ROI target before we start.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Have something specific in mind?</h2>
        <p className={s.ctaSub}>Book a call and tell us what you want to build. We will scope it and tell you what it will take.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Create app/services/scale/page.module.css** (copy from strategy)

```bash
cp /Users/jessebender/smbautomation/app/services/strategy/page.module.css \
   /Users/jessebender/smbautomation/app/services/scale/page.module.css
```

- [ ] **Step 6: Create app/services/scale/page.tsx**

```tsx
import type { Metadata } from 'next';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Ongoing Optimization & Retainer',
  description: 'A fractional technical growth team embedded in your business. Monthly performance reviews, system optimization, and new builds as priorities shift. Starting at $5,000/mo.',
  alternates: { canonical: 'https://smbautomation.io/services/scale' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function ScalePage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Service 03</span>
          <h1 className={s.headline}>Ongoing Optimization & Retainer</h1>
          <p className={s.heroSub}>
            We stay embedded in your business. Not as a support contract. As a technical growth team that shows up every month and moves things forward.
          </p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
      </section>

      <div style={{ background: 'var(--bg)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>What the retainer includes</h2>
          <div className={s.grid}>
            {[
              { title: 'Monthly performance review', desc: 'We review every system, every metric. You get a written summary and a clear next-priority list.' },
              { title: 'System monitoring and optimization', desc: 'We catch problems before they cost you. Active monitoring and continuous tuning of everything we have built.' },
              { title: 'Priority access for new builds', desc: 'Retainer clients move to the front of the queue for new projects. No re-scoping, no onboarding delay.' },
              { title: 'Strategic advisory', desc: 'We sit in on planning conversations and help you pressure-test decisions before you commit resources.' },
              { title: 'Dedicated Slack channel', desc: 'Async access for questions, context, and quick reviews. Response within one business day.' },
            ].map(item => (
              <div key={item.title} className={s.gridItem}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-white)', padding: '4rem 5vw' }}>
        <div className={s.section} style={{ padding: 0 }}>
          <h2 className={s.sectionTitle}>Who this is for</h2>
          <div className={s.timeline}>
            {[
              { step: 'Fit 1', title: 'Businesses completing a build with us', desc: 'If we just delivered a project, the retainer is the natural next step. You have infrastructure running. The retainer keeps it performing and growing.' },
              { step: 'Fit 2', title: 'Operators who want a fractional technical team', desc: 'You do not need a full-time hire. You need senior technical judgment on call, available monthly, without the overhead.' },
              { step: 'Fit 3', title: 'Fast-growing businesses with shifting priorities', desc: 'Your needs change as you grow. The retainer flexes with you. Scope is reviewed quarterly and adjusted to what matters now.' },
            ].map(step => (
              <div key={step.step} className={s.timelineStep}>
                <div className={s.timelineNum}>{step.step}</div>
                <div className={s.timelineText}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={s.investment}>
            <h3>Investment</h3>
            <p>Retainers start at $5,000/mo. Scope is flexible and reviewed quarterly.</p>
          </div>
        </div>
      </div>

      <section className={s.ctaSection}>
        <h2 className={s.ctaHeadline}>Ready to have a growth team in your corner?</h2>
        <p className={s.ctaSub}>Book a call. We will walk through where you are and whether the retainer is the right fit right now.</p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 7: Run build**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: All four service pages compile without errors.

- [ ] **Step 8: Commit**

```bash
git add app/services/
git commit -m "feat: add services hub and three service detail pages"
```

---

## Task 9: Work / Case Studies page

**Files:**
- Create: `app/work/page.tsx`
- Create: `app/work/page.module.css`

- [ ] **Step 1: Create app/work/page.module.css**

```css
/* app/work/page.module.css */
.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 1rem;
}

.heroSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 520px;
}

.grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 5vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
  border-top: none;
}

.card {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card:last-child {
  border-right: none;
}

.tag {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
}

.result {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.65;
  flex: 1;
}

.detail {
  font-size: 0.82rem;
  color: var(--ink-mid);
  line-height: 1.65;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.note {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 5vw 3rem;
  font-size: 0.82rem;
  color: var(--ink-faint);
  font-style: italic;
}

@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .card {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .card:last-child {
    border-bottom: none;
  }
}
```

- [ ] **Step 2: Create app/work/page.tsx**

```tsx
import type { Metadata } from 'next';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies from real SMB automation and growth projects. Real estate, home building, local services, and more.',
  alternates: { canonical: 'https://smbautomation.io/work' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

const cases = [
  {
    tag: 'Real Estate',
    title: 'Annual Client Engagement System',
    result: '10-template automated email sequence keeping 200+ past clients engaged year-round.',
    detail: 'A residential real estate agent had no systematic way to stay in touch with past clients between transactions. We built a 10-email annual sequence triggered by close date, covering holidays, market updates, and personal check-ins. Open rates exceeded 40% within 60 days.',
  },
  {
    tag: 'Custom Home Building',
    title: 'Growth Strategy & Online Presence Overhaul',
    result: 'Comprehensive competitor analysis, website gap audit, and four-phase growth roadmap for a regional builder.',
    detail: 'A regional custom home builder was losing leads to competitors with stronger digital presence. We audited six competitors, mapped the full customer journey, and delivered a prioritized four-phase growth roadmap including SEO, content, referral systems, and a client portal.',
  },
  {
    tag: 'Local Services',
    title: 'Video Content Automation Pipeline',
    result: 'Automated before/after video production cutting content creation time by 80%.',
    detail: 'A home services company had hundreds of before/after job photos but no scalable way to turn them into social content. We built an automation that batches photos, generates branded video templates, and publishes to multiple platforms. 80% time reduction vs. manual production.',
  },
];

export default function WorkPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Recent Work</span>
          <h1 className={s.headline}>What it looks like in practice.</h1>
          <p className={s.heroSub}>
            A sample of recent engagements. Each one started with a clear problem and a defined result.
          </p>
        </div>
      </section>

      <div style={{ background: 'var(--bg)' }}>
        <div className={s.grid}>
          {cases.map(c => (
            <div key={c.title} className={s.card}>
              <div className={s.tag}>{c.tag}</div>
              <div className={s.title}>{c.title}</div>
              <p className={s.result}>{c.result}</p>
              <p className={s.detail}>{c.detail}</p>
            </div>
          ))}
        </div>
        <p className={s.note}>
          More case studies added as engagements are completed. Identifying details changed with client permission.
        </p>
      </div>

      <section style={{ background: 'var(--blue)', padding: '4rem 5vw', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 400, letterSpacing: '-0.02em', color: '#fff', marginBottom: '1rem' }}>
          Want results like these?
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Book a free call. We will walk through your business and tell you what we would build first.
        </p>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Book a Free Strategy Call →
        </a>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/work/page.tsx app/work/page.module.css
git commit -m "feat: add work/case studies page"
```

---

## Task 10: Contact page and API update

**Files:**
- Create: `app/contact/page.tsx`
- Create: `app/contact/ContactForm.tsx`
- Create: `app/contact/page.module.css`
- Replace: `app/api/contact/route.ts`

- [ ] **Step 1: Create app/contact/page.module.css**

```css
/* app/contact/page.module.css */
.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 1rem;
}

.heroSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 480px;
}

.body {
  background: var(--bg);
  padding: 4rem 5vw;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}

.leftInfo h2 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 1rem;
}

.leftInfo p {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.contactLinks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contactLinks a {
  font-size: 0.875rem;
  color: var(--blue);
  text-decoration: none;
  transition: color 0.15s;
}

.contactLinks a:hover {
  color: var(--blue-deep);
}

.form {
  background: var(--bg-white);
  border: 1px solid var(--border);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
}

.field input,
.field select,
.field textarea {
  font-family: 'Barlow', sans-serif;
  font-size: 0.9rem;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 0.7rem 0.85rem;
  border-radius: 0;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  -webkit-appearance: none;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--blue);
}

.field textarea {
  resize: vertical;
  min-height: 100px;
}

.submitBtn {
  align-self: flex-start;
  font-family: 'Barlow', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--orange);
  padding: 0.85rem 1.75rem;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
}

.submitBtn:hover {
  background: #cc3e12;
}

.submitBtn:disabled {
  background: var(--ink-faint);
  cursor: not-allowed;
}

.success {
  padding: 1.25rem 1.5rem;
  background: var(--blue-lt);
  border: 1px solid var(--blue-pale);
  font-size: 0.9rem;
  color: var(--blue);
}

.error {
  padding: 1rem 1.25rem;
  background: #fff0ee;
  border: 1px solid #fcc;
  font-size: 0.875rem;
  color: #c0392b;
}

@media (max-width: 767px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .row {
    grid-template-columns: 1fr;
  }
  .form {
    padding: 1.5rem;
  }
}
```

- [ ] **Step 2: Create app/contact/ContactForm.tsx (client component)**

```tsx
'use client';

import { useState } from 'react';
import s from './page.module.css';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      revenue_range: (form.elements.namedItem('revenue_range') as HTMLSelectElement).value,
      how_can_we_help: (form.elements.namedItem('how_can_we_help') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Something went wrong.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.form}>
        <div className={s.success}>
          Got it. We will be in touch within one business day.
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" type="text" required placeholder="Jane Smith" />
        </div>
        <div className={s.field}>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" />
        </div>
        <div className={s.field}>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" placeholder="Acme Corp" />
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="revenue_range">Annual Revenue</label>
          <select id="revenue_range" name="revenue_range">
            <option value="">Select range</option>
            <option value="under_500k">Under $500K</option>
            <option value="500k_1m">$500K to $1M</option>
            <option value="1m_5m">$1M to $5M</option>
            <option value="5m_20m">$5M to $20M</option>
            <option value="20m_plus">$20M+</option>
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor="how_can_we_help">How can we help?</label>
          <select id="how_can_we_help" name="how_can_we_help">
            <option value="">Select one</option>
            <option value="strategy">Business Analysis & Strategy</option>
            <option value="build">Custom Build / MVP</option>
            <option value="retainer">Ongoing Retainer</option>
            <option value="not_sure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell us what you are working on..." />
      </div>

      {status === 'error' && <div className={s.error}>{errorMsg}</div>}

      <button type="submit" className={s.submitBtn} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Your Message →'}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create app/contact/page.tsx**

```tsx
import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a free strategy call or send us a message. We respond within one business day.',
  alternates: { canonical: 'https://smbautomation.io/contact' },
};

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

export default function ContactPage() {
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">Get in Touch</span>
          <h1 className={s.headline}>Let&apos;s talk about your business.</h1>
          <p className={s.heroSub}>
            Tell us where you are and what you are trying to build. We will tell you honestly whether we can help and what that looks like.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.inner}>
          <div className={s.leftInfo}>
            <h2>Reach us directly</h2>
            <p>We respond to all inquiries within one business day. For faster scheduling, book a call directly.</p>
            <div className={s.contactLinks}>
              <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a 30-min strategy call →</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Replace app/api/contact/route.ts with updated fields**

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, revenue_range, how_can_we_help, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL || 'jesse@smbautomation.io';

    const revenueLabels: Record<string, string> = {
      under_500k: 'Under $500K',
      '500k_1m': '$500K to $1M',
      '1m_5m': '$1M to $5M',
      '5m_20m': '$5M to $20M',
      '20m_plus': '$20M+',
    };

    const helpLabels: Record<string, string> = {
      strategy: 'Business Analysis & Strategy',
      build: 'Custom Build / MVP',
      retainer: 'Ongoing Retainer',
      not_sure: 'Not sure yet',
    };

    const row = (label: string, value: string) => `
      <tr style="border-bottom: 1px solid #D4DAE8;">
        <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; width: 160px;">${label}</td>
        <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem;">${value || 'Not provided'}</td>
      </tr>`;

    await resend.emails.send({
      from: 'SMB Automation <noreply@smbautomation.io>',
      to,
      replyTo: email,
      subject: `New Contact — ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1.5rem;">New Contact Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${row('Name', name)}
              ${row('Email', `<a href="mailto:${email}" style="color: #2540D9; text-decoration: none;">${email}</a>`)}
              ${row('Phone', phone)}
              ${row('Company', company)}
              ${row('Revenue', revenueLabels[revenue_range] || revenue_range)}
              ${row('How we can help', helpLabels[how_can_we_help] || how_can_we_help)}
              <tr>
                <td style="padding: 0.75rem 0; font-weight: 600; color: #5A6580; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; vertical-align: top;">Message</td>
                <td style="padding: 0.75rem 0; color: #0A0E1A; font-size: 0.95rem; line-height: 1.6;">${message || 'Not provided'}</td>
              </tr>
            </table>
            <div style="margin-top: 1.75rem; padding: 1rem 1.25rem; background: #EBF0FF; border-left: 3px solid #2540D9; font-size: 0.83rem; color: #5A6580; line-height: 1.6;">
              Reply directly to this email to reach <strong style="color: #0A0E1A;">${name}</strong>.
            </div>
          </div>
        </div>`,
    });

    await resend.emails.send({
      from: 'Jesse at SMB Automation <noreply@smbautomation.io>',
      to: email,
      subject: `Got it, ${name.split(' ')[0]} — we will be in touch shortly`,
      html: `
        <div style="font-family: 'Barlow', 'Helvetica Neue', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background: #EDF1F7; padding: 2rem;">
          <div style="background: #2540D9; padding: 1.5rem 2rem;">
            <span style="font-size: 0.9rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #FFFFFF;">SMB Automation</span>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D4DAE8; border-top: none; padding: 2rem 2rem 2.5rem;">
            <h2 style="font-size: 1.3rem; font-weight: 500; color: #0A0E1A; margin: 0 0 1rem;">We received your message.</h2>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 1.25rem; font-size: 0.95rem;">
              Hi ${name.split(' ')[0]}, thanks for reaching out. We respond within one business day.
            </p>
            <p style="color: #5A6580; line-height: 1.7; margin: 0 0 2rem; font-size: 0.95rem;">
              If you would like to get on a call right away, book a free 30-minute slot below.
            </p>
            <a href="https://calendly.com/jesse-curvebase/30min" style="display: inline-block; background: #E84E1A; color: #FFFFFF; padding: 0.85rem 2rem; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;">
              Book a Free Strategy Call →
            </a>
          </div>
          <div style="padding: 1.25rem 0 0; font-size: 0.75rem; color: #9AA0B2;">
            SMB Automation · smbautomation.io
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
```

- [ ] **Step 5: Run build**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: Contact page and API route compile without errors.

- [ ] **Step 6: Commit**

```bash
git add app/contact/ app/api/contact/route.ts
git commit -m "feat: add contact page with updated form fields and API route"
```

---

## Task 11: Landing page /lp/strategy

**Files:**
- Create: `app/lp/strategy/page.tsx`
- Create: `app/lp/strategy/page.module.css`

This page has no shared Nav or Footer. It needs a standalone layout. Use a route group override via a nested layout file.

- [ ] **Step 1: Create app/lp/strategy/layout.tsx to suppress shared Nav/Footer**

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find $50,000 in Hidden Revenue | SMB Automation',
  description: 'A 2-week deep analysis of your operations, competitors, and customer journey. Get a prioritized growth roadmap with dollar values attached.',
};

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ fontFamily: "'Barlow', sans-serif", background: '#EDF1F7', color: '#0A0E1A' }}>
        {children}
      </body>
    </html>
  );
}
```

Note: This requires the LP to live outside the root layout. To accomplish this without duplicating the html/body tags, use Next.js route groups. Rename the LP directory structure:

```
app/
  (site)/           ← wrap all site pages in a route group
    layout.tsx      ← root layout with Nav/Footer (moved here)
    page.tsx
    services/...
    work/...
    contact/...
    blog/...
  (lp)/             ← separate route group for landing pages
    layout.tsx      ← minimal layout (no Nav/Footer)
    lp/
      strategy/
        page.tsx
```

This is the correct Next.js App Router pattern for pages that need different layouts.

- [ ] **Step 2: Create route group structure**

```bash
mkdir -p /Users/jessebender/smbautomation/app/\(site\)
mkdir -p /Users/jessebender/smbautomation/app/\(lp\)/lp/strategy
```

Move the root layout into the (site) group:

```bash
mv /Users/jessebender/smbautomation/app/layout.tsx \
   /Users/jessebender/smbautomation/app/\(site\)/layout.tsx
```

Move all site pages into (site):

```bash
mv /Users/jessebender/smbautomation/app/page.tsx /Users/jessebender/smbautomation/app/\(site\)/page.tsx
mv /Users/jessebender/smbautomation/app/page.module.css /Users/jessebender/smbautomation/app/\(site\)/page.module.css
mv /Users/jessebender/smbautomation/app/services /Users/jessebender/smbautomation/app/\(site\)/services
mv /Users/jessebender/smbautomation/app/work /Users/jessebender/smbautomation/app/\(site\)/work
mv /Users/jessebender/smbautomation/app/contact /Users/jessebender/smbautomation/app/\(site\)/contact
mv /Users/jessebender/smbautomation/app/blog /Users/jessebender/smbautomation/app/\(site\)/blog
mv /Users/jessebender/smbautomation/app/sitemap.ts /Users/jessebender/smbautomation/app/\(site\)/sitemap.ts
mv /Users/jessebender/smbautomation/app/robots.ts /Users/jessebender/smbautomation/app/\(site\)/robots.ts
```

Keep `globals.css` and `api/` at the app root (they must stay there).

- [ ] **Step 3: Create (lp) minimal layout**

Create `app/(lp)/layout.tsx`:

```tsx
import '../globals.css';

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 4: Create app/lp/strategy/page.module.css**

```css
/* app/(lp)/lp/strategy/page.module.css */
.lpWrap {
  background: var(--bg);
  min-height: 100vh;
}

.lpNav {
  background: var(--dark);
  padding: 0 5vw;
  height: 64px;
  display: flex;
  align-items: center;
}

.logo {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
}

.logoSmb { color: var(--blue); }
.logoAuto { color: rgba(255,255,255,0.4); }

.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
  text-align: center;
}

.headline {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 1.25rem;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}

.sub {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto 2.5rem;
}

.proofPoints {
  list-style: none;
  display: inline-flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
  margin-bottom: 2.5rem;
}

.proofPoint {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: rgba(255,255,255,0.65);
}

.socialProof {
  background: var(--bg-white);
  border: 1px solid var(--border);
  padding: 3rem 5vw;
  text-align: center;
}

.proofQuote {
  font-size: 1.1rem;
  font-weight: 400;
  font-style: italic;
  color: var(--ink-mid);
  max-width: 580px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}

.proofAttrib {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.formSection {
  background: var(--bg);
  padding: 4rem 5vw;
}

.formInner {
  max-width: 560px;
  margin: 0 auto;
}

.formTitle {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 0.5rem;
}

.formSub {
  font-size: 0.9rem;
  color: var(--ink-mid);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.form {
  background: var(--bg-white);
  border: 1px solid var(--border);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mid);
}

.field input,
.field select,
.field textarea {
  font-family: 'Barlow', sans-serif;
  font-size: 0.9rem;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 0.7rem 0.85rem;
  border-radius: 0;
  outline: none;
  transition: border-color 0.15s;
  width: 100%;
  -webkit-appearance: none;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--blue);
}

.field textarea {
  resize: vertical;
  min-height: 80px;
}

.submitBtn {
  font-family: 'Barlow', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--orange);
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
  width: 100%;
}

.submitBtn:hover { background: #cc3e12; }
.submitBtn:disabled { background: var(--ink-faint); cursor: not-allowed; }

.success {
  padding: 1.5rem;
  background: var(--blue-lt);
  border: 1px solid var(--blue-pale);
  font-size: 0.95rem;
  color: var(--blue);
  text-align: center;
}

.faq {
  background: var(--bg-white);
  padding: 4rem 5vw;
  border-top: 1px solid var(--border);
}

.faqInner {
  max-width: 720px;
  margin: 0 auto;
}

.faqTitle {
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 2rem;
}

.faqItem {
  border-bottom: 1px solid var(--border);
  padding: 1.25rem 0;
}

.faqItem:first-of-type {
  border-top: 1px solid var(--border);
}

.faqQ {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 0.5rem;
}

.faqA {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
}
```

- [ ] **Step 5: Create app/(lp)/lp/strategy/page.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import s from './page.module.css';

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

function IntakeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('business_type') as HTMLInputElement).value,
      revenue_range: (form.elements.namedItem('revenue') as HTMLSelectElement).value,
      how_can_we_help: 'strategy',
      message: (form.elements.namedItem('challenge') as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Something went wrong.');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Failed to submit. Please try again or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className={s.success}>
        We have your information. Expect an email from us within one business day.
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.field}>
        <label htmlFor="lp-name">Full Name *</label>
        <input id="lp-name" name="name" type="text" required placeholder="Jane Smith" />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-email">Email *</label>
        <input id="lp-email" name="email" type="email" required placeholder="jane@company.com" />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-business">Business Type</label>
        <input id="lp-business" name="business_type" type="text" placeholder="e.g. Med spa, property management..." />
      </div>
      <div className={s.field}>
        <label htmlFor="lp-revenue">Estimated Annual Revenue</label>
        <select id="lp-revenue" name="revenue">
          <option value="">Select range</option>
          <option value="under_500k">Under $500K</option>
          <option value="500k_1m">$500K to $1M</option>
          <option value="1m_5m">$1M to $5M</option>
          <option value="5m_20m">$5M to $20M</option>
          <option value="20m_plus">$20M+</option>
        </select>
      </div>
      <div className={s.field}>
        <label htmlFor="lp-challenge">Biggest business challenge right now</label>
        <textarea id="lp-challenge" name="challenge" placeholder="What is the one thing holding your business back most right now?" />
      </div>
      {status === 'error' && <p style={{ fontSize: '0.875rem', color: '#c0392b' }}>{errorMsg}</p>}
      <button type="submit" className={s.submitBtn} disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Claim Your Strategy Session →'}
      </button>
    </form>
  );
}

export default function LPStrategyPage() {
  return (
    <div className={s.lpWrap}>
      <nav className={s.lpNav}>
        <Link href="/" className={s.logo}>
          <span className={s.logoSmb}>SMB</span>
          <span className={s.logoAuto}> AUTOMATION</span>
        </Link>
      </nav>

      <section className={s.hero}>
        <span className="eyebrow-light">Limited Availability</span>
        <h1 className={s.headline}>
          We will find $50,000+ in hidden revenue in your business. Guaranteed.
        </h1>
        <p className={s.sub}>
          A 2-week deep analysis of your operations, competitors, and customer journey. You get a prioritized growth roadmap with dollar values attached to every recommendation.
        </p>
        <ul className={s.proofPoints}>
          {[
            'Full competitor landscape analysis',
            'Revenue leak identification with dollar estimates',
            'Prioritized roadmap you can execute immediately',
          ].map(point => (
            <li key={point} className={s.proofPoint}>
              <span className="proof-dot" style={{ marginTop: '0.45em' }} />
              {point}
            </li>
          ))}
        </ul>
        <a href="#intake" className="btn-primary">Claim Your Strategy Session →</a>
      </section>

      <section className={s.socialProof}>
        <p className={s.proofQuote}>
          "The roadmap they delivered identified three revenue leaks we had no idea existed. We fixed the first one in two weeks and recovered $18,000 in the following month."
        </p>
        <p className={s.proofAttrib}>Property Management Client</p>
      </section>

      <section className={s.formSection} id="intake">
        <div className={s.formInner}>
          <h2 className={s.formTitle}>Claim your strategy session</h2>
          <p className={s.formSub}>
            Fill out the form below. We review every application and follow up within one business day.
          </p>
          <IntakeForm />
        </div>
      </section>

      <a href="#intake" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '1.25rem' }}>
        Claim Your Strategy Session →
      </a>

      <section className={s.faq}>
        <div className={s.faqInner}>
          <h2 className={s.faqTitle}>Common questions</h2>
          {[
            {
              q: 'What is included in the strategy engagement?',
              a: 'Competitor landscape analysis, customer journey mapping, revenue leak identification, tech stack audit, and a prioritized growth roadmap with dollar values attached to every recommendation. Delivered as a recorded walkthrough and a written PDF.',
            },
            {
              q: 'How long does it take?',
              a: 'Most strategy engagements are completed within 10 business days from your kickoff call.',
            },
            {
              q: 'What does it cost?',
              a: 'Strategy engagements start at $2,500. We will confirm the investment on our call based on your business complexity.',
            },
            {
              q: 'What happens after the strategy engagement?',
              a: 'You get the roadmap. Some clients execute it independently. Others work with us to build and scale. Either way, you own the analysis.',
            },
          ].map(item => (
            <div key={item.q} className={s.faqItem}>
              <div className={s.faqQ}>{item.q}</div>
              <div className={s.faqA}>{item.a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Run build**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: LP page compiles. Verify the route group structure resolved correctly (no duplicate html/body tags).

- [ ] **Step 7: Commit**

```bash
git add app/\(lp\)/ app/\(site\)/
git commit -m "feat: add /lp/strategy landing page with isolated layout"
```

---

## Task 12: Rebuild blog pages with shared Nav/Footer

The blog pages currently have their own inline nav. After the route group restructure in Task 11, they are inside `app/(site)/` and will automatically get Nav + Footer from `app/(site)/layout.tsx`. The blog pages need to be updated to remove their self-contained nav blocks.

**Files:**
- Replace: `app/(site)/blog/page.tsx`
- Create: `app/(site)/blog/page.module.css`
- Replace: `app/(site)/blog/[slug]/page.tsx`
- Create: `app/(site)/blog/[slug]/page.module.css`

- [ ] **Step 1: Create app/(site)/blog/page.module.css**

```css
/* app/(site)/blog/page.module.css */
.hero {
  background: var(--dark);
  padding: 5rem 5vw 4rem;
}

.heroInner {
  max-width: 1100px;
  margin: 0 auto;
}

.headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0.5rem 0 1rem;
}

.heroSub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  max-width: 480px;
}

.grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 5vw 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  border: 1px solid var(--border);
  border-top: none;
}

.card {
  background: var(--bg-white);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background 0.15s;
  text-decoration: none;
}

.card:hover {
  background: var(--blue-lt);
}

.tag {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
}

.excerpt {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.65;
  flex: 1;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--ink-mid);
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.cta {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
}
```

- [ ] **Step 2: Replace blog/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical automation and growth insights for small business operators. No fluff.',
  alternates: { canonical: 'https://smbautomation.io/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">From the Blog</span>
          <h1 className={s.headline}>Automation insights for business owners</h1>
          <p className={s.heroSub}>
            No fluff, no jargon. Practical advice on where automation moves the needle.
          </p>
        </div>
      </section>

      <div style={{ background: 'var(--bg)' }}>
        <div className={s.grid}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={s.card}>
              <div className={s.tag}>{post.tag}</div>
              <div className={s.title}>{post.title}</div>
              <p className={s.excerpt}>{post.excerpt}</p>
              <div className={s.meta}>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className={s.cta}>Read article →</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Create app/(site)/blog/[slug]/page.module.css**

```css
/* app/(site)/blog/[slug]/page.module.css */
.wrapper {
  background: var(--bg);
  padding: 5rem 5vw 6rem;
}

.inner {
  max-width: 680px;
  margin: 0 auto;
}

.tag {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
  margin-bottom: 1rem;
  display: block;
}

.title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  font-size: 0.78rem;
  color: var(--ink-mid);
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2.5rem;
}

.body {
  font-size: 1.05rem;
  line-height: 1.85;
  color: var(--ink-mid);
}

.body h2 {
  font-size: 1.55rem;
  font-weight: 500;
  margin: 2.5rem 0 1rem;
  line-height: 1.15;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.body h3 {
  font-size: 1.15rem;
  font-weight: 500;
  margin: 2rem 0 0.75rem;
  color: var(--ink);
}

.body p { margin-bottom: 1.5rem; }

.body ul, .body ol {
  margin: 1rem 0 1.5rem 1.5rem;
}

.body li {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}

.body strong { font-weight: 600; color: var(--ink); }

.body em { font-style: italic; color: var(--blue); }

.body a {
  color: var(--blue);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.body blockquote {
  border-left: 2px solid var(--blue);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  color: var(--ink-mid);
  font-style: italic;
}

.ctaBox {
  background: var(--bg-white);
  border: 1px solid var(--border);
  padding: 2.5rem;
  margin-top: 4rem;
  text-align: center;
}

.ctaBox h3 {
  font-size: 1.15rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.ctaBox p {
  font-size: 0.875rem;
  color: var(--ink-mid);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.backLink {
  display: inline-block;
  margin-top: 3rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blue);
  text-decoration: none;
}
```

- [ ] **Step 4: Replace blog/[slug]/page.tsx**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import s from './page.module.css';

const CALENDLY = 'https://calendly.com/jesse-curvebase/30min';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date },
    alternates: { canonical: `https://smbautomation.io/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <span className={s.tag}>{post.tag}</span>
        <h1 className={s.title}>{post.title}</h1>
        <div className={s.meta}>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <div className={s.body}>
          <MDXRemote source={post.content} />
        </div>
        <div className={s.ctaBox}>
          <h3>Ready to put this into practice?</h3>
          <p>Book a free 30-minute strategy call. We will walk through your business and tell you exactly what to build first.</p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
        <Link href="/blog" className={s.backLink}>← Back to all articles</Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run build**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1 | tail -30
```

Expected: Blog pages compile without errors.

- [ ] **Step 6: Commit**

```bash
git add app/\(site\)/blog/
git commit -m "feat: rebuild blog pages using shared nav/footer layout"
```

---

## Task 13: Update sitemap

**Files:**
- Replace: `app/(site)/sitemap.ts`

- [ ] **Step 1: Replace sitemap.ts**

```ts
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const baseUrl = 'https://smbautomation.io';

  const blogEntries = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/strategy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/build`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services/scale`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogEntries,
  ];
}
```

- [ ] **Step 2: Final build and verify**

```bash
cd /Users/jessebender/smbautomation && npm run build 2>&1
```

Expected: Clean build, no TypeScript errors, all routes generated.

- [ ] **Step 3: Commit**

```bash
git add app/\(site\)/sitemap.ts
git commit -m "feat: update sitemap with all new pages"
```

---

## Post-build verification checklist

Run these manually in a browser after `npm run dev`:

- [ ] `/` homepage renders all 7 sections
- [ ] Nav is sticky, hamburger works on mobile
- [ ] `/services` hub renders 3 cards
- [ ] `/services/strategy`, `/services/build`, `/services/scale` all render
- [ ] `/work` renders 3 case study cards
- [ ] `/contact` form submits (use test email, verify Resend env var is set)
- [ ] `/lp/strategy` renders without site Nav/Footer
- [ ] `/blog` shows post cards
- [ ] `/blog/[slug]` renders MDX content
- [ ] `/sitemap.xml` returns all pages
- [ ] `/robots.txt` allows all crawlers
- [ ] Mobile responsive on all pages (check at 375px)
- [ ] No placeholder "Lorem ipsum" text
- [ ] All Calendly links open correct URL
