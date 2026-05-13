import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Helmstack — The control deck for your AI agent fleet",
    template: "%s · Helmstack",
  },
  description:
    "Connect any agent runtime, observe what they're doing, approve what matters, and ship outcomes. Helmstack is the operations layer for production agent fleets.",
  metadataBase: new URL("https://helmstack.io"),
  openGraph: {
    title: "Helmstack",
    description: "The control deck for your AI agent fleet. One place to run, observe, and govern every agent.",
    url: "https://helmstack.io",
    siteName: "Helmstack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helmstack",
    description: "The control deck for your AI agent fleet.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="min-h-full text-zinc-900">
        <div className="app-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
