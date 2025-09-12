import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Header from './Header'
import VaultCards from './VaultCards'
import StickyNotes from './StickyNotes'
import UpcomingSchedule from './UpcomingSchedule'
import SearchBar from './SearchBar'
import AddItemModal from './AddItemModal'
import { supabase } from '../../lib/supabase'
import { Package, Shield, FileText, Calendar, Plus } from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const [vaultCards, setVaultCards] = useState([])
  const [stickyNotes, setStickyNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchVaultCards()
      fetchStickyNotes()
    }
  }, [user])

  const fetchVaultCards = async () => {
    try {
      const { data, error } = await supabase
        .from('vault_cards')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setVaultCards(data || [])
    } catch (error) {
      console.error('Error fetching vault cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStickyNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('sticky_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setStickyNotes(data || [])
    } catch (error) {
      console.error('Error fetching sticky notes:', error)
    }
  }

  const addVaultCard = async (cardData) => {
    try {
      const { data, error } = await supabase
        .from('vault_cards')
        .insert([{ ...cardData, user_id: user.id }])
        .select()

      if (error) throw error
      setVaultCards([data[0], ...vaultCards])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding vault card:', error)
    }
  }

  const addStickyNote = async (noteData) => {
    try {
      const { data, error } = await supabase
        .from('sticky_notes')
        .insert([{ ...noteData, user_id: user.id }])
        .select()

      if (error) throw error
      setStickyNotes([data[0], ...stickyNotes])
    } catch (error) {
      console.error('Error adding sticky note:', error)
    }
  }

  const deleteVaultCard = async (id) => {
    try {
      const { error } = await supabase
        .from('vault_cards')
        .delete()
        .eq('id', id)

      if (error) throw error
      setVaultCards(vaultCards.filter(card => card.id !== id))
    } catch (error) {
      console.error('Error deleting vault card:', error)
    }
  }

  const deleteStickyNote = async (id) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .delete()
        .eq('id', id)

      if (error) throw error
      setStickyNotes(stickyNotes.filter(note => note.id !== id))
    } catch (error) {
      console.error('Error deleting sticky note:', error)
    }
  }

  const togglePinNote = async (id, isPinned) => {
    try {
      const { error } = await supabase
        .from('sticky_notes')
        .update({ is_pinned: !isPinned })
        .eq('id', id)

      if (error) throw error
      
      setStickyNotes(stickyNotes.map(note => 
        note.id === id ? { ...note, is_pinned: !isPinned } : note
      ))
    } catch (error) {
      console.error('Error toggling pin:', error)
    }
  }

  // Filter cards based on search and category
  const filteredCards = vaultCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Get upcoming cards (cards with due dates)
  const upcomingCards = vaultCards.filter(card => card.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))

  // Calculate stats
  const totalItems = vaultCards.length
  const passwordCount = vaultCards.filter(card => card.category === 'password').length
  const notesCount = stickyNotes.length
  const upcomingCount = upcomingCards.length

  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 antialiased min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Welcome back, {getUserName(user?.email)}! 👋
              </h1>
              <p className="text-xl text-slate-600">
                Manage your secure information vault with AI-powered organization
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 transition-all transform hover:scale-105 shadow-lg flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Vault
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Items</p>
                  <p className="text-3xl font-bold text-slate-900">{totalItems}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Passwords</p>
                  <p className="text-3xl font-bold text-slate-900">{passwordCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Sticky Notes</p>
                  <p className="text-3xl font-bold text-slate-900">{notesCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Upcoming</p>
                  <p className="text-3xl font-bold text-slate-900">{upcomingCount}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Vault Cards */}
          <div className="lg:col-span-3">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onAddNew={() => setShowAddModal(true)}
            />
            
            <div className="mb-8">
              <VaultCards 
                cards={filteredCards}
                onDelete={deleteVaultCard}
              />
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            <StickyNotes 
              notes={stickyNotes}
              onAdd={addStickyNote}
              onDelete={deleteStickyNote}
              onTogglePin={togglePinNote}
            />
            <UpcomingSchedule cards={upcomingCards} />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAddCard={addVaultCard}
        />
      )}
    </div>
  )
}

export default Dashboard