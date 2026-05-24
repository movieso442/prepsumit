import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Check, Bookmark, RefreshCw, Award } from 'lucide-react';

export default function FlashcardDeck({ deck, deckTitle, courseColor }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Track status of each card: 'unseen', 'mastered', 'review'
  const [cardStatus, setCardStatus] = useState(Array(deck.length).fill('unseen'));
  const [showSummary, setShowSummary] = useState(false);

  const activeCard = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < deck.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowSummary(true);
      }
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }, 150);
  };

  const markCard = (status) => {
    const updatedStatus = [...cardStatus];
    updatedStatus[currentIndex] = status;
    setCardStatus(updatedStatus);
    handleNext();
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCardStatus(Array(deck.length).fill('unseen'));
    setShowSummary(false);
  };

  const masteredCount = cardStatus.filter(s => s === 'mastered').length;
  const reviewCount = cardStatus.filter(s => s === 'review').length;
  const percentageMastered = Math.round((masteredCount / deck.length) * 100);

  if (showSummary) {
    return (
      <div className="card fade-in" style={{ padding: '36px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: percentageMastered >= 70 ? 'var(--success-light)' : 'var(--accent-light)',
          color: percentageMastered >= 70 ? 'var(--success)' : 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Award size={36} />
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Deck Completed!</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Here is your mastery report for <strong>{deckTitle}</strong>.
        </p>

        {/* Circular Progress Display */}
        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
          <svg className="radial-progress-svg" width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="radial-progress-bg" />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              className="radial-progress-bar"
              style={{
                strokeDasharray: 2 * Math.PI * 54,
                strokeDashoffset: (2 * Math.PI * 54) * (1 - masteredCount / deck.length),
                stroke: percentageMastered >= 70 ? 'var(--success)' : 'var(--primary)'
              }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>{percentageMastered}%</span>
            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-tertiary)' }}>Mastered</span>
          </div>
        </div>

        {/* Mastery stats summary table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
          <div className="card" style={{ padding: '12px', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--success)' }}>{masteredCount}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Mastered</span>
          </div>
          <div className="card" style={{ padding: '12px', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--accent)' }}>{reviewCount}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Need Review</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={resetDeck} style={{ width: '100%' }}>
          <RotateCcw size={16} /> Study Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: courseColor || 'var(--primary)', textTransform: 'uppercase' }}>
            Flashcard Practice
          </span>
          <h3 style={{ fontSize: '1.3rem', margin: '2px 0' }}>{deckTitle}</h3>
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
          Card {currentIndex + 1} of {deck.length}
        </div>
      </div>

      {/* Interactive 3D Flipping Card */}
      <div 
        className={`flashcard-wrapper ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flashcard-inner">
          {/* Front Face */}
          <div className="flashcard-front">
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.1em', fontWeight: '700', position: 'absolute', top: '24px' }}>
              Concept Term
            </span>
            <h2 style={{ fontSize: '2rem', wordBreak: 'break-word', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {activeCard.term}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', position: 'absolute', bottom: '24px', fontSize: '0.85rem', fontWeight: '600' }}>
              <RefreshCw size={14} /> Click card to reveal definition
            </div>
          </div>

          {/* Back Face */}
          <div className="flashcard-back">
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.1em', fontWeight: '700', position: 'absolute', top: '24px' }}>
              Expert Definition
            </span>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.45', fontWeight: '500' }}>
              {activeCard.definition}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255, 255, 255, 0.8)', position: 'absolute', bottom: '24px', fontSize: '0.85rem', fontWeight: '600' }}>
              <RefreshCw size={14} /> Click card to view term
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', backgroundColor: 'var(--border-light)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${((currentIndex + 1) / deck.length) * 100}%`, 
          backgroundColor: courseColor || 'var(--primary)', 
          height: '100%', 
          transition: 'width 0.3s ease' 
        }} />
      </div>

      {/* Deck Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          disabled={currentIndex === 0}
          style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {isFlipped ? (
          <div style={{ display: 'flex', gap: '12px' }} onClick={(e) => e.stopPropagation()}>
            <button 
              className="btn" 
              style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)', border: '1.5px solid var(--error)' }}
              onClick={() => markCard('review')}
            >
              <Bookmark size={16} /> Still Studying
            </button>
            <button 
              className="btn" 
              style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)', border: '1.5px solid var(--success)' }}
              onClick={() => markCard('mastered')}
            >
              <Check size={16} /> Mastered
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-primary" 
            onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
          >
            Reveal Definition
          </button>
        )}

        <button 
          className="btn btn-secondary" 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
        >
          Skip <ChevronRight size={16} />
        </button>
      </div>

      {/* Study status for visited cards */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
        {cardStatus.map((status, index) => {
          let dotColor = 'var(--border-light)';
          if (index === currentIndex) dotColor = courseColor || 'var(--primary)';
          else if (status === 'mastered') dotColor = 'var(--success)';
          else if (status === 'review') dotColor = 'var(--accent)';
          
          return (
            <div 
              key={index} 
              style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                backgroundColor: dotColor,
                transition: 'all 0.2s' 
              }} 
            />
          );
        })}
      </div>
    </div>
  );
}
