'use client'

import { useState } from 'react'

interface ReactionButtonsProps {
  initialLikes: number
  initialDislikes: number
}

export default function ReactionButtons({ initialLikes = 0, initialDislikes = 0 }: ReactionButtonsProps) {
  const [reactions, setReactions] = useState({
    likes: Number.isNaN(initialLikes) ? 0 : initialLikes,
    dislikes: Number.isNaN(initialDislikes) ? 0 : initialDislikes
  })
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null)

  const handleReaction = (type: 'like' | 'dislike') => {
    if (userReaction === type) {
      // Remove reaction
      setReactions(prev => ({
        ...prev,
        [type + 's']: prev[type === 'like' ? 'likes' : 'dislikes'] - 1
      }))
      setUserReaction(null)
    } else {
      // Add new reaction and remove previous if exists
      setReactions(prev => ({
        likes: type === 'like' 
          ? prev.likes + 1 
          : userReaction === 'like' ? prev.likes - 1 : prev.likes,
        dislikes: type === 'dislike' 
          ? prev.dislikes + 1 
          : userReaction === 'dislike' ? prev.dislikes - 1 : prev.dislikes
      }))
      setUserReaction(type)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => handleReaction('like')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
          userReaction === 'like' 
            ? 'bg-blue-100 text-blue-600' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        <span role="img" aria-label="like">👍</span>
        <span className="font-medium">{reactions.likes}</span>
      </button>
      <button 
        onClick={() => handleReaction('dislike')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
          userReaction === 'dislike' 
            ? 'bg-red-100 text-red-600' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        <span role="img" aria-label="dislike">👎</span>
        <span className="font-medium">{reactions.dislikes}</span>
      </button>
    </div>
  )
} 