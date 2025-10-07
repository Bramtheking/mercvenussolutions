"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Room } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Bed, Bath, Eye } from "lucide-react"
import { RoomDetailModal } from "./room-detail-modal"
import Link from "next/link"

interface RoomListingsProps {
  showAll?: boolean
}

export function RoomListings({ showAll = false }: RoomListingsProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const q = query(collection(db, "rooms"), where("available", "==", true))
        const querySnapshot = await getDocs(q)
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Room[]
        setRooms(roomsData)
      } catch (error) {
        console.error("Error fetching rooms:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const displayedRooms = showAll ? rooms : rooms.slice(0, 4)

  if (loading) {
    return (
      <section id="rooms" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading rooms...</p>
          </div>
        </div>
      </section>
    )
  }

  if (rooms.length === 0) {
    return (
      <section id="rooms" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Available Rooms</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No rooms available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rooms" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Available Rooms</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our selection of comfortable, well-equipped rooms in prime Thika locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {displayedRooms.map((room, index) => (
            <Card
              key={room.id}
              className="glass overflow-hidden hover:scale-105 transition-all duration-300 animate-slide-up border-0 shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative group">
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground animate-scale-in">
                  Available Now
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-foreground mb-2">{room.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{room.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl text-primary">{room.price}</div>
                    <div className="text-sm text-muted-foreground">{room.period}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{room.amenities.bed} Bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{room.amenities.bath} Bath</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Up to {room.amenities.occupancy}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs glass-dark text-white">
                      {feature}
                    </Badge>
                  ))}
                  {room.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{room.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button
                  className="flex-1 btn-3d"
                  onClick={() => {
                    const bookingOptions = `Choose booking method:\n\n📞 Call: ${room.phone}\n📧 Email: ${room.email}`
                    if (confirm(bookingOptions + "\n\nClick OK to call, Cancel to email")) {
                      window.location.href = `tel:${room.phone}`
                    } else {
                      window.location.href = `mailto:${room.email}?subject=Room Booking Inquiry - ${room.title}&body=Hi, I'm interested in booking the ${room.title} at ${room.location}. Please provide more details.`
                    }
                  }}
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 glass border-white/30 hover:bg-white/20 btn-3d bg-transparent"
                  onClick={() => setSelectedRoom(room)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!showAll && rooms.length > 4 && (
          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button
                variant="outline"
                size="lg"
                className="glass border-white/30 hover:bg-white/20 btn-3d px-8 py-3 bg-transparent"
              >
                See More Rooms ({rooms.length - 4} more available)
              </Button>
            </Link>
          </div>
        )}

        {selectedRoom && <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      </div>
    </section>
  )
}
