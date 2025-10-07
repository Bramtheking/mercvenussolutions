"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  const [contactInfo, setContactInfo] = useState({
    phone: "0723795356 / 0734665641",
    email: "mercvenuslimited@gmail.com",
    location: "Thika Town Center",
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

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif font-black text-2xl text-primary mb-4">Mercvenus Solutions</h3>
            <p className="text-sm mb-4 text-gray-300">
              MERCVENUS SOLUTIONS LIMITED - Dealers in Installation & Maintenance of Fiber Connection WiFi, CCTV Camera & Electric Fence. Premium room rentals in Thika.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#rooms" className="text-gray-300 hover:text-primary transition-colors">
                  Room Rentals
                </Link>
              </li>
              <li>
                <Link href="/internet-solutions" className="text-gray-300 hover:text-primary transition-colors">
                  Fiber Connection WiFi
                </Link>
              </li>
              <li>
                <Link href="/internet-solutions" className="text-gray-300 hover:text-primary transition-colors">
                  CCTV Camera Installation
                </Link>
              </li>
              <li>
                <Link href="/internet-solutions" className="text-gray-300 hover:text-primary transition-colors">
                  Electric Fence Installation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#rooms" className="text-gray-300 hover:text-primary transition-colors">
                  Available Rooms
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/internet-solutions" className="text-gray-300 hover:text-primary transition-colors">
                  Internet Solutions
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-300 hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">{contactInfo.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="text-gray-300">{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p className="text-gray-400">
            &copy; 2025 Mercvenus Solutions Limited. All rights reserved. | Fiber WiFi | CCTV | Electric Fence | Room Rentals Thika
          </p>
        </div>
      </div>
    </footer>
  )
}
