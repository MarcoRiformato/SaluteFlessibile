import { NextResponse } from 'next/server'

const ITALIAN_CITIES = [
  "Milano", "Roma", "Torino", "Firenze", "Bologna", "Napoli", "Palermo", "Genova", "Bari", "Catania",
  "Venezia", "Verona", "Padova", "Parma", "Brescia", "Modena", "Pisa", "Cagliari", "Trieste", "Perugia",
  "Reggio Emilia", "Livorno", "Ravenna", "Cagliari", "Foggia", "Rimini", "Salerno", "Ferrara", "Sassari",
  "Latina", "Bergamo", "Forlì", "Vicenza", "Terni", "Trento", "Novara", "Piacenza", "Ancona", "Andria",
  "Arezzo", "Udine", "Cesena", "Lecce", "Pesaro", "Alessandria", "La Spezia", "Pistoia", "Pisa", "Lucca",
  "Como", "Siena", "Varese", "Grosseto", "Potenza", "Catanzaro", "Crotone", "Vibo Valentia", "Aosta",
  "Campobasso", "Nuoro", "Oristano", "Matera", "Enna", "Agrigento", "Caltanissetta", "Ragusa", "Siracusa",
  "Trapani", "Belluno", "Gorizia", "Pordenone", "Treviso", "Vicenza", "Verona", "Asti", "Biella", "Cuneo",
  "Novara", "Vercelli", "Fermo", "Macerata", "Ascoli Piceno", "Isernia", "Avellino", "Benevento", "Caserta",
  "Salerno", "Barletta-Andria-Trani", "Brindisi", "Foggia", "Lecce", "Taranto", "Carbonia", "Iglesias",
  "Medio Campidano", "Ogliastra", "Olbia-Tempio", "Oristano", "Sassari", "Caltanissetta", "Catania",
  "Enna", "Messina", "Ragusa", "Siracusa", "Trapani", "Cosenza", "Crotone", "Catanzaro", "Vibo Valentia",
  "Reggio Calabria", "Perugia", "Terni", "Aosta", "Bolzano", "Trento", "Trieste", "Udine", "Pordenone",
  "Gorizia", "Campobasso", "Isernia", "Caserta", "Benevento", "Avellino", "Salerno", "Taranto", "Brindisi",
  "Lecce", "Foggia", "Barletta-Andria-Trani", "Carbonia", "Iglesias", "Medio Campidano", "Ogliastra",
  "Olbia-Tempio", "Oristano", "Sassari", "Caltanissetta", "Catania", "Enna", "Messina", "Ragusa",
  "Siracusa", "Trapani", "Cosenza", "Crotone", "Catanzaro", "Vibo Valentia", "Reggio Calabria"
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const input = searchParams.get('input')?.toLowerCase() || ''

  if (input.length < 2) {
    return NextResponse.json({ suggestions: [] })
  }

  const suggestions = ITALIAN_CITIES
    .filter(city => city.toLowerCase().includes(input))
    .slice(0, 10) // Limit to 10 suggestions

  return NextResponse.json({ suggestions })
} 