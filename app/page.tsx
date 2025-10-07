import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { RoomListings } from "@/components/room-listings"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <RoomListings />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
