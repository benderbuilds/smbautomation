import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical automation and growth insights for small business operators. No fluff.',
  alternates: { canonical: 'https://smbautomation.io/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className="eyebrow-light">From the Blog</span>
          <h1 className={s.headline}>Automation insights for business owners</h1>
          <p className={s.heroSub}>
            No fluff, no jargon. Practical advice on where automation moves the needle.
          </p>
        </div>
      </section>

      <div className={s.body}>
        <div className={s.grid}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={s.card}>
              <div className={s.tag}>{post.tag}</div>
              <div className={s.title}>{post.title}</div>
              <p className={s.excerpt}>{post.excerpt}</p>
              <div className={s.meta}>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className={s.cta}>Read article →</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
