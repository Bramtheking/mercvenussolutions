"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Room } from "@/lib/types"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

export function RoomsManager() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    period: "/month",
    image: "",
    images: [] as string[],
    location: "",
    features: "",
    bed: 1,
    bath: 1,
    occupancy: 1,
    description: "",
    directions: "",
    phone: "",
    email: "",
    available: true,
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "rooms"))
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Room[]
      setRooms(roomsData)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      toast.error("Failed to fetch rooms")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const imageUrl = await uploadToCloudinary(file)
      setFormData({ ...formData, image: imageUrl })
      toast.success("Main image uploaded successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file))
      const imageUrls = await Promise.all(uploadPromises)
      setFormData({ ...formData, images: [...formData.images, ...imageUrls] })
      toast.success(`${imageUrls.length} image(s) uploaded successfully`)
    } catch (error) {
      console.error("Error uploading images:", error)
      toast.error("Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const roomData = {
        title: formData.title,
        price: formData.price,
        period: formData.period,
        image: formData.image,
        images: formData.images,
        location: formData.location,
        features: formData.features.split(",").map((f) => f.trim()),
        amenities: {
          bed: formData.bed,
          bath: formData.bath,
          occupancy: formData.occupancy,
        },
        description: formData.description,
        directions: formData.directions,
        phone: formData.phone,
        email: formData.email,
        available: formData.available,
        updatedAt: serverTimestamp(),
      }

      if (editingRoom) {
        await updateDoc(doc(db, "rooms", editingRoom.id), roomData)
        toast.success("Room updated successfully")
      } else {
        await addDoc(collection(db, "rooms"), {
          ...roomData,
          createdAt: serverTimestamp(),
        })
        toast.success("Room added successfully")
      }

      setDialogOpen(false)
      resetForm()
      fetchRooms()
    } catch (error) {
      console.error("Error saving room:", error)
      toast.error("Failed to save room")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setFormData({
      title: room.title,
      price: room.price,
      period: room.period,
      image: room.image,
      images: room.images || [],
      location: room.location,
      features: room.features.join(", "),
      bed: room.amenities.bed,
      bath: room.amenities.bath,
      occupancy: room.amenities.occupancy,
      description: room.description,
      directions: room.directions,
      phone: room.phone,
      email: room.email,
      available: room.available,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return

    try {
      await deleteDoc(doc(db, "rooms", id))
      toast.success("Room deleted successfully")
      fetchRooms()
    } catch (error) {
      console.error("Error deleting room:", error)
      toast.error("Failed to delete room")
    }
  }

  const resetForm = () => {
    setEditingRoom(null)
    setFormData({
      title: "",
      price: "",
      period: "/month",
      image: "",
      images: [],
      location: "",
      features: "",
      bed: 1,
      bath: 1,
      occupancy: 1,
      description: "",
      directions: "",
      phone: "",
      email: "",
      available: true,
    })
  }

  if (loading && rooms.length === 0) {
    return <div className="text-center py-8">Loading rooms...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif font-bold text-2xl">Manage Rooms</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="btn-3d">
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="KSh 8,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    placeholder="/month"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Main Image (Cover Photo)</Label>
                <div className="flex gap-2">
                  <Input
                    id="image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-images">Additional Images (Multiple)</Label>
                <div className="flex gap-2">
                  <Input
                    id="additional-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Additional ${index + 1}`} className="w-full h-24 object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">You can select multiple images at once</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  placeholder="WiFi Included, Private Bathroom, Parking"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bed">Beds</Label>
                  <Input
                    id="bed"
                    type="number"
                    min="1"
                    value={formData.bed}
                    onChange={(e) => setFormData({ ...formData, bed: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bath">Baths</Label>
                  <Input
                    id="bath"
                    type="number"
                    min="1"
                    value={formData.bath}
                    onChange={(e) => setFormData({ ...formData, bath: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupancy">Occupancy</Label>
                  <Input
                    id="occupancy"
                    type="number"
                    min="1"
                    value={formData.occupancy}
                    onChange={(e) => setFormData({ ...formData, occupancy: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="directions">Directions</Label>
                <Textarea
                  id="directions"
                  value={formData.directions}
                  onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                />
                <Label htmlFor="available">Available</Label>
              </div>

              <Button type="submit" className="w-full btn-3d" disabled={loading || uploading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingRoom ? "Update Room" : "Add Room"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="glass border-0 shadow-lg">
            <CardHeader className="p-0">
              {room.image ? (
                <img src={room.image} alt={room.title} className="w-full h-48 object-cover rounded-t-lg" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-serif font-bold text-lg">{room.title}</h3>
                  <p className="text-sm text-muted-foreground">{room.location}</p>
                </div>
                <Badge variant={room.available ? "default" : "secondary"}>
                  {room.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <p className="text-primary font-bold text-xl mb-4">
                {room.price}
                <span className="text-sm text-muted-foreground">{room.period}</span>
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(room)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(room.id)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-muted-foreground">No rooms added yet. Click "Add Room" to get started.</p>
        </div>
      )}
    </div>
  )
}
