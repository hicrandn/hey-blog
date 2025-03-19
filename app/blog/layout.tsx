export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="py-8">
          {children}
        </div>
      </div>
    )
  }