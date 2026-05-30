import { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, X, Send, User } from 'lucide-react';

export default function AITutor({ course, lesson }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I'm your PrepSumit AI Tutor. Ask me any questions about your lessons, study objectives, or exams, and I'll help you master them!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Adjust greeting based on current context
  useEffect(() => {
    let text = "Hello! I'm your PrepSumit AI Tutor. Ask me any questions about your lessons, study objectives, or exams, and I'll help you master them!";
    if (lesson) {
      text = `Welcome to the lesson: "${lesson.title}"! I am ready to explain formulas, quiz you on this topic, or clarify any concepts. What would you like to explore first?`;
    } else if (course) {
      text = `Hi! Studying "${course.title}"? I can help you review the chapters, explain syllabus topics, or practice exam questions. Ask me anything!`;
    }
    setMessages([
      {
        sender: 'ai',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [course, lesson]);

  // Suggested Prompts based on active course
  const getSuggestions = () => {
    if (course?.id === 'ap-calculus' || lesson?.id === 'limits-intro') {
      return ["Explain limits simply", "How does the Power Rule work?", "Give me a Calculus quiz"];
    }
    if (course?.id === 'ftce-professional-education-test' || course?.id?.includes('ftce')) {
      return ["What score do I need to pass?", "Explain Competency 1", "FTCE retake rules"];
    }
    if (course?.id === 'cell-biology') {
      return ["What is the powerhouse of the cell?", "Eukaryotes vs Prokaryotes", "Test my biology facts"];
    }
    if (course?.id === 'macroeconomics') {
      return ["Explain GDP formula", "Nominal vs Real GDP", "Give me an Economics quiz"];
    }
    return ["Explain study strategies", "Practice quizzes info", "How to transfer credit"];
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Trigger typing indicator
    setIsTyping(true);

    // AI Response generation
    setTimeout(() => {
      let aiText = "That's an interesting question! I am programmed with your curriculum files. Ask me about limits, derivatives, organelles, or the FTCE test format for a direct explanation!";
      const q = text.toLowerCase();

      if (q.includes('limit')) {
        aiText = "A limit is the mathematical value that a function approaches as the input approaches some point. For example, in f(x) = (x^2 - 1)/(x - 1), at x = 1 the function is undefined (0/0), but the limit as x approaches 1 is 2! Would you like a practice limit problem?";
      } else if (q.includes('power rule') || q.includes('derivative')) {
        aiText = "The Power Rule is a shortcut for finding derivatives: d/dx [x^n] = n * x^(n-1). For example, the derivative of x^3 is 3x^2, and the derivative of x^2 is 2x! Would you like me to quiz you on this?";
      } else if (q.includes('passing score') || q.includes('ftce') || q.includes('score')) {
        aiText = "For the FTCE Professional Education Test, you need a scaled score of 200 to pass. This typically equates to answering approximately 70% to 75% of the 110 multiple-choice questions correctly. It is scored as PASS or NOT PASS.";
      } else if (q.includes('retake')) {
        aiText = "Under Florida Department of Education guidelines, if you do not pass your FTCE exam, you must wait exactly 31 calendar days before registering to retake the same test.";
      } else if (q.includes('powerhouse') || q.includes('mitochondria') || q.includes('organelle')) {
        aiText = "Mitochondria are known as the powerhouses of the cell! They are double-membrane bound organelles that generate adenosine triphosphate (ATP), the chemical energy currency used in cellular processes.";
      } else if (q.includes('eukaryote') || q.includes('prokaryote')) {
        aiText = "The main difference is that Eukaryotic cells have a true nucleus and membrane-bound organelles (like mitochondria and endoplasmic reticulum), whereas Prokaryotes (like bacteria) lack a nucleus and organelles.";
      } else if (q.includes('gdp')) {
        aiText = "Gross Domestic Product (GDP) is the total market value of all final goods and services produced within a country's borders in a year. The expenditure formula is GDP = C + I + G + NX (Consumption + Investment + Government Spending + Net Exports).";
      } else if (q.includes('competency 1')) {
        aiText = "Competency 1 of the FTCE Professional Education Test focuses on Instructional Design and Planning. It covers designing lesson plans, selecting appropriate learning materials, and aligning objectives to student needs.";
      } else if (q.includes('quiz') || q.includes('test me') || q.includes('practice')) {
        aiText = "Let's do a quick quiz question! \n\nWhich of the following is responsible for synthesizing proteins in a cell?\n1. Nucleus\n2. Ribosome\n3. Lysosome\n\n(Type the correct number to reply!)";
      } else if (q === '2' || q.includes('ribosome')) {
        aiText = "Correct! Ribosomes are the cellular structures responsible for protein synthesis. Great job! Let me know if you want another question.";
      } else if (q === '1' || q === '3' || q.includes('nucleus') || q.includes('lysosome')) {
        aiText = "Not quite! The correct answer is 2 (Ribosome). The nucleus houses DNA, and lysosomes break down wastes. Would you like another question?";
      } else if (q.includes('credit') || q.includes('transfer')) {
        aiText = "PrepSumit courses carry ACE and NCCRS recommendations. You can transfer credits earned here to over 1,500 partner colleges. Simply pass the proctored exam and request a transcript from your dashboard!";
      } else if (q.includes('study strategies') || q.includes('strategy')) {
        aiText = "To study effectively on PrepSumit: 1. Watch the short video lesson, 2. Review the transcript, 3. Study the flashcard decks, and 4. Complete the practice quiz. Users who do this have a 92% pass rate!";
      }

      const aiMsg = {
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div 
        className="chatbot-bubble" 
        onClick={() => setIsOpen(!isOpen)}
        title="Open PrepSumit AI Study Tutor"
      >
        {isOpen ? <X size={26} /> : <Sparkles size={26} />}
      </div>

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="chatbot-window card">
          {/* Header */}
          <div style={{
            backgroundColor: 'var(--primary-dark)',
            color: '#ffffff',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)'
              }}>
                <Sparkles size={16} fill="var(--accent)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', margin: 0 }}>PrepSumit AI Tutor</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.8, fontWeight: '700' }}>Online Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', opacity: 0.8 }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="custom-scrollbar"
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: '#f8fafc'
            }}
          >
            {messages.map((msg, i) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={i} 
                  style={{
                    display: 'flex',
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    gap: '10px',
                    maxWidth: '85%',
                    alignSelf: isUser ? 'flex-end' : 'flex-start'
                  }}
                >
                  {/* Icon */}
                  {!isUser && (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Sparkles size={12} fill="white" />
                    </div>
                  )}
                  {isUser && (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--border-light)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <User size={12} />
                    </div>
                  )}

                  {/* Bubble */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      lineHeight: '1.45',
                      whiteSpace: 'pre-line',
                      backgroundColor: isUser ? 'var(--primary)' : '#ffffff',
                      color: isUser ? '#ffffff' : 'var(--text-primary)',
                      border: isUser ? 'none' : '1px solid var(--border-light)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', alignSelf: isUser ? 'flex-end' : 'flex-start' }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', alignItems: 'center' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={12} fill="white" />
                </div>
                <div style={{
                  padding: '10px 16px',
                  borderRadius: '16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-light)',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', animation: 'pulse 1s infinite' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', animation: 'pulse 1s infinite 0.2s' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)', animation: 'pulse 1s infinite 0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts Area */}
          <div style={{
            padding: '10px 14px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {getSuggestions().map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s)}
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={e => { e.target.style.backgroundColor = 'var(--primary-light)'; e.target.style.borderColor = 'var(--primary)'; }}
                onMouseOut={e => { e.target.style.backgroundColor = 'var(--bg-tertiary)'; e.target.style.borderColor = 'var(--border-light)'; }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Form Input Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '12px 14px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              gap: '10px'
            }}
          >
            <input 
              type="text" 
              placeholder="Ask a question..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="chat-input"
              style={{
                flex: 1,
                minWidth: '0', // Allow it to shrink
                padding: '10px 14px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                border: '1px solid var(--border-light)',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            />
            <button 
              type="submit"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
                flexShrink: 0 // Make sure button never shrinks
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--primary)'}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
      
      {/* Local styles for mobile input padding reduction */}
      <style>{`
        @media (max-width: 480px) {
          .chat-input {
            padding: 8px 12px !important;
            font-size: 0.8rem !important;
          }
          .chatbot-window form {
            padding: 10px 12px !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
