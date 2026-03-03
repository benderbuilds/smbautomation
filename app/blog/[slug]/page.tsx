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
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Instrument Sans', sans-serif; background: #FFFFFF; color: #0D0D0C; }
  :root { --cream: #F7F6F3; --copper: #C85A18; --copper-light: #D97A3C; --charcoal: #0D0D0C; --warm-gray: #888480; --clay: #E3E0D8; }
  a { text-decoration: none; color: inherit; }
  .blog-nav { background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--clay); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 500; color: var(--charcoal); }
  .nav-logo span { color: var(--copper); }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--warm-gray); }
  .breadcrumb a { color: var(--copper); }
  .post-wrapper { max-width: 680px; margin: 0 auto; padding: 4rem 2rem 6rem; }
  .post-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 1rem; display: block; }
  .post-title { font-family: 'Fraunces', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; line-height: 1.12; letter-spacing: -0.01em; color: var(--charcoal); margin-bottom: 1rem; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.85rem; color: var(--warm-gray); padding-bottom: 2.5rem; border-bottom: 1px solid var(--clay); margin-bottom: 2.5rem; }
  .post-body { font-size: 1.05rem; line-height: 1.85; color: #3D3830; }
  .post-body h2 { font-family: 'Fraunces', serif; font-size: 1.7rem; font-weight: 400; margin: 2.5rem 0 1rem; line-height: 1.2; color: var(--charcoal); }
  .post-body h3 { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 500; margin: 2rem 0 0.75rem; color: var(--charcoal); }
  .post-body p { margin-bottom: 1.5rem; }
  .post-body ul, .post-body ol { margin: 1rem 0 1.5rem 1.5rem; }
  .post-body li { margin-bottom: 0.5rem; line-height: 1.75; }
  .post-body strong { font-weight: 600; color: var(--charcoal); }
  .post-body em { font-style: italic; color: var(--copper); font-family: 'Fraunces', serif; }
  .post-body a { color: var(--copper); text-decoration: underline; text-underline-offset: 3px; }
  .post-body blockquote { border-left: 2px solid var(--copper); padding-left: 1.25rem; margin: 1.5rem 0; color: var(--warm-gray); font-style: italic; }
  .cta-box { background: white; border: 1px solid var(--clay); border-radius: 20px; padding: 2.5rem; margin-top: 4rem; text-align: center; }
  .cta-box h3 { font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 400; color: var(--charcoal); margin-bottom: 0.75rem; }
  .cta-box p { color: var(--warm-gray); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.7; }
  .btn-primary { background: var(--copper); color: white; padding: 0.75rem 2rem; border-radius: 6px; font-size: 0.9rem; font-weight: 700; display: inline-block; transition: all 0.2s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .btn-primary:hover { background: var(--copper-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(181,98,42,0.3); }
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
