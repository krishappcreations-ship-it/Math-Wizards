export type ScreenType = 'HOME' | 'CATEGORY' | 'GAME' | 'RESULTS';

export enum MathOperation {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION'
}

export interface Question {
  id: string;
  num1: number;
  num2: number;
  operation: MathOperation;
  answer: number;
  options: number[];
}

export interface GameState {
  score: number;
  totalQuestions: number;
  currentQuestionIndex: number;
  questions: Question[];
  history: boolean[]; // true for correct, false for incorrect
}