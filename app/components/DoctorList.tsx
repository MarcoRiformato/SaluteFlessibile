"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Star, Filter, Search } from "lucide-react"
import DoctorPreviewModal from "./DoctorPreviewModal"
import Header from "./Header"
import Footer from "./Footer"
import { useSearchParams } from "next/navigation"

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Marco Bianchi",
    specialty: "Medico di base",
    rating: 4.9,
    reviews: 124,
    location: "Milano, Centro",
    distance: "1.2 km",
    available: "Oggi",
    image: "https://picsum.photos/seed/doctor1/200",
    specializations: ["Medicina generale", "Geriatria"],
    languages: ["Italiano", "Inglese"],
    education: "Università degli Studi di Milano",
    about:
      "Il Dr. Marco Bianchi è un medico di base con oltre 15 anni di esperienza. Si è laureato presso l'Università degli Studi di Milano e ha completato la specializzazione in Medicina Generale. È noto per il suo approccio empatico e la sua capacità di comunicare efficacemente con i pazienti.",
  },
  {
    id: 2,
    name: "Dr.ssa Giulia Rossi",
    specialty: "Cardiologo",
    rating: 4.8,
    reviews: 98,
    location: "Milano, Navigli",
    distance: "2.5 km",
    available: "Domani",
    image: "https://picsum.photos/seed/doctor2/200",
    specializations: ["Cardiologia", "Medicina interna"],
    languages: ["Italiano", "Francese"],
    education: "Università di Bologna",
    about:
      "La Dr.ssa Giulia Rossi è una cardiologa specializzata nella diagnosi e nel trattamento delle malattie cardiovascolari. Con un'esperienza di oltre 10 anni, offre un approccio personalizzato per ogni paziente, concentrandosi sulla prevenzione e sul miglioramento della qualità della vita.",
  },
  {
    id: 3,
    name: "Dr. Alessandro Verdi",
    specialty: "Dermatologo",
    rating: 4.7,
    reviews: 87,
    location: "Milano, Isola",
    distance: "3.1 km",
    available: "Oggi",
    image: "https://picsum.photos/seed/doctor3/200",
    specializations: ["Dermatologia", "Allergologia"],
    languages: ["Italiano", "Inglese", "Spagnolo"],
    education: "Università La Sapienza di Roma",
    about:
      "Il Dr. Alessandro Verdi è un dermatologo con una vasta esperienza nel trattamento di condizioni della pelle, capelli e unghie. Si è specializzato in dermatologia presso l'Università La Sapienza di Roma e ha completato ulteriori studi in allergologia.",
  },
  {
    id: 4,
    name: "Dr.ssa Laura Neri",
    specialty: "Psicologo",
    rating: 5.0,
    reviews: 156,
    location: "Milano, Porta Romana",
    distance: "1.8 km",
    available: "Giovedì",
    image: "https://picsum.photos/seed/doctor4/200",
    specializations: ["Psicologia clinica", "Terapia cognitivo-comportamentale"],
    languages: ["Italiano", "Inglese"],
    education: "Università degli Studi di Padova",
    about:
      "La Dr.ssa Laura Neri è una psicologa clinica specializzata in terapia cognitivo-comportamentale. Con oltre 12 anni di esperienza, aiuta i pazienti a superare ansia, depressione e altri disturbi psicologici attraverso un approccio personalizzato e basato sull'evidenza.",
  },
  {
    id: 5,
    name: "Dr. Roberto Marini",
    specialty: "Fisioterapista",
    rating: 4.6,
    reviews: 112,
    location: "Milano, Città Studi",
    distance: "2.2 km",
    available: "Venerdì",
    image: "https://picsum.photos/seed/doctor5/200",
    specializations: ["Fisioterapia ortopedica", "Riabilitazione sportiva"],
    languages: ["Italiano"],
    education: "Università degli Studi di Verona",
    about:
      "Il Dr. Roberto Marini è un fisioterapista specializzato in riabilitazione ortopedica e sportiva. Ha lavorato con atleti professionisti e offre trattamenti personalizzati per aiutare i pazienti a recuperare da infortuni e migliorare la loro mobilità.",
  },
]

// Filter options
const specialties = ["Tutti", "Medico di base", "Cardiologo", "Dermatologo", "Psicologo", "Fisioterapista"]

const locations = ["Tutti", "Milano Centro", "Navigli", "Isola", "Porta Romana", "Città Studi"]

export default function DoctorList() {
  const searchParams = useSearchParams()
  const [selectedDoctor, setSelectedDoctor] = useState<(typeof doctors)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Initialize filters from URL params
  const [selectedSpecialty, setSelectedSpecialty] = useState("Tutti")
  const [selectedLocation, setSelectedLocation] = useState("Tutti")
  const [searchQuery, setSearchQuery] = useState("")

  // Update filters from URL params on component mount
  useEffect(() => {
    if (!searchParams) return

    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")
    const query = searchParams.get("query")

    if (specialty) {
      // Check if the specialty exists in our list, otherwise default to "Tutti"
      const matchedSpecialty = specialties.find(
        (s) => s.toLowerCase() === specialty.toLowerCase() || (specialty === "Medici" && s === "Medico di base"),
      )
      if (matchedSpecialty) setSelectedSpecialty(matchedSpecialty)
    }

    if (location) {
      // Check if the location exists in our list, otherwise default to "Tutti"
      const matchedLocation = locations.find((l) => l.toLowerCase().includes(location.toLowerCase()))
      if (matchedLocation) setSelectedLocation(matchedLocation)
    }

    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Filter doctors based on selected filters and search query
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === "Tutti" || doctor.specialty === selectedSpecialty
    const matchesLocation =
      selectedLocation === "Tutti" || doctor.location.includes(selectedLocation.replace("Milano ", ""))
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSpecialty && matchesLocation && matchesSearch
  })

  const openModal = (doctor: (typeof doctors)[0]) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Trova il tuo specialista</h1>

        {/* Search and filter bar */}
        <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome o specialità"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-1 gap-2 sm:gap-4">
              <div className="flex-1">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 sm:px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Altri filtri</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Doctor list */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-3 sm:p-4 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{filteredDoctors.length} specialisti trovati</h2>
              <div className="space-y-3 sm:space-y-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="border border-gray-100 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openModal(doctor)}
                  >
                    {/* Better layout for mobile */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Top row for mobile: Image, name, and badge */}
                      <div className="w-full flex items-center gap-3 mb-1 sm:mb-0 sm:hidden">
                        <div className="flex-shrink-0">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={48}
                            height={48}
                            className="rounded-full w-12 h-12 object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base leading-tight">{doctor.name}</h3>
                          <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                        </div>
                        <div className="flex-shrink-0 ml-1">
                          <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                            {doctor.available}
                          </span>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div className="hidden sm:block flex-shrink-0">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={60}
                          height={60}
                          className="rounded-full w-16 h-16 object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Desktop: Name and specialty */}
                        <div className="hidden sm:block">
                          <h3 className="font-semibold text-lg line-clamp-1">{doctor.name}</h3>
                          <p className="text-gray-600 text-base">{doctor.specialty}</p>
                        </div>
                        
                        {/* Mobile: Just specialty hidden since we moved it up */}
                        <div className="sm:hidden">
                          {/* Location and rating row combined */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                              <span className="text-xs">{doctor.location}</span>
                              <span className="text-xs text-gray-500 ml-1">{doctor.distance}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                              <span className="font-medium text-xs">{doctor.rating}</span>
                              <span className="text-gray-500 text-xs">({doctor.reviews} rec.)</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Desktop rating */}
                        <div className="hidden sm:flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span className="font-medium text-base">{doctor.rating}</span>
                          <span className="text-gray-500 text-sm">({doctor.reviews} recensioni)</span>
                        </div>
                        
                        {/* Desktop location section */}
                        <div className="hidden sm:flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span>{doctor.location}</span>
                          </div>
                          <div className="text-sm text-gray-600">{doctor.distance}</div>
                        </div>
                      </div>
                      
                      {/* Desktop: Availability badge */}
                      <div className="hidden sm:flex flex-shrink-0 self-start">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                          Disponibile {doctor.available}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map view */}
          <div className="w-full lg:w-1/2 hidden lg:block">
            <div className="bg-white rounded-xl shadow-md p-4 h-[600px] sticky top-4">
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/map/600/600"
                  alt="Map"
                  fill
                  className="object-cover"
                />
                {/* Placeholder pins for doctors */}
                {filteredDoctors.map((doctor, index) => (
                  <div
                    key={doctor.id}
                    className="absolute bg-yellow-400 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: `${100 + ((index * 70) % 400)}px`,
                      left: `${150 + ((index * 90) % 300)}px`,
                    }}
                    onClick={() => openModal(doctor)}
                  >
                    {doctor.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor preview modal */}
      {isModalOpen && selectedDoctor && <DoctorPreviewModal doctor={selectedDoctor} onClose={closeModal} />}
      <Footer />
    </>
  )
}

