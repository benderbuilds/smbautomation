import Link from 'next/link';
import s from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Find customers',
    links: [
      { href: '/#services', label: 'SEO' },
      { href: '/#services', label: 'Web Design' },
      { href: '/#services', label: 'Google Ads' },
      { href: '/#services', label: 'Meta Ads' },
    ],
  },
  {
    title: 'Automate follow-up',
    links: [
      { href: '/#automation', label: 'Lead Follow-Up' },
      { href: '/#automation', label: 'Invoice Follow-Up' },
      { href: '/#automation', label: 'AR Follow-Up' },
      { href: '/#automation', label: 'Review Requests' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/#fit', label: 'Who It Is For' },
      { href: '/blog', label: 'Blog' },
      { href: '/#contact', label: 'Contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <Link href="/" className={s.logo}>
            <span className={s.logoSmb}>SMB</span>{' '}
            <span className={s.logoAuto}>AUTOMATION</span>
          </Link>
          <p className={s.blurb}>
            Websites, SEO, and paid advertising that bring in customers, plus automated follow-up
            that keeps leads, invoices, and reviews from falling through the cracks.
          </p>
          <p className={s.contactLine}>
            <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
            <br />
            Serving clients nationwide.
          </p>
        </div>
        <div className={s.columns}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={s.column}>
              <p className={s.columnTitle}>{col.title}</p>
              <ul className={s.links}>
                {col.links.map((l) => (
                  <li key={`${col.title}-${l.label}`}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={s.bottom}>
        <p className={s.copy}>© 2026 SMB Automation. All rights reserved.</p>
        <ul className={s.legal}>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
        </ul>
      </div>
    </footer>
  );
}
