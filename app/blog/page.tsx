import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — SMB Automation',
  description: 'Practical automation insights for local service businesses. No fluff, no jargon.',
};

const BLOG_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #060D1F; color: #F0EDE8; }
  :root {
    --bg: #060D1F; --surface: #0D1628; --surface-2: #141F38;
    --gold: #C9A84C; --gold-light: #E8CF7A; --gold-border: rgba(201,168,76,0.22);
    --white: #F0EDE8; --muted: #7E8FA8; --border: rgba(255,255,255,0.07);
  }
  a { text-decoration: none; color: inherit; }
  .blog-nav { background: rgba(6,13,31,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 500; color: var(--white); }
  .nav-logo span { color: var(--gold); }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--muted); }
  .breadcrumb a { color: var(--gold); }
  .breadcrumb span { color: var(--muted); }
  .blog-hero { padding: 5rem 5vw 3rem; max-width: 1100px; margin: 0 auto; }
  .label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.6rem; }
  .label::after { content: ''; height: 1px; width: 2rem; background: var(--gold); display: inline-block; opacity: 0.4; }
  .blog-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.13; letter-spacing: -0.01em; margin-bottom: 1rem; color: var(--white); }
  .blog-hero p { font-size: 1rem; color: var(--muted); line-height: 1.75; max-width: 520px; }
  .posts-grid { padding: 0 5vw 6rem; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
  .post-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem; transition: all 0.25s ease; }
  .post-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); border-color: var(--gold-border); }
  .post-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); }
  .post-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 500; color: var(--white); line-height: 1.3; }
  .post-excerpt { color: var(--muted); font-size: 0.9rem; line-height: 1.65; flex: 1; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.8rem; color: var(--muted); padding-top: 0.75rem; border-top: 1px solid var(--border); }
  .post-cta { color: var(--gold); font-size: 0.85rem; font-weight: 500; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.25rem; }
`;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <style>{BLOG_STYLE}</style>
      <nav className="blog-nav">
        <Link href="/" className="nav-logo">smb<span>automation</span></Link>
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
