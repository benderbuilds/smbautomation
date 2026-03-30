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
  const titleTag = post.seoTitle ?? post.title;
  return {
    title: `${titleTag} — SMB Automation Blog`,
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
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', sans-serif; background: #EDF1F7; color: #0A0E1A; }
  :root { --ink: #0A0E1A; --ink-mid: #5A6580; --bg: #EDF1F7; --bg-white: #FFFFFF; --border: #D4DAE8; --blue: #2540D9; --blue-deep: #1A2EA8; }
  a { text-decoration: none; color: inherit; }
  .blog-nav { background: rgba(237,241,247,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 5vw; height: 64px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family: 'Barlow', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
  .nav-logo .logo-smb { color: var(--blue); }
  .nav-logo .logo-auto { color: var(--ink); }
  .breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: var(--ink-mid); letter-spacing: 0.04em; }
  .breadcrumb a { color: var(--blue); }
  .post-wrapper { max-width: 680px; margin: 0 auto; padding: 4rem 2rem 6rem; }
  .post-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 1rem; display: block; }
  .post-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 1rem; }
  .post-meta { display: flex; align-items: center; gap: 1rem; font-size: 0.78rem; color: var(--ink-mid); padding-bottom: 2.5rem; border-bottom: 1px solid var(--border); margin-bottom: 2.5rem; letter-spacing: 0.02em; }
  .post-body { font-size: 1.05rem; line-height: 1.85; color: var(--ink-mid); }
  .post-body h2 { font-size: 1.6rem; font-weight: 500; margin: 2.5rem 0 1rem; line-height: 1.15; color: var(--ink); letter-spacing: -0.01em; }
  .post-body h3 { font-size: 1.2rem; font-weight: 500; margin: 2rem 0 0.75rem; color: var(--ink); }
  .post-body p { margin-bottom: 1.5rem; }
  .post-body ul, .post-body ol { margin: 1rem 0 1.5rem 1.5rem; }
  .post-body li { margin-bottom: 0.5rem; line-height: 1.75; }
  .post-body strong { font-weight: 600; color: var(--ink); }
  .post-body em { font-style: italic; color: var(--blue); }
  .post-body a { color: var(--blue); text-decoration: underline; text-underline-offset: 3px; }
  .post-body blockquote { border-left: 2px solid var(--blue); padding-left: 1.25rem; margin: 1.5rem 0; color: var(--ink-mid); font-style: italic; }
  .cta-box { background: var(--bg-white); border: 1px solid var(--border); padding: 2.5rem; margin-top: 4rem; text-align: center; border-radius: 0; }
  .cta-box h3 { font-size: 1.5rem; font-weight: 500; color: var(--ink); margin-bottom: 0.75rem; letter-spacing: -0.01em; }
  .cta-box p { color: var(--ink-mid); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.7; }
  .btn-primary { background: var(--blue); color: #FFFFFF; padding: 0.75rem 2rem; font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; display: inline-block; transition: background 0.2s; border-radius: 0; border: 1px solid var(--blue); }
  .btn-primary:hover { background: var(--blue-deep); }
`;

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'SMB Automation',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SMB Automation',
      url: 'https://smbautomation.io',
    },
    url: `https://smbautomation.io/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <style>{POST_STYLE}</style>
      <nav className="blog-nav">
        <Link href="/" className="nav-logo"><span className="logo-smb">SMB</span><span className="logo-auto"> Automation</span></Link>
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
