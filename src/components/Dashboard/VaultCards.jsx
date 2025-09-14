import React, { useState } from 'react';
import { 
  Calendar,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Package,
  CheckCircle2,
  X // Added for the modal close button
} from 'lucide-react';

// --- NEW: Modal Component ---
// This component will display the full content of a selected card in a pop-up.
const CardModal = ({ card, onClose }) => {
  if (!card) return null;

  const categoryStyles = {
    exam: { icon: '📚' },
    work: { icon: '💼' },
    notes: { icon: '📝' },
    other: { icon: '📋' },
  };
  const { icon } = categoryStyles[card.category] || categoryStyles.other;

  return (
    // Backdrop overlay
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{card.title}</h3>
              <p className="text-sm text-slate-500 capitalize">{card.category}</p>
            </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap break-words">
            {card.content}
          </p>
        </div>
      </div>
    </div>
  );
};


const VaultCard = ({ card, onDelete, onToggleComplete, onViewCard }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const isPassword = card.category === 'password';
  // Check if the card is not a password and has long content
  const hasLongContent = !isPassword && card.content && card.content.length > 100;

  const categoryStyles = {
    password: { icon: '🔐', glow: 'from-green-500/50 to-emerald-500/50', border: 'border-green-500/30' },
    exam: { icon: '📚', glow: 'from-blue-500/50 to-sky-500/50', border: 'border-blue-500/30' },
    work: { icon: '💼', glow: 'from-purple-500/50 to-indigo-500/50', border: 'border-purple-500/30' },
    notes: { icon: '📝', glow: 'from-yellow-500/50 to-amber-500/50', border: 'border-yellow-500/30' },
    other: { icon: '📋', glow: 'from-slate-500/50 to-gray-500/50', border: 'border-slate-500/30' },
  };

  const { icon, glow, border } = categoryStyles[card.category] || categoryStyles.other;

  const handleCopy = () => {
    navigator.clipboard.writeText(card.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // The card itself is now a button if it's not a password card
  const CardWrapper = isPassword ? 'div' : 'button';

  return (
    <CardWrapper
      // If it's a button, clicking it opens the modal
      onClick={isPassword ? undefined : () => onViewCard(card)}
      className={`w-full text-left relative group bg-slate-50/80 backdrop-blur-lg rounded-2xl p-6 border ${border} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1 ${card.is_completed ? 'opacity-60' : ''}`}
    >
      <div className={`absolute -top-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tr ${glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

      <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
              <span className="text-3xl">{icon}</span>
              <div>
                  <h3 className={`font-bold text-slate-900 text-lg leading-tight ${card.is_completed ? 'line-through' : ''}`}>{card.title}</h3>
                  <span className="text-xs font-medium text-slate-500 capitalize">{card.category}</span>
              </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(card.id); }} 
            className="absolute top-4 right-4 text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
      </div>
    
      <div className="mb-4 flex-grow min-h-[60px] flex flex-col justify-center">
        {isPassword ? (
          isContentVisible ? (
            <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200">
              <p className="text-slate-800 text-sm font-mono select-all break-all">{card.content}</p>
              <button onClick={handleCopy} className="p-2 text-slate-500 hover:text-blue-600 flex-shrink-0">
                {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
              </button>
            </div>
          ) : ( <p className="text-slate-400 text-3xl font-mono tracking-widest">••••••••</p> )
        ) : (
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap line-clamp-3">
            {card.content}
          </p>
        )}
      </div>
    
      <div className="mt-auto">
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {card.tags.map(tag => <span key={tag} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-200/70 text-slate-700">#{tag}</span>)}
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-slate-500">
          {card.due_date ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleComplete(card.id, card.is_completed); }}
              className={`flex items-center p-1 rounded-md transition-colors ${card.is_completed ? 'text-green-600 bg-green-100' : 'hover:bg-slate-100'}`}
            >
              {card.is_completed ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Calendar className="w-4 h-4 mr-2" />}
              <span className={card.is_completed ? 'line-through' : ''}>
                {new Date(card.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </button>
          ) : <div/>}

          {isPassword && (
            <button onClick={() => setIsContentVisible(!isContentVisible)} className="flex items-center font-semibold text-blue-600 hover:text-blue-800">
              {isContentVisible ? <EyeOff size={16} className="mr-1"/> : <Eye size={16} className="mr-1"/>}
              {isContentVisible ? 'Hide' : 'Show'}
            </button>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};


const VaultCards = ({ cards, onDelete, onToggleComplete }) => {
  // --- NEW: State to manage the selected card for the modal ---
  const [selectedCard, setSelectedCard] = useState(null);

  const handleViewCard = (card) => {
    // We only open the modal for non-password cards
    if (card.category !== 'password') {
      setSelectedCard(card);
    }
  };

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
    // Use a React Fragment to render the modal as a sibling
    <>
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Package className="w-6 h-6 mr-3 text-blue-600" />
          Vault Cards
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <VaultCard 
              key={card.id} 
              card={card} 
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              onViewCard={handleViewCard} // Pass the handler to each card
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VaultCards;