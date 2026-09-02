'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import s from './BlogCta.module.css';

export default function BlogCta({
  variant,
  slug,
}: {
  variant: 'workflow' | 'broad';
  slug: string;
}) {
  const onClick = () => track('blog_cta_click', { article_slug: slug, variant });

  if (variant === 'workflow') {
    return (
      <div className={s.box}>
        <h3 className={s.title}>Want this workflow running on its own?</h3>
        <p className={s.body}>
          We build the automated follow-up behind leads, invoices, accounts receivable, and review
          requests, so the work happens without anyone remembering to do it. Tell us what is eating
          your team&rsquo;s time and we will show you what to fix first.
        </p>
        <Link href="/#contact" className="btn-primary" onClick={onClick}>
          Talk to Us →
        </Link>
      </div>
    );
  }

  return (
    <div className={s.box}>
      <h3 className={s.title}>Get more customers. Automate the busywork.</h3>
      <p className={s.body}>
        SMB Automation helps small businesses grow with better websites, SEO, paid advertising, and
        automated follow-up. Tell us about your business and we will tell you where the biggest
        opportunities are.
      </p>
      <Link href="/#contact" className="btn-primary" onClick={onClick}>
        Talk to Us →
      </Link>
    </div>
  );
}
