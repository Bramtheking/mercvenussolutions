"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Service } from "@/lib/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wifi, Camera, Router, Smartphone, Shield, Headphones, CheckCircle, Phone, Mail, Fence } from "lucide-react"

const iconMap: Record<string, any> = {
  Wifi,
  Camera,
  Router,
  Smartphone,
  Shield,
  Headphones,
  Fence,
}

export default function InternetSolutionsPage() {
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
        setServices(servicesData)

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

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-accent py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-black text-4xl md:text-6xl text-foreground mb-6">
              MERCVENUS <span className="text-primary">SOLUTIONS</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dealers in Installation & Maintenance of Fiber Connection WiFi, CCTV Camera & Electric Fence. Professional service across Thika. Fast, reliable, and affordable.
            </p>
            <Button size="lg" className="text-lg px-8" onClick={() => setShowQuoteDialog(true)}>
              Get Free Quote Today
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete Fiber WiFi, CCTV Camera & Electric Fence installation and maintenance for homes and businesses in Thika
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {loading ? (
              <div className="col-span-2 text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No services available at the moment.</p>
              </div>
            ) : (
              services.map((service) => {
                const IconComponent = iconMap[service.icon] || Wifi
                return (
                  <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
                    {service.popular && (
                      <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">Most Popular</Badge>
                    )}

                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="font-serif font-bold text-xl">{service.title}</CardTitle>
                          {service.price && <div className="text-2xl font-bold text-primary mt-1">{service.price}</div>}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-6">{service.description}</p>

                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button className="w-full">Request Quote</Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Why Choose Mercvenus?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Reliable Service</h3>
              <p className="text-muted-foreground">
                Professional installation with 1-year warranty and ongoing support
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Headphones className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock technical support for all our internet solutions</p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2">Local Experts</h3>
              <p className="text-muted-foreground">Based in Thika with deep knowledge of local infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif font-black text-3xl md:text-4xl mb-4">Ready to Get Connected?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today for a free consultation and quote for your internet solutions in Thika
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={handleCall}>
              Call {contactInfo.phone}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              onClick={() => setShowQuoteDialog(true)}
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />

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
    </main>
  )
}
