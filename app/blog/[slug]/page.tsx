interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog Yazısı Başlığı</h1>
        <div className="flex items-center text-gray-600 space-x-4">
          <span>1 Ocak 2024</span>
          <span>•</span>
          <span>5 dk okuma</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p>
          Bu bir örnek blog yazısı içeriğidir. Gerçek içerik daha sonra eklenecektir.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua.
        </p>

        <h2>Alt Başlık</h2>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        <h2>Başka Bir Alt Başlık</h2>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>
      </div>
    </article>
  )
} 