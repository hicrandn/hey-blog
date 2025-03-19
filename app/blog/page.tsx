import BlogCard from '@/app/blog/components/BlogCard'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Next.js ile Modern Web Uygulamaları',
      description: 'Next.js framework\'ünün temel özellikleri ve modern web uygulamaları geliştirmedeki rolü.',
      date: '1 Ocak 2024',
      readTime: '5 dk okuma'
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      description: 'TypeScript ile daha güvenli ve sürdürülebilir kod yazmanın yolları.',
      date: '2 Ocak 2024',
      readTime: '7 dk okuma'
    },
    {
      id: 3,
      title: 'Tailwind CSS ile Hızlı UI Geliştirme',
      description: 'Tailwind CSS kullanarak modern ve responsive kullanıcı arayüzleri oluşturma.',
      date: '3 Ocak 2024',
      readTime: '6 dk okuma'
    },
    {
      id: 4,
      title: 'React Hooks Deep Dive',
      description: 'React Hooks\'un detaylı kullanımı ve best practices.',
      date: '4 Ocak 2024',
      readTime: '8 dk okuma'
    },
    {
      id: 5,
      title: 'Web Performans Optimizasyonu',
      description: 'Web uygulamalarında performans optimizasyonu için temel teknikler.',
      date: '5 Ocak 2024',
      readTime: '6 dk okuma'
    },
    {
      id: 6,
      title: 'SEO Best Practices',
      description: 'Modern web uygulamalarında SEO optimizasyonu için önemli ipuçları.',
      date: '6 Ocak 2024',
      readTime: '7 dk okuma'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog Yazıları</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Teknoloji, yaşam ve daha fazlası hakkında detaylı yazılar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
} 