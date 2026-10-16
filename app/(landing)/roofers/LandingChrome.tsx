import Link from 'next/link';
import s from './roofers.module.css';

export function LandingHeader({ cta = true }: { cta?: boolean }) {
  return (
    <header className={s.header}>
      <div className={s.headerInner}>
        <Link href="/" className={s.logo} aria-label="SMB Automation home">
          <span className={s.logoSmb}>SMB</span> <span className={s.logoAuto}>AUTOMATION</span>
        </Link>
        {cta && (
          <a href="#audit" className={`btn-orange ${s.headerCta}`}>
            Free audit →
          </a>
        )}
      </div>
    </header>
  );
}

export function LandingFooter({ children }: { children?: React.ReactNode }) {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        {children}
        <div className={s.footerBar}>
          <span>© {new Date().getFullYear()} SMB Automation · Iowa City, IA</span>
          <nav className={s.footerLinks} aria-label="Legal">
            <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
