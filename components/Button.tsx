import React from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../utils/sound';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false
}) => {
  
  const baseStyles = "font-bold rounded-2xl shadow-[0_6px_0_rgba(0,0,0,0.15)] active:shadow-[0_2px_0_rgba(0,0,0,0.15)] active:translate-y-1 transition-all border-2 border-white/20 select-none flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-green text-white",
    secondary: "bg-brand-blue text-white",
    accent: "bg-brand-yellow text-amber-900",
    outline: "bg-white text-gray-500 border-2 border-gray-200 shadow-none"
  };

  const sizes = {
    sm: "px-4 py-2 text-lg",
    md: "px-6 py-3 text-xl",
    lg: "px-8 py-4 text-2xl w-full",
    xl: "px-10 py-6 text-3xl w-full"
  };

  const handleClick = () => {
    if (!disabled) {
      playSound('click');
      onClick();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;