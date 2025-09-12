import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Shield, Mail, Eye, EyeOff, Check } from 'lucide-react'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.')
    }
    
    setLoading(false)
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className="font-sans bg-gray-50 text-gray-900 antialiased min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Helpful Vault</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={goHome}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 font-medium transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-16 left-16 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-32 right-24 w-16 h-16 border border-white rounded-full"></div>
            <div className="absolute bottom-24 left-24 w-28 h-28 border border-white rounded-full"></div>
            <div className="absolute bottom-16 right-16 w-20 h-20 border border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-8 text-white">
            <div className="mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Welcome to Helpful Vault</h1>
              <p className="text-lg text-primary-100 leading-relaxed mb-6">
                Enterprise-grade information management platform trusted by professionals worldwide.
              </p>
            </div>
            
            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-primary-100 text-sm">End-to-end encryption with zero-knowledge architecture</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-primary-100 text-sm">SOC 2 Type II and GDPR compliant infrastructure</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-primary-100 text-sm">24/7 monitoring with 99.99% uptime guarantee</span>
              </div>
            </div>
            
            {/* Security Badges */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                <span className="text-xs font-medium">SOC 2</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                <span className="text-xs font-medium">GDPR</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                <span className="text-xs font-medium">HIPAA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-sm">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
                <p className="text-sm text-gray-600">Start your secure information management journey</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-600 px-3 py-2 rounded-lg text-sm">
                    {success}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="registerEmail" className="block text-xs font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="registerEmail"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
                      placeholder="john@company.com"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="registerPassword" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="registerPassword"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white pr-10"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 w-1/4 rounded ${
                              level <= passwordStrength
                                ? passwordStrength <= 1
                                  ? 'bg-red-400'
                                  : passwordStrength <= 2
                                  ? 'bg-yellow-400'
                                  : passwordStrength <= 3
                                  ? 'bg-blue-400'
                                  : 'bg-green-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Use 8+ characters with letters, numbers, and symbols
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white pr-10"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Terms and Privacy */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-3 w-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>
              
              {/* Login Link */}
              <div className="text-center">
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-400" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-400" />
              <span>SOC 2 compliant</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-400" />
              <span>Zero-knowledge architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register