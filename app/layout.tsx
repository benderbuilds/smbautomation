import type { Metadata } from 'next';
import Script from 'next/script';
import { Barlow } from 'next/font/google';
import AttributionCapture from '../components/AttributionCapture';
import AnalyticsScripts from '../components/AnalyticsScripts';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: {
    template: '%s | SMB Automation',
    default: 'Business Efficiency Audit and Automation Consulting | SMB Automation',
  },
  description: 'Find the manual work costing your business time and money. Get a prioritized automation roadmap, ROI estimates, recommended tools, and a 90-day implementation plan. Fixed fee, $1,500.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'Business Efficiency Audit and Automation Consulting | SMB Automation',
    description: 'Find the manual work costing your business time and money. Get a prioritized automation roadmap, ROI estimates, recommended tools, and a 90-day implementation plan.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://smbautomation.io',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  email: 'jesse@smbautomation.io',
  description: 'Business efficiency audits, workflow automation, and implementation for established small and midsize businesses.',
  logo: 'https://smbautomation.io/favicon.svg',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Des Moines',
      addressRegion: 'IA',
      addressCountry: 'US',
    },
  },
  founder: {
    '@type': 'Person',
    '@id': 'https://smbautomation.io/#jesse-bender',
    name: 'Jesse Bender',
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization', name: 'SMBautomation' },
    alumniOf: [
      { '@type': 'Organization', name: 'TelePharm' },
      { '@type': 'Organization', name: 'Cardinal Health' },
    ],
    knowsAbout: [
      'Business automation',
      'AI workflows',
      'Property management operations',
      'Healthcare technology',
      'SMB growth systems',
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'jesse@smbautomation.io',
    contactType: 'sales',
  },
  sameAs: [
    'https://www.linkedin.com/company/smbautomation',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={barlow.variable}>
      <body>
        <AttributionCapture />
        {children}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
