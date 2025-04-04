"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { it } from "date-fns/locale"
import { HeroSkeleton } from "./Skeleton"
import AIDoctorAssistant from "@/components/AIDoctorAssistant"

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
  const [isLoading, setIsLoading] = useState(true)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

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

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

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

  // Add tooltip effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToForm = () => {
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
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    scrollToForm()
  }

  const handleSpecialtySelect = (value: string) => {
    setSpecialty(value)
    setShowSpecialtySuggestions(false)
    scrollToForm()
  }

  const handleLocationSelect = (value: string) => {
    setLocation(value)
    setShowLocationSuggestions(false)
    scrollToForm()
  }

  const formatSelectedDate = (date: Date | undefined) => {
    if (!date) return ""
    return format(date, "d MMMM yyyy", { locale: it })
  }

  if (isLoading) {
    return <HeroSkeleton />
  }

  return (
    <section className="relative bg-gradient-to-b from-yellow-50 to-white pt-12 pb-16 overflow-hidden">
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
                <p className="text-lg sm:text-xl text-gray-600 mt-3 md:mt-6 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                  Prenota la visita giusta con il professionista <strong>giusto</strong>, quando vuoi <strong>tu</strong>
                </p>
              </div>
            </div>

            {/* Illustration - hidden on mobile, visible on larger screens */}
            <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full pointer-events-none z-10 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/hero2.webp"
                  alt="Medical illustration"
                  className="w-auto h-auto max-h-[175%] max-w-[150%] object-contain absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div>
            </div>
          </div>

          {/* Search Bar - separate from illustration */}
          <div className="relative" style={{ zIndex: 10 }}>
            <div 
              className="bg-white rounded-xl shadow-lg border border-gray-200" 
            >
              <div className="flex flex-col md:flex-row">
                {/* Specialty search field */}
                <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4 relative">
                  <Search className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                  <div 
                    className="w-full text-gray-500 text-sm md:text-base cursor-pointer"
                    onClick={scrollToForm}
                  >
                    Prestazione o specialista
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsAIOpen(true)
                        setShowTooltip(false)
                        scrollToForm()
                      }}
                      className="ml-2 p-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                      title="Chiedi assistenza all'AI"
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </button>
                    
                    {/* Animated Tooltip */}
                    <AnimatePresence>
                      {showTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-full mt-2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg shadow-xl whitespace-nowrap z-50"
                        >
                          <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-900 transform rotate-45" />
                          <p className="relative z-10">Prova l'assistente AI! 🤖✨</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Location search field */}
                <div 
                  className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-4 relative cursor-pointer"
                  onClick={scrollToForm}
                >
                  <MapPin className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                  <div className="w-full text-gray-500 text-sm md:text-base">
                    Dove
                  </div>
                </div>

                {/* Date selection */}
                <div 
                  className="flex items-center p-3 md:p-4 relative cursor-pointer" 
                  style={{ flex: "1 1 0%", minWidth: 0 }}
                  onClick={scrollToForm}
                >
                  <div className="w-full flex items-center">
                    <Calendar className="h-5 w-5 text-yellow-500 mr-2 md:mr-3 flex-shrink-0" />
                    <div className="w-full text-gray-500 text-sm md:text-base">
                      Quando
                    </div>
                  </div>
                </div>

                {/* Search button */}
                <div 
                  onClick={scrollToForm}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 md:py-4 rounded-r-xl transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Search className="h-5 w-5 mr-2" />
                  <span className="font-medium">Cerca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Doctor Assistant */}
      <AIDoctorAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </section>
  )
}

