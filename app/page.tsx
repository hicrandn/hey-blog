import BlogCard from './components/BlogCard';

interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
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

async function getPosts() {
  const res = await fetch('https://dummyjson.com/posts', {
    next: { revalidate: 3600 }
  });
  const data = await res.json();
  return data.posts as Post[];
}

async function getUser(userId: number) {
  try {
    // Using deterministic seed for consistent user data
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

export default async function HomePage() {
  const posts = await getPosts();
  
  // Fetch user data for each unique userId
  const uniqueUserIds = [...new Set(posts.map(post => post.userId))];
  const users = await Promise.all(
    uniqueUserIds.map(userId => getUser(userId))
  );
  
  // Create a map of userId to user data for easy lookup
  const userMap = new Map(
    uniqueUserIds.map((userId, index) => [userId, users[index]])
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white py-16 sm:py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 relative">
          <span className="inline-block text-indigo-600 font-medium text-lg mb-2">✨ Discover & Share</span>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900">
            Blogs 
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover stories, thinking, and expertise from writers on any topic.
            Join our community of curious minds.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:flex items-center gap-4 absolute -left-24 top-0 z-10">
            <div className="h-[300px] w-[3px] bg-gradient-to-b from-indigo-600 to-blue-700 rounded-full"></div>
            <span className="text-sm font-semibold tracking-wider text-slate-600 -rotate-90 whitespace-nowrap origin-top-left translate-y-[150px]">LATEST POSTS</span>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-0">
            {posts.map((post: Post) => {
              const user = userMap.get(post.userId);
              const authorName = user ? `${user.name.first} ${user.name.last}` : `User ${post.userId}`;
              const authorImage = user?.picture.large || `https://picsum.photos/seed/user-${post.userId}/400/400`;
              
              return (
                <BlogCard
                  key={post.id}
                  id={post.id.toString()}
                  title={post.title}
                  description={post.body}
                  date={new Date().toISOString()}
                  readTime={Math.ceil(post.body.split(' ').length / 200)}
                  slug={`blog-post-${post.id}`}
                  imageUrl={`https://picsum.photos/seed/${post.id}/800/400`}
                  author={{
                    name: authorName,
                    image: authorImage
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 