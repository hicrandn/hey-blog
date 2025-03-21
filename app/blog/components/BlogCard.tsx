import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../utils'

interface Author {
  name: string
  image: string
  email: string
}

interface BlogCardProps {
  id: number
  title: string
  body: string
  readTime: string
  author: Author
}

export default function BlogCard({ id, title, body, readTime, author }: BlogCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${id}/800/600`}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Image
            src={author.image}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm text-gray-600">Written by</p>
            <p className="text-sm font-medium text-gray-900">{author.name}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {body}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {readTime}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {formatDate(id)}
            </span>
          </div>
          <Link 
            href={`/blog/blog-post-${id}`}
            className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}