"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Button } from "@/components/ui"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import type { SubscriptionType } from "@/lib/mailchimp"
import { JoinUsSkeleton } from "./Skeleton"

export default function JoinUs() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    type: "CLIENTS" as SubscriptionType,
    city: "",
    phone: "",
    specialization: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const cityInputRef = useRef<HTMLInputElement>(null)

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'city') {
      fetchCitySuggestions(value)
      setSelectedSuggestionIndex(-1)
    }
  }

  const fetchCitySuggestions = async (input: string) => {
    if (input.length < 2) {
      setCitySuggestions([])
      return
    }

    try {
      const response = await fetch(`/api/cities?input=${encodeURIComponent(input)}`)
      const data = await response.json()
      setCitySuggestions(data.suggestions)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error fetching city suggestions:', error)
    }
  }

  const selectCity = (city: string) => {
    setFormData(prev => ({
      ...prev,
      city
    }))
    setShowSuggestions(false)
    setCitySuggestions([])
    setSelectedSuggestionIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev < citySuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => prev > -1 ? prev - 1 : prev)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0 && citySuggestions[selectedSuggestionIndex]) {
          selectCity(citySuggestions[selectedSuggestionIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.name || !formData.surname || !formData.city || !formData.phone) {
      toast.error("Compila tutti i campi obbligatori")
      return
    }

    if (formData.type === "DOCTORS" && !formData.specialization) {
      toast.error("Inserisci la tua specializzazione")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Inserisci un indirizzo email valido")
      return
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Inserisci un numero di telefono valido")
      return
    }

    setIsSubmitting(true)
    try {
      console.log('Submitting form data:', formData);
      
      const subscriptionData = {
        email: formData.email,
        type: formData.type,
        tags: [],
        merge_fields: {
          FNAME: formData.name,
          LNAME: formData.surname,
          PHONE: formData.phone,
          TYPE: formData.type === "DOCTORS" ? "Dottore" : "Paziente",
          SPECIALIZ: formData.type === "DOCTORS" ? formData.specialization : "",
          CITY: formData.city
        }
      };

      console.log('Subscription data being sent:', subscriptionData);

      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscriptionData),
      })

      const data = await response.json()
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'iscrizione")
      }

      toast.success("Grazie per esserti iscritto! Ti contatteremo presto.")
      router.push('/thank-you')
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast.error(error.message || "Si è verificato un errore. Riprova più tardi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <JoinUsSkeleton />
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-[#f9f5e3] to-[#f5f5f5]">
      <div className="w-full max-w-5xl mx-auto bg-[#fffaeb] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
        {/* Header section */}
        <div className="p-4 sm:p-6 pb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Non rimandare la cura della tua salute</h1>
          <p className="text-sm sm:text-base text-gray-700 mt-2 mb-3 sm:mb-4">
            Flexicare sta arrivando: prenotare visite e consulenze sarà finalmente semplice e trasparente. Lascia i tuoi
            dati e unisciti a chi vuole risparmiare tempo e scoprire i migliori professionisti, senza compromessi sulla
            qualità
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Form */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6">
            <form id="join-us" onSubmit={handleSubscribe} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                  required
                  autoComplete="given-name"
                />
                <Input
                  type="text"
                  name="surname"
                  placeholder="Cognome"
                  value={formData.surname}
                  onChange={handleChange}
                  className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                  required
                  autoComplete="family-name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                  required
                  autoComplete="email"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Telefono"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                  required
                  autoComplete="tel"
                />
              </div>
              <div className={`grid ${formData.type === "DOCTORS" ? "grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" : ""}`}>
                <div className="relative" ref={cityInputRef}>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Città"
                    value={formData.city}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                    required
                    autoComplete="address-level2"
                  />
                  {showSuggestions && citySuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {citySuggestions.map((city, index) => (
                        <div
                          key={city}
                          className={`px-3 py-2 cursor-pointer hover:bg-gray-50 rounded-lg ${
                            index === selectedSuggestionIndex ? 'bg-gray-50' : ''
                          }`}
                          onClick={() => selectCity(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {formData.type === "DOCTORS" && (
                  <Input
                    type="text"
                    name="specialization"
                    placeholder="Specializzazione"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="bg-white rounded-lg sm:rounded-xl border-gray-200 focus:border-[#ffc107] focus:ring-[#ffc107]/20 h-10 sm:h-11"
                    required
                  />
                )}
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-sm font-medium mb-2 text-gray-700">Sei un:</p>
                <RadioGroup
                  defaultValue="CLIENTS"
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as SubscriptionType }))}
                >
                  <div className="flex-1">
                    <div
                      className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                        formData.type === "CLIENTS" ? "border-[#ffc107] bg-[#fffbeb]" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, type: "CLIENTS" }))}
                    >
                      <RadioGroupItem value="CLIENTS" id="clients" className="sr-only" />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="clients" className="font-medium cursor-pointer text-gray-900">
                          Paziente
                        </Label>
                        {formData.type === "CLIENTS" && (
                          <div className="text-[#ffc107]">
                            <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Trova i migliori professionisti</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div
                      className={`border-2 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                        formData.type === "DOCTORS" ? "border-[#ffc107] bg-[#fffbeb]" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, type: "DOCTORS" }))}
                    >
                      <RadioGroupItem value="DOCTORS" id="doctors" className="sr-only" />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="doctors" className="font-medium cursor-pointer text-gray-900">
                          Dottore
                        </Label>
                        {formData.type === "DOCTORS" && (
                          <div className="text-[#ffc107]">
                            <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Espandi la tua pratica medica</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full bg-[#ffc107] hover:bg-[#ffca28] text-black font-medium h-10 sm:h-11 rounded-lg sm:rounded-xl text-sm transition-all duration-200 gap-2 focus:ring-4 focus:ring-[#ffc107]/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <span>Invio in corso...</span>
                  </>
                ) : (
                  <>
                    <span>Iscriviti ora</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right side - Benefits */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-gradient-to-br from-[#f0f9f4] to-[#f8fcf9] relative">
            <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-[#4caf50]/10 rounded-bl-[100px]"></div>

            <div className="relative">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ffc107] flex items-center justify-center mr-2 sm:mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sm:w-4 sm:h-4"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#2e7d32]">Per i medici</h2>
              </div>

              <div className={`transition-all duration-300 ${formData.type === "DOCTORS" ? "opacity-100" : "opacity-80"}`}>
                <p className="text-sm sm:text-base text-[#1b5e20] mb-3 sm:mb-4">
                  Unisciti alla nostra rete di professionisti e goditi questi vantaggi esclusivi:
                </p>

                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start">
                    <div className="mr-2 sm:mr-3 mt-0.5 text-[#ffc107]">
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base text-[#1b5e20]">Aumenta la tua visibilità online</span>
                      <p className="text-xs sm:text-sm text-[#1b5e20]/70 mt-0.5">Raggiungi più pazienti nella tua zona</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 sm:mr-3 mt-0.5 text-[#ffc107]">
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base text-[#1b5e20]">Gestisci il tuo calendario in autonomia</span>
                      <p className="text-xs sm:text-sm text-[#1b5e20]/70 mt-0.5">Controlla la tua disponibilità in tempo reale</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 sm:mr-3 mt-0.5 text-[#ffc107]">
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base text-[#1b5e20]">Ricevi pagamenti in modo sicuro</span>
                      <p className="text-xs sm:text-sm text-[#1b5e20]/70 mt-0.5">Transazioni protette e trasparenti</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 sm:mr-3 mt-0.5 text-[#ffc107]">
                      <CheckCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <div>
                      <span className="font-medium text-sm sm:text-base text-[#1b5e20]">Zero costi fissi, solo commissioni sulle prenotazioni</span>
                      <p className="text-xs sm:text-sm text-[#1b5e20]/70 mt-0.5">Paghi solo quando guadagni</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

