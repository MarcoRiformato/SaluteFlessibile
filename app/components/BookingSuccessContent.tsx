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
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Prenotazione confermata!</h1>
            <p className="text-xl text-gray-600 mb-8">
              La tua prenotazione è stata effettuata con successo. Abbiamo inviato una email di conferma con tutti i
              dettagli.
            </p>

            <div className="bg-yellow-50 p-6 rounded-lg mb-8">
              <h2 className="font-semibold text-lg mb-4 flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-yellow-600" />
                Dettagli appuntamento
              </h2>

              <div className="space-y-2 text-left">
                <p className="flex justify-between">
                  <span className="font-medium">Specialista:</span>
                  <span>{bookingDetails.doctor}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Data:</span>
                  <span>{bookingDetails.date}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Ora:</span>
                  <span>{bookingDetails.time}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Numero di prenotazione:</span>
                  <span>
                    FC-
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna alla home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

