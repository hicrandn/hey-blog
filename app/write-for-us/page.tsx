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
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Write for Hey Blog
          </h1>
          <p className="text-lg text-gray-600">
            Share your insights with our growing community
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="prose prose-gray mx-auto">
            <p>
              We're looking for writers who are passionate about technology, development, 
              and sharing their knowledge. Whether you're a seasoned developer or just 
              starting out, if you have insights to share, we want to hear from you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Payment</h3>
              <p className="text-sm text-gray-600">$200-500 per article based on depth and research</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Exposure</h3>
              <p className="text-sm text-gray-600">Reach our community of 50k+ monthly readers</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">Work with our editorial team to polish your content</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Your Application</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                Writing Samples or Portfolio
              </label>
              <input
                type="text"
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Links to your published work (GitHub, blog, etc.)"
              />
            </div>

            <div>
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700">
                What would you like to write about?
              </label>
              <textarea
                id="topics"
                rows={3}
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="List some topics you're interested in covering"
                required
              />
            </div>

            <div>
              <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
                Your First Article Pitch
              </label>
              <textarea
                id="pitch"
                rows={4}
                value={formData.pitch}
                onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Give us a brief outline of your first article idea"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link 
                href="/blog"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Blog
              </Link>
              <button
                type="submit"
                className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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