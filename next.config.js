const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/* The site collapsed to a single landing page plus the blog. Everything that used
   to be its own route redirects to the closest section on `/` so inbound links and
   search rankings are preserved. */
const REDIRECTS = [
  // Retired audit-offer pages
  ['/apply', '/#contact'],
  ['/apply/:path*', '/#contact'],
  ['/sample-audit', '/#contact'],
  ['/single-workflow-audit', '/#contact'],
  ['/single-workflow-audit/:path*', '/#contact'],
  ['/contact', '/#contact'],
  ['/how-it-works', '/#automation'],
  ['/implementation', '/#automation'],
  ['/results', '/'],
  ['/about', '/'],

  // Retired industry pages
  ['/property-management-automation', '/'],
  ['/healthcare-automation', '/'],
  ['/home-services-automation', '/'],

  // Older structure, kept from the previous rebuild
  ['/services', '/#services'],
  ['/services/build', '/#automation'],
  ['/services/scale', '/#automation'],
  ['/services/strategy', '/#contact'],
  ['/work', '/'],
  ['/thank-you', '/'],
  ['/lp/strategy', '/'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

module.exports = withMDX(nextConfig);
