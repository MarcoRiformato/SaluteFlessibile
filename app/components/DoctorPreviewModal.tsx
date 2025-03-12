"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Star, MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import AppointmentForm from "./AppointmentForm"

// Mock available time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 13) {
      // Skip lunch hour
      slots.push(`${hour}:00`)
      if (hour !== 17) slots.push(`${hour}:30`)
    }
  }
  return slots
}

// Generate dates for the next 14 days
const generateDates = () => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date)
  }

  return dates
}

const availableDates = generateDates()
const timeSlots = generateTimeSlots()

// Randomly make some time slots unavailable
const getAvailableTimeSlots = (date: Date) => {
  // Use the date to seed the random availability
  const dateString = date.toISOString().split("T")[0]
  const dateSeed = dateString.split("-").reduce((acc, val) => acc + Number.parseInt(val), 0)

  return timeSlots.filter((_, index) => {
    // Use a deterministic "random" based on the date and index
    return (dateSeed + index) % 3 !== 0
  })
}

interface DoctorPreviewModalProps {
  doctor: {
    id: number
    name: string
    specialty: string
    rating: number
    reviews: number
    location: string
    distance: string
    available: string
    image: string
    specializations: string[]
    languages: string[]
    education: string
    about: string
  }
  onClose: () => void
}

export default function DoctorPreviewModal({ doctor, onClose }: DoctorPreviewModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(availableDates[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)

  const availableTimeSlots = getAvailableTimeSlots(selectedDate)

  const displayDates = availableDates.slice(currentWeek * 7, (currentWeek + 1) * 7)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setShowForm(false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowForm(true)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{doctor.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!showForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Doctor info */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.specialty}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500 text-sm">({doctor.reviews} recensioni)</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {doctor.location} ({doctor.distance})
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Informazioni</h4>
                  <p className="text-gray-600">{doctor.about}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Specializzazioni</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Lingue parlate</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Formazione</h4>
                  <p className="text-gray-600">{doctor.education}</p>
                </div>
              </div>

              {/* Calendar view */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-yellow-500" />
                      Seleziona una data
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                        disabled={currentWeek === 0}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous week"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentWeek(Math.min(1, currentWeek + 1))}
                        disabled={currentWeek === 1}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next week"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {displayDates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => handleDateSelect(date)}
                        className={`p-2 rounded-lg text-center transition-colors ${
                          selectedDate.toDateString() === date.toDateString()
                            ? "bg-yellow-400 text-gray-900"
                            : "hover:bg-yellow-100"
                        } ${isToday(date) ? "border-2 border-yellow-500" : ""}`}
                      >
                        <div className="text-xs font-medium">
                          {date.toLocaleDateString("it-IT", { weekday: "short" })}
                        </div>
                        <div className="font-bold">{date.getDate()}</div>
                        <div className="text-xs">{date.toLocaleDateString("it-IT", { month: "short" })}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    Orari disponibili per {formatDate(selectedDate)}
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`p-2 border rounded-lg text-center transition-colors ${
                            selectedTime === time
                              ? "bg-yellow-400 border-yellow-500 text-gray-900"
                              : "hover:bg-yellow-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-gray-500 py-4">
                        Nessun orario disponibile per questa data
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AppointmentForm
              doctor={doctor}
              appointmentDate={selectedDate}
              appointmentTime={selectedTime || ""}
              onBack={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

