import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import s from './page.module.css';

const CALENDLY = 'https://calendly.com/jesse-smbautomation/30min';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: { canonical: `https://smbautomation.io/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <span className={s.tag}>{post.tag}</span>
        <h1 className={s.title}>{post.title}</h1>
        <div className={s.meta}>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <div className={s.body}>
          <MDXRemote source={post.content} />
        </div>
        <div className={s.ctaBox}>
          <h3>Ready to put this into practice?</h3>
          <p>Book a free 30-minute strategy call. We will walk through your business and tell you exactly what to build first.</p>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Strategy Call →
          </a>
        </div>
        <Link href="/blog" className={s.backLink}>← Back to all articles</Link>
      </div>
    </div>
  );
}
