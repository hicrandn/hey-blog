'use client'

import { useSearch } from '../hooks/useSearch'

export default function SearchBox() {
  const { searchTerm, searchResults, isLoading, handleSearchChange, handleResultClick } = useSearch()

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

      {searchTerm && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto border border-gray-200">
          {isLoading ? (
            <div className="p-4 text-center text-gray-600">Loading...</div>
          ) : searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((post) => (
                <li
                  key={post.id}
                  onClick={() => handleResultClick(post.id)}
                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors"
                >
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-1">{post.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-600">No results found</div>
          )}
        </div>
      )}
    </div>
  )
} 