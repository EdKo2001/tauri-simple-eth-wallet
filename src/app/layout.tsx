import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Wallet",
  description: "Simple Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
