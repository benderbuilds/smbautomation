/* Paid-traffic landing pages: no site nav or full footer, so the only way
   forward is the page's own CTA. Each page renders its own minimal chrome. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
