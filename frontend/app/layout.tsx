import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "../i18n/LanguageProvider"
import { AuthProvider } from "./auth/AuthProvider"
import { LanguagePairProvider } from "./LanguagePairProvider"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Language Coach",
  description: "Your personal AI language coach",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden">
      <body className={`${poppins.className} min-h-full flex flex-col overflow-x-hidden`}>
        <LanguageProvider>
          <AuthProvider>
            <LanguagePairProvider>{children}</LanguagePairProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}