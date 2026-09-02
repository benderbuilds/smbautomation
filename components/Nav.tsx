'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import s from './Nav.module.css';

const LINKS = [
  { href: '/#services', label: 'Marketing' },
  { href: '/#automation', label: 'Automation' },
  { href: '/#fit', label: 'Who It Is For' },
  { href: '/blog', label: 'Blog' },
];

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
          <span className={s.logoSmb}>SMB</span>{' '}
          <span className={s.logoAuto}>AUTOMATION</span>
        </Link>

        <ul className={s.links}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className={s.right}>
          <Link href="/#contact" className={`btn-primary ${s.cta}`}>
            Talk to Us →
          </Link>
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
        </div>
      </nav>

      <div className={`${s.drawer} ${open ? s.drawerOpen : ''}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={s.drawerLink} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/#contact" className={`btn-primary ${s.drawerCta}`} onClick={() => setOpen(false)}>
          Talk to Us →
        </Link>
      </div>
    </>
  );
}
