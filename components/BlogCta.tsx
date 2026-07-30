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
        <h3 className={s.title}>What is this workflow costing your business?</h3>
        <p className={s.body}>
          A Single Workflow Audit examines your actual process, software, volume, and costs. You get a focused plan showing what to improve, which tools to use, and what the opportunity is worth.
        </p>
        <Link href="/single-workflow-audit" className="btn-primary" onClick={onClick}>
          Get a Workflow Audit for $495 →
        </Link>
      </div>
    );
  }

  return (
    <div className={s.box}>
      <h3 className={s.title}>Find the work your business should stop doing manually.</h3>
      <p className={s.body}>
        The Business Efficiency Audit identifies your highest-value automation opportunities, estimates the financial impact, and gives you a prioritized 90-day roadmap. Fixed fee, $1,500.
      </p>
      <Link href="/apply" className="btn-primary" onClick={onClick}>
        Apply for the Audit →
      </Link>
    </div>
  );
}
