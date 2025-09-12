import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'password', label: '🔐 Passwords' },
    { value: 'exam', label: '📚 Exams' },
    { value: 'work', label: '💼 Work' },
    { value: 'notes', label: '📝 Notes' },
    { value: 'other', label: '📋 Other' }
  ]

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vault cards by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar