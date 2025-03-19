import Link from 'next/link'

interface BlogCardProps {
  id: number
  title: string
  description: string
  date: string
  readTime: string
}

export default function BlogCard({ id, title, description, date, readTime }: BlogCardProps) {
  return (
    <Link href={`/blog/blog-yazisi-${id}`}>
      <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-video bg-gray-200"></div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{date}</span>
            <span className="mx-2">•</span>
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}