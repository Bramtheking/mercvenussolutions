import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Mercvenus - Premium Room Rentals & Internet Solutions in Thika",
  description:
    "Find quality room rentals in Thika with modern amenities. Professional WiFi installation, CCTV setup, and internet solutions across Thika. Contact us for bookings.",
  keywords:
    "room rentals Thika, internet solutions Thika, WiFi installation Thika, CCTV installation, house rentals Kenya",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
