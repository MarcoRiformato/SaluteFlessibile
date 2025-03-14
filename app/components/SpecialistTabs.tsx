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
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleSpecialistClick = (specialist: (typeof specialists)[0], index: number) => {
    setActiveTab(index)
    setSelectedSpecialist(specialist)
    setIsButtonVisible(true)
  }

  const handleViewSpecialists = () => {
    if (selectedSpecialist) {
      router.push(`/doctors?specialty=${encodeURIComponent(selectedSpecialist.name)}`)
    }
  }

  const closeButton = () => {
    setIsButtonVisible(false)
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Scegli tra i migliori specialisti</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accedi a una rete di professionisti verificati e prenota la tua visita in tutta sicurezza
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {specialists.map((specialist, index) => (
            <button
              key={specialist.name}
              className={`flex flex-col items-center p-6 rounded-xl transition-all duration-300 ${
                activeTab === index
                  ? "bg-yellow-400 text-gray-900 shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-yellow-50 border border-gray-100"
              }`}
              onClick={() => handleSpecialistClick(specialist, index)}
            >
              <specialist.icon
                className={`h-8 w-8 mb-3 ${activeTab === index ? "text-gray-900" : "text-yellow-500"}`}
              />
              <span className="font-semibold text-center">{specialist.name}</span>
              <p className="text-xs mt-1 opacity-80">{specialist.description}</p>
            </button>
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
            className={`fixed bottom-8 left-0 right-0 flex justify-center z-40 transition-all duration-500 ease-in-out ${
              isButtonVisible 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform translate-y-20 pointer-events-none"
            }`}
          >
            <div className="relative">
              <button
                onClick={handleViewSpecialists}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-xl border-2 border-blue-400 transition-all transform hover:scale-105 duration-300 flex items-center space-x-2"
              >
                <span className="underline">Clicca per vedere i nostri {selectedSpecialist.name}</span>
                <ExternalLink className="h-5 w-5 ml-2" />
              </button>
              <button 
                onClick={closeButton}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-xl"
            onClick={() => router.push("/doctors")}
          >
            Mostra tutti gli specialisti
          </Button>
        </div>
      </div>
    </section>
  )
}

