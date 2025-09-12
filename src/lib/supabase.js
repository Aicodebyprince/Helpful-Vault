import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'https://rwpbjggezhpepgxgrfes.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cGJqZ2dlemhwZXBneGdyZmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MTgzOTIsImV4cCI6MjA3MzA5NDM5Mn0.9WYHRAWUkYRgg3njFyT2TWDCwUx3-W91v39nx1XRGkE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema setup instructions:
/*
1. Create these tables in your Supabase dashboard:

-- Vault Cards table
CREATE TABLE vault_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('password', 'exam', 'work', 'notes', 'other')),
  content TEXT,
  tags TEXT[],
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sticky Notes table
CREATE TABLE sticky_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE vault_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sticky_notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own vault cards" ON vault_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vault cards" ON vault_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own vault cards" ON vault_cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own vault cards" ON vault_cards FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sticky notes" ON sticky_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sticky notes" ON sticky_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sticky notes" ON sticky_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sticky notes" ON sticky_notes FOR DELETE USING (auth.uid() = user_id);
*/