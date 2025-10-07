"use client"

import { X, MapPin, Users, Bed, Bath, Phone, Mail, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Room {
  id: number
  title: string
  price: string
  period: string
  image: string
  location: string
  features: string[]
  amenities: { bed: number; bath: number; occupancy: number }
  description: string
  directions: string
  phone: string
  email: string
}

interface RoomDetailModalProps {
  room: Room
  onClose: () => void
}

export function RoomDetailModal({ room, onClose }: RoomDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-0 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative">
          <img
            src={room.image || "/placeholder.svg"}
            alt={room.title}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Available Now</Badge>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Title and Price */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-serif font-bold text-3xl text-foreground mb-2">{room.title}</h2>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{room.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-3xl text-primary">{room.price}</div>
              <div className="text-lg text-muted-foreground">{room.period}</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center space-x-6 mb-6 p-4 glass-dark rounded-xl">
            <div className="flex items-center text-white">
              <Bed className="h-5 w-5 mr-2" />
              <span className="font-medium">{room.amenities.bed} Bedroom</span>
            </div>
            <div className="flex items-center text-white">
              <Bath className="h-5 w-5 mr-2" />
              <span className="font-medium">{room.amenities.bath} Bathroom</span>
            </div>
            <div className="flex items-center text-white">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Up to {room.amenities.occupancy} People</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-serif font-bold text-xl text-foreground mb-3">About This Room</h3>
            <p className="text-muted-foreground leading-relaxed">{room.description}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-serif font-bold text-xl text-foreground mb-3">Features & Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {room.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="glass-dark text-white px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Directions */}
          <div className="mb-8">
            <h3 className="font-serif font-bold text-xl text-foreground mb-3 flex items-center">
              <Navigation className="h-5 w-5 mr-2" />
              Directions
            </h3>
            <div className="glass-dark p-4 rounded-xl">
              <p className="text-white leading-relaxed">{room.directions}</p>
            </div>
          </div>

          {/* Booking Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 btn-3d text-lg py-6" onClick={() => (window.location.href = `tel:${room.phone}`)}>
              <Phone className="h-5 w-5 mr-2" />
              Call to Book
            </Button>
            <Button
              variant="outline"
              className="flex-1 glass border-white/30 hover:bg-white/20 btn-3d text-lg py-6 bg-transparent"
              onClick={() =>
                (window.location.href = `mailto:${room.email}?subject=Room Booking Inquiry - ${room.title}&body=Hi, I'm interested in booking the ${room.title} at ${room.location}. Please provide more details about availability and booking process.`)
              }
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
