"use client"

import { useState, useEffect, useRef } from "react"
import {
  Stethoscope,
  Brain,
  Activity,
  Apple,
  Bone,
  Users,
  Pill,
  Heart,
  Flower2,
  SmileIcon as Tooth,
  Eye,
  Ear,
  X,
  Dog,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SpecialistTabsSkeleton } from "./Skeleton"

const specialists = [
  { name: "Medici", icon: Stethoscope, description: "Medici di base e specialisti (Oculisti, Otorino)" },
  { name: "Infermieri", icon: Users, description: "Assistenza professionale" },
  { name: "Fisioterapisti", icon: Activity, description: "Riabilitazione e terapia fisica" },
  { name: "Psicologi", icon: Brain, description: "Supporto psicologico" },
  { name: "Nutrizionisti", icon: Apple, description: "Consulenza nutrizionale" },
  { name: "Osteopati", icon: Bone, description: "Trattamenti osteopatici" },
  { name: "Farmacisti", icon: Pill, description: "Consulenza farmaceutica" },
  { name: "Wellness", icon: Flower2, description: "Esperti in benessere" },
  { name: "Veterinari", icon: Dog, description: "Cura degli animali" },
  { name: "Dentisti", icon: Tooth, description: "Cure dentali" },
]

export default function SpecialistTabs() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedSpecialist, setSelectedSpecialist] = useState<(typeof specialists)[0] | null>(null)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById("join-us")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSpecialistClick = (specialist: (typeof specialists)[0], index: number) => {
    setActiveTab(index)
    setSelectedSpecialist(specialist)
    setIsButtonVisible(true)
  }

  const handleViewSpecialists = () => {
    if (selectedSpecialist) {
      scrollToForm()
    }
  }

  const closeButton = () => {
    setIsButtonVisible(false)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Inserisci un indirizzo email")
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Submitting email:', email);
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "CLIENTS",
          merge_fields: {
            FNAME: "",
            LNAME: "",
            PHONE: "",
            TYPE: "Paziente",
            SPECIALIZ: "",
            CITY: ""
          }
        }),
      })

      const data = await response.json()
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'iscrizione")
      }

      toast.success("Grazie per esserti iscritto!")
      setEmail("")
      router.push('/thank-you')
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || "Si è verificato un errore. Riprova più tardi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsButtonVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [buttonRef])

  if (isLoading) {
    return <SpecialistTabsSkeleton />
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Scegli tra i migliori specialisti</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Presto potrai trovare il professionista perfetto per te. Registrati ora per essere tra i primi a utilizzare il servizio.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {specialists.map((specialist, index) => (
            <div
              key={specialist.name}
              onClick={() => handleSpecialistClick(specialist, index)}
              className={`flex flex-col items-center p-3 sm:p-4 md:p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === index
                  ? "bg-yellow-400 text-gray-900 shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-yellow-50 border border-gray-100"
              }`}
            >
              <specialist.icon
                className={`h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 ${activeTab === index ? "text-gray-900" : "text-yellow-500"}`}
              />
              <span className="font-semibold text-center text-xs sm:text-sm md:text-base">{specialist.name}</span>
              <p className="text-[10px] sm:text-xs mt-1 opacity-80 hidden sm:block">{specialist.description}</p>
            </div>
          ))}
        </div>

        {/* Background Overlay */}
        {isButtonVisible && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-30 transition-opacity duration-300 ease-in-out"
            onClick={closeButton}
          />
        )}

        {/* Action Button */}
        {selectedSpecialist && (
          <div 
            ref={buttonRef}
            className={`fixed bottom-4 sm:bottom-8 left-0 right-0 flex justify-center z-40 transition-all duration-500 ease-in-out ${
              isButtonVisible 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform translate-y-20 pointer-events-none"
            }`}
          >
            <div className="relative px-4 sm:px-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewSpecialists()
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl border-2 border-blue-400 transition-all transform hover:scale-105 duration-300 flex items-center space-x-2 text-sm sm:text-base"
              >
                <span className="underline">Clicca per vedere i nostri {selectedSpecialist.name}</span>
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  closeButton()
                }}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

