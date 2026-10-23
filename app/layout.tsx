import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catatan // Workspace",
  description: "Calm, precise note-taking workspace connected to Go backend API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-[#0a0b0d] font-sans selection:bg-[#1b2f6b]/15 selection:text-[#1b2f6b]">
        {children}
      </body>
    </html>
  );
}
