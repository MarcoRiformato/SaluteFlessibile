"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface AppointmentFormProps {
  doctor: {
    id: number
    name: string
    specialty: string
  }
  date: Date
  time: string
  onBack: () => void
}

export default function AppointmentForm({ doctor, date, time, onBack }: AppointmentFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    notes: "",
    insurance: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "Il nome è obbligatorio"
    if (!formData.lastName.trim()) newErrors.lastName = "Il cognome è obbligatorio"
    if (!formData.email.trim()) newErrors.email = "L'email è obbligatoria"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Inserisci un indirizzo email valido"
    if (!formData.phone.trim()) newErrors.phone = "Il numero di telefono è obbligatorio"
    if (!formData.reason.trim()) newErrors.reason = "Il motivo della visita è obbligatorio"
    if (!formData.termsAccepted) newErrors.termsAccepted = "Devi accettare i termini e le condizioni"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        // Redirect to success page with appointment details
        router.push(
          `/booking-success?doctor=${encodeURIComponent(doctor.name)}&date=${encodeURIComponent(
            formatDate(date)
          )}&time=${encodeURIComponent(time)}`,
        )
      }, 1500)
    }
  }

  const formatDate = (date: Date) => {
    if (!date) return '';
    
    try {
      return date.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return '';
    }
  }

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 mb-6">
        <ChevronLeft className="h-4 w-4" />
        Torna alla selezione dell'orario
      </button>

      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Riepilogo appuntamento</h3>
        <p>
          <span className="font-medium">Specialista:</span> {doctor.name} ({doctor.specialty})
        </p>
        <p>
          <span className="font-medium">Data:</span> {formatDate(date)}
        </p>
        <p>
          <span className="font-medium">Ora:</span> {time}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Cognome *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Motivo della visita *
          </label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              errors.reason ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Seleziona un motivo</option>
            <option value="Prima visita">Prima visita</option>
            <option value="Controllo">Controllo</option>
            <option value="Consulenza">Consulenza</option>
            <option value="Emergenza">Emergenza</option>
            <option value="Altro">Altro</option>
          </select>
          {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
            Assicurazione (opzionale)
          </label>
          <select
            id="insurance"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Nessuna assicurazione</option>
            <option value="Assicurazione A">Assicurazione A</option>
            <option value="Assicurazione B">Assicurazione B</option>
            <option value="Assicurazione C">Assicurazione C</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Note aggiuntive (opzionale)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Inserisci eventuali informazioni aggiuntive per il medico"
          ></textarea>
        </div>

        <div className="mb-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="mt-1 mr-2"
            />
            <label htmlFor="termsAccepted" className="text-sm text-gray-700">
              Accetto i{" "}
              <a href="#" className="text-yellow-600 hover:underline">
                termini e le condizioni
              </a>{" "}
              e l'informativa sulla{" "}
              <a href="#" className="text-yellow-600 hover:underline">
                privacy
              </a>{" "}
              *
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? "Prenotazione in corso..." : "Conferma prenotazione"}
          </button>
        </div>
      </form>
    </div>
  )
}

