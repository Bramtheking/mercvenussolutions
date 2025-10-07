"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Service } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wifi, Router, Camera, Smartphone, Shield, Headphones, Phone, Mail, Fence } from "lucide-react"

const iconMap: Record<string, any> = {
  Wifi,
  Router,
  Camera,
  Smartphone,
  Shield,
  Headphones,
  Fence,
}

export function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showQuoteDialog, setShowQuoteDialog] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    phone: "0723795356 / 0734665641",
    email: "mercvenuslimited@gmail.com",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"))
        const servicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Service[]
        setServices(servicesData.slice(0, 3))

        const contactDoc = await getDoc(doc(db, "settings", "contact"))
        if (contactDoc.exists()) {
          setContactInfo(contactDoc.data() as any)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`
  }

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}?subject=Request for Free Quote - Internet Solutions`
  }

  if (loading) {
    return (
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading services...</p>
          </div>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fiber Connection WiFi, CCTV Camera & Electric Fence Installation and Maintenance across Thika
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wifi
            return (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif font-bold text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="text-lg px-8" onClick={() => setShowQuoteDialog(true)}>
            Get Free Quote
          </Button>
        </div>

        <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif font-bold text-2xl text-center">Get Free Quote</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-center text-muted-foreground">Choose how you'd like to contact us for a free quote:</p>
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
