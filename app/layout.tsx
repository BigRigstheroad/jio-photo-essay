import type { Metadata } from "next"
import { Montserrat, Libre_Caslon_Text } from "next/font/google"
import ContentProtection from "@/app/components/ContentProtection"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600"],
})

const libre = Libre_Caslon_Text({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "MAKIGDUYOG SA YUTA",
  description: "The Lives of Bukidnon Farmers Amid Changing Climates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${libre.variable} antialiased`}>
        <ContentProtection />
        {children}
      </body>
    </html>
  )
}
