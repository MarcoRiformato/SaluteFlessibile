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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">{doctor.name}</h2>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="p-3 sm:p-6">
          {!showForm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {/* Doctor info */}
              <div>
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
                  />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{doctor.specialty}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm sm:text-base">{doctor.rating}</span>
                      <span className="text-gray-500 text-xs sm:text-sm">({doctor.reviews} recensioni)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {doctor.location}
                    </div>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Specializzazioni</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs sm:text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Lingue parlate</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Formazione</h4>
                  <p className="text-gray-700 text-sm sm:text-base">{doctor.education}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Chi sono</h4>
                  <p className="text-gray-700 text-sm sm:text-base">{doctor.about}</p>
                </div>
              </div>

              {/* Booking section */}
              <div className="bg-gray-50 p-3 sm:p-6 rounded-lg">
                <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Seleziona data e ora</h3>

                {/* Date selection */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <button
                      onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                      disabled={currentWeek === 0}
                      className={`p-1 rounded ${
                        currentWeek === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <span className="text-sm sm:text-base font-medium">
                      {displayDates.length > 0
                        ? `${displayDates[0].toLocaleDateString("it-IT", {
                            month: "short",
                            day: "numeric",
                          })} - ${displayDates[displayDates.length - 1].toLocaleDateString("it-IT", {
                            month: "short",
                            day: "numeric",
                          })}`
                        : ""}
                    </span>
                    <button
                      onClick={() => setCurrentWeek(currentWeek + 1)}
                      disabled={(currentWeek + 1) * 7 >= availableDates.length}
                      className={`p-1 rounded ${
                        (currentWeek + 1) * 7 >= availableDates.length
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                    {displayDates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() => handleDateSelect(date)}
                        className={`py-1 sm:py-2 px-1 sm:px-3 rounded-md text-center text-xs sm:text-sm transition-colors ${
                          date.toDateString() === selectedDate.toDateString()
                            ? "bg-yellow-400 text-gray-900 font-medium"
                            : "bg-white border hover:bg-gray-50"
                        }`}
                      >
                        <div className="font-medium">{date.toLocaleDateString("it-IT", { weekday: "short" })}</div>
                        <div className="mt-1">
                          {isToday(date) ? "Oggi" : date.toLocaleDateString("it-IT", { day: "numeric" })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time selection */}
                <div>
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Orari disponibili</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                    {availableTimeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-1 sm:py-2 px-2 rounded-md text-center text-xs sm:text-sm transition-colors ${
                          selectedTime === time
                            ? "bg-yellow-400 text-gray-900 font-medium"
                            : "bg-white border hover:bg-gray-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AppointmentForm
              doctor={doctor}
              date={selectedDate}
              time={selectedTime || ""}
              onBack={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

