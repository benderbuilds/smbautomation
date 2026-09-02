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
    default: 'Marketing and Automation for Small Businesses | SMB Automation',
  },
  description: 'SMB Automation helps small businesses grow with better websites, SEO, paid advertising, and automated follow-up systems that keep leads, customers, invoices, and reviews from falling through the cracks.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'Get More Customers. Automate the Busywork. | SMB Automation',
    description: 'Websites, SEO, Google Ads, and Meta Ads that bring in customers, plus automated lead, invoice, AR, and review follow-up. More leads. Faster follow-up. Less manual work.',
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
  description: 'Marketing and automation for small and midsize businesses: SEO, web design, Google Ads, and Meta Ads to generate leads, plus automated lead, invoice, accounts receivable, and review follow-up.',
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
      'Local SEO',
      'Web design and conversion optimization',
      'Google Ads',
      'Meta Ads',
      'Marketing automation',
      'Lead follow-up and CRM workflows',
      'Accounts receivable automation',
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
