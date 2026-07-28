import Link from 'next/link';
import s from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Services',
    links: [
      { href: '/apply', label: 'Business Efficiency Audit' },
      { href: '/single-workflow-audit', label: 'Single Workflow Audit' },
      { href: '/implementation', label: 'Implementation' },
      { href: '/implementation#ongoing', label: 'Ongoing Optimization' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { href: '/property-management-automation', label: 'Property Management' },
      { href: '/healthcare-automation', label: 'Healthcare and Wellness' },
      { href: '/home-services-automation', label: 'Home and Local Services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/how-it-works', label: 'How It Works' },
      { href: '/results', label: 'Results' },
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
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
            Business efficiency audits, workflow automation, and implementation for established small and midsize businesses.
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
                  <li key={l.href}>
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
