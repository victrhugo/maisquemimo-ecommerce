import { HomeStory } from "@/components/store/home-story";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  return <HomeStory />;
}
