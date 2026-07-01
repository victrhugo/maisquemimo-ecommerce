import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mais que Mimo",
    default: "Mais que Mimo — Papelaria Afetiva",
  },
  description:
    "Papelaria afetiva com produtos que transformam o dia a dia em arte. Cadernos, adesivos, planner e muito mais.",
  keywords: ["papelaria", "afetiva", "planner", "caderno", "adesivos", "mais que mimo"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Mais que Mimo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${nunito.variable} ${baloo.variable} h-full`}
    >
      <body className="mqm-shell min-h-full flex flex-col antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
