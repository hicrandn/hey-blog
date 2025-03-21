'use client'

import Link from 'next/link'
import SearchBox from './SearchBox'

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/75 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            
            <span className="text-3xl">✍️</span>
            <span>Hey Blog</span>
          </Link>
          <div className="w-100">
            <SearchBox />
          </div>
        </div>
      </div>
    </header>
  )
} 