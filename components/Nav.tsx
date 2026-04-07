'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import s from './Nav.module.css';

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <Link href="/" className={s.logo}>
          <span className={s.logoSmb}>SMB</span>
          <span className={s.logoAuto}> AUTOMATION</span>
        </Link>

        <ul className={s.links}>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/work">Work</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>

        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.cta}>
          Book a Strategy Call →
        </a>

        <button
          className={s.hamburger}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${s.drawer} ${open ? s.drawerOpen : ''}`}>
        <ul className={s.drawerLinks}>
          <li><Link href="/services" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link href="/work" onClick={() => setOpen(false)}>Work</Link></li>
          <li><Link href="/blog" onClick={() => setOpen(false)}>Blog</Link></li>
        </ul>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.drawerCta}>
          Book a Strategy Call →
        </a>
      </div>
    </>
  );
}
