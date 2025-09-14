import React, { useState } from 'react';
import { Plus, Pin, Trash2, FileText, X } from 'lucide-react';

// --- NEW: Note Modal Component ---
// This is the pop-up that will display the full note content.
const NoteModal = ({ note, onClose }) => {
  // If no note is selected, don't render anything
  if (!note) return null;

  return (
    // Backdrop
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside
        className="bg-yellow-50 rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-yellow-200"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 p-1 rounded-full hover:bg-yellow-200 transition-colors"
          aria-label="Close note"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 pr-8">{note.title}</h3>
        {/* Scrollable area for long content */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap break-words">
            {note.content}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Updated StickyNotes Component ---
const StickyNotes = ({ notes, onAdd, onDelete, onTogglePin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  // NEW: State to track the currently selected note for the modal
  const [selectedNote, setSelectedNote] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim()) {
      onAdd(newNote);
      setNewNote({ title: '', content: '' });
      setShowAddForm(false);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    // Use a React Fragment to render the modal as a sibling, which is better for stacking
    <>
      <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-yellow-600" />
            Sticky Notes
          </h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-yellow-600 hover:text-yellow-700 p-2 hover:bg-yellow-50 rounded-lg transition-colors"
            aria-label="Add new note"
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
              required
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
              // This entire div is now a button that opens the modal
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className="w-full text-left bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 border border-yellow-300/50 shadow-sm transform rotate-1 hover:rotate-0 hover:scale-105 transition-transform duration-200 relative group"
              >
                {note.is_pinned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                    <Pin className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 text-sm truncate pr-16">{note.title}</h4>
                  <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      onClick={(e) => { e.stopPropagation(); onTogglePin(note.id, note.is_pinned); }}
                      className="text-slate-500 hover:text-yellow-700 p-2 rounded-full hover:bg-white/50 cursor-pointer"
                      title={note.is_pinned ? 'Unpin note' : 'Pin note'}
                    >
                      <Pin className="w-4 h-4" />
                    </div>
                    <div
                      onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                      className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-white/50 cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                
                {/* Truncate long content on the card view */}
                <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                  {note.content}
                </p>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StickyNotes;
