'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WriteForUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    topics: '',
    pitch: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Write for Hey Blog
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto">
            Share your insights with our growing community
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="prose prose-slate mx-auto">
            <p className="text-lg text-slate-700">
              We're looking for writers who are passionate about technology, development, 
              and sharing their knowledge. Whether you're a seasoned developer or just 
              starting out, if you have insights to share, we want to hear from you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900 text-xl mb-2">Payment</h3>
              <p className="text-slate-700">$200-500 per article based on depth and research</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900 text-xl mb-2">Exposure</h3>
              <p className="text-slate-700">Reach our community of 50k+ monthly readers</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-900 text-xl mb-2">Support</h3>
              <p className="text-slate-700">Work with our editorial team to polish your content</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Submit Your Application</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-slate-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base font-medium text-slate-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-base font-medium text-slate-900 mb-2">
                Writing Samples or Portfolio
              </label>
              <input
                type="text"
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Links to your published work (GitHub, blog, etc.)"
              />
            </div>

            <div>
              <label htmlFor="topics" className="block text-base font-medium text-slate-900 mb-2">
                What would you like to write about?
              </label>
              <textarea
                id="topics"
                rows={4}
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="List some topics you're interested in covering"
                required
              />
            </div>

            <div>
              <label htmlFor="pitch" className="block text-base font-medium text-slate-900 mb-2">
                Your First Article Pitch
              </label>
              <textarea
                id="pitch"
                rows={6}
                value={formData.pitch}
                onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Give us a brief outline of your first article idea"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link 
                href="/"
                className="text-base text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Back to Blog
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 