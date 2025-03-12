import { Suspense } from "react"
import DoctorList from "../components/DoctorList"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trova Specialisti | FlexiCare",
  description: "Cerca e prenota appuntamenti con i migliori specialisti nella tua zona",
}

// Loading component for Suspense fallback
function DoctorsLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Caricamento specialisti...</p>
      </div>
    </div>
  )
}

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Suspense fallback={<DoctorsLoading />}>
          <DoctorList />
        </Suspense>
      </main>
    </div>
  )
}

