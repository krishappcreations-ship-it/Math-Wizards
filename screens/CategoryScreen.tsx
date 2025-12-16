import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, X, Divide, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { MathOperation } from '../types';

interface CategoryScreenProps {
  onSelectCategory: (category: MathOperation) => void;
  onBack: () => void;
}

const CategoryScreen: React.FC<CategoryScreenProps> = ({ onSelectCategory, onBack }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-6">
      <div className="flex items-center mb-8 relative">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/50 hover:bg-white transition-colors"
        >
          <ArrowLeft size={32} className="text-gray-600" />
        </button>
        <h2 className="text-3xl font-bold text-center flex-1 mr-10 text-gray-700">Pick a Game!</h2>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 flex-1 content-center"
      >
        <motion.div variants={item} className="aspect-square">
          <Button 
            onClick={() => onSelectCategory(MathOperation.ADDITION)} 
            className="w-full h-full flex flex-col gap-2 !bg-brand-red"
            variant="primary"
          >
            <Plus size={48} strokeWidth={4} />
            <span>Add</span>
          </Button>
        </motion.div>

        <motion.div variants={item} className="aspect-square">
          <Button 
            onClick={() => onSelectCategory(MathOperation.SUBTRACTION)} 
            className="w-full h-full flex flex-col gap-2 !bg-brand-blue"
            variant="secondary"
          >
            <Minus size={48} strokeWidth={4} />
            <span>Subtract</span>
          </Button>
        </motion.div>

        <motion.div variants={item} className="aspect-square">
          <Button 
            onClick={() => onSelectCategory(MathOperation.MULTIPLICATION)} 
            className="w-full h-full flex flex-col gap-2 !bg-brand-purple"
            variant="primary"
          >
            <X size={48} strokeWidth={4} />
            <span>Multiply</span>
          </Button>
        </motion.div>

        <motion.div variants={item} className="aspect-square">
          <Button 
            onClick={() => onSelectCategory(MathOperation.DIVISION)} 
            className="w-full h-full flex flex-col gap-2 !bg-brand-yellow !text-amber-900"
            variant="accent"
          >
            <Divide size={48} strokeWidth={4} />
            <span>Divide</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CategoryScreen;