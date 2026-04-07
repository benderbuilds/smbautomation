import type { Metadata } from 'next';
import Link from 'next/link';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Business analysis, custom MVP builds, and ongoing growth retainers for SMBs doing $500K to $20M.',
  alternates: { canonical: 'https://smbautomation.io/services' },
};

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

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

      <div className={s.grid}>
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
