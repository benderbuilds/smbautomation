import Link from 'next/link';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <Link href="/" className={s.logo}>
          <span className={s.logoSmb}>SMB</span>
          <span className={s.logoAuto}>automation</span>
        </Link>
        <ul className={s.links}>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <p className={s.copy}>© 2026 SMBautomation</p>
      </div>
    </footer>
  );
}
