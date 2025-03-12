"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const specialists = [
  { name: "Medici", icon: Stethoscope, description: "Medici di base e specialisti" },
  { name: "Infermieri", icon: Users, description: "Assistenza professionale" },
  { name: "Fisioterapisti", icon: Activity, description: "Riabilitazione e terapia fisica" },
  { name: "Psicologi", icon: Brain, description: "Supporto psicologico" },
  { name: "Nutrizionisti", icon: Apple, description: "Consulenza nutrizionale" },
  { name: "Osteopati", icon: Bone, description: "Trattamenti osteopatici" },
  { name: "Farmacisti", icon: Pill, description: "Consulenza farmaceutica" },
  { name: "Wellness", icon: Flower2, description: "Esperti in benessere" },
  { name: "Dentisti", icon: Tooth, description: "Cure dentali" },
  { name: "Oculisti", icon: Eye, description: "Salute degli occhi" },
  { name: "Otorino", icon: Ear, description: "Specialisti ORL" },
  { name: "Cardiologi", icon: Heart, description: "Specialisti del cuore" },
]

export default function SpecialistTabs() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [selectedSpecialist, setSelectedSpecialist] = useState<(typeof specialists)[0] | null>(null)

  const handleSpecialistClick = (specialist: (typeof specialists)[0], index: number) => {
    setActiveTab(index)
    setSelectedSpecialist(specialist)
    setShowModal(true)
  }

  const handleConfirm = () => {
    if (selectedSpecialist) {
      // Navigate to doctors page with the selected specialty
      router.push(`/doctors?specialty=${encodeURIComponent(selectedSpecialist.name)}`)
    }
    setShowModal(false)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Scegli tra i migliori specialisti</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accedi a una rete di professionisti verificati e prenota la tua visita in tutta sicurezza
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              {index < specialists.length - 1 && (
                <div className="hidden md:block absolute right-[-2rem] top-[50%] text-yellow-500 text-4xl transform -translate-y-1/2">
                  →
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-xl"
            onClick={() => router.push("/doctors")}
          >
            Mostra tutti gli specialisti
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedSpecialist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Conferma selezione</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <selectedSpecialist.icon className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedSpecialist.name}</h4>
                  <p className="text-sm text-gray-600">{selectedSpecialist.description}</p>
                </div>
              </div>

              <p className="text-gray-700">Vuoi vedere tutti gli specialisti disponibili in questa categoria?</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

