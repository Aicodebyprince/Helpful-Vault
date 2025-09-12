import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CreditCard, FileText, Calendar, Search, GraduationCap, Code, Briefcase } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className="font-sans bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Helpful Vault</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={handleRegister}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Keep Everything Important in{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  One Place
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Organize your passwords, notes, and schedules – all in a secure personal vault. Simple, smart, and always accessible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRegister}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get Started Free
                </button>
                <button 
                  onClick={handleLogin}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 mt-12 lg:mt-0">
              <div className="relative">
                {/* Mockup Dashboard Preview */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">My Vault</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Work Credentials</h4>
                          <p className="text-sm text-gray-600">5 items</p>
                        </div>
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Project Notes</h4>
                          <p className="text-sm text-gray-600">12 notes</p>
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Upcoming Events</h4>
                          <p className="text-sm text-gray-600">3 this week</p>
                        </div>
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Vault
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to keep your important information organized, secure, and easily accessible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vault Cards</h3>
              <p className="text-gray-600">
                Store credentials, schedules, and notes in organized cards. Everything categorized and easy to find.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sticky Notes</h3>
              <p className="text-gray-600">
                Quick reminders in a familiar sticky-note style. Perfect for temporary thoughts and urgent tasks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Schedule</h3>
              <p className="text-gray-600">
                Auto-collect upcoming dates and deadlines. Never miss an important event or appointment again.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Organize</h3>
              <p className="text-gray-600">
                Tags and categories make finding anything instant. Powerful search across all your stored information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Helpful Vault Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Helpful Vault?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're a student, developer, or professional, Helpful Vault adapts to your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Students</h3>
              <p className="text-gray-600">
                Keep exam notes, assignment deadlines, and login credentials organized. Focus on learning, not searching.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Developers</h3>
              <p className="text-gray-600">
                Store API keys, code snippets, and project notes securely. Everything you need for your next build.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">For Professionals</h3>
              <p className="text-gray-600">
                Manage work accounts, meeting notes, and project deadlines. Stay organized and productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Simplify Your Life?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have organized their digital life with Helpful Vault. Start your free vault today.
          </p>
          <button 
            onClick={handleRegister}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
          >
            Create Your Free Vault
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Helpful Vault</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleLogin}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Login
              </button>
              <button 
                onClick={handleRegister}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Register
              </button>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                GitHub Repo
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Helpful Vault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing