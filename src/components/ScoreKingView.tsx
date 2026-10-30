import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Crown, RotateCcw, Share2, Check, CheckCircle2, XCircle, Award, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import type { QuizQuestion } from '../data/quizData';
import { playFanfare, playClickSound } from '../utils/sound';

interface ScoreKingViewProps {
  score: number;
  totalQuestions?: number;
  history?: Array<{
    question: QuizQuestion;
    userChoice: 'O' | 'X';
    isCorrect: boolean;
  }>;
  onRestart: () => void;
}

// 100% Pure React Confetti particles - zero external canvas library, zero crash risk
const PureConfetti = () => {
  const particles = [
    { color: '#A50034', x: '8%', delay: '0s', dur: '1.9s', size: 10 },
    { color: '#F59E0B', x: '20%', delay: '0.3s', dur: '2.1s', size: 8 },
    { color: '#10B981', x: '35%', delay: '0.1s', dur: '2.0s', size: 11 },
    { color: '#E11D48', x: '48%', delay: '0.5s', dur: '1.8s', size: 9 },
    { color: '#3B82F6', x: '62%', delay: '0.2s', dur: '2.2s', size: 12 },
    { color: '#A50034', x: '75%', delay: '0.4s', dur: '1.9s', size: 10 },
    { color: '#F59E0B', x: '88%', delay: '0.15s', dur: '2.3s', size: 8 },
    { color: '#10B981', x: '28%', delay: '0.6s', dur: '2.0s', size: 11 },
    { color: '#E11D48', x: '55%', delay: '0.7s', dur: '1.9s', size: 9 },
    { color: '#3B82F6', x: '82%', delay: '0.45s', dur: '2.1s', size: 10 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="absolute rounded-xs animate-confetti-fall"
          style={{
            left: p.x,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            backgroundColor: p.color,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
};

export const ScoreKingView: React.FC<ScoreKingViewProps> = ({
  score = 0,
  totalQuestions = 5,
  history = [],
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const safeTotal = totalQuestions > 0 ? totalQuestions : 5;
  const safeScore = Math.max(0, Math.min(score, safeTotal));
  const percentage = Math.round((safeScore / safeTotal) * 100);

  useEffect(() => {
    try {
      playFanfare();
    } catch (e) {
      console.debug('Audio error:', e);
    }
  }, []);

  const getKingTitle = () => {
    if (safeScore === 5) return '만점 등극! 최고의 시사왕';
    if (safeScore >= 4) return '명예의 전당! 특급 시사왕';
    if (safeScore >= 3) return '센스 만점! 스마트 시사왕';
    if (safeScore >= 1) return '잠재력 폭발! 꿈나무 시사왕';
    return '도전 정신 가득한 시사왕';
  };

  const getCheeringMessage = () => {
    if (safeScore === 5) return '5문제 모두 완벽 정답! 오늘 하루 뉴스 앵커급 시사 내공을 증명하셨습니다.';
    if (safeScore >= 4) return '단 1문제 빼고 모두 맞히셨어요! 사회를 바라보는 눈이 아주 날카롭습니다.';
    if (safeScore >= 3) return '기본 시사 상식이 탄탄하시네요! 일상 대화에서 막힘없는 수준입니다.';
    return '시사 상식은 꾸준히 접하면 쑥쑥 자라납니다. 한 번 더 도전해 볼까요?';
  };

  const handleShare = async () => {
    try {
      playClickSound();
      const shareText = `[시사 퀴즈왕 OX] 나의 점수는 ${safeScore}/${safeTotal}점 (${percentage}점)! 시사왕 결과 확인하기`;
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch (e) {
      console.debug('Share clipboard error:', e);
    }
  };

  return (
    <div className="relative space-y-3.5 pb-6">
      {/* Falling Confetti Layer */}
      <PureConfetti />

      {/* Royal Crown & Score Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#A50034]/20 p-4 sm:p-6 text-center shadow-md">
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#A50034]/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Crown Badge */}
        <div className="inline-flex items-center justify-center relative mb-2">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 15 }}
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#A50034] to-[#7B0024] flex items-center justify-center text-white shadow-md ring-4 ring-[#FBE5EB]"
          >
            <Crown className="w-8 h-8 text-amber-300 drop-shadow-xs" />
          </motion.div>
        </div>

        {/* Title & "시사왕!" */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 bg-[#FBE5EB] text-[#A50034] font-black text-[clamp(0.75rem,3vw,0.85rem)] tracking-wide rounded-full">
            <Trophy className="w-3 h-3 shrink-0" />
            <span>{getKingTitle()}</span>
          </div>

          <h2 className="text-[clamp(1.75rem,6vw,2.25rem)] font-black text-[#A50034] tracking-tight whitespace-nowrap">
            시사왕!
          </h2>

          <p className="text-[clamp(0.78rem,3.2vw,0.875rem)] text-slate-600 max-w-xs mx-auto pt-0.5 leading-relaxed break-keep">
            {getCheeringMessage()}
          </p>
        </div>

        {/* Score Summary Box */}
        <div className="bg-[#FAF7F7] rounded-2xl p-2.5 sm:p-3.5 my-3 border border-slate-100 flex items-center justify-around">
          <div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">정답 개수</div>
            <div className="text-xl sm:text-2xl font-black text-slate-800 tabular-nums">
              <span className="text-[#A50034]">{safeScore}</span> / {safeTotal}
            </div>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">환산 점수</div>
            <div className="text-xl sm:text-2xl font-black text-[#A50034] tabular-nums">
              {percentage}<span className="text-sm font-bold">점</span>
            </div>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">정답률</div>
            <div className="text-xl sm:text-2xl font-black text-slate-800 tabular-nums">
              {percentage}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-0.5">
          {/* Main Restart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRestart();
            }}
            className="w-full py-3.5 px-4 bg-[#A50034] hover:bg-[#8B002B] active:scale-[0.98] text-white font-black rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-[clamp(0.85rem,3.5vw,0.95rem)] whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>새로운 5문제 다시 풀기</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-[clamp(0.75rem,3.2vw,0.85rem)] whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-bold">점수가 복사되었습니다!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>시사왕 결과 공유하기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Review Accordion */}
      {history && history.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowReview((prev) => !prev);
            }}
            className="w-full flex items-center justify-between text-left cursor-pointer py-0.5"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#A50034] shrink-0" />
              <span className="text-[clamp(0.75rem,3.2vw,0.85rem)] font-bold text-slate-800 whitespace-nowrap">
                문제별 정답 및 해설 복습하기
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap">
              <span>{showReview ? '접기' : '펼치기'}</span>
              {showReview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {showReview && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2">
              {history.map((item, idx) => {
                if (!item || !item.question) return null;
                return (
                  <div
                    key={item.question.id ?? idx}
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-800 leading-snug break-keep text-[clamp(0.75rem,3vw,0.825rem)]">
                        Q{idx + 1}. {item.question.question}
                      </span>
                      <span className="shrink-0 flex items-center gap-1 font-bold text-[11px]">
                        {item.isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> 정답
                          </span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-0.5">
                            <XCircle className="w-3 h-3" /> 오답
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 whitespace-nowrap">
                      <span>내 선택: <strong className="text-slate-700">{item.userChoice}</strong></span>
                      <span>정답: <strong className="text-[#A50034]">{item.question.answer}</strong></span>
                      <span>· {item.question.category}</span>
                    </div>
                    <p className="text-slate-600 pt-1 leading-relaxed border-t border-slate-200/50 text-[clamp(0.72rem,2.8vw,0.8rem)] break-keep">
                      {item.question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
