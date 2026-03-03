import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — SMB Automation',
  description: 'Practical automation insights for local service businesses. No fluff, no jargon.',
};

const BLOG_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', sans-serif; background: #EDF1F7; color: #0A0E1A; }
  :root { --ink: #0A0E1A; --ink-mid: #5A6580; --bg: #EDF1F7; --bg-white: #FFFFFF; --border: #D4DAE8; --blue: #2540D9; }
  a { text-decoration: none; color: inherit; }
  .blog-nav { background: rgba(237,241,247,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Barlow', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
  .nav-logo .logo-smb { color: var(--blue); }
  .nav-logo .logo-auto { color: var(--ink); }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--ink-mid); letter-spacing: 0.04em; }
  .breadcrumb a { color: var(--blue); }
  .breadcrumb span { color: var(--ink-mid); }
  .blog-hero { padding: 5rem 5vw 3rem; max-width: 1100px; margin: 0 auto; }
  .label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mid); margin-bottom: 1.25rem; display: block; }
  .blog-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1rem; color: var(--ink); }
  .blog-hero p { font-size: 1rem; color: var(--ink-mid); line-height: 1.7; max-width: 520px; }
  .posts-grid { padding: 0 5vw 6rem; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 0; border: 1px solid var(--border); }
  .post-card { background: var(--bg-white); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem; transition: background 0.15s; }
  .post-card:hover { background: #EBF0FF; }
  .post-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); }
  .post-title { font-size: 1.15rem; font-weight: 500; color: var(--ink); line-height: 1.3; letter-spacing: -0.01em; }
  .post-excerpt { color: var(--ink-mid); font-size: 0.875rem; line-height: 1.65; flex: 1; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.75rem; color: var(--ink-mid); padding-top: 0.75rem; border-top: 1px solid var(--border); letter-spacing: 0.02em; }
  .post-cta { color: var(--blue); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.25rem; }
`;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <style>{BLOG_STYLE}</style>
      <nav className="blog-nav">
        <Link href="/" className="nav-logo"><span className="logo-smb">SMB</span><span className="logo-auto"> Automation</span></Link>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Blog</span>
        </div>
      </nav>

      <div className="blog-hero">
        <div className="label">From the Blog</div>
        <h1>Automation insights for business owners</h1>
        <p>No fluff, no jargon. Practical advice on where automation moves the needle for local service businesses.</p>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
            <div className="post-tag">{post.tag}</div>
            <div className="post-title">{post.title}</div>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <div className="post-cta">Read article <span>→</span></div>
          </Link>
        ))}
      </div>
    </>
  );
}
