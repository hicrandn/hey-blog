'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto">
            Have a question or suggestion? We'd love to hear from you. Our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-slate-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="Full Name"
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
              <label htmlFor="subject" className="block text-base font-medium text-slate-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-medium text-slate-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="block w-full px-4 py-3 text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Email Us</h3>
            <p className="text-lg text-slate-700">contact@heyblog.com</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Follow Us</h3>
            <p className="text-lg text-slate-700">@heyblog on social media</p>
          </div>
        </div>
      </div>
    </div>
  )
} 