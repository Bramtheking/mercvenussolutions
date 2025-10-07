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
  title: "Mercvenus Solutions - Fiber WiFi, CCTV & Electric Fence Installation in Thika",
  description:
    "MERCVENUS SOLUTIONS LIMITED - Dealers in Installation & Maintenance of Fiber Connection WiFi, CCTV Camera & Electric Fence. Quality room rentals in Thika. Contact: 0723795356 / 0734665641",
  keywords:
    "fiber connection Thika, WiFi installation Thika, CCTV installation Thika, electric fence installation, room rentals Thika, internet solutions Kenya",
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
