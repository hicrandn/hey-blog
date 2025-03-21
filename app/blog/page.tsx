import BlogCard from './components/BlogCard';

interface User {
  id: number
  firstName: string
  lastName: string
  image: string
  email: string
}

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

interface BlogResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

async function getBlogPosts(): Promise<Post[]> {
  const res = await fetch('https://dummyjson.com/posts', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  const data: BlogResponse = await res.json()
  return data.posts
}

async function getUsers(): Promise<User[]> {
  // Fetch 100 random users from RandomUser API
  const res = await fetch('https://randomuser.me/api/?results=100', {
    next: { revalidate: 3600 }
  })
  const data = await res.json()
  
  // Map RandomUser data to our User interface
  return data.results.map((user: any, index: number) => ({
    id: index + 1, // Map to match DummyJSON post userId
    firstName: user.name.first,
    lastName: user.name.last,
    image: user.picture.large,
    email: user.email
  }))
}

export default async function BlogPage() {
  const [posts, users] = await Promise.all([getBlogPosts(), getUsers()])
  const usersMap = new Map(users.map(user => [user.id, user]))

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            BLOG POSTS
          </h1>
          <p className="text-xl text-gray-600">
            Detailed articles about technology, life, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {posts.map((post) => {
            const author = usersMap.get(post.userId)
            if (!author) return null
            
            return (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body.substring(0, 100) + '...'}
                readTime={`${Math.ceil(post.body.split(' ').length / 200)} min`}
                author={{
                  name: `${author.firstName} ${author.lastName}`,
                  image: author.image,
                  email: author.email
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
} 