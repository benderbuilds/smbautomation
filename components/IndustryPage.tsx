import type { Metadata } from 'next';
import Link from 'next/link';
import BookingLink from './BookingLink';
import ConversationSample from './Conversation';
import { INDUSTRIES } from '@/lib/industries';
import { industryContent } from '@/lib/industryContent';
import s from './FrontDesk.module.css';

export function industryMetadata(slug: string): Metadata {
  const industry = INDUSTRIES.find(item => item.slug === slug)!;
  const { intro } = industryContent[slug];
  const title = `AI Phone Answering and Website Chat for ${industry.label} | SMB Automation`;
  const url = `https://smbautomation.io${industry.href}`;
  return { title: { absolute: title }, description: intro, alternates: { canonical: url },
    openGraph: { title, description: intro, url, type: 'website' } };
}

export function TrialActions({ location, audit = false }: { location: string; audit?: boolean }) {
  return (
    <div className={s.actions}>
      {audit ? <a href="#audit" className={s.primary}>Get my free roofing audit</a> :
        <BookingLink flow="trial" location={location} className={s.primary}>Start my 30-day free trial</BookingLink>}
      <BookingLink flow="demo" location={location} className={s.secondary}>Book a demo</BookingLink>
    </div>
  );
}

export default function IndustryPage({ slug, children }: { slug: string; children?: React.ReactNode }) {
  const item = INDUSTRIES.find(industry => industry.slug === slug)!;
  const page = industryContent[slug];
  return (
    <>
      <section className={s.hero}>
        <div className={s.heroCopy}>
          <Link className={s.breadcrumb} href="/#industries">Industries</Link>
          <p className={s.productLabel}>AI phone answering &amp; website chat for {item.label.toLowerCase()}</p>
          <h1>{page.title}</h1><p className={s.lede}>{page.intro}</p>
          <TrialActions location={slug + '_hero'} audit={slug === 'roofers'} />
          <p className={s.fine}>{slug === 'roofers' ? 'A 20-minute review of your inbound leads and missed calls.' : 'Keep your number. Approve the answers before launch.'}</p>
        </div>
        <div className={s.stage}><ConversationSample sample={page.example} /></div>
      </section>
      <section className={s.section}><h2>{page.heading}</h2>
        <div className={s.services}>{page.uses.map(([title, description]) =>
          <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      {children}
      <section className={s.closing}><div><h2>Try it with your own customers.</h2>
        <p>Choose phone answering or website chat for $397/month, or get both for $797/month. <Link href="/#pricing">Compare plans</Link>.</p></div>
        <TrialActions location={slug + '_closing'} /></section>
    </>
  );
}
