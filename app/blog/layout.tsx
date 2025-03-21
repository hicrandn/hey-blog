import BlogHeader from './components/BlogHeader'
import BlogFooter from './components/BlogFooter'

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
        <BlogHeader />
        <main className="container mx-auto py-8">
          {children}
        </main>
        <BlogFooter />
      </div>
    )
  }