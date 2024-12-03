import "@/app/globals.css"
import { Inter } from "next/font/google"
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AIMUTEC Dashboard",
  description: "A secure dashboard application with Internet Identity authentication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add DFINITY's Internet Identity script */}
        <Script
          src="https://identity.ic0.app/auth.js"
          strategy="afterInteractive" // Load the script after the page is interactive
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

