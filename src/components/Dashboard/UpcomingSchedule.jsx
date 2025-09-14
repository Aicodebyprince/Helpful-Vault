import React from 'react'
import { format } from 'date-fns'
import { Calendar, CheckSquare, Square } from 'lucide-react'

const UpcomingSchedule = ({ cards, onToggleComplete }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'password': return '🔐';
      case 'exam': return '📚';
      case 'work': return '💼';
      case 'notes': return '📝';
      default: return '📋';
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'password': return 'bg-green-100 text-green-800 border-green-200';
      case 'exam': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'work': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'notes': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  const upcomingItems = cards.slice(0, 5);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-purple-600" />
        Upcoming Schedule
      </h3>
      
      <div className="space-y-3">
        {upcomingItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-slate-500 text-sm">No upcoming items</p>
          </div>
        ) : (
          upcomingItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-4 border transition-colors duration-300 flex items-center space-x-3 ${
                item.is_completed
                  ? 'bg-slate-100/60 border-slate-200/50 opacity-70'
                  : 'bg-white/50 border-slate-200/50 hover:bg-white/80'
              }`}
            >
              <button
                onClick={() => onToggleComplete(item.id, item.is_completed)}
                className="p-1 text-slate-500 hover:text-purple-600 transition-colors"
                aria-label={item.is_completed ? "Mark as not completed" : "Mark as completed"}
              >
                {item.is_completed ? (
                  <CheckSquare className="w-5 h-5 text-purple-600" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>

              <span className="text-lg">{getCategoryIcon(item.category)}</span>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-slate-900 text-sm truncate ${
                    item.is_completed ? 'line-through text-slate-500' : ''
                }`}>
                    {item.title}
                </h4>
                <p className={`text-xs text-slate-500 ${item.is_completed ? 'line-through' : ''}`}>
                    {formatDate(item.due_date)}
                </p>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UpcomingSchedule

