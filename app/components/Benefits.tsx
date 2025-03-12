"use client"

import { Clock, MessageSquare, CheckSquare } from "lucide-react"

const benefits = [
  {
    title: "Detta le tue condizioni",
    description: "Scegli il professionista più adatto alle tue esigenze in base a disponibilità, prezzo e recensioni.",
    icon: CheckSquare,
  },
  {
    title: "Opinioni reali senza filtri",
    description: "Leggi le recensioni verificate di chi ha già provato il servizio.",
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
    <section className="py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Perché scegliere FlexiCare</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La piattaforma che rende semplice e sicura la prenotazione di servizi sanitari
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center max-w-sm relative bg-white p-8 rounded-xl shadow-lg border border-yellow-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="bg-yellow-400 p-4 rounded-xl mb-6 transform transition-transform duration-300 hover:scale-110">
                <benefit.icon className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
              {index < benefits.length - 1 && (
                <div className="hidden md:block absolute right-[-2rem] top-[50%] text-yellow-500 text-4xl transform -translate-y-1/2">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-xl p-6 shadow-lg border border-yellow-100">
            <p className="text-2xl font-semibold text-gray-900 mb-4">Più di 10.000 pazienti soddisfatti</p>
            <div className="flex items-center justify-center gap-4 text-yellow-500">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-2xl">
                  {star}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-2">Rating medio 4.8/5 basato su 2.500+ recensioni</p>
          </div>
        </div>
      </div>
    </section>
  )
}

