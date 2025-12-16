import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Button from '../components/Button';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 space-y-12">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center space-y-4"
      >
        <div className="relative">
          <motion.h1 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-6xl font-black text-brand-blue tracking-wider drop-shadow-md"
          >
            Math
            <span className="text-brand-red">Wizard</span>
          </motion.h1>
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-white/50 blur-xl rounded-full scale-150"></div>
        </div>
        <p className="text-xl text-gray-600 font-bold">Fun learning for kids!</p>
      </motion.div>

      <div className="w-full space-y-4">
        <Button onClick={onStart} size="xl" variant="primary" className="bg-brand-green">
          <div className="flex items-center justify-center gap-3">
            <Play fill="currentColor" size={32} />
            PLAY
          </div>
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 flex gap-4 text-brand-blue/40"
      >
        <span className="text-4xl">1+2</span>
        <span className="text-4xl">4×2</span>
        <span className="text-4xl">10-5</span>
      </motion.div>
    </div>
  );
};

export default HomeScreen;