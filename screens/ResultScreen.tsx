import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, Home } from 'lucide-react';
import Button from '../components/Button';
import { playSound } from '../utils/sound';

interface ResultScreenProps {
  score: number;
  total: number;
  onReplay: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onReplay, onHome }) => {
  const percentage = (score / total) * 100;
  let stars = 1;
  if (percentage >= 50) stars = 2;
  if (percentage >= 90) stars = 3;

  useEffect(() => {
    playSound('win');
    // Big confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD93D', '#FF6B6B', '#4D96FF']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD93D', '#FF6B6B', '#4D96FF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 space-y-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <h2 className="text-4xl font-black text-brand-blue mb-2">Level Complete!</h2>
        <p className="text-gray-500 text-xl font-bold">You scored {score} out of {total}</p>
      </motion.div>

      <div className="flex gap-2 justify-center py-8">
        {[1, 2, 3].map((starIdx) => (
          <motion.div
            key={starIdx}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: starIdx <= stars ? 1.2 : 1, rotate: 0 }}
            transition={{ delay: starIdx * 0.2, type: "spring" }}
            className="relative"
          >
            <Star 
              size={64} 
              className={starIdx <= stars ? "text-brand-yellow fill-brand-yellow" : "text-gray-300 fill-gray-200"} 
              strokeWidth={3}
            />
          </motion.div>
        ))}
      </div>

      <div className="w-full space-y-4">
        <Button onClick={onReplay} size="lg" variant="primary">
          <div className="flex items-center justify-center gap-2">
            <RotateCcw size={24} />
            Play Again
          </div>
        </Button>
        <Button onClick={onHome} size="lg" variant="outline" className="border-brand-blue text-brand-blue">
          <div className="flex items-center justify-center gap-2">
            <Home size={24} />
            Home
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ResultScreen;