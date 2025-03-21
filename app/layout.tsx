import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BlogHeader from './components/BlogHeader'
import BlogFooter from './components/BlogFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hey Blog',
  description: 'A modern blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
          <BlogHeader />
          <main>
            {children}
          </main>
          <BlogFooter />
        </div>
      </body>
    </html>
  )
}