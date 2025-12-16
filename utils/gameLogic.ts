import { MathOperation, Question } from '../types';

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateOptions = (answer: number): number[] => {
  const options = new Set<number>();
  options.add(answer);

  while (options.size < 3) {
    const variance = getRandomInt(1, 5);
    const direction = Math.random() > 0.5 ? 1 : -1;
    const wrongAnswer = answer + (variance * direction);
    
    // Ensure positive numbers for kids usually
    if (wrongAnswer >= 0 && wrongAnswer !== answer) {
      options.add(wrongAnswer);
    } else if (wrongAnswer < 0) {
      options.add(answer + variance); // Fallback to ensure we add something
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

export const generateQuestions = (operation: MathOperation, count: number = 10): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let num1 = 0;
    let num2 = 0;
    let answer = 0;

    switch (operation) {
      case MathOperation.ADDITION:
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        answer = num1 + num2;
        break;
      case MathOperation.SUBTRACTION:
        num1 = getRandomInt(5, 15);
        num2 = getRandomInt(1, num1); // Ensure result is positive
        answer = num1 - num2;
        break;
      case MathOperation.MULTIPLICATION:
        num1 = getRandomInt(2, 6);
        num2 = getRandomInt(1, 5); // Keep it simple for young kids (2-6 times table)
        answer = num1 * num2;
        break;
      case MathOperation.DIVISION:
        num2 = getRandomInt(2, 5);
        answer = getRandomInt(1, 5); // Result
        num1 = num2 * answer; // Create the dividend
        break;
    }

    questions.push({
      id: `q-${i}`,
      num1,
      num2,
      operation,
      answer,
      options: generateOptions(answer)
    });
  }

  return questions;
};

export const getOperationSymbol = (op: MathOperation): string => {
  switch (op) {
    case MathOperation.ADDITION: return '+';
    case MathOperation.SUBTRACTION: return '-';
    case MathOperation.MULTIPLICATION: return '×';
    case MathOperation.DIVISION: return '÷';
  }
};