import Link from 'next/link';
import s from './Footer.module.css';

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

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
