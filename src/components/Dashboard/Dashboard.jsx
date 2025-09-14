import React, { useState, useEffect } from 'react';
import {
  Package,
  Shield,
  FileText,
  Calendar,
  Plus,
  Search,
  Pin,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  X,
  CheckSquare,
  Square,
  CheckCircle2,
  LogOut,
  Menu,
  XCircle
} from 'lucide-react';

// Keep your project imports exactly as they are in your project structure
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { encryptData, decryptData } from '../../lib/encryption';


// --- SUB-COMPONENTS ---

const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
    }
  };

  const getUserInitials = (email) => {
    if (!email) return 'U';
    const name = email.split('@')[0];
    return name.substring(0, 2).toUpperCase();
  };

  const getUserName = (email) => {
    if (!email) return 'User';
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Helpful Vault</span>
                <p className="text-xs text-slate-500">Secure personal vault</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">{getUserInitials(user?.email)}</span>
              </div>
              <div className="hidden md:block text-sm">
                <div className="font-medium text-slate-900">{getUserName(user?.email)}</div>
                <div className="text-slate-500 text-xs">{user?.email}</div>
              </div>
            </div>

            <button onClick={handleSignOut} className="p-2 rounded-md text-slate-600 hover:bg-slate-100" aria-label="Log out">
              <LogOut className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <XCircle className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const VaultCard = ({ card, onDelete, onToggleComplete }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const isPassword = card.category === 'password';

  const categoryStyles = {
    password: { icon: '🔐', glow: 'from-green-500/40 to-emerald-500/40', border: 'border-green-200' },
    exam: { icon: '📚', glow: 'from-blue-500/40 to-sky-500/40', border: 'border-blue-200' },
    work: { icon: '💼', glow: 'from-purple-500/40 to-indigo-500/40', border: 'border-purple-200' },
    notes: { icon: '📝', glow: 'from-yellow-400/30 to-amber-400/30', border: 'border-yellow-200' },
    other: { icon: '📋', glow: 'from-slate-300/30 to-gray-400/30', border: 'border-slate-200' },
  };

  const { icon, glow, border } = categoryStyles[card.category] || categoryStyles.other;

  const handleCopy = async () => {
    if (!card.content) return;
    try {
      await navigator.clipboard.writeText(card.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Clipboard error', e);
    }
  };

  return (
    <article className={`relative group bg-white/70 rounded-2xl p-4 sm:p-6 border ${border} shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${card.is_completed ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-slate-50 border p-2">
            <span className="text-xl sm:text-2xl">{icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`font-semibold text-slate-900 truncate ${card.is_completed ? 'line-through' : ''}`}>{card.title}</h3>
            <p className="text-xs text-slate-500 capitalize">{card.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onDelete(card.id)} className="p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex-1">
        {isPassword ? (
          isContentVisible ? (
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-md border border-slate-100">
              <p className="font-mono text-sm text-slate-800 break-words select-all flex-1">{card.content}</p>
              <div className="flex items-center gap-2 ml-3">
                <button onClick={handleCopy} aria-label="Copy" className="p-2 rounded-md hover:bg-slate-100">
                  {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                </button>
                <button onClick={() => setIsContentVisible(false)} className="p-2 rounded-md hover:bg-slate-100" aria-label="Hide">
                  <EyeOff size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-2xl sm:text-3xl font-mono tracking-wider select-none">••••••••</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsContentVisible(true)} className="text-blue-600 font-semibold flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 text-sm">
                  <Eye size={14} /> Show
                </button>
              </div>
            </div>
          )
        ) : (
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap break-words">{card.content && card.content.length > 110 ? card.content.substring(0, 110) + '...' : card.content}</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-wrap gap-1">
          {card.tags && card.tags.length > 0 && card.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">#{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {card.due_date ? (
            <button onClick={() => onToggleComplete(card.id, card.is_completed)} className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm ${card.is_completed ? 'bg-green-100 text-green-700' : 'hover:bg-slate-100'}`}>
              {card.is_completed ? <CheckCircle2 className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              <span className={card.is_completed ? 'line-through text-xs' : 'text-xs'}>{new Date(card.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </button>
          ) : <div />}
        </div>
      </div>
    </article>
  );
};

const VaultCards = ({ cards, onDelete, onToggleComplete }) => {
  if (cards.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"><Package className="w-8 h-8 text-slate-400" /></div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">No vault cards found</h3>
        <p className="text-slate-500 mb-4">Create your first vault card to get started</p>
      </div>
    );
  }

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card) => (<VaultCard key={card.id} card={card} onDelete={onDelete} onToggleComplete={onToggleComplete} />))}
      </div>
    </section>
  );
};

const UpcomingSchedule = ({ cards, onToggleComplete, onAddCard }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', due_date: '' });

  const formatDate = (ds) => ds ? new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.title.trim() && newItem.due_date) {
      onAddCard({ title: newItem.title, due_date: newItem.due_date, category: 'other', content: `Scheduled: ${newItem.title}`, tags: [] });
      setNewItem({ title: '', due_date: '' });
      setShowAddForm(false);
    }
  };

  const upcomingItems = cards.slice(0, 6);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-600" />Upcoming</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAddForm(!showAddForm)} className="p-2 rounded-md hover:bg-purple-50 text-purple-600"><Plus className="w-4 h-4" /></button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-purple-50 rounded-xl border border-purple-200">
          <input type="text" placeholder="Schedule title..." value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className="w-full mb-2 px-3 py-2 text-sm border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white" autoFocus required />
          <input type="date" value={newItem.due_date} onChange={(e) => setNewItem({ ...newItem, due_date: e.target.value })} className="w-full mb-2 px-3 py-2 text-sm border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-slate-700" required />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium text-sm">Add</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {upcomingItems.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3"><Calendar className="w-6 h-6 text-purple-600" /></div>
            <p className="text-slate-500 text-sm">No upcoming items</p>
          </div>
        ) : (
          upcomingItems.map((item) => (
            <div key={item.id} className={`rounded-xl p-3 border transition-colors duration-300 flex items-center space-x-3 ${item.is_completed ? 'bg-slate-100/60 border-slate-200/50 opacity-70' : 'bg-white/50 border-slate-200/50 hover:bg-white/80'}`}>
              <button onClick={() => onToggleComplete(item.id, item.is_completed)} className="p-1 text-slate-500 hover:text-purple-600">
                {item.is_completed ? <CheckSquare className="w-5 h-5 text-purple-600" /> : <Square className="w-5 h-5" />}
              </button>
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium text-slate-900 text-sm truncate ${item.is_completed ? 'line-through text-slate-500' : ''}`}>{item.title}</h4>
                <p className={`text-xs text-slate-500 ${item.is_completed ? 'line-through' : ''}`}>{formatDate(item.due_date)}</p>
              </div>
              <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">{item.category}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const StickyNotes = ({ notes, onAdd, onDelete, onTogglePin }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim()) {
      onAdd(newNote);
      setNewNote({ title: '', content: '' });
      setShowAddForm(false);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => (a.is_pinned === b.is_pinned) ? (new Date(b.created_at) - new Date(a.created_at)) : a.is_pinned ? -1 : 1);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><FileText className="w-5 h-5 text-yellow-600" />Sticky Notes</h3>
        <button onClick={() => setShowAddForm(!showAddForm)} className="p-2 rounded-md hover:bg-yellow-50 text-yellow-600"><Plus className="w-4 h-4" /></button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
          <input type="text" placeholder="Note title..." value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} className="w-full mb-2 px-3 py-2 text-sm border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" autoFocus required />
          <textarea placeholder="Note content..." value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} className="w-full mb-2 px-3 py-2 text-sm border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white" rows="3" />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 px-4 rounded-lg font-medium text-sm">Add</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium text-sm">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {sortedNotes.length === 0 && !showAddForm ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3"><FileText className="w-6 h-6 text-yellow-600" /></div>
            <p className="text-slate-500 text-sm">No sticky notes yet</p>
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div key={note.id} className={`rounded-xl p-3 border shadow-sm relative group ${note.is_pinned ? 'bg-yellow-50 border-yellow-200' : 'bg-white/50 border-slate-200'}`}>
              {note.is_pinned && (<div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"><Pin className="w-3 h-3 text-white" /></div>)}
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-slate-900 text-sm truncate max-w-[70%]">{note.title}</h4>
                <div className="flex items-center gap-1">
                  <button onClick={() => onTogglePin(note.id, note.is_pinned)} className="p-1 rounded-md hover:bg-slate-100 text-slate-500"><Pin className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(note.id)} className="p-1 rounded-md hover:bg-red-50 text-slate-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed break-words">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const categories = [{ value: 'all', label: 'All Categories' }, { value: 'password', label: '🔐 Passwords' }, { value: 'exam', label: '📚 Exams' }, { value: 'work', label: '💼 Work' }, { value: 'notes', label: '📝 Notes' }, { value: 'other', label: '📋 Other' }];
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/50 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search vault cards..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 sm:py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white/80 text-sm" />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="w-4 h-4 text-slate-400" /></div>
        </div>

        <div className="flex items-center gap-2">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full sm:w-auto px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/80">
            {categories.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
          </select>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm">Filter</button>
        </div>
      </div>
    </div>
  );
};

const AddItemModal = ({ onClose, onAddCard }) => {
  const [formData, setFormData] = useState({ title: '', category: 'notes', content: '', tags: '', due_date: '' });
  const categories = [{ value: 'notes', label: '📝 Notes' }, { value: 'password', label: '🔐 Password' }, { value: 'exam', label: '📚 Exam' }, { value: 'work', label: '💼 Work' }, { value: 'other', label: '📋 Other' }];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard({ ...formData, tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [], due_date: formData.due_date || null });
    onClose(); // Close modal after submission
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start sm:items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Add to Vault</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg"><X className="w-6 h-6" /></button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Enter title" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                {categories.map(c => (<option key={c.value} value={c.value}>{c.label}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <textarea name="content" required rows="5" value={formData.content} onChange={handleChange} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Enter content" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="e.g., important, work" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date (optional)</label>
              <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-semibold">Add to Vault</button>
              <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
  const { user, encryptionKey } = useAuth();
  const [vaultCards, setVaultCards] = useState([]);
  const [stickyNotes, setStickyNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      if (!user || !encryptionKey) {
        setLoading(false);
        return;
      }
      setLoading(true);
      await Promise.all([fetchVaultCards(), fetchStickyNotes()]);
      if (mounted) {
        setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [user, encryptionKey]);

  const fetchVaultCards = async () => {
    try {
        const { data, error } = await supabase
            .from('vault_cards')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data) return;

        const decryptedCards = await Promise.all(
            data.map(async (card) => {
                if (card.content) {
                    try {
                        const decryptedContent = await decryptData(card.content, encryptionKey);
                        return { ...card, content: decryptedContent };
                    } catch (e) {
                        console.error(`Failed to decrypt card "${card.title}":`, e);
                        return { ...card, content: "Error: Could not decrypt content." };
                    }
                }
                return card;
            })
        );
        setVaultCards(decryptedCards);
    } catch (error) {
        console.error('Error fetching vault cards:', error);
    }
  };

  const fetchStickyNotes = async () => {
    try {
        const { data, error } = await supabase
            .from('sticky_notes')
            .select('*')
            .eq('user_id', user.id)
            .order('is_pinned', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) throw error;
        setStickyNotes(data || []);
    } catch (error) {
        console.error('Error fetching sticky notes:', error);
    }
  };

  const addVaultCard = async (cardData) => {
    if (!cardData.content) {
      console.error("Content is required to add a card.");
      return;
    }
    try {
        const encryptedContent = await encryptData(cardData.content, encryptionKey);
        const { data, error } = await supabase
            .from('vault_cards')
            .insert([{ ...cardData, content: encryptedContent, user_id: user.id }])
            .select()
            .single();

        if (error) throw error;

        const newCard = { ...data, content: cardData.content };
        setVaultCards([newCard, ...vaultCards]);
        setShowAddModal(false);
    } catch (error) {
        console.error('Error adding vault card:', error);
    }
  };

  const deleteVaultCard = async (id) => {
      if (!window.confirm('Are you sure you want to delete this item?')) return;
      try {
          const { error } = await supabase.from('vault_cards').delete().eq('id', id);
          if (error) throw error;
          setVaultCards(vaultCards.filter(card => card.id !== id));
      } catch (error) {
          console.error('Error deleting vault card:', error);
      }
  };

  const toggleVaultCardCompletion = async (id, currentStatus) => {
      try {
          const { error } = await supabase.from('vault_cards').update({ is_completed: !currentStatus }).eq('id', id);
          if (error) throw error;
          setVaultCards(vaultCards.map(card => card.id === id ? { ...card, is_completed: !currentStatus } : card));
      } catch (error) {
          console.error('Error updating completion status:', error);
      }
  };

  const addStickyNote = async (noteData) => {
      try {
          const { data, error } = await supabase.from('sticky_notes').insert([{ ...noteData, user_id: user.id }]).select().single();
          if (error) throw error;
          setStickyNotes([data, ...stickyNotes]);
      } catch (error) {
          console.error('Error adding sticky note:', error);
      }
  };
  
  const deleteStickyNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
        const { error } = await supabase.from('sticky_notes').delete().eq('id', id);
        if (error) throw error;
        setStickyNotes(stickyNotes.filter(note => note.id !== id));
    } catch (error) {
        console.error('Error deleting sticky note:', error);
    }
  };

  const togglePinNote = async (id, isPinned) => {
      try {
          const { error } = await supabase.from('sticky_notes').update({ is_pinned: !isPinned }).eq('id', id);
          if (error) throw error;
          // Re-fetch to sort correctly or manually sort
          fetchStickyNotes(); 
      } catch (error) {
          console.error('Error toggling pin:', error);
      }
  };

  const filteredCards = vaultCards.filter(card => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesSearch = card.title.toLowerCase().includes(lowerCaseQuery) ||
      (card.content && card.content.toLowerCase().includes(lowerCaseQuery)) ||
      (card.tags && card.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)));
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingCards = vaultCards
    .filter(card => card.due_date)
    .sort((a, b) => a.is_completed - b.is_completed || new Date(a.due_date) - new Date(b.due_date));

  const totalItems = vaultCards.length;
  const passwordCount = vaultCards.filter(card => card.category === 'password').length;
  const notesCount = stickyNotes.length;
  const upcomingCount = upcomingCards.filter(card => !card.is_completed && card.due_date).length;

  const getUserName = (email) => email ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) : 'User';

  if (loading) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div>);
  }

  return (
    <div className="font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 antialiased min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Welcome back, {getUserName(user?.email)}! 👋</h1>
              <p className="text-sm sm:text-base text-slate-600">Manage your secure information vault with ease.</p>
            </div>
            {/* CORRECTED: Add Vault button is here for desktop */}
            <button 
              onClick={() => setShowAddModal(true)} 
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:scale-[1.02] transition-transform shadow-md"
            >
              <Plus className="w-5 h-5" /> Add to Vault
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/50 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs sm:text-sm font-medium text-slate-600">Total Items</p>
                 <p className="text-2xl font-bold text-slate-900">{totalItems}</p>
               </div>
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /></div>
             </div>

             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/50 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs sm:text-sm font-medium text-slate-600">Passwords</p>
                 <p className="text-2xl font-bold text-slate-900">{passwordCount}</p>
               </div>
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" /></div>
             </div>

             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/50 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs sm:text-sm font-medium text-slate-600">Sticky Notes</p>
                 <p className="text-2xl font-bold text-slate-900">{notesCount}</p>
               </div>
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" /></div>
             </div>

             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-slate-200/50 shadow-sm flex items-center justify-between">
               <div>
                 <p className="text-xs sm:text-sm font-medium text-slate-600">Upcoming</p>
                 <p className="text-2xl font-bold text-slate-900">{upcomingCount}</p>
               </div>
               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center"><Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" /></div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <VaultCards cards={filteredCards} onDelete={deleteVaultCard} onToggleComplete={toggleVaultCardCompletion} />
          </div>

          <div className="space-y-6">
            <StickyNotes notes={stickyNotes} onAdd={addStickyNote} onDelete={deleteStickyNote} onTogglePin={togglePinNote} />
            <UpcomingSchedule cards={upcomingCards} onToggleComplete={toggleVaultCardCompletion} onAddCard={addVaultCard} />
          </div>
        </div>
      </main>
      
      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setShowAddModal(true)} 
        className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white flex items-center justify-center shadow-lg z-40"
        aria-label="Add to Vault"
      >
        <Plus className="w-6 h-6" />
      </button>

      {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} onAddCard={addVaultCard} />}
    </div>
  );
};

export default Dashboard;