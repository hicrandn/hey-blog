import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '../utils'
import ReactionButtons from '../components/ReactionButtons'

interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

interface User {
  id: number
  firstName: string
  lastName: string
  image: string
  email: string
}

async function getBlogPost(slug: string): Promise<Post | null> {
  try {
    const id = slug.replace('blog-post-', '')
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) return null
    const data = await res.json()
    
    // Format the body text properly
    if (data.body) {
      data.body = data.body
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    }
    
    return data
  } catch (error) {
    console.error('Blog post fetch error:', error)
    return null
  }
}

async function getUser(userId: number): Promise<User | null> {
  try {
    const res = await fetch(`https://randomuser.me/api/`, {
      next: { revalidate: 3600 }
    })
    if (!res.ok) return null
    
    const data = await res.json()
    const user = data.results[0]
    
    return {
      id: userId,
      firstName: user.name.first,
      lastName: user.name.last,
      image: user.picture.large,
      email: user.email
    }
  } catch (error) {
    console.error('User fetch error:', error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Blog Post Not Found</h1>
        <p className="text-gray-600">
          The blog post you're looking for couldn't be found or an error occurred.
        </p>
        <Link 
          href="/blog" 
          className="mt-6 inline-block text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const author = await getUser(post.userId)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] mb-8 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={`https://picsum.photos/seed/${post.id}/1920/1080`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            {/* Author and Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-gray-600">
              {author && (
                <div className="flex items-center gap-3">
                  <Image
                    src={author.image}
                    alt={`${author.firstName} ${author.lastName}`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm text-gray-600">Written by</p>
                    <p className="text-sm font-medium text-gray-900">
                      {author.firstName} {author.lastName}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <span>{formatDate(post.id)}</span>
                <span>•</span>
                <span>{Math.ceil(post.body.split(' ').length / 200)} min read</span>
                <span>•</span>
                <span>{post.views} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {post.body.split(/[.!?]/).map((sentence, index) => {
              const trimmedSentence = sentence.trim()
              if (!trimmedSentence) return null
              
              return (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {trimmedSentence}
                  {index < post.body.split(/[.!?]/).length - 1 ? '.' : ''}
                </p>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ReactionButtons 
                initialLikes={post.reactions.likes}
                initialDislikes={post.reactions.dislikes}
              />
              <Link
                href="/blog"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium"
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 