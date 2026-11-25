import { notFound } from 'next/navigation';
import IndustryPage, { industryMetadata } from '@/components/IndustryPage';
import { INDUSTRIES } from '@/lib/industries';

const pages = INDUSTRIES.filter(({ slug }) => slug !== 'roofers' && slug !== 'property-management');
export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!pages.some(page => page.slug === params.slug)) notFound();
  return industryMetadata(params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!pages.some(page => page.slug === params.slug)) notFound();
  return <IndustryPage slug={params.slug} />;
}
