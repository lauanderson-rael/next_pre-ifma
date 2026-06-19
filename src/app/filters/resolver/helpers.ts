import { Answer, Question } from './types';

// Funções auxiliares para testes do resolver
export const findAnswerById = (answers: Answer[], id: number): Answer | undefined => {
  return answers.find(a => a.id === id);
};

export const getCorrectAnswers = (answers: Answer[]): Answer[] => {
  return answers.filter(a => a.correct);
};

export const areAllAnswersHaveText = (answers: Answer[]): boolean => {
  return answers.every(a => a.text && a.text.trim().length > 0);
};

export const validateQuestion = (question: Question): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!question.title || question.title.trim().length === 0) {
    errors.push('Título é obrigatório');
  }

  if (!question.answers || question.answers.length < 2) {
    errors.push('Deve ter pelo menos 2 respostas');
  }

  if (!areAllAnswersHaveText(question.answers)) {
    errors.push('Todas as respostas devem ter texto');
  }

  const correctAnswers = getCorrectAnswers(question.answers);
  if (correctAnswers.length === 0) {
    errors.push('Deve ter pelo menos 1 resposta correta');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
