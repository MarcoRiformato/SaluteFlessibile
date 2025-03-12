import Image from "next/image"

export default function EmailForm() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Rimani aggiornato</h2>
            <p className="text-xl text-gray-600 mb-8">
              Iscriviti alla nostra newsletter per ricevere consigli sulla salute e offerte esclusive.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Il tuo indirizzo email"
                className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Iscriviti
              </button>
            </form>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Dottore che indossa FlexiCare"
              width={300}
              height={300}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

