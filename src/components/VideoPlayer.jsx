import { useState, useRef } from 'react';
import { Play, Pause, Volume2, Maximize, FileText, List, HelpCircle, BookOpen, AlertCircle } from 'lucide-react';
import QuizEngine from './QuizEngine';

export default function VideoPlayer({ lesson, courseColor, onQuizComplete }) {
  const [activeTab, setActiveTab] = useState('video'); // 'video', 'transcript', 'summary', 'quiz'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // Helper to parse "MM:SS" into seconds
  const parseTimeToSeconds = (timeStr) => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 0;
  };

  // Sync transcript line based on video current time (calculated during render)
  let currentLineIndex = 0;
  if (lesson.transcript) {
    for (let i = 0; i < lesson.transcript.length; i++) {
      const lineTime = parseTimeToSeconds(lesson.transcript[i].time);
      if (currentTime >= lineTime) {
        currentLineIndex = i;
      } else {
        break;
      }
    }
  }

  // Video Events
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Video playback error", err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (timeStr) => {
    if (!videoRef.current) return;
    const seconds = parseTimeToSeconds(timeStr);
    videoRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Video Display Container */}
      <div className="video-player-container">
        <video
          ref={videoRef}
          className="video-element"
          src={lesson.videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handlePlayPause}
          playsInline
        />

        {/* Overlay Play Button when paused */}
        {!isPlaying && (
          <div className="video-overlay-play" onClick={handlePlayPause}>
            <div className="play-icon-circle">
              <Play size={36} fill="white" style={{ marginLeft: '4px' }} />
            </div>
          </div>
        )}

        {/* Custom Video Control Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10
        }}>
          {/* Progress Slider */}
          <div 
            onClick={handleProgressBarClick}
            style={{
              width: '100%',
              height: '5px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              backgroundColor: courseColor || 'var(--primary)',
              borderRadius: '2px',
              position: 'absolute',
              top: 0,
              left: 0
            }} />
          </div>

          {/* Buttons Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button 
                onClick={handlePlayPause} 
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
              </button>
              <div style={{ fontSize: '0.85rem', fontWeight: '500', display: 'flex', gap: '4px' }}>
                <span>{formatTime(currentTime)}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>/</span>
                <span>{formatTime(duration || parseTimeToSeconds(lesson.duration))}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Volume2 size={20} style={{ cursor: 'pointer' }} />
              <Maximize size={20} style={{ cursor: 'pointer' }} onClick={() => videoRef.current?.requestFullscreen()} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <BookOpen size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
          Lesson Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transcript' ? 'active' : ''}`}
          onClick={() => setActiveTab('transcript')}
        >
          <FileText size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
          Interactive Transcript
        </button>
        <button 
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <List size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
          Summary Details
        </button>
        <button 
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <HelpCircle size={16} style={{ marginRight: '6px', display: 'inline', verticalAlign: 'middle' }} />
          Practice Quiz
        </button>
      </div>

      {/* Active Tab Panel Content */}
      <div className="card" style={{ padding: '24px', minHeight: '220px' }}>
        {activeTab === 'video' && (
          <div className="fade-in">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{lesson.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
              Welcome to the lesson! Read the summary details, interact with the transcript, or test your knowledge with the practice quiz. Use the navigation buttons below when you are ready to study.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <AlertCircle size={20} style={{ color: courseColor || 'var(--primary)' }} />
              <span style={{ fontSize: '0.85rem' }}>
                Tip: Click any sentence in the <strong>Interactive Transcript</strong> tab to jump directly to that explanation in the video lesson.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'transcript' && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Interactive Lesson Script</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
              {lesson.transcript.map((line, idx) => (
                <div
                  key={idx}
                  className={`transcript-line ${currentLineIndex === idx ? 'highlighted' : ''}`}
                  onClick={() => handleSeek(line.time)}
                >
                  <span className="transcript-time">{line.time}</span>
                  <span className="transcript-text">{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="fade-in">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Core Takeaways</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {lesson.summary}
            </p>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="fade-in">
            <QuizEngine 
              questions={lesson.quiz}
              quizTitle={lesson.title}
              courseColor={courseColor}
              onQuizComplete={onQuizComplete}
            />
          </div>
        )}
      </div>

    </div>
  );
}
