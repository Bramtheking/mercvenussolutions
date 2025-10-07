"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Menu, Mail } from "lucide-react"

export function Header() {
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    phone: "0723795356 / 0734665641",
    email: "mercvenuslimited@gmail.com",
  })

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const contactDoc = await getDoc(doc(db, "settings", "contact"))
        if (contactDoc.exists()) {
          setContactInfo(contactDoc.data() as any)
        }
      } catch (error) {
        console.error("Error fetching contact info:", error)
      }
    }

    fetchContactInfo()
  }, [])

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`
  }

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=Room Booking Inquiry`
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20 backdrop-blur-md bg-gray-100/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif font-black text-2xl text-primary animate-fade-in">
            Mercvenus
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/rooms"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Rooms
            </Link>
            <Link
              href="/internet-solutions"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Internet Solutions
            </Link>
            <Link
              href="#contact"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground glass-dark px-3 py-2 rounded-full">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-white">{contactInfo.phone}</span>
            </div>
            <Button size="sm" className="btn-3d" onClick={() => setShowBookingDialog(true)}>
              Book Now
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="md:hidden hover:bg-white/20">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif font-bold text-2xl text-center">Book a Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">Choose how you'd like to contact us for booking:</p>
            <Button
              size="lg"
              className="w-full text-lg btn-3d"
              onClick={handleCall}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call {contactInfo.phone}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full text-lg glass border-white/30"
              onClick={handleEmail}
            >
              <Mail className="h-5 w-5 mr-2" />
              Email {contactInfo.email}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
