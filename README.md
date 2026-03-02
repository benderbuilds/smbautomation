# smbautomation.io

Lead generation landing page for SMB Automation — a B2B AI automation consultancy targeting local service businesses.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** (utility base only; page styles are CSS-in-JS via inline `<style>`)
- **MDX** for blog posts (`next-mdx-remote`)
- **Resend** for contact form email delivery
- **Railway** for deployment

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=hello@smbautomation.io
```

Get your Resend API key at [resend.com](https://resend.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app
  layout.tsx              Root layout with metadata
  page.tsx                Main landing page (all sections)
  /blog
    page.tsx              Blog index
    /[slug]
      page.tsx            Individual blog post
  /api/contact
    route.ts              Contact form POST handler (Resend)
  sitemap.ts              Auto-generated sitemap
  robots.ts               Robots.txt

/components
  WorkflowDiagram.tsx     Extracted workflow diagram component

/content/blog
  speed-to-lead.mdx
  property-manager-automation.mdx
  bottleneck-audit.mdx

/lib
  posts.ts                MDX frontmatter parser and post utilities
```

## Adding Blog Posts

Create a new `.mdx` file in `/content/blog/` with this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-03-01"
tag: "Local Services"
excerpt: "One sentence summary shown on the blog index."
slug: "your-post-slug"
---

Your content here...
```

The post will automatically appear on `/blog` and be accessible at `/blog/your-post-slug`.

## Railway Deployment

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app) and create a new project from your GitHub repo
3. Add environment variables in Railway's dashboard:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Railway will auto-detect Next.js and deploy using the `railway.toml` config
5. Set your custom domain (`smbautomation.io`) in Railway's domain settings

## Contact Form

The contact form POSTs to `/api/contact` which sends an email via Resend. To test locally, you need a valid `RESEND_API_KEY` in `.env.local`.

The form collects: name, email, phone, business type, and bottleneck description. Emails are sent to `CONTACT_EMAIL` with a `reply-to` set to the lead's email address.
