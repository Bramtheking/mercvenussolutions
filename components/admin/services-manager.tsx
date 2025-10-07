"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Service } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

const iconOptions = ["Wifi", "Camera", "Router", "Smartphone", "Shield", "Headphones"]

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const [formData, setFormData] = useState({
    icon: "Wifi",
    title: "",
    description: "",
    price: "",
    features: "",
    popular: false,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "services"))
      const servicesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[]
      setServices(servicesData)
    } catch (error) {
      console.error("Error fetching services:", error)
      toast.error("Failed to fetch services")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const serviceData = {
        icon: formData.icon,
        title: formData.title,
        description: formData.description,
        price: formData.price || undefined,
        features: formData.features.split(",").map((f) => f.trim()),
        popular: formData.popular,
        updatedAt: serverTimestamp(),
      }

      if (editingService) {
        await updateDoc(doc(db, "services", editingService.id), serviceData)
        toast.success("Service updated successfully")
      } else {
        await addDoc(collection(db, "services"), {
          ...serviceData,
          createdAt: serverTimestamp(),
        })
        toast.success("Service added successfully")
      }

      setDialogOpen(false)
      resetForm()
      fetchServices()
    } catch (error) {
      console.error("Error saving service:", error)
      toast.error("Failed to save service")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
      price: service.price || "",
      features: service.features.join(", "),
      popular: service.popular || false,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      await deleteDoc(doc(db, "services", id))
      toast.success("Service deleted successfully")
      fetchServices()
    } catch (error) {
      console.error("Error deleting service:", error)
      toast.error("Failed to delete service")
    }
  }

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      icon: "Wifi",
      title: "",
      description: "",
      price: "",
      features: "",
      popular: false,
    })
  }

  if (loading && services.length === 0) {
    return <div className="text-center py-8">Loading services...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif font-bold text-2xl">Manage Services</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="btn-3d">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (optional)</Label>
                <Input
                  id="price"
                  placeholder="From KSh 5,000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>

              <Button type="submit" className="w-full btn-3d" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingService ? "Update Service" : "Add Service"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="glass border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-serif font-bold text-lg">{service.title}</CardTitle>
                {service.popular && <Badge className="bg-primary">Popular</Badge>}
              </div>
              {service.price && <p className="text-primary font-bold text-xl">{service.price}</p>}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex flex-wrap gap-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {service.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{service.features.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(service)} className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 glass rounded-lg">
          <p className="text-muted-foreground">No services added yet. Click "Add Service" to get started.</p>
        </div>
      )}
    </div>
  )
}
