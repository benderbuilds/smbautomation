import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — SMB Automation Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://smbautomation.io/blog/${post.slug}`,
    },
  };
}

const POST_STYLE = `
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
  .post-wrapper { max-width: 680px; margin: 0 auto; padding: 4rem 2rem 6rem; }
  .post-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; display: block; }
  .post-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; line-height: 1.12; letter-spacing: -0.01em; color: var(--white); margin-bottom: 1rem; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--muted); padding-bottom: 2.5rem; border-bottom: 1px solid var(--border); margin-bottom: 2.5rem; }
  .post-body { font-size: 1.05rem; line-height: 1.85; color: #C8C4BE; }
  .post-body h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.7rem; font-weight: 400; margin: 2.5rem 0 1rem; line-height: 1.2; color: var(--white); }
  .post-body h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 500; margin: 2rem 0 0.75rem; color: var(--white); }
  .post-body p { margin-bottom: 1.5rem; }
  .post-body ul, .post-body ol { margin: 1rem 0 1.5rem 1.5rem; }
  .post-body li { margin-bottom: 0.5rem; line-height: 1.75; }
  .post-body strong { font-weight: 600; color: var(--white); }
  .post-body em { font-style: italic; color: var(--gold); font-family: 'Cormorant Garamond', serif; }
  .post-body a { color: var(--gold); text-decoration: underline; text-underline-offset: 3px; }
  .post-body blockquote { border-left: 2px solid var(--gold); padding-left: 1.25rem; margin: 1.5rem 0; color: var(--muted); font-style: italic; }
  .cta-box { background: var(--surface); border: 1px solid var(--gold-border); border-radius: 20px; padding: 2.5rem; margin-top: 4rem; text-align: center; }
  .cta-box h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 400; color: var(--white); margin-bottom: 0.75rem; }
  .cta-box p { color: var(--muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.7; }
  .btn-primary { background: var(--gold); color: #060D1F; padding: 0.75rem 2rem; border-radius: 6px; font-size: 0.9rem; font-weight: 700; display: inline-block; transition: all 0.2s ease; font-family: 'DM Sans', sans-serif; }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.35); }
`;

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <style>{POST_STYLE}</style>
      <nav className="blog-nav">
        <Link href="/" className="nav-logo">smb<span>automation</span></Link>
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/blog">Blog</Link>
          <span>›</span>
          <span style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
        </div>
      </nav>

      <article className="post-wrapper">
        <span className="post-tag">{post.tag}</span>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="post-body">
          <MDXRemote source={post.content} />
        </div>

        <div className="cta-box">
          <h3>Want to automate your business?</h3>
          <p>Book a free 30-minute consult and we&apos;ll show you exactly where automation can save you the most time and money.</p>
          <Link href="/#contact" className="btn-primary">Book a Free Consult →</Link>
        </div>
      </article>
    </>
  );
}
