"use client"

import Image from "next/image"
import Link from "next/link"
import { Input, Button } from "@/components/ui"
import { ArrowRight, CheckCircle } from "lucide-react"

const benefits = [
  "Aumenta la tua visibilità online",
  "Gestisci il tuo calendario in autonomia",
  "Ricevi pagamenti in modo sicuro",
  "Zero costi fissi, solo commissioni sulle prenotazioni",
]

export default function JoinUs() {
  return (
    <section id="join-us" className="py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 transition-all duration-500 hover:translate-x-2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Unisciti a FlexiCare</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sei un professionista della salute? Entra a far parte della nostra rete e raggiungi nuovi pazienti.
            </p>

            <div className="mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 mb-4 transition-all duration-300 hover:translate-x-1"
                >
                  <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mb-8">
              <Input
                type="email"
                placeholder="La tua email professionale"
                className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold whitespace-nowrap rounded-xl">
                Richiedi info
              </Button>
            </form>

            <Link
              href="/per-i-professionisti"
              className="text-yellow-600 hover:text-yellow-700 flex items-center gap-2 group transition-all duration-300"
            >
              Scopri tutti i vantaggi per i professionisti
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center transition-all duration-500 hover:translate-x-[-2px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-2xl blur-3xl opacity-20"></div>
              <Image
                src="/dottori-bici.webp"
                alt="Dottore che usa FlexiCare"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

