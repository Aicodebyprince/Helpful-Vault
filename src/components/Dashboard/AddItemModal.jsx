import React, { useState } from 'react'
import { X } from 'lucide-react'

const AddItemModal = ({ onClose, onAddCard }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'notes',
    content: '',
    tags: '',
    due_date: ''
  })

  const categories = [
    { value: '', label: 'Select category' },
    { value: 'password', label: '🔐 Password' },
    { value: 'exam', label: '📚 Exam' },
    { value: 'work', label: '💼 Work' },
    { value: 'notes', label: '📝 Notes' },
    { value: 'other', label: '📋 Other' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const cardData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      due_date: formData.due_date || null
    }
    
    onAddCard(cardData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Add to Vault</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <textarea
                name="content"
                required
                rows="4"
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter content"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., important, work, personal"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date (optional)</label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 transition-all"
              >
                Add to Vault
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddItemModal