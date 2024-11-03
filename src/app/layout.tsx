import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vimetor",
  description: "Edit a document with Vim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
