import Link from 'next/link'

export default function BlogFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-6">
            <a href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Contact Us
            </a>
            <span className="text-slate-400">•</span>
            <a href="/write-for-us" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Write for Us
            </a>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Hey Blog. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
} 