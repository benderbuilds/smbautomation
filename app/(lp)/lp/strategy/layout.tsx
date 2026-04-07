import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'See Exactly Where Your Business Is Invisible Online | SMB Automation' },
  description: 'A 1-hour SEO, Google Business Profile, and social media analysis. Get a specific action plan showing where you\'re losing to competitors and what to fix first.',
};

export default function StrategyLPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
