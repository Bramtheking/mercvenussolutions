"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { MapPin, Wifi, Shield } from "lucide-react"

export function Hero() {
  const [heroContent, setHeroContent] = useState({
    title: "Premium Room Rentals in",
    highlightText: "Thika",
    subtitle:
      "Discover comfortable, modern rooms with excellent amenities. Plus professional internet solutions including WiFi and CCTV installations across Thika.",
  })

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const heroDoc = await getDoc(doc(db, "settings", "hero"))
        if (heroDoc.exists()) {
          setHeroContent(heroDoc.data() as any)
        }
      } catch (error) {
        console.error("Error fetching hero content:", error)
      }
    }

    fetchHeroContent()
  }, [])

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-black text-4xl md:text-6xl text-foreground mb-6 animate-slide-up">
            {heroContent.title} <span className="text-primary">{heroContent.highlightText}</span>
          </h1>
          <p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {heroContent.subtitle}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button size="lg" className="text-lg px-8 btn-3d" onClick={() => (window.location.href = "/rooms")}>
              View Available Rooms
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 glass border-white/30 hover:bg-white/20 btn-3d bg-transparent"
              onClick={() => (window.location.href = "/internet-solutions")}
            >
              Internet Solutions
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div
              className="glass p-4 rounded-xl flex items-center justify-center space-x-2 text-muted-foreground hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: "0.6s" }}
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Prime Thika Locations</span>
            </div>
            <div
              className="glass p-4 rounded-xl flex items-center justify-center space-x-2 text-muted-foreground hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: "0.7s" }}
            >
              <Wifi className="h-5 w-5 text-primary" />
              <span className="font-medium">High-Speed Internet</span>
            </div>
            <div
              className="glass p-4 rounded-xl flex items-center justify-center space-x-2 text-muted-foreground hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: "0.8s" }}
            >
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-medium">24/7 Security</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  )
}
