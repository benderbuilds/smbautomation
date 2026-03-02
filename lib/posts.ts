import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));

  const posts = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8');
    const { data, content } = matter(raw);
    const { text: readTime } = readingTime(content);

    return {
      slug: (data.slug as string) || slug,
      title: data.title as string,
      date: data.date as string,
      tag: data.tag as string,
      excerpt: data.excerpt as string,
      readTime,
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const { text: readTime } = readingTime(content);

  return {
    slug: (data.slug as string) || slug,
    title: data.title as string,
    date: data.date as string,
    tag: data.tag as string,
    excerpt: data.excerpt as string,
    readTime,
    content,
  };
}
