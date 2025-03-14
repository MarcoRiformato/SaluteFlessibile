"use client"

import { useState } from "react"
import { Search, MapPin, CreditCard, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Example suggestion data
const specialtySuggestions = [
  "Medico di base",
  "Cardiologo",
  "Dermatologo",
  "Psicologo",
  "Fisioterapista",
  "Ortopedico",
  "Ginecologo",
  "Oculista",
  "Dentista",
  "Nutrizionista",
]

const locationSuggestions = [
  "Milano Centro",
  "Milano Navigli",
  "Milano Isola",
  "Milano Porta Romana",
  "Milano Città Studi",
  "Roma",
  "Torino",
  "Firenze",
  "Bologna",
  "Napoli",
]

const insuranceSuggestions = [
  "Nessuna assicurazione",
  "Assicurazione A",
  "Assicurazione B",
  "Assicurazione C",
  "Assicurazione D",
  "Assicurazione E",
]

export default function HeroSection() {
  const router = useRouter()
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [insurance, setInsurance] = useState("")

  const [showSpecialtySuggestions, setShowSpecialtySuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [showInsuranceSuggestions, setShowInsuranceSuggestions] = useState(false)

  const handleSearch = () => {
    // Navigate to doctors page with search params
    const params = new URLSearchParams()
    if (specialty) params.append("specialty", specialty)
    if (location) params.append("location", location)
    if (insurance) params.append("insurance", insurance)

    router.push(`/doctors?${params.toString()}`)
  }

  const handleSpecialtySelect = (value: string) => {
    setSpecialty(value)
    setShowSpecialtySuggestions(false)
  }

  const handleLocationSelect = (value: string) => {
    setLocation(value)
    setShowLocationSuggestions(false)
  }

  const handleInsuranceSelect = (value: string) => {
    setInsurance(value)
    setShowInsuranceSuggestions(false)
  }

  return (
    <section className="relative bg-yellow-50 py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Title and Subtitle with Illustration */}
          <div className="relative mb-12">
            {/* Title and Subtitle */}
            <div className="relative z-20">
              <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-gray-900 leading-tight">
                Trova il tuo
                <br />
                <span className="text-yellow-500">dottore di fiducia</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 max-w-2xl">
              La piattaforma con recensioni affidabili che ti aiuta a trovare rapidamente il professionista più adatto alle tue esigenze
              </p>
            </div>

            {/* Illustration - positioned to only overlap with title area */}
            <div className="absolute top-0 right-0 w-[45%] h-full pointer-events-none z-10">
              <div className="relative w-full h-full">
                <img
                  src="https://picsum.photos/800/600"
                  alt="Medical illustration"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Search Bar - separate from illustration */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-4 relative">
                  <Search className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Prestazione o specialista"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    onFocus={() => setShowSpecialtySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSpecialtySuggestions(false), 200)}
                  />

                  {/* Specialty suggestions dropdown */}
                  {showSpecialtySuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      {specialtySuggestions
                        .filter((item) => item.toLowerCase().includes(specialty.toLowerCase()) || specialty === "")
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                            onMouseDown={() => handleSpecialtySelect(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-4 relative">
                  <MapPin className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Dove"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  />

                  {/* Location suggestions dropdown */}
                  {showLocationSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 mt-1 max-h-60 overflow-y-auto">
                      {locationSuggestions
                        .filter((item) => item.toLowerCase().includes(location.toLowerCase()) || location === "")
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                            onMouseDown={() => handleLocationSelect(suggestion)}
                          >
                            {suggestion}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center p-4 relative">
                  <div className="flex-1 flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Quando"
                      className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      onFocus={() => setShowInsuranceSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowInsuranceSuggestions(false), 200)}
                    />

                    {/* Insurance suggestions dropdown */}
                    {showInsuranceSuggestions && (
                      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 mt-1 max-h-60 overflow-y-auto">
                        {insuranceSuggestions
                          .filter((item) => item.toLowerCase().includes(insurance.toLowerCase()) || insurance === "")
                          .map((suggestion, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 hover:bg-yellow-50 cursor-pointer"
                              onMouseDown={() => handleInsuranceSelect(suggestion)}
                            >
                              {suggestion}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <button
                    className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors flex items-center"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Cerca
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900">
                  ✓
                </span>
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900">
                  ✓
                </span>
                <span>Recensioni autentiche di clienti reali</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

