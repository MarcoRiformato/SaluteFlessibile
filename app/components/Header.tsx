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
        <nav>
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
      </div>
    </header>
  )
}

