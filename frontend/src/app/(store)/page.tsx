import type { Metadata } from "next";
import ProductsPage from "@/app/(store)/produtos/page";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  return <ProductsPage />;
}
