import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OcAYcgbVTCxUO9SDuapT1Q5N2QEY7n.png"
                alt="FlexiCare Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-white">FlexiCare</span>
            </div>
            <p className="text-gray-400">
              La piattaforma che connette pazienti e professionisti della salute in modo semplice e sicuro.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Per i pazienti</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/doctors" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Trova specialisti
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/recensioni" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Recensioni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Per i professionisti</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#join-us" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Unisciti a FlexiCare
                </Link>
              </li>
              <li>
                <Link href="/vantaggi-professionisti" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Vantaggi
                </Link>
              </li>
              <li>
                <Link href="/prezzi" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Prezzi
                </Link>
              </li>
              <li>
                <Link href="/supporto" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Supporto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contatti</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/assistenza" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Assistenza
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Partner
                </Link>
              </li>
              <li>
                <Link href="/lavora-con-noi" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Lavora con noi
                </Link>
              </li>
              <li>
                <Link href="/stampa" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Stampa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; 2025 FlexiCare. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/registrati" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Registrati
              </Link>
              <Link href="/accedi" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Accedi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

