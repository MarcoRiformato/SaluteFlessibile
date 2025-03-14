"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, ArrowLeft } from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"

export default function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState({
    doctor: "",
    date: "",
    time: "",
  })

  useEffect(() => {
    if (!searchParams) return

    const doctor = searchParams.get("doctor") || ""
    const date = searchParams.get("date") || ""
    const time = searchParams.get("time") || ""

    setBookingDetails({ doctor, date, time })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 md:py-16">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-green-100 p-3 sm:p-4 rounded-full">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Prenotazione confermata!</h1>
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
              La tua prenotazione è stata effettuata con successo. Abbiamo inviato una email di conferma con tutti i
              dettagli.
            </p>

            <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
              <h2 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                Dettagli appuntamento
              </h2>

              {bookingDetails.doctor && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-center sm:text-left">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Specialista</p>
                    <p className="font-medium text-sm sm:text-base">{bookingDetails.doctor}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Data e Ora</p>
                    <p className="font-medium text-sm sm:text-base">
                      {bookingDetails.date} - {bookingDetails.time}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/"
                className="flex items-center justify-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alla home
              </Link>
              <Link
                href="/doctors"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
              >
                Prenota un altro appuntamento
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

