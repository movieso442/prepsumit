import { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, Award, CheckCircle2, HelpCircle } from 'lucide-react';

export default function QuizEngine({ questions, quizTitle, courseColor, onQuizComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // Track details of completed quiz
  const [answersLog, setAnswersLog] = useState([]);

  const activeQuestion = questions[currentIndex];

  const handleOptionSelect = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    
    const correct = selectedOption === activeQuestion.answer;
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    // Log the answer
    setAnswersLog(prev => [...prev, {
      question: activeQuestion.question,
      selected: selectedOption,
      correctIndex: activeQuestion.answer,
      isCorrect: correct,
      explanation: activeQuestion.explanation
    }]);

    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      if (onQuizComplete) {
        onQuizComplete(score + (selectedOption === activeQuestion.answer ? 1 : 0), questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
    setAnswersLog([]);
  };

  const scorePercentage = Math.round((score / questions.length) * 100);

  // Results Screen
  if (showResults) {
    return (
      <div className="card fade-in" style={{ padding: '36px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: scorePercentage >= 70 ? 'var(--success-light)' : 'var(--error-light)',
            color: scorePercentage >= 70 ? 'var(--success)' : 'var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Award size={36} />
          </div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Quiz Results</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You scored <strong>{score} out of {questions.length}</strong> questions correctly.</p>
        </div>

        {/* Score Card Display */}
        <div style={{ 
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '28px',
          border: '1px solid var(--border-light)'
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: scorePercentage >= 70 ? 'var(--success)' : 'var(--primary)' }}>
            {scorePercentage}%
          </span>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            {scorePercentage >= 90 ? 'Outstanding!' : scorePercentage >= 70 ? 'Passed' : 'Needs Study'}
          </p>
        </div>

        {/* Answer Breakdown Details */}
        <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '1.05rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            Question Review
          </h4>
          {answersLog.map((log, index) => (
            <div key={index} style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                {log.isCorrect ? (
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <X size={18} style={{ color: 'var(--error)', flexShrink: 0, marginTop: '2px' }} />
                )}
                <div>
                  <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{index + 1}. {log.question}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                    Explanation: {log.explanation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleRestart} style={{ width: '100%' }}>
          <RotateCcw size={16} /> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-question-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: courseColor || 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Lesson Quiz
          </span>
          <h3 style={{ fontSize: '1.25rem', margin: '2px 0' }}>{quizTitle}</h3>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Line */}
      <div style={{ width: '100%', backgroundColor: 'var(--border-light)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${(currentIndex / questions.length) * 100}%`, 
          backgroundColor: courseColor || 'var(--primary)', 
          height: '100%', 
          transition: 'width 0.3s ease' 
        }} />
      </div>

      {/* Question Body */}
      <div>
        <h4 style={{ fontSize: '1.2rem', lineHeight: '1.4', fontWeight: '600', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <HelpCircle size={22} style={{ color: courseColor || 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
          <span>{activeQuestion.question}</span>
        </h4>

        {/* Options List */}
        <div className="options-list">
          {activeQuestion.options.map((option, index) => {
            let btnClass = "";
            let iconToShow = null;
            
            if (isSubmitted) {
              if (index === activeQuestion.answer) {
                btnClass = "correct";
                iconToShow = <Check size={16} />;
              } else if (selectedOption === index) {
                btnClass = "wrong";
                iconToShow = <X size={16} />;
              }
            } else if (selectedOption === index) {
              btnClass = "selected";
            }

            return (
              <button
                key={index}
                className={`option-btn ${btnClass}`}
                onClick={() => handleOptionSelect(index)}
                disabled={isSubmitted}
              >
                <div className="option-marker">
                  {iconToShow || String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* Answer submission feed / explanations */}
        {isSubmitted && (
          <div className="quiz-explanation fade-in">
            <h5 style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px', fontSize: '0.95rem' }}>
              {selectedOption === activeQuestion.answer ? "🎉 Correct!" : "❌ Incorrect"}
            </h5>
            <p>{activeQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
        {!isSubmitted ? (
          <button 
            className="btn btn-primary" 
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
            style={{ opacity: selectedOption === null ? 0.6 : 1 }}
          >
            Check Answer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
