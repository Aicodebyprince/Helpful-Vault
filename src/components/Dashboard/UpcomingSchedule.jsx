import React from 'react'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import { Calendar } from 'lucide-react'

const UpcomingSchedule = ({ cards }) => {
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

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isUpcoming = (dateString) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    return date >= today
  }

  // Filter and sort upcoming items
  const upcomingItems = cards
    .filter(card => card.due_date && isUpcoming(card.due_date))
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5) // Show only next 5 items

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
              className="bg-white/50 rounded-xl p-4 border border-slate-200/50 hover:bg-white/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getCategoryIcon(item.category)}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-slate-500">{formatDate(item.due_date)}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UpcomingSchedule