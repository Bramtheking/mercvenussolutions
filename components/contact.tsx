"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function Contact() {
  const [contactInfo, setContactInfo] = useState({
    phone: "0723795356 / 0734665641",
    email: "mercvenuslimited@gmail.com",
    location: "W3JR+WG5, Komu",
  })
  const [showContactDialog, setShowContactDialog] = useState(false)

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
    window.location.href = `mailto:${contactInfo.email}?subject=Inquiry from Mercvenus Website`
  }
  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to book a room or need internet solutions? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{contactInfo.phone}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{contactInfo.email}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{contactInfo.location}</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Mon - Sat: 8AM - 6PM</p>
              <p className="text-muted-foreground">Sun: 10AM - 4PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => setShowContactDialog(true)}>
              <Phone className="h-5 w-5 mr-2" />
              Call Now to Book
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" onClick={handleEmail}>
              <Mail className="h-5 w-5 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif font-bold text-2xl text-center">Contact Us</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
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
      </div>
    </section>
  )
}
