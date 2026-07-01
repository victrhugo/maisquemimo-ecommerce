import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Início",
};

export default function HomePage() {
  redirect("/produtos");
}
