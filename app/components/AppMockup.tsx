"use client"

import Image from "next/image"
import { Button } from "@/components/ui"
import Link from "next/link"

export default function AppMockup() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 transition-all duration-500 hover:translate-x-2">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Scarica l'app
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Risparmia tempo con l'app</h2>
            <p className="text-xl text-gray-600 mb-8">
              Gestisci le tue prenotazioni, ricevi promemoria e accedi alla tua cartella clinica ovunque tu sia. Sii tra
              i primi a provarla!
            </p>
            <form className="flex flex-col gap-4 max-w-md mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Nome"
                  className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Cognome"
                  className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Il tuo indirizzo email"
                  className="flex-grow px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold whitespace-nowrap rounded-xl">
                  Avvisami al lancio
                </Button>
              </div>
            </form>
            <Link
              href="https://flexicare.app"
              className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
            >
              Visita il sito dell'app →
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center transition-all duration-500 hover:translate-x-[-2px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-[3rem] blur-3xl opacity-20"></div>
              <Image
                src="/dottore-abbraccia.png"
                alt="FlexiCare App Mockup"
                width={300}
                height={600}
                className="relative rounded-[2rem] shadow-2xl border-8 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

