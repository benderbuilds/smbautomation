'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BookingLink from './BookingLink';
import Icon from './Icon';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/booking';
import s from './Nav.module.css';

import { INDUSTRIES } from '@/lib/industries';

const LINKS = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export function Logo() {
  return (
    <Link href="/" className={s.logo} aria-label="SMB Automation home">
      <span className={s.logoMark} aria-hidden="true">
        <svg width="14" height="17" viewBox="0 0 22 26">
          <path d="M13 0L0 15h9l-2 11L22 10h-9l2-10z" fill="#fff" />
        </svg>
      </span>
      <span>SMB Automation</span>
    </Link>
  );
}

export default function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  // Close both menus on navigation.
  useEffect(() => {
    setDrawerOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={s.bar}>
        <span>30-day free trial</span>
        <span className={s.dot} aria-hidden="true" />
        <span>No setup fee</span>
        <span className={s.dot} aria-hidden="true" />
        <span>Month to month</span>
      </div>

      <header className={s.header}>
        <Logo />

        <nav aria-label="Main">
          <ul className={s.links}>
            <li className={s.menuItem} ref={menuRef}>
              <button
                type="button"
                className={s.menuButton}
                aria-expanded={menuOpen}
                aria-controls="industries-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                Industries
                <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
              <ul id="industries-menu" className={s.menu} hidden={!menuOpen}>
                {INDUSTRIES.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.right}>
          {/* The number rings the Voice Agent demo line (AI only, no transfer). */}
          <a href={PHONE_TEL} className={s.phone} aria-label={`Call our Voice Agent demo at ${PHONE_DISPLAY}`}>
            <Icon name="phone" size={16} />
            <span className={s.phoneText}>
              <span className={s.phoneLabel}>Voice Agent demo</span>
              {PHONE_DISPLAY}
            </span>
          </a>
          <BookingLink flow="trial" location="header" className={s.cta}>
            Start free trial
          </BookingLink>
          {/* Hamburger shows below 1080px, where the inline links are hidden. */}
          <button
            type="button"
            className={s.hamburger}
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={s.drawer} hidden={!drawerOpen}>
        <p className={s.drawerLabel}>Industries</p>
        {INDUSTRIES.map((l) => (
          <Link key={l.href} href={l.href} className={s.drawerLink} onClick={() => setDrawerOpen(false)}>
            {l.label}
          </Link>
        ))}
        <span className={s.drawerRule} aria-hidden="true" />
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={s.drawerLink} onClick={() => setDrawerOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href={PHONE_TEL} className={s.drawerLink}>
          Try our Voice Agent: {PHONE_DISPLAY}
        </a>
        <BookingLink flow="demo" location="mobile_menu" className={s.drawerSecondary}>
          Book a demo
        </BookingLink>
      </div>
    </>
  );
}
