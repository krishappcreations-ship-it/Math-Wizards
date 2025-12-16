import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowLeft, Star } from 'lucide-react';
import { MathOperation, Question } from '../types';
import { getOperationSymbol } from '../utils/gameLogic';
import { playSound } from '../utils/sound';

interface GameScreenProps {
  category: MathOperation;
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ category, questions, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionClick = (option: number) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setSelectedOption(option);
    
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      playSound('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD93D', '#FF6B6B', '#4D96FF', '#6BCB77']
      });
      setScore(s => s + 1);
    } else {
      playSound('incorrect');
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setIsProcessing(false);
      } else {
        // Game Over
        // Pass the FINAL score including this turn
        const finalScore = correct ? score + 1 : score;
        onComplete(finalScore, questions.length);
      }
    }, 1500);
  };

  const getBubbleColor = (option: number) => {
    if (selectedOption === option) {
      return isCorrect 
        ? 'bg-brand-green text-white border-brand-green scale-110' 
        : 'bg-brand-red text-white border-brand-red shake-anim';
    }
    if (selectedOption !== null && option === currentQuestion.answer && !isCorrect) {
       // Show correct answer if user got it wrong
       return 'bg-brand-green/50 text-white border-brand-green/50';
    }
    return 'bg-white text-gray-700 hover:border-brand-blue border-gray-200';
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-4 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="p-2 rounded-full bg-white/50 text-gray-600">
          <ArrowLeft />
        </button>
        <div className="flex-1 mx-4 h-6 bg-white rounded-full overflow-hidden border-2 border-gray-200">
          <motion.div 
            className="h-full bg-brand-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-1 font-bold text-brand-purple">
          <span>{score}</span>
          <Star size={18} fill="currentColor" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion.id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex-1 flex flex-col items-center justify-center space-y-10"
        >
          {/* Question */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-brand-blue/20 w-full text-center">
            <span className="text-7xl font-black text-gray-700 block mb-2">
              {currentQuestion.num1} {getOperationSymbol(category)} {currentQuestion.num2}
            </span>
            <span className="text-4xl text-gray-400 font-bold">= ?</span>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-4 w-full">
            {currentQuestion.options.map((option, idx) => (
              <motion.button
                key={`${currentQuestion.id}-${option}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={isProcessing}
                onClick={() => handleOptionClick(option)}
                className={`
                  p-6 rounded-2xl text-4xl font-bold border-b-4 transition-all duration-300 shadow-sm
                  ${getBubbleColor(option)}
                  ${selectedOption === option && !isCorrect ? 'animate-shake' : ''}
                `}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default GameScreen;