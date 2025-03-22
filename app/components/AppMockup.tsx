"use client"

import Image from "next/image"
import { Button } from "@/components/ui"
import Link from "next/link"

export default function AppMockup() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left transition-all duration-500 hover:translate-x-2">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Coming Soon
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">L'app che rivoluzionerà la tua salute</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              Stiamo lavorando per offrirti la migliore esperienza possibile. Registrati ora per essere tra i primi a provare l'app e ricevere offerte esclusive al lancio.
            </p>
            <form className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto md:mx-0 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="Cognome"
                  className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  placeholder="Il tuo indirizzo email"
                  className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold whitespace-nowrap rounded-xl text-sm sm:text-base py-2 sm:py-3">
                  Iscriviti ora
                </Button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900">✓</span>
                Accesso prioritario
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900">✓</span>
                Offerte esclusive al lancio
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900">✓</span>
                100% Gratuito
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 transition-all duration-500 hover:translate-x-[-2px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-3xl sm:rounded-[3rem] blur-2xl sm:blur-3xl opacity-20"></div>
              <Image
                src="/dottore-abbraccia.png"
                alt="FlexiCare App Mockup"
                width={300}
                height={600}
                className="relative rounded-2xl sm:rounded-[2rem] shadow-xl sm:shadow-2xl border-4 sm:border-8 border-white w-[200px] sm:w-[250px] md:w-[300px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

