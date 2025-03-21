'use client'

import { useSearch } from '../hooks/useSearch'

export default function SearchBox() {
  const { 
    searchTerm, 
    searchResults, 
    isLoading, 
    isOpen,
    handleSearchChange, 
    handleResultClick,
    handleSearchFocus,
    handleSearchBlur,
    handleSearchSubmit
  } = useSearch()

  return (
    <div className="relative">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {isOpen && searchTerm && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto border border-slate-200">
          {isLoading ? (
            <div className="p-4 text-center text-slate-600">
              <div className="animate-pulse">Searching...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((post) => (
                <li
                  key={post.id}
                  onClick={() => handleResultClick(post.id)}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <h4 className="font-medium text-slate-900 mb-1">{post.title}</h4>
                  <p className="text-sm text-slate-600 line-clamp-1">{post.body}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500">❤️ {post.reactions.likes}</span>
                    <span className="text-xs text-slate-500">👎 {post.reactions.dislikes}</span>
                    {post.tags && post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-indigo-600">#{tag}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-slate-600">
              No results found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  )
} 