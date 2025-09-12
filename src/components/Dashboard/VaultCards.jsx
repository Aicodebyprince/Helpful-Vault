import React from 'react'
import { format } from 'date-fns'
import { 
  Lock, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Package, 
  Calendar,
  Tag,
  Trash2,
  Edit
} from 'lucide-react'

const VaultCards = ({ cards, onDelete }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'password':
        return '🔐'
      case 'exam':
        return '📚'
      case 'work':
        return '💼'
      case 'notes':
        return '📝'
      default:
        return '📋'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'password':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'exam':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'work':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'notes':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (cards.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No vault cards found</h3>
        <p className="text-slate-500 mb-4">Create your first vault card to get started</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
        <Package className="w-6 h-6 mr-3 text-blue-600" />
        Vault Cards
      </h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div 
            key={card.id} 
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(card.category)}</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{card.title}</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(card.category)}`}>
                    {card.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDelete(card.id)}
                  className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className={`text-slate-600 text-sm leading-relaxed ${card.category === 'password' ? 'font-mono' : ''}`}>
                {card.content && card.content.length > 100 
                  ? card.content.substring(0, 100) + '...' 
                  : card.content
                }
              </p>
            </div>
            
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {card.due_date && (
              <div className="flex items-center text-sm text-slate-500">
                <Calendar className="w-4 h-4 mr-2" />
                {format(new Date(card.due_date), 'MMM dd, yyyy')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VaultCards