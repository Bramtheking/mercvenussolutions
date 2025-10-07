"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RoomListings } from "@/components/room-listings"

export default function RoomsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header />
      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif font-black text-4xl md:text-5xl text-foreground mb-4">
              Available <span className="text-primary">Rooms</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our collection of premium rooms in prime Thika locations. Each room comes with modern amenities and
              excellent connectivity.
            </p>
          </div>
          <RoomListings showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
