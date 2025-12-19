import type { Metadata } from 'next'

// import { Analytics } from '@vercel/analytics/Next'
import './globals.css'
import { DM_Sans as V0_Font_DM_Sans, Roboto_Mono as V0_Font_Roboto_Mono, Slabo_27px as V0_Font_Slabo_27px } from 'next/font/google'

// Initialize fonts
const _dmSans = V0_Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _robotoMono = V0_Font_Roboto_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700"] })
const _slabo_27px = V0_Font_Slabo_27px({ subsets: ['latin'], weight: ["400"] })

export const metadata: Metadata = {
  title: 'Khóa học Frontend HL',
  description: 'Created by LongD',
  generator: 'LongD',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
