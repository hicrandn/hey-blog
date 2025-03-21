import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../../utils/formatDate'

interface Author {
  name: string
  image: string
}

interface BlogCardProps {
  id: string
  title: string
  description: string
  date: string
  readTime: number
  slug: string
  imageUrl: string
  author: Author
}

export default function BlogCard({ 
  id, 
  title, 
  description, 
  date, 
  readTime, 
  slug, 
  imageUrl, 
  author
}: BlogCardProps) {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageUrl || `https://picsum.photos/seed/${id}/800/400`}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
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
            <p className="text-sm text-slate-600">Written by</p>
            <p className="text-sm font-medium text-slate-900">{author.name}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-900 line-clamp-1 mb-2">
            {title}
          </h3>
          <p className="text-slate-600 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              {readTime} min
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              {formatDate(date, 'short')}
            </span>
          </div>
        </div>

        <Link 
          href={`/${slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  )
}