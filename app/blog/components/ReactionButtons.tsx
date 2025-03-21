'use client'

import { useState } from 'react'

interface ReactionButtonsProps {
  initialLikes: number
  initialDislikes: number
}

export default function ReactionButtons({ initialLikes, initialDislikes }: ReactionButtonsProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null)

  const handleReaction = (type: 'like' | 'dislike') => {
    if (userReaction === type) {
      // Remove reaction
      if (type === 'like') {
        setLikes(prev => prev - 1)
      } else {
        setDislikes(prev => prev - 1)
      }
      setUserReaction(null)
    } else {
      // Add new reaction
      if (type === 'like') {
        setLikes(prev => prev + 1)
        if (userReaction === 'dislike') {
          setDislikes(prev => prev - 1)
        }
      } else {
        setDislikes(prev => prev + 1)
        if (userReaction === 'like') {
          setLikes(prev => prev - 1)
        }
      }
      setUserReaction(type)
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => handleReaction('like')}
        className={`flex items-center space-x-2 transition-colors ${
          userReaction === 'like' 
            ? 'text-blue-600' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span>👍</span>
        <span>{likes}</span>
      </button>
      <button 
        onClick={() => handleReaction('dislike')}
        className={`flex items-center space-x-2 transition-colors ${
          userReaction === 'dislike' 
            ? 'text-red-600' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span>👎</span>
        <span>{dislikes}</span>
      </button>
    </div>
  )
} 