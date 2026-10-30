import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import type { QuizQuestion } from '../data/quizData';

interface EmojiFeedbackProps {
  isCorrect: boolean;
  userChoice: 'O' | 'X';
  question: QuizQuestion;
  onNext: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
}

// Single animated emoji list: happy on correct, sad on incorrect
const HAPPY_EMOJIS = ['🥳', '😆', '🎉', '👏', '🤩'];
const SAD_EMOJIS = ['🥺', '😢', '🤦‍♂️', '😿', '😭'];

export const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({
  isCorrect,
  userChoice,
  question,
  onNext,
  isLastQuestion,
  questionNumber,
}) => {
  const emojiIndex = question.id % HAPPY_EMOJIS.length;
  // Exactly ONE animated emoji - no secondary floating emojis, no static text emojis
  const singleAnimatedEmoji = isCorrect ? HAPPY_EMOJIS[emojiIndex] : SAD_EMOJIS[emojiIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: 'spring', damping: 26, stiffness: 340 }}
      className={`rounded-2xl border p-3.5 sm:p-4 shadow-md transition-all ${
        isCorrect
          ? 'bg-gradient-to-b from-[#FFF5F7] via-white to-white border-[#A50034]/25 ring-1 ring-[#A50034]/15'
          : 'bg-gradient-to-b from-slate-50 via-white to-white border-slate-200 ring-1 ring-slate-100'
      }`}
    >
      {/* Top Banner with EXACTLY ONE Animated Emoji Box */}
      <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
        {/* Single Animated Emoji Avatar */}
        <div className="shrink-0">
          <motion.div
            initial={{ scale: 0.4, rotate: -20 }}
            animate={{ 
              scale: [0.9, 1.25, 1, 1.12, 1],
              rotate: isCorrect ? [0, -10, 10, -5, 0] : [0, -12, 12, -8, 0],
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl select-none shadow-xs ${
              isCorrect 
                ? 'bg-rose-100 ring-2 ring-[#A50034]/30 animate-happy-bounce' 
                : 'bg-slate-100 ring-2 ring-slate-300 animate-sad-wobble'
            }`}
          >
            <span>{singleAnimatedEmoji}</span>
          </motion.div>
        </div>

        {/* Reaction Text (Clean typography, NO static emojis) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#A50034] shrink-0" />
                <span className="font-black text-[clamp(0.92rem,3.8vw,1.05rem)] text-[#A50034] whitespace-nowrap">
                  정답입니다! 딩동댕
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="font-black text-[clamp(0.92rem,3.8vw,1.05rem)] text-slate-800 whitespace-nowrap">
                  아쉬워요! 땡
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 break-keep">
            {isCorrect
              ? '정확한 시사 상식을 알고 계시네요.'
              : '새로운 상식을 알아가는 기회로 삼아보세요.'}
          </p>
        </div>

        {/* User Choice vs Correct Answer */}
        <div className="text-right shrink-0 bg-white px-2.5 py-1 rounded-lg border border-slate-100 text-[11px] whitespace-nowrap">
          <div className="text-slate-500">내 선택: <strong className="text-slate-800">{userChoice}</strong></div>
          <div className="text-[#A50034] font-bold">정답: <strong>{question.answer}</strong></div>
        </div>
      </div>

      {/* Explanation Box */}
      <div className="my-2.5 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1 font-bold text-slate-700 text-xs mb-1">
          <BookOpen className="w-3.5 h-3.5 text-[#A50034] shrink-0" />
          <span className="text-[clamp(0.75rem,3vw,0.825rem)]">시사 상식 해설</span>
        </div>
        <p className="text-slate-700 leading-relaxed font-normal text-[clamp(0.78rem,3.2vw,0.85rem)] break-keep">
          {question.explanation}
        </p>
        {question.sourceOrTip && (
          <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[11px] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
            <Sparkles className="w-3 h-3 text-[#A50034] shrink-0" />
            <span className="truncate">핵심 포인트: {question.sourceOrTip}</span>
          </div>
        )}
      </div>

      {/* Next Question / Result CTA Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className={`w-full py-3 px-4 active:scale-[0.98] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-[clamp(0.84rem,3.4vw,0.94rem)] whitespace-nowrap ${
          isLastQuestion
            ? 'bg-[#A50034] hover:bg-[#850029] shadow-lg ring-2 ring-[#A50034]/40 font-black'
            : 'bg-[#A50034] hover:bg-[#8B002B] shadow-md'
        }`}
      >
        <span>
          {isLastQuestion
            ? '최종 결과 확인하기 (시사왕)'
            : `다음 문제로 이동 (${questionNumber + 1}/5)`}
        </span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </button>
    </motion.div>
  );
};
