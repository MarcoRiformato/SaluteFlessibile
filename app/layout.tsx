import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import IubendaScripts from "./components/IubendaScripts"
import Script from "next/script"
import MetaPixel from "./components/MetaPixel"

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
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:5332577,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        {children}
        <IubendaScripts />
        <MetaPixel />
      </body>
    </html>
  )
}