import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: {
    template: '%s | SMB Automation',
    default: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs',
  },
  description: 'We analyze your business, build what is missing, and scale it with you. Strategic growth partner for SMBs doing $500K to $20M.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },
  openGraph: {
    title: 'SMB Automation | Business Analysis, Custom Builds & Growth Systems for SMBs',
    description: 'We analyze your business, build what is missing, and scale it with you.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
  alternates: {
    canonical: 'https://smbautomation.io',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  email: 'jesse@smbautomation.io',
  description: 'Business analysis, custom builds, and growth systems for SMBs doing $500K to $20M.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
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
