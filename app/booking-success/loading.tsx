import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Caricamento dettagli prenotazione...</h1>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

