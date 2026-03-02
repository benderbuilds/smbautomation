import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://smbautomation.io'),
  title: 'SMB Automation — Custom AI Workflows for Local Businesses',
  description:
    'We help local service businesses integrate AI automation to save time, respond faster, and make more money. Custom-built workflows for real estate, HVAC, dental, agencies, and more.',
  openGraph: {
    title: 'SMB Automation — Custom AI Workflows for Local Businesses',
    description:
      'We help local service businesses integrate AI automation to save time, respond faster, and make more money.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SMB Automation',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://smbautomation.io',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
