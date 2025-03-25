"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToJoinUs = (e: React.MouseEvent) => {
    e.preventDefault()
    const formElement = document.getElementById("join-us")
    if (formElement) {
      const headerHeight = 80 // Reduced from 120 to account for the actual header height
      const elementPosition = formElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20 // Added 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div className="bg-yellow-400 text-gray-900 py-2 text-center text-sm sticky top-0 z-50">
        <p>FlexiCare è in fase di sviluppo - Iscriviti ora per l'accesso anticipato!</p>
      </div>
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#join-us" onClick={scrollToJoinUs} className="flex items-center">
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
                <Link href="#join-us" onClick={scrollToJoinUs} className="text-gray-600 hover:text-yellow-600">
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
                  href="#join-us"
                  onClick={scrollToJoinUs}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Registrati
                </Link>
              </li>
              <li>
                <Link
                  href="#join-us"
                  onClick={scrollToJoinUs}
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
                <Link href="#join-us" onClick={scrollToJoinUs} className="flex items-center">
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
                  href="#join-us" 
                  onClick={scrollToJoinUs}
                  className="text-xl font-medium text-gray-800 hover:text-yellow-600"
                >
                  Trova specialisti
                </Link>
                <Link 
                  href="#join-us" 
                  onClick={scrollToJoinUs}
                  className="text-xl font-medium text-gray-800 hover:text-yellow-600"
                >
                  Per i professionisti
                </Link>
                <div className="flex flex-col space-y-4 pt-4">
                  <Link
                    href="#join-us"
                    onClick={scrollToJoinUs}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-3 rounded-md font-medium transition-colors text-center"
                  >
                    Registrati
                  </Link>
                  <Link
                    href="#join-us"
                    onClick={scrollToJoinUs}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors text-center"
                  >
                    Accedi
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

