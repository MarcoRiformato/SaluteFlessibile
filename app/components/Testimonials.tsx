import Image from "next/image"

const testimonials = [
  {
    name: "Maria Rossi",
    role: "Paziente",
    content: "FlexiCare mi ha permesso di trovare un ottimo fisioterapista vicino casa in pochi minuti. Fantastico!",
    avatar: "/placeholder.svg?height=60&width=60&text=MR",
  },
  {
    name: "Dr. Luca Bianchi",
    role: "Medico",
    content: "Grazie a FlexiCare ho potuto ampliare la mia base di pazienti e gestire meglio il mio tempo.",
    avatar: "/placeholder.svg?height=60&width=60&text=LB",
  },
  {
    name: "Giulia Verdi",
    role: "Paziente",
    content:
      "Ho trovato un nutrizionista eccezionale tramite FlexiCare. Il processo di prenotazione è stato semplicissimo.",
    avatar: "/placeholder.svg?height=60&width=60&text=GV",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Cosa dicono di noi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

