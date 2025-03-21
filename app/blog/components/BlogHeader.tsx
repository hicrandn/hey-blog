'use client'

import Link from 'next/link'
import SearchBox from './SearchBox'

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          href="/blog"
          className="text-xl font-bold text-slate-800 hover:text-indigo-600 transition-colors"
        >
          Hey Blog
        </Link>
        
        <div className="w-1/3">
          <SearchBox />
        </div>
      </div>
    </header>
  )
} 