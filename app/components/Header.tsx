"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const scrollToJoinUs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const joinUsSection = document.getElementById("join-us")
    if (joinUsSection) {
      joinUsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OcAYcgbVTCxUO9SDuapT1Q5N2QEY7n.png"
            alt="FlexiCare Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-gray-900">FlexiCare</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="text-gray-600 hover:text-yellow-600">
                Come funziona
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-yellow-600">
                Per i pazienti
              </Link>
            </li>
            <li>
              <Link href="#join-us" onClick={scrollToJoinUs} className="text-gray-600 hover:text-yellow-600">
                Per i professionisti
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Accedi
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

