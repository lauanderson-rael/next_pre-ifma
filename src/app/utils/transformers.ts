// Funções utilitárias para transformação de dados
export const transformAnswersToLetters = (answers: any[]): string[] => {
  return answers.map((_, index) => String.fromCodePoint(97 + index));
};

export const findCorrectAnswerIndex = (answers: any[]): number => {
  return answers.findIndex(answer => answer.correct);
};

export const calculateScorePercentage = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

export const isPassingScore = (percentage: number, passingGrade: number = 60): boolean => {
  return percentage >= passingGrade;
};

export const formatScore = (correct: number, total: number): string => {
  const percentage = calculateScorePercentage(correct, total);
  return `${correct}/${total} (${percentage}%)`;
};

export const groupQuestionsBySubject = (
  questions: Array<{ subject: string; [key: string]: any }>
): Record<string, any[]> => {
  return questions.reduce((acc, question) => {
    const subject = question.subject;
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(question);
    return acc;
  }, {} as Record<string, any[]>);
};

export const filterQuestionsByYear = (
  questions: Array<{ year: string; [key: string]: any }>,
  year: string
): any[] => {
  return questions.filter(q => q.year === year);
};

export const sortQuestionsByDifficulty = (
  questions: any[],
  order: 'asc' | 'desc' = 'asc'
): any[] => {
  const sorted = [...questions].sort((a, b) => {
    const diffA = a.difficulty || 0;
    const diffB = b.difficulty || 0;
    return order === 'asc' ? diffA - diffB : diffB - diffA;
  });
  return sorted;
};
