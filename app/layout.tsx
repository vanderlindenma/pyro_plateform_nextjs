import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pyronear - Monitoring platform",
  description: "Pyronear is a monitoring platform for fire detection and monitoring",
  icons: {
    icon: [
      { url: '/favicon.ico?v=1' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.ico?v=1',
    apple: '/favicon.ico?v=1',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico?v=1" />
        <link rel="icon" href="/favicon.ico?v=1" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
