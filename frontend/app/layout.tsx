import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Automated Customer Reviews",
  description: "Sentiment classification, clustering, and review summarization",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
