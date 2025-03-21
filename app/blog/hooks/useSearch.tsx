'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from './useDebounce'

interface Post {
  id: number
  title: string
  body: string
}

//server actions ile yapılacak

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedSearch = useDebounce(searchTerm, 500)
  const router = useRouter()

  useEffect(() => {
    const searchPosts = async () => {
      if (!debouncedSearch.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`https://dummyjson.com/posts/search?q=${debouncedSearch}`)
        const data = await res.json()
        setSearchResults(data.posts || [])
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchPosts()
  }, [debouncedSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleResultClick = (postId: number) => {
    router.push(`/blog/blog-post-${postId}`)
  }

  return {
    searchTerm,
    searchResults,
    isLoading,
    handleSearchChange,
    handleResultClick
  }
} 