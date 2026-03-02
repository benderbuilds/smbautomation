import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — SMB Automation',
  description: 'Practical automation insights for local service businesses. No fluff, no jargon.',
};

const BLOG_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF7F2; color: #1E1A16; }
  :root {
    --cream: #FAF7F2; --copper: #B5622A; --copper-light: #D4844A;
    --copper-pale: #F5E8DC; --charcoal: #1E1A16; --warm-gray: #6B6358;
    --clay: #E8DDD0; --warm-white: #FFFDF9;
  }
  a { text-decoration: none; color: inherit; }
  .blog-nav { background: rgba(250,247,242,0.95); border-bottom: 1px solid var(--clay); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 500; color: var(--charcoal); }
  .nav-logo span { color: var(--copper); }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--warm-gray); }
  .breadcrumb a { color: var(--copper); }
  .breadcrumb span { color: var(--warm-gray); }
  .blog-hero { padding: 5rem 5vw 3rem; max-width: 1100px; margin: 0 auto; }
  .label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .label::after { content: ''; height: 1px; width: 2rem; background: var(--copper); display: inline-block; }
  .blog-hero h1 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 1rem; }
  .blog-hero p { font-size: 1.05rem; color: var(--warm-gray); line-height: 1.7; max-width: 520px; }
  .posts-grid { padding: 0 5vw 6rem; max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
  .post-card { background: white; border: 1px solid var(--clay); border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 0.75rem; transition: all 0.25s ease; }
  .post-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(30,26,22,0.1); border-color: var(--copper); }
  .post-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); }
  .post-title { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 500; color: var(--charcoal); line-height: 1.3; }
  .post-excerpt { color: var(--warm-gray); font-size: 0.9rem; line-height: 1.65; flex: 1; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.8rem; color: var(--warm-gray); padding-top: 0.75rem; border-top: 1px solid var(--clay); }
  .post-cta { color: var(--copper); font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.25rem; }
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
