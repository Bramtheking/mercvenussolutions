"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export function SiteSettingsManager() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [heroData, setHeroData] = useState({
    title: "Premium Room Rentals in",
    highlightText: "Thika",
    subtitle: "Discover comfortable, modern rooms with excellent amenities. Plus professional internet solutions including WiFi and CCTV installations across Thika.",
  })

  const [contactData, setContactData] = useState({
    phone: "+254 700 123 456",
    email: "info@mercvenus.co.ke",
    location: "W3JR+WG5, Komu",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const heroDoc = await getDoc(doc(db, "settings", "hero"))
      if (heroDoc.exists()) {
        setHeroData(heroDoc.data() as any)
      }

      const contactDoc = await getDoc(doc(db, "settings", "contact"))
      if (contactDoc.exists()) {
        setContactData(contactDoc.data() as any)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast.error("Failed to fetch settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await setDoc(doc(db, "settings", "hero"), {
        ...heroData,
        updatedAt: serverTimestamp(),
      })
      toast.success("Hero section updated successfully")
    } catch (error) {
      console.error("Error saving hero settings:", error)
      toast.error("Failed to save hero settings")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      await setDoc(doc(db, "settings", "contact"), {
        ...contactData,
        updatedAt: serverTimestamp(),
      })
      toast.success("Contact information updated successfully")
    } catch (error) {
      console.error("Error saving contact settings:", error)
      toast.error("Failed to save contact settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif font-bold text-2xl">Site Settings</h2>

      <Card className="glass border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveHero} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-highlight">Highlight Text</Label>
              <Input
                id="hero-highlight"
                value={heroData.highlightText}
                onChange={(e) => setHeroData({ ...heroData, highlightText: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                required
                rows={3}
              />
            </div>

            <Button type="submit" className="btn-3d" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Hero Settings
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveContact} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                value={contactData.phone}
                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactData.email}
                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-location">Location</Label>
              <Input
                id="contact-location"
                value={contactData.location}
                onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="btn-3d" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Contact Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
