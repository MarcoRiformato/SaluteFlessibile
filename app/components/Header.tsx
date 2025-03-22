"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToJoinUs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const joinUsSection = document.getElementById("join-us")
    if (joinUsSection) {
      joinUsSection.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100">
      <div className="bg-blue-500 text-white py-2 text-center text-sm">
        <p>🚀 FlexiCare è in fase di sviluppo - Iscriviti ora per l'accesso anticipato!</p>
      </div>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="w-[140px] h-[50px] overflow-hidden relative rounded-md">
            <Image
              src="/flexicare-svg.svg"
              alt="FlexiCare Logo"
              fill
              className="object-cover object-center"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link href="/doctors" className="text-gray-600 hover:text-yellow-600">
                Trova specialisti
              </Link>
            </li>
            <li>
              <Link href="#join-us" onClick={scrollToJoinUs} className="text-gray-600 hover:text-yellow-600">
                Per i professionisti
              </Link>
            </li>
            <li>
              <Link
                href="/registrati"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Registrati
              </Link>
            </li>
            <li>
              <Link
                href="/accedi"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Accedi
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-[140px] h-[50px] overflow-hidden relative rounded-md">
                  <Image
                    src="/flexicare-svg.svg"
                    alt="FlexiCare Logo"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </Link>
              <button 
                className="text-gray-700 focus:outline-none" 
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-6">
              <Link 
                href="/doctors" 
                className="text-xl font-medium text-gray-800 hover:text-yellow-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trova specialisti
              </Link>
              <Link 
                href="#join-us" 
                className="text-xl font-medium text-gray-800 hover:text-yellow-600"
                onClick={scrollToJoinUs}
              >
                Per i professionisti
              </Link>
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/registrati"
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrati
                </Link>
                <Link
                  href="/accedi"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accedi
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

