// src/contexts/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // --- NEW: State to hold the encryption key ---
  const [encryptionKey, setEncryptionKey] = useState(null)

  useEffect(() => {
    // ... existing useEffect code ...
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        // If the user logs out, clear the key
        if (event === 'SIGNED_OUT') {
          setEncryptionKey(null);
        }
        setLoading(false)
      }
    )
    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    // --- NEW: Set the key on successful sign-up ---
    if (!error && data) {
      setEncryptionKey(password);
    }
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // --- NEW: Set the key on successful sign-in ---
    if (!error && data) {
      setEncryptionKey(password);
    }
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    // --- NEW: The onAuthStateChange handles clearing the key, but we can also do it here for immediate effect
    if (!error) {
        setEncryptionKey(null);
    }
    return { error }
  }

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
    // --- NEW: Expose the key to the rest of the app ---
    encryptionKey
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}