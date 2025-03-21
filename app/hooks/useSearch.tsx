'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from './useDebounce'

interface Post {
  id: number
  title: string
  body: string
  reactions: number
  tags: string[]
}

//server actions ile yapılacak

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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
        const res = await fetch(`https://dummyjson.com/posts/search?q=${debouncedSearch}&limit=5`)
        const data = await res.json()
        
        // Transform the data to match our Post interface
        const transformedPosts = (data.posts || []).map((post: any) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          reactions: post.reactions || 0,
          tags: post.tags || []
        }))
        
        setSearchResults(transformedPosts)
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
    setIsOpen(true)
  }

  const handleResultClick = (postId: number) => {
    router.push(`/blog-post-${postId}`)
    setSearchTerm('')
    setIsOpen(false)
  }

  const handleSearchFocus = () => {
    setIsOpen(true)
  }

  const handleSearchBlur = () => {
    // Delay closing to allow click on search results
    setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0].id)
    }
  }

  return {
    searchTerm,
    searchResults,
    isLoading,
    isOpen,
    handleSearchChange,
    handleResultClick,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchSubmit
  }
} 