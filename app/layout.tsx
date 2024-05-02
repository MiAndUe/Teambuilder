// These styles apply to every route in the application
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from "./components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Epics Team Builder',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation/>
        {children}</body>
    </html>
  )
}
