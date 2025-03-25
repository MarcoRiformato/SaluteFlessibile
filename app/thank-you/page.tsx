import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#FCF8E3] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Grazie per esserti iscritto!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Abbiamo ricevuto la tua richiesta e ti contatteremo presto per darti tutte le informazioni necessarie.
        </p>
        <Link 
          href="/"
          className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  )
} 