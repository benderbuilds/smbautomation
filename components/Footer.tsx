import Link from 'next/link';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/booking';
import { INDUSTRIES } from '@/lib/industries';
import s from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { href: '/#pricing', label: 'AI Front Desk' },
      { href: '/#pricing', label: 'Voice Agent' },
      { href: '/#pricing', label: 'Chat Agent' },
      { href: '/#how-it-works', label: 'Follow-Up' },
    ],
  },
  { title: 'Industries', links: INDUSTRIES },
  {
    title: 'Company',
    links: [
      { href: '/#how-it-works', label: 'How It Works' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/blog', label: 'Blog' },
      { href: '/book-demo', label: 'Book a demo' },
      { href: '/start-trial', label: 'Start free trial' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <p className={s.logo}>SMB AUTOMATION</p>
          <p className={s.blurb}>Based in Iowa City. Serving independent businesses nationwide.</p>
          <p className={s.contact}>
            <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>
            <br />
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
        <p>© 2026 SMBAUTOMATION LLC · Iowa City, Iowa</p>
        <ul className={s.legal}>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Service</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
