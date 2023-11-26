import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ThemeProvider } from "@/components/ui/theme-provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cosmos",
    template: `%s - Cosmos`,
  },
  description: "Elevating workforce dynamics.",
  creator: "srajankumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thecosmos.vercel.app",
    title: "Cosmos",
    description: "Elevating workforce dynamics.",
    siteName: "Cosmos",
    images: [
      {
        url: "https://thecosmos.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "Cosmos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmos",
    description: "Elevating workforce dynamics.",
    images: "https://thecosmos.vercel.app/og.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div suppressHydrationWarning>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
