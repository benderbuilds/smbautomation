import { getAllPosts } from "@/lib/posts";
import HomePageClient from "./HomePageClient";

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  description:
    'SMB Automation builds custom AI and workflow automations for local service businesses and healthcare clinics, saving owners 10–25 hours per week.',
};

export default function Page() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HomePageClient posts={posts} />
    </>
  );
}
