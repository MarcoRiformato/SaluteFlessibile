import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FlexiCare - Trova il tuo specialista di fiducia",
  description:
    "Prenota visite specialistiche, consulenze e trattamenti nella più grande rete di professionisti in Italia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'