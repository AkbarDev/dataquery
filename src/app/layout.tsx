import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataQuery AI | All-in-One Data Build & Analysis Platform",
  description:
    "Hosted, all-in-one data build tool. Ingest files (CSV, Excel) or feeds, explore in a visual playground with Python, DuckDB SQL and DAX, trigger Automate pipelines, and generate AI-written executive reports.",
  keywords: [
    "data build tool",
    "DuckDB in browser",
    "Pyodide pandas",
    "data analysis playground",
    "dataquery.in",
    "DAX Power BI online",
  ],
  authors: [{ name: "DataQuery AI Team" }],
  metadataBase: new URL("https://dataquery.in"),
  openGraph: {
    title: "DataQuery AI | All-in-One Data Build & Analysis Platform",
    description:
      "Transform raw CSV & Excel data into interactive visual dashboards and automated executive reports in seconds.",
    url: "https://dataquery.in",
    siteName: "DataQuery AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataQuery AI Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0B0F17] text-[#F8FAFC] antialiased selection:bg-sky-500/20 selection:text-sky-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
