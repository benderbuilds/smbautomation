import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Find $50,000 in Hidden Revenue | SMB Automation' },
  description: 'A 2-week deep analysis of your operations, competitors, and customer journey. Get a prioritized growth roadmap with dollar values attached to every recommendation.',
};

export default function StrategyLPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
