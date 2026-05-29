'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import s from './Nav.module.css';

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
          <span className={s.logoAuto}>automation</span>
        </Link>

        <a href="/#apply" className={s.cta}>
          Get audit →
        </a>

        <button
          className={s.hamburger}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`${s.drawer} ${open ? s.drawerOpen : ''}`}>
        <a href="/#apply" className={s.drawerCta} onClick={() => setOpen(false)}>
          Get audit →
        </a>
      </div>
    </>
  );
}
