const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      { source: '/services', destination: '/implementation', permanent: true },
      { source: '/services/build', destination: '/implementation', permanent: true },
      { source: '/services/scale', destination: '/implementation', permanent: true },
      { source: '/services/strategy', destination: '/how-it-works', permanent: true },
      { source: '/work', destination: '/results', permanent: true },
      { source: '/thank-you', destination: '/apply/received', permanent: true },
      { source: '/lp/strategy', destination: '/', permanent: true },
    ];
  },
};

module.exports = withMDX(nextConfig);
