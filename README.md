# Helpful Vault 🔐

A professional digital organizer built with React and Supabase. Securely manage passwords, exam schedules, work notes, and personal reminders in one beautiful interface.

## ✨ Features

- **🔐 Secure Authentication** - Sign up/login with Supabase Auth
- **📋 Vault Cards** - Organize passwords, exams, work items, and notes
- **📝 Sticky Notes** - Quick reminders with pin functionality
- **📅 Schedule Management** - Automatic upcoming items with due dates
- **🔍 Smart Search** - Filter by category and search across all content
- **🏷️ Tagging System** - Organize items with custom tags
- **📱 Responsive Design** - Works perfectly on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Supabase account (free tier available)

### 1. Clone and Install
```bash
git clone <your-repo>
cd helpful-vault
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your credentials
3. Update `src/lib/supabase.js` with your credentials:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 3. Database Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
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

-- Create policies for vault_cards
CREATE POLICY "Users can view own vault cards" ON vault_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own vault cards" ON vault_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own vault cards" ON vault_cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own vault cards" ON vault_cards FOR DELETE USING (auth.uid() = user_id);

-- Create policies for sticky_notes
CREATE POLICY "Users can view own sticky notes" ON sticky_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sticky notes" ON sticky_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sticky notes" ON sticky_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sticky notes" ON sticky_notes FOR DELETE USING (auth.uid() = user_id);
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your Helpful Vault!

## 🎯 User Journey

1. **Sign Up/Login** - Create account or sign in
2. **Dashboard** - Central hub with all your organized items
3. **Add Items** - Create vault cards for passwords, exams, work, notes
4. **Sticky Notes** - Quick reminders with pin functionality
5. **Search & Filter** - Find items instantly by category or keywords
6. **Schedule View** - See upcoming items with due dates

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Real-time)
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## 📦 Project Structure

```
src/
├── components/
│   ├── Auth/           # Login & Register components
│   ├── Dashboard/      # Main dashboard components
│   └── UI/            # Reusable UI components
├── contexts/          # React contexts (Auth)
├── lib/              # Supabase configuration
└── main.jsx          # App entry point
```

## 🔒 Security Features

- Row Level Security (RLS) enabled
- User data isolation
- Secure authentication with Supabase
- Protected routes
- Input validation

## 🎨 Design Highlights

- Clean, modern interface
- Intuitive color coding by category
- Responsive grid layouts
- Smooth animations and transitions
- Professional typography

## 📱 Mobile Responsive

Fully optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

Having issues? Check these common solutions:

1. **Supabase Connection**: Verify your URL and API key
2. **Database Tables**: Ensure all tables and policies are created
3. **Environment**: Check Node.js version (16+ required)

---

Built with ❤️ for organizing your digital life efficiently!