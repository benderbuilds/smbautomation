import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* .site scopes the 2026-11 type and colour system (globals.css) to these pages. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
