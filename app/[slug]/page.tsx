import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/utils/formatDate'
import ReactionButtons from '../components/ReactionButtons'

interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: number
  userId: number
}

interface RandomUser {
  name: {
    first: string
    last: string
  }
  picture: {
    large: string
  }
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function getUser(userId: number) {
  try {
    // Since we want consistent user data, we'll use a deterministic seed based on userId
    const res = await fetch(`https://randomuser.me/api/?seed=user-${userId}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    const data = await res.json();
    return data.results[0] as RandomUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug.replace('blog-post-', '')
  const post = await getPost(id)
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Blog Post Not Found</h1>
        <p className="text-gray-600">
          The blog post you're looking for couldn't be found or an error occurred.
        </p>
        <Link 
          href="/" 
          className="mt-6 inline-block text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Home
        </Link>
      </div>
    )
  }

  const user = await getUser(post.userId);
  const author = {
    name: user ? `${user.name.first} ${user.name.last}` : `User ${post.userId}`,
    image: user?.picture.large || `https://picsum.photos/seed/user-${post.userId}/400/400`
  };
  
  const postDate = new Date().toISOString() // Using current date as dummy data doesn't provide dates

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
              <div className="flex items-center gap-3">
                <Image
                  src={author.image}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-600">Written by</p>
                  <p className="text-sm font-medium text-gray-900">
                    {author.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span>{formatDate(postDate)}</span>
                <span>•</span>
                <span>{Math.ceil(post.body.split(' ').length / 200)} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag: string) => (
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
            {post.body.split(/[.!?]/).map((sentence: string, index: number) => {
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
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="text-base text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Back to Home
              </Link>
              <ReactionButtons 
                initialLikes={Math.floor(post.reactions / 2)}
                initialDislikes={Math.floor(post.reactions / 4)}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 