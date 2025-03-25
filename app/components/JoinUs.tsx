"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Button } from "@/components/ui"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import type { SubscriptionType } from "@/lib/mailchimp"

export default function JoinUs() {
  const router = useRouter()
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById('join-us')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    // Add click event listeners to all clickable elements
    const addClickListeners = () => {
      const clickableElements = document.querySelectorAll('a, button, input[type="submit"], [role="button"]')
      clickableElements.forEach(element => {
        if (!element.closest('#join-us')) { // Don't add listeners to elements inside the form
          element.addEventListener('click', (e) => {
            e.preventDefault()
            scrollToForm()
          })
        }
      })
    }

    addClickListeners()
    return () => {
      // Clean up event listeners
      const clickableElements = document.querySelectorAll('a, button, input[type="submit"], [role="button"]')
      clickableElements.forEach(element => {
        if (!element.closest('#join-us')) {
          element.removeEventListener('click', scrollToForm)
        }
      })
    }
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

  return (
    <section id="join-us" className="py-8 sm:py-12 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Non rimandare la cura della tua salute</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Flexicare sta arrivando: prenotare visite e consulenze sarà finalmente semplice e trasparente. Lascia i tuoi dati e unisciti a chi vuole risparmiare tempo e scoprire i migliori professionisti, senza compromessi sulla qualità
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-md mx-auto md:mx-0" autoComplete="on">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                  required
                  autoComplete="given-name"
                />
                <Input
                  type="text"
                  name="surname"
                  placeholder="Cognome"
                  value={formData.surname}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                  required
                  autoComplete="family-name"
                />
              </div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                required
                autoComplete="email"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 py-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="CLIENTS"
                        checked={formData.type === "CLIENTS"}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 text-yellow-400 focus:ring-yellow-400"
                        required
                      />
                      <span className="text-sm text-gray-700">Paziente</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="DOCTORS"
                        checked={formData.type === "DOCTORS"}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 text-yellow-400 focus:ring-yellow-400"
                        required
                      />
                      <span className="text-sm text-gray-700">Dottore</span>
                    </label>
                  </div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Telefono"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                    required
                    autoComplete="tel"
                  />
                  <div className="relative" ref={cityInputRef}>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Città"
                      value={formData.city}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                      required
                      autoComplete="off"
                    />
                    {showSuggestions && citySuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {citySuggestions.map((city, index) => (
                          <div
                            key={city}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
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
                      className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
                      required={formData.type === "DOCTORS"}
                    />
                  )}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors"
              >
                {isSubmitting ? "Invio in corso..." : "Invia"}
              </Button>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square">
              <Image
                src="/images/join-us-image.jpg"
                alt="Join us"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

