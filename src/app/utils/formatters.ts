// Funções para formatação de dados
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-BR');
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
};

export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const removeSpecialCharacters = (text: string): string => {
  return text.replace(/[^a-zA-Z0-9\s]/g, '');
};

export const generateGradeMessage = (percentage: number): string => {
  if (percentage >= 90) return 'Excelente!';
  if (percentage >= 80) return 'Muito Bom!';
  if (percentage >= 70) return 'Bom!';
  if (percentage >= 60) return 'Satisfatório';
  return 'Precisa melhorar';
};
