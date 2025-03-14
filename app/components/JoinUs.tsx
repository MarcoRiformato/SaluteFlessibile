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
    <section id="join-us" className="py-12 sm:py-16 md:py-20 bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left transition-all duration-500 hover:translate-x-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">Unisciti a FlexiCare</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              Sei un professionista della salute? Entra a far parte della nostra rete e raggiungi nuovi pazienti.
            </p>

            <div className="mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 transition-all duration-300 hover:translate-x-1"
                >
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto md:mx-0 mb-6 sm:mb-8">
              <Input
                type="email"
                placeholder="La tua email professionale"
                className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
              />
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold whitespace-nowrap rounded-xl text-sm sm:text-base py-2 sm:py-3">
                Richiedi info
              </Button>
            </form>

            <Link
              href="/per-i-professionisti"
              className="text-sm sm:text-base text-yellow-600 hover:text-yellow-700 flex items-center justify-center md:justify-start gap-1 sm:gap-2 group transition-all duration-300"
            >
              Scopri tutti i vantaggi per i professionisti
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0 transition-all duration-500 hover:translate-x-[-2px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-xl sm:rounded-2xl blur-2xl sm:blur-3xl opacity-20"></div>
              <Image
                src="/dottori-bici.webp"
                alt="Dottore che usa FlexiCare"
                width={400}
                height={400}
                className="relative rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl w-[280px] sm:w-[350px] md:w-[400px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

