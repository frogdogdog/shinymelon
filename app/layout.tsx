import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShinyMelon — Free Math Worksheets for Kids",
  description: "Free printable math worksheets for PK–8th grade. Common Core aligned. Designed for accessibility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Grandstander:wght@700;800;900&family=Atkinson+Hyperlegible:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}