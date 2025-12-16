import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import { ScreenType, MathOperation, Question } from './types';
import { generateQuestions } from './utils/gameLogic';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<MathOperation | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const handleStart = () => {
    setCurrentScreen('CATEGORY');
  };

  const handleCategorySelect = (category: MathOperation) => {
    setSelectedCategory(category);
    // Generate 10 questions for the selected category
    const newQuestions = generateQuestions(category, 10);
    setQuestions(newQuestions);
    setCurrentScreen('GAME');
  };

  const handleGameComplete = (score: number, total: number) => {
    setFinalScore({ score, total });
    setCurrentScreen('RESULTS');
  };

  const handleReplay = () => {
    if (selectedCategory) {
      const newQuestions = generateQuestions(selectedCategory, 10);
      setQuestions(newQuestions);
      setCurrentScreen('GAME');
    } else {
      setCurrentScreen('CATEGORY');
    }
  };

  const handleHome = () => {
    setCurrentScreen('HOME');
    setSelectedCategory(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen onStart={handleStart} />;
      case 'CATEGORY':
        return (
          <CategoryScreen 
            onSelectCategory={handleCategorySelect} 
            onBack={handleHome} 
          />
        );
      case 'GAME':
        return selectedCategory ? (
          <GameScreen 
            category={selectedCategory} 
            questions={questions}
            onComplete={handleGameComplete}
            onBack={() => setCurrentScreen('CATEGORY')}
          />
        ) : null;
      case 'RESULTS':
        return (
          <ResultScreen 
            score={finalScore.score} 
            total={finalScore.total}
            onReplay={handleReplay}
            onHome={handleHome}
          />
        );
      default:
        return <HomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-gray-800">
      {/* Background blobs for "vibe" */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-brand-blue/10 rounded-full blur-3xl -z-10 animate-bounce-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-brand-yellow/10 rounded-full blur-3xl -z-10 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-brand-red/10 rounded-full blur-3xl -z-10 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>

      <div className="h-[100dvh] w-full max-w-lg mx-auto bg-white/30 backdrop-blur-sm shadow-2xl overflow-hidden sm:rounded-3xl sm:my-8 sm:h-[90vh] sm:border-4 sm:border-white/50">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;