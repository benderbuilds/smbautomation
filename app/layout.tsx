import type { Metadata } from 'next';
import { Barlow, Open_Sans, Poppins } from 'next/font/google';
import AttributionCapture from '../components/AttributionCapture';
import AnalyticsScripts from '../components/AnalyticsScripts';
import ChatWidget from '../components/ChatWidget';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-barlow',
});

/* 2026-11 redesign: Poppins headings, Open Sans body, scoped to the (site) pages
   through the .site wrapper. The /roofers landing page keeps Barlow. */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: {
    template: '%s | SMB Automation',
    default: 'AI Phone Answering and Website Chat for Small Businesses | SMB Automation',
  },
  description: 'AI phone answering and website chat that books jobs for small and midsize businesses. Start a 30-day free trial or book a demo.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'AI Phone Answering and Website Chat | SMB Automation',
    description: 'AI phone answering and website chat that turns your existing traffic into booked customers. 30-day free trial, no setup fee.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Phone Answering and Website Chat | SMB Automation',
    description:
      'AI phone answering and website chat that turns your existing traffic into booked customers. 30-day free trial, no setup fee.',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  legalName: 'SMBAUTOMATION LLC',
  url: 'https://smbautomation.io',
  email: 'hello@smbautomation.io',
  telephone: '+1-319-255-2700',
  description: 'AI phone answering and website chat for small and midsize businesses: 24/7 answering, booking, reminders, and review requests, with invoice and AR follow-up on custom plans.',
  logo: 'https://smbautomation.io/favicon.svg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Iowa City',
    addressRegion: 'IA',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
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
    email: 'hello@smbautomation.io',
    telephone: '+1-319-255-2700',
    contactType: 'sales',
  },
  sameAs: [
    'https://www.linkedin.com/company/smbautomation',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${poppins.variable} ${openSans.variable}`}>
      <body>
        <AttributionCapture />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <AnalyticsScripts />
        <ChatWidget />
      </body>
    </html>
  );
}
