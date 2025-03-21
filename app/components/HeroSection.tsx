"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { it } from "date-fns/locale"

// Example suggestion data
const specialtySuggestions = [
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
  "Milano",
  "Roma",
  "Torino",
  "Firenze",
  "Bologna",
  "Napoli",
  "Palermo",
  "Genova",
  "Bari",
  "Catania",
  "Venezia",
  "Verona",
  "Padova",
  "Parma",
  "Brescia",
  "Modena",
  "Pisa",
  "Cagliari",
]

const insuranceSuggestions = [
  "Nessuna assicurazione",
  "Assicurazione A",
  "Assicurazione B",
  "Assicurazione C",
  "Assicurazione D",
  "Assicurazione E",
]

// Professions for the animation
const professions = ["Medico", "Infermiere", "Fisioterapista", "Psicologo", "Nutrizionista", "Osteopata", "Farmacista", "Dentista", "Veterinario"]

export default function HeroSection() {
  const router = useRouter()
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const [showSpecialtySuggestions, setShowSpecialtySuggestions] = useState(false)
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  // References to the input elements for positioning the dropdowns
  const specialtyInputRef = useRef<HTMLDivElement>(null)
  const locationInputRef = useRef<HTMLDivElement>(null)

  // Animation state
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // Find the longest profession to set minimum width
  const longestProfession = professions.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  )

  // Animation interval effect with more precise control
  useEffect(() => {
    // Clear any existing interval when the component mounts or re-renders
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    // Set up a new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % professions.length)
    }, 5000)
    
    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const handleSearch = () => {
    // Navigate to doctors page with search params
    const params = new URLSearchParams()
    if (specialty) params.append("specialty", specialty)
    if (location) params.append("location", location)
    if (date) params.append("date", date.toISOString())

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

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return ""
    return format(date, "d MMMM yyyy", { locale: it })
  }

  return (
    <section className="relative bg-yellow-50 py-6 md:py-12 overflow-visible">
      <div className="container mx-auto px-4">
        <div className="relative max-w-6xl mx-auto">
          {/* Title and Subtitle with Illustration */}
          <div className="relative mb-6 md:mb-12">
            {/* Title and Subtitle */}
            <div className="relative z-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 leading-tight text-center sm:text-left">
                <div className="flex flex-wrap sm:flex-nowrap items-baseline whitespace-normal sm:whitespace-nowrap justify-center sm:justify-start">
                  <span>Trova il tuo</span>
                  <div 
                    className="relative text-yellow-500 ml-2 sm:ml-3 mr-0"
                    style={{
                      minWidth: `${longestProfession.length * 0.55}em`,
                      textAlign: "center"
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentIndex}
                        className="absolute left-0 right-0 mx-auto sm:mx-0 sm:left-0 sm:right-auto font-bold"
                        style={{
                          top: "0",
                          transformOrigin: "center",
                        }}
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: 90, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          opacity: { duration: 0.3 },
                        }}
                      >
                        {professions[currentIndex]}
                      </motion.span>
                    </AnimatePresence>
                    {/* Invisible text to maintain space */}
                    <span className="invisible">{longestProfession}</span>
                  </div>
                </div>
                <div className="mt-0 sm:mt-1">di fiducia</div>
              </h1>
              <div className="relative">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold mb-4 inline-block">
                  🚀 In arrivo a breve
                </div>
                <p className="text-lg sm:text-xl text-gray-600 mt-3 md:mt-6 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                  La piattaforma con recensioni affidabili che troverà rapidamente il professionista adatto a <strong>te</strong>. Iscriviti ora per essere tra i primi a provarla!
                </p>
              </div>
            </div>

            {/* Illustration - hidden on mobile, visible on larger screens */}
            <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full pointer-events-none z-10 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/dottore-abbraccia.png"
                  alt="Medical illustration"
                  className="w-auto h-auto max-h-[175%] max-w-[150%] object-contain absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div>
            </div>
          </div>

          {/* Search Bar - separate from illustration */}
          <div className="relative" style={{ zIndex: 99999 }}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="flex flex-col md:flex-row">
                {/* Specialty search field */}
                <div 
                  ref={specialtyInputRef}
                  className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4 relative"
                  style={{ minWidth: 0 }}
                >
                  <Search className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Prestazione o specialista"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm md:text-base"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    onFocus={() => setShowSpecialtySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSpecialtySuggestions(false), 200)}
                  />
                </div>

                {/* Location search field */}
                <div 
                  ref={locationInputRef}
                  className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4 relative"
                  style={{ minWidth: 0 }}
                >
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Dove"
                    className="w-full bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm md:text-base"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                  />
                </div>

                {/* Date selection */}
                <div className="flex items-center p-3 md:p-4 relative" style={{ flex: "1 1 0%", minWidth: 0 }}>
                  <div className="w-full flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="w-full flex items-center justify-between text-left bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm md:text-base">
                          <span className={date ? "" : "text-gray-500"}>
                            {date ? formatSelectedDate(date) : "Quando"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white" style={{ zIndex: 999999 }} align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          fromDate={new Date()}
                          className="bg-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <button
                    className="ml-2 md:ml-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 sm:px-6 py-2 rounded-lg transition-colors flex items-center whitespace-nowrap text-sm md:text-base flex-shrink-0"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4 mr-1 md:mr-2" />
                    Cerca
                  </button>
                </div>
              </div>
            </div>

            {/* Specialty suggestions dropdown - positioned absolutely */}
            {showSpecialtySuggestions && specialtyInputRef.current && (
              <div 
                className="absolute bg-white shadow-xl rounded-lg overflow-y-auto max-h-60"
                style={{ 
                  zIndex: 999999,
                  width: specialtyInputRef.current.offsetWidth,
                  left: specialtyInputRef.current.offsetLeft,
                  top: specialtyInputRef.current.offsetTop + specialtyInputRef.current.offsetHeight,
                }}
              >
                {specialtySuggestions
                  .filter(item => item.toLowerCase().includes(specialty.toLowerCase()) || specialty === "")
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm md:text-base"
                      onMouseDown={() => handleSpecialtySelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}

            {/* Location suggestions dropdown - positioned absolutely */}
            {showLocationSuggestions && locationInputRef.current && (
              <div 
                className="absolute bg-white shadow-xl rounded-lg overflow-y-auto max-h-60"
                style={{ 
                  zIndex: 999999,
                  width: locationInputRef.current.offsetWidth,
                  left: locationInputRef.current.offsetLeft,
                  top: locationInputRef.current.offsetTop + locationInputRef.current.offsetHeight,
                }}
              >
                {locationSuggestions
                  .filter(item => item.toLowerCase().includes(location.toLowerCase()) || location === "")
                  .map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-yellow-50 cursor-pointer text-sm md:text-base"
                      onMouseDown={() => handleLocationSelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mt-3 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 text-xs">
                  ✓
                </span>
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 text-xs">
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

