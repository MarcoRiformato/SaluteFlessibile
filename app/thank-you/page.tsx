import Link from "next/link"
import Image from "next/image"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FCF8E3] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <Image
            src="/flexicare-svg.svg"
            alt="Flexicare Logo"
            width={200}
            height={60}
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Grazie per esserti iscritto!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Grazie per essere a bordo e per aver scelto Flexicare: il lancio è alle porte e insieme rivoluzioneremo la salute, rendendola più semplice, veloce e trasparente. Presto ti sveleremo tutte le novità, assicurati di controllare la tua mail.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          <span className="text-xl">←</span>
          Torna alla home
        </Link>
      </div>
    </div>
  )
} 