import React, { useState } from 'react'
import { Plus, Pin, Trash2, FileText } from 'lucide-react'

const StickyNotes = ({ notes, onAdd, onDelete, onTogglePin }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newNote.title.trim()) {
      onAdd(newNote)
      setNewNote({ title: '', content: '' })
      setShowAddForm(false)
    }
  }

  // Sort notes: pinned first, then by creation date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    return new Date(b.created_at) - new Date(a.created_at)
  })

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-yellow-600" />
          Sticky Notes
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-yellow-600 hover:text-yellow-700 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <input
            type="text"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full mb-3 px-3 py-2 text-sm border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
            autoFocus
          />
          <textarea
            placeholder="Note content..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full mb-3 px-3 py-2 text-sm border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-300 hover:to-orange-400 transition-all text-sm"
            >
              Add Note
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {sortedNotes.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-slate-500 text-sm">No sticky notes yet</p>
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 border border-yellow-300/50 shadow-sm transform rotate-1 hover:rotate-0 transition-transform duration-200 relative group"
            >
              {note.is_pinned && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Pin className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900 text-sm">{note.title}</h4>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onTogglePin(note.id, note.is_pinned)}
                    className="text-slate-500 hover:text-yellow-700 p-1"
                  >
                    <Pin className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="text-slate-500 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default StickyNotes