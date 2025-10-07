"use client"

import { useAuth } from "@/hooks/useAuth"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"
import { RoomsManager } from "@/components/admin/rooms-manager"
import { ServicesManager } from "@/components/admin/services-manager"
import { SiteSettingsManager } from "@/components/admin/site-settings-manager"

export default function AdminDashboard() {
  const { user, loading } = useAuth(true)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif font-black text-2xl text-foreground">
                <span className="text-primary">Mercvenus</span> Admin
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline" className="glass border-white/30">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" className="glass border-white/30">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="rooms" className="space-y-6">
          <TabsList className="glass border-0">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms">
            <RoomsManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
