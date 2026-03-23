import { getAllPosts } from "@/lib/posts";
import HomePageClient from "./HomePageClient";

export default function Page() {
  const posts = getAllPosts().slice(0, 3);
  return <HomePageClient posts={posts} />;
}
