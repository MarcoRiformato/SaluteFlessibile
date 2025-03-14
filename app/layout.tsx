import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import IubendaScripts from "./components/IubendaScripts"

export const metadata: Metadata = {
  title: "FlexiCare - Trova il tuo specialista di fiducia",
  description:
    "Prenota visite specialistiche, consulenze e trattamenti nella più grande rete di professionisti in Italia",
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
      </head>
      <body className="overflow-x-hidden">
        {children}
        <IubendaScripts />
      </body>
    </html>
  )
}