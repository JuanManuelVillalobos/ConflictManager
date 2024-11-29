import "@/app/globals.css"
import { Inter } from "next/font/google"

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
        <script src="https://identity.ic0.app/auth.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

