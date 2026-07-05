import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Learning for Kids K-8 | ShinyMelon',
  description: 'Worksheets, interactive activities, quizzes, and games for Kindergarten through 8th grade. Math, reading, writing, science and more. Common Core aligned. Designed to keep kids curious.',
  keywords: 'free worksheets, kindergarten worksheets, common core, printable worksheets, homeschool, math worksheets, reading worksheets, kids learning games, interactive worksheets',
  openGraph: {
    title: 'Learning for Kids K-8 | ShinyMelon',
    description: 'Worksheets, interactive activities, quizzes, and games for K-8. Math, reading, writing, science and more.',
    url: 'https://shinymelon.com',
    siteName: 'ShinyMelon',
    type: 'website',
  },
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