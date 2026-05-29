import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: {
    template: '%s | SMBautomation',
    default: 'SMBautomation - Business Audits and AI Builds for Small and Mid-Size Businesses | Jesse Bender, Founder',
  },
  description: 'Get a business audit from Jesse Bender: 13 years scaling companies, $200M portfolio managed, Fortune 500 exit. We find where time and money are leaking, then build only what pays back.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'SMBautomation - Business Audits and AI Builds for Small and Mid-Size Businesses | Jesse Bender, Founder',
    description: 'Get a business audit from Jesse Bender: 13 years scaling companies, $200M portfolio managed, Fortune 500 exit.',
    url: 'https://smbautomation.io',
    siteName: 'SMBautomation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://smbautomation.io',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMBautomation',
  url: 'https://smbautomation.io',
  email: 'jesse@smbautomation.io',
  description: 'Business audits and AI builds for small and mid-size businesses. We find where time and money are leaking, then build only what pays back.',
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
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SMB Automation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Free Automated Audit',
          serviceType: 'Automated business audit',
          description: 'A fast, automated look at where your online presence and lead intake are leaking opportunities. Delivered in 24 hours.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Operations Opportunity Map',
          serviceType: 'Business operations diagnostic',
          description: 'Deep diagnostic that maps workflows, scores every bottleneck by ROI, and delivers a prioritized plan with the dollar impact of each fix.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Build',
          serviceType: 'Custom automation development',
          description: 'Custom automation builds integrated with existing tools, scoped from proven ROI.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Embedded Partner',
          serviceType: 'Ongoing automation retainer',
          description: 'Ongoing embedded partnership: maintain existing automations and work down the Operations Opportunity Map quarter by quarter.',
        },
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-K96TVT9ZZD" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K96TVT9ZZD');
        `}</Script>
      </body>
    </html>
  );
}
