import { HeroSection } from "@/components/store/hero-section";
import { FeaturedCategories } from "@/components/store/featured-categories";
import { FeaturedProducts } from "@/components/store/featured-products";
import { BrandValues } from "@/components/store/brand-values";
import { NewsletterSection } from "@/components/store/newsletter-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <BrandValues />
      <NewsletterSection />
    </>
  );
}
