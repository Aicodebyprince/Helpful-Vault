import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset link sent! Please check your email inbox (and spam folder).');
    }

    setLoading(false);
  };

  const goHome = () => navigate('/');

  return (
    <div className="font-sans bg-gray-50 text-gray-900 antialiased min-h-screen">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Helpful Vault</span>
            </div>
            <button onClick={goHome} className="text-gray-600 hover:text-gray-900 px-4 py-2 font-medium">
              ← Back to Home
            </button>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
            <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6"><Shield className="w-8 h-8 text-white" /></div>
                <h1 className="text-4xl font-bold mb-4">Forgot your password?</h1>
                <p className="text-xl text-primary-100 leading-relaxed">No worries. Enter your email and we'll send a link to get back into your account.</p>
            </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Reset password</h2>
              <p className="text-gray-600">Enter your email for a recovery link.</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
              {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">{success}</div>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative"><input id="email" type="email" required disabled={!!success} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary-500" placeholder="your.email@company.com" /><div className="absolute inset-y-0 right-0 pr-3 flex items-center"><Mail className="w-5 h-5 text-gray-400" /></div></div>
              </div>
              <button type="submit" disabled={loading || !!success} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
            <div className="text-center"><p className="text-gray-600">Remember it now? <Link to="/login" className="font-medium text-primary-600 hover:underline">Sign in</Link></p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;