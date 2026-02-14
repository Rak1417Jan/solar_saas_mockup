import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DemoProvider } from '@/contexts/DemoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solar SaaS Workflow Demo',
  description: 'End-to-end solar installation workflow demonstration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoProvider>
          {children}
        </DemoProvider>
      </body>
    </html>
  )
}
