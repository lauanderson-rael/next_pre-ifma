// Constantes e configurações da aplicação
export const SUBJECTS = [
  'Português',
  'Matemática',
  'Geografia',
  'História',
  'Ciências',
  'Inglês',
  'Arte',
  'Educação Física',
] as const;

export const QUESTION_TYPES = [
  'multiple-choice',
  'true-false',
  'fill-in-the-blank',
  'essay',
] as const;

export const DIFFICULTY_LEVELS = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
} as const;

export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  VERY_GOOD: 80,
  GOOD: 70,
  SATISFACTORY: 60,
  FAILING: 0,
} as const;

export const COLORS = {
  PRIMARY: '#0066cc',
  SUCCESS: '#00cc66',
  WARNING: '#ffcc00',
  ERROR: '#ff0000',
  NEUTRAL: '#999999',
} as const;

export const API_ENDPOINTS = {
  QUESTIONS: '/simulates/questions',
  SUBMIT_ANSWER: '/simulates/answer',
  LOGIN: '/users/login',
  LOGOUT: '/users/logout',
  PROFILE: '/users/profile',
} as const;

export const getSubjectColor = (subject: string): string => {
  const colors: Record<string, string> = {
    'Português': '#FF6B6B',
    'Matemática': '#4ECDC4',
    'Geografia': '#45B7D1',
    'História': '#F7B731',
    'Ciências': '#5F27CD',
    'Inglês': '#00D2D3',
    'Arte': '#FF9FF3',
    'Educação Física': '#A8E6CF',
  };
  return colors[subject] || '#999999';
};

export const getDifficultyLabel = (level: number): string => {
  const labels: Record<number, string> = {
    1: 'Fácil',
    2: 'Médio',
    3: 'Difícil',
  };
  return labels[level] || 'Desconhecido';
};
