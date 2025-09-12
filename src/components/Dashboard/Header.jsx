import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Shield, LogOut } from 'lucide-react'

const Header = () => {
  const { signOut, user } = useAuth()

  const handleSignOut = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut()
    }
  }

  const getUserInitials = (email) => {
    if (!email) return 'U'
    const name = email.split('@')[0]
    return name.substring(0, 2).toUpperCase()
  }

  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Helpful Vault
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure Session Active</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {getUserInitials(user?.email)}
                </span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-900">
                  {getUserName(user?.email)}
                </div>
                <div className="text-slate-500">
                  {user?.email}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header