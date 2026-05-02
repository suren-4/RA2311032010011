import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notification System",
  description: "Stage 2 Notification App",
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
