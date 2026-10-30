import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  Check, 
  HelpCircle,
  TrendingUp,
  BrainCircuit,
  Globe2,
  Leaf,
  Users,
  Wifi,
  Battery,
  Signal
} from 'lucide-react';
import { getRandomQuiz, QuizQuestion } from './data/quizData';
import { EmojiFeedback } from './components/EmojiFeedback';
import { ScoreKingView } from './components/ScoreKingView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { 
  playCorrectSound, 
  playWrongSound, 
  playClickSound, 
  isSoundEnabled, 
  toggleSound 
} from './utils/sound';

export default function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getRandomQuiz(5));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userChoice, setUserChoice] = useState<'O' | 'X' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'PLAYING' | 'RESULT'>('PLAYING');
  const [history, setHistory] = useState<
    Array<{
      question: QuizQuestion;
      userChoice: 'O' | 'X';
      isCorrect: boolean;
    }>
  >([]);
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  // Ref for scrolling to bottom to prevent bottom clipping bug
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const updateMobileClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateMobileClock();
    const timer = setInterval(updateMobileClock, 30000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll when answered so feedback and "다음 문제" button are NEVER cut off
  useEffect(() => {
    if (isAnswered) {
      const timer = setTimeout(() => {
        bottomAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAnswered]);

  // Auto-transition to results on the 5th question after a brief feedback period
  useEffect(() => {
    if (isAnswered && currentIndex === questions.length - 1 && gameState === 'PLAYING') {
      const timer = setTimeout(() => {
        setGameState('RESULT');
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isAnswered, currentIndex, questions.length, gameState]);

  const handleToggleSound = () => {
    const updated = toggleSound();
    setSoundActive(updated);
    if (updated) {
      playClickSound();
    }
  };

  const handleRestart = () => {
    playClickSound();
    // Exclude current questions so user always gets 5 fresh new questions!
    const currentIds = questions.map((q) => q.id);
    const newQuestions = getRandomQuiz(5, currentIds);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setUserChoice(null);
    setIsAnswered(false);
    setHistory([]);
    setGameState('PLAYING');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const handleSelectChoice = (choice: 'O' | 'X') => {
    if (isAnswered || !currentQuestion) return;

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(40);
      } catch {
        // ignore
      }
    }

    setUserChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQuestion.answer;
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    setHistory((prev) => [
      ...prev,
      {
        question: currentQuestion,
        userChoice: choice,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserChoice(null);
      setIsAnswered(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      // 5 questions finished -> show 시사왕! result view immediately
      setGameState('RESULT');
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  const currentQuestion = questions[currentIndex] || questions[0];
  const score = history.filter((h) => h.isCorrect).length;

  // Responsive font size calculator so long or short questions resize dynamically per device
  const getQuestionFontSize = (text: string) => {
    const len = text.length;
    if (len > 70) return 'clamp(0.84rem, 3.2vw, 0.98rem)';
    if (len > 50) return 'clamp(0.92rem, 3.6vw, 1.05rem)';
    if (len > 35) return 'clamp(1rem, 4.0vw, 1.15rem)';
    return 'clamp(1.05rem, 4.5vw, 1.25rem)';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '경제':
        return <TrendingUp className="w-3.5 h-3.5 text-[#A50034] shrink-0" />;
      case 'IT·과학':
        return <BrainCircuit className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
      case '국제·사회':
        return <Globe2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case '환경·기후':
        return <Leaf className="w-3.5 h-3.5 text-teal-600 shrink-0" />;
      default:
        return <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0ECE9] flex items-center justify-center p-0 sm:p-4 select-none">
      {/* Mobile Device Frame Container (Optimized for Mobile App Form Factor) */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[840px] sm:max-h-[92vh] bg-[#FAF7F7] sm:rounded-[40px] shadow-2xl flex flex-col justify-between overflow-hidden border-0 sm:border-[8px] sm:border-slate-800 relative">
        
        {/* Mobile Top Status Bar */}
        <div className="bg-white/95 px-5 pt-3 pb-2 flex items-center justify-between text-slate-700 text-xs font-semibold shrink-0 select-none border-b border-slate-100">
          <span className="font-bold tracking-tight text-slate-800 text-[13px]">{currentTime}</span>
          
          <div className="hidden sm:block w-20 h-4 bg-slate-800 rounded-full mx-auto" />
          
          <div className="flex items-center gap-1.5 text-slate-600">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* In-App Header */}
        <header className="bg-white px-4 py-2 flex items-center justify-between border-b border-[#A50034]/15 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#A50034] text-white flex items-center justify-center font-black text-xs shadow-xs">
              OX
            </div>
            <div>
              <h1 className="text-sm font-black text-[#A50034] tracking-tight whitespace-nowrap">
                시사 퀴즈왕 OX
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleSound}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
              title={soundActive ? '효과음 끄기' : '효과음 켜기'}
              aria-label={soundActive ? '효과음 끄기' : '효과음 켜기'}
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-[#A50034]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              onClick={handleRestart}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
              title="처음부터 다시하기"
              aria-label="처음부터 다시하기"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>
        </header>

        {/* Scrollable Mobile App Body with generous bottom padding to prevent bottom clipping */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3 overscroll-contain pb-10"
        >
          {gameState === 'PLAYING' && currentQuestion ? (
            <div className="space-y-3">
              {/* Question Progress Tracker */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-[#A50034]/10 shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-500 flex items-center gap-1 whitespace-nowrap text-[clamp(0.72rem,2.9vw,0.8rem)]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#A50034] shrink-0" />
                    <span>진행: </span>
                    <strong className="text-[#A50034] font-bold">문제 {currentIndex + 1} / 5</strong>
                  </span>
                  <span className="text-slate-400 text-[11px] whitespace-nowrap">
                    {currentIndex + 1 === 5 ? '마지막 문제' : `${5 - (currentIndex + 1)}문제 남음`}
                  </span>
                </div>

                {/* 5-Segment Progress Bar */}
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((step) => {
                    const stepHistory = history[step];
                    const isCurrent = step === currentIndex;
                    const isPast = step < currentIndex;

                    return (
                      <div
                        key={step}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isPast
                            ? stepHistory?.isCorrect
                              ? 'bg-emerald-500'
                              : 'bg-rose-400'
                            : isCurrent
                            ? 'bg-[#A50034] ring-2 ring-[#A50034]/30'
                            : 'bg-slate-200'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Question Box Card with Dynamic Sentence Resizing */}
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5"
              >
                {/* Category & Single-line hint */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[clamp(0.7rem,2.8vw,0.75rem)] font-bold bg-[#FBE5EB] text-[#A50034] whitespace-nowrap">
                    {getCategoryIcon(currentQuestion.category)}
                    {currentQuestion.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                    O 또는 X 터치
                  </span>
                </div>

                {/* Question Statement with dynamic font size based on sentence length */}
                <div className="py-0.5">
                  <h2 
                    className="font-bold text-slate-900 leading-snug tracking-tight break-keep"
                    style={{ fontSize: getQuestionFontSize(currentQuestion.question) }}
                  >
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Instruction footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-[#A50034] shrink-0" />
                  <span>내용이 맞으면 O, 틀리면 X를 선택하세요</span>
                </div>
              </motion.div>

              {/* Mobile Thumb-Friendly Large O / X Buttons (Adaptive height when answered) */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                {/* O Button */}
                <motion.button
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice('O')}
                  className={`relative ${
                    isAnswered ? 'h-16 sm:h-20' : 'h-22 sm:h-26'
                  } rounded-2xl font-black transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-xs ${
                    isAnswered
                      ? currentQuestion.answer === 'O'
                        ? 'bg-emerald-500 text-white ring-3 ring-emerald-200 shadow-md'
                        : userChoice === 'O'
                        ? 'bg-rose-50 text-rose-300 border border-rose-200 opacity-60'
                        : 'bg-slate-100 text-slate-300 border border-slate-200 opacity-40'
                      : 'bg-white hover:bg-rose-50/30 text-[#A50034] border-2 border-[#A50034]/30 active:bg-[#A50034] active:text-white active:border-[#A50034]'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl font-black leading-none">O</span>
                  <span className="text-[clamp(0.72rem,3vw,0.82rem)] font-bold whitespace-nowrap">맞아요</span>
                  {isAnswered && currentQuestion.answer === 'O' && (
                    <span className="absolute top-1.5 right-1.5 p-0.5 bg-white rounded-full text-emerald-600 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </motion.button>

                {/* X Button */}
                <motion.button
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  disabled={isAnswered}
                  onClick={() => handleSelectChoice('X')}
                  className={`relative ${
                    isAnswered ? 'h-16 sm:h-20' : 'h-22 sm:h-26'
                  } rounded-2xl font-black transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer shadow-xs ${
                    isAnswered
                      ? currentQuestion.answer === 'X'
                        ? 'bg-emerald-500 text-white ring-3 ring-emerald-200 shadow-md'
                        : userChoice === 'X'
                        ? 'bg-rose-50 text-rose-300 border border-rose-200 opacity-60'
                        : 'bg-slate-100 text-slate-300 border border-slate-200 opacity-40'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 active:bg-slate-800 active:text-white active:border-slate-800'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl font-black leading-none">X</span>
                  <span className="text-[clamp(0.72rem,3vw,0.82rem)] font-bold whitespace-nowrap">틀려요</span>
                  {isAnswered && currentQuestion.answer === 'X' && (
                    <span className="absolute top-1.5 right-1.5 p-0.5 bg-white rounded-full text-emerald-600 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Animated Emoji Feedback Box (Single animated emoji, no static text emojis) */}
              <AnimatePresence mode="wait">
                {isAnswered && userChoice && (
                  <EmojiFeedback
                    isCorrect={userChoice === currentQuestion.answer}
                    userChoice={userChoice}
                    question={currentQuestion}
                    onNext={handleNext}
                    isLastQuestion={currentIndex === questions.length - 1}
                    questionNumber={currentIndex}
                  />
                )}
              </AnimatePresence>

              {/* Anchor element to guarantee smooth scrolling to the bottom */}
              <div ref={bottomAnchorRef} className="h-6 shrink-0" />
            </div>
          ) : (
            <ErrorBoundary fallbackRestart={handleRestart}>
              <ScoreKingView
                score={score}
                totalQuestions={questions.length}
                history={history}
                onRestart={handleRestart}
              />
            </ErrorBoundary>
          )}
        </div>

        {/* Mobile Bottom Bar */}
        <div className="bg-white border-t border-slate-100 px-4 py-2 shrink-0 flex items-center justify-between text-[11px] text-slate-500">
          <span className="whitespace-nowrap">시사 퀴즈왕 OX</span>
          <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto" />
          <span className="whitespace-nowrap">5문 5답</span>
        </div>
      </div>
    </div>
  );
}
