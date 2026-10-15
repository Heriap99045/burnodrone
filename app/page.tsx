import { LatestArticles } from "@/components/latest-articles";
import HomeClient from "./home-client";

export default function HomePage() {
  return <HomeClient articlesSection={<LatestArticles />} />;
}
