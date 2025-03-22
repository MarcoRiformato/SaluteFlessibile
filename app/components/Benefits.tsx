"use client"

import { Clock, MessageSquare, CheckSquare } from "lucide-react"

const benefits = [
  {
    title: "Detta le tue condizioni",
    description: "Indica le tue disponibilità",
    icon: CheckSquare,
  },
  {
    title: "Opinioni reali senza filtri",
    description: "Utenti veri, che dicono ciò che pensano",
    icon: MessageSquare,
  },
  {
    title: "Risparmia tempo a costo zero",
    description: "Prenota in pochi click, 24/7, senza costi aggiuntivi.",
    icon: Clock,
  },
]

export default function Benefits() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Perché scegliere FlexiCare</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            La piattaforma che rende semplice e sicura la prenotazione di servizi sanitari
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center max-w-sm mx-auto w-full relative bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-yellow-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="bg-yellow-400 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 transform transition-transform duration-300 hover:scale-110">
                <benefit.icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-900" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-900">{benefit.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
              {index < benefits.length - 1 && index !== 1 && (
                <div className="hidden md:block absolute right-[-1.5rem] lg:right-[-2rem] top-[50%] text-yellow-500 text-3xl lg:text-4xl transform -translate-y-1/2">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <div className="inline-block bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-yellow-100 w-full max-w-md">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Più di 10.000 pazienti soddisfatti</p>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-yellow-500">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-xl sm:text-2xl">
                  {star}
                </span>
              ))}
            </div>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Rating medio 4.8/5 basato su 2.500+ recensioni</p>
          </div>
        </div> */}
      </div>
    </section>
  )
}

