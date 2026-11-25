import Link from 'next/link';
import BookingLink from './BookingLink';
import Icon from './Icon';
import { HELLO_EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/booking';
import { INDUSTRIES } from '@/lib/industries';
import s from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { href: '/#pricing', label: 'Front Desk Assistant' },
      { href: '/#pricing', label: 'Voice Agent' },
      { href: '/#pricing', label: 'Chat Agent' },
      { href: '/#how-it-works', label: 'Follow-Up' },
      { href: '/#faq', label: 'FAQ' },
    ],
  },
  { title: 'Industries', links: INDUSTRIES },
  {
    title: 'Company',
    links: [
      { href: '/#how-it-works', label: 'How It Works' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/blog', label: 'Blog' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.brand}>
          <p className={s.logo}>
            <span className={s.logoMark} aria-hidden="true">
              <svg width="13" height="16" viewBox="0 0 22 26">
                <path d="M13 0L0 15h9l-2 11L22 10h-9l2-10z" fill="#fff" />
              </svg>
            </span>
            SMB Automation
          </p>
          <p className={s.blurb}>
            The Front Desk Assistant: a Chat Agent and Voice Agent that answer, book the job, and
            follow up. Built in Iowa for independent businesses nationwide.
          </p>
          <p className={s.contact}>
            <a href={PHONE_TEL}>
              <Icon name="phone" size={16} />
              Voice Agent demo: {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${HELLO_EMAIL}`}>
              <Icon name="chat" size={16} />
              {HELLO_EMAIL}
            </a>
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
                {col.title === 'Company' && (
                  <>
                    <li>
                      <BookingLink flow="demo" location="footer">
                        Book a demo
                      </BookingLink>
                    </li>
                    <li>
                      <BookingLink flow="trial" location="footer">
                        Start free trial
                      </BookingLink>
                    </li>
                  </>
                )}
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
