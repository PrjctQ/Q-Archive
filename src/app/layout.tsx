import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q-Archive",
  description: "An Archive of ProjectQ's Journey.",

  // For SEO
  keywords: ["ProjectQ", "Archive", "Journey", "Notes", "Knowledge Base"],

  authors: [{ name: "ProjectQ Team", url: "https://q-archive.vercel.app" }],

  creator: "ProjectQ",
  publisher: "ProjectQ",

  // Useful extras
  icons: {
    icon: "/favicon.ico"
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} inter antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-3/4 lg:w-2/5 flex flex-col justify-between min-h-screen mx-auto">
            <main>
              <Toaster/>
              {children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
