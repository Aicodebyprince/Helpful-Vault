import React, { createContext, useContext, useEffect, useState } from 'react';
// This assumes your supabase client is configured in 'src/lib/supabase.js'
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [encryptionKey, setEncryptionKey] = useState(null);

  useEffect(() => {
    // Check for an active session when the provider mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes in authentication state (e.g., login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') {
          setEncryptionKey(null);
        }
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      setEncryptionKey(password);
    }
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data.user) {
      setEncryptionKey(password);
    }
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setEncryptionKey(null);
    }
    return { error };
  };

  // --- NEW FUNCTION TO SEND RESET EMAIL ---
  // This function tells Supabase to send a password recovery email.
  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      // This is the URL of the page where users will set their new password.
      // It must match the route you set up in App.jsx.
      redirectTo: `${window.location.origin}/update-password`,
    });
    return { data, error };
  };
  
  // --- NEW FUNCTION TO UPDATE THE PASSWORD IN SUPABASE ---
  // This function is called from the UpdatePassword page.
  const updatePassword = async (newPassword) => {
    // Supabase knows who the user is because of the secure token in the URL
    // from the email link.
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    return { data, error };
  }

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    resetPassword,    // <-- Expose the new function
    updatePassword,   // <-- Expose the new function
    loading,
    encryptionKey,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

