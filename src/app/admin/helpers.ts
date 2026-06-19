import { FormInputsType, QuestionType } from './types';

// Funções auxiliares para admin
export const validateFormInputs = (inputs: FormInputsType): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!inputs.title || inputs.title.trim().length === 0) {
    errors.push('Título é obrigatório');
  }

  if (!inputs.description || inputs.description.trim().length === 0) {
    errors.push('Descrição é obrigatória');
  }

  if (!inputs.subject || inputs.subject.trim().length === 0) {
    errors.push('Disciplina é obrigatória');
  }

  if (!inputs.answers || inputs.answers.length < 2) {
    errors.push('Deve ter pelo menos 2 respostas');
  }

  if (inputs.answers.some(a => !a || a.trim().length === 0)) {
    errors.push('Todas as respostas devem ter texto');
  }

  if (inputs.correctIndex < 0 || inputs.correctIndex >= inputs.answers.length) {
    errors.push('Índice da resposta correta é inválido');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const convertFormToQuestion = (form: FormInputsType): Partial<QuestionType> => {
  return {
    title: form.title,
    description: form.description,
    year: form.year,
    subject: form.subject,
    type_question: form.type_question,
    answers: form.answers.map((text, index) => ({
      id: index + 1,
      text,
      correct: index === form.correctIndex,
    })),
  };
};

export const formatYearOptions = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= 2000; i--) {
    years.push(i.toString());
  }
  return years;
};

export const countCorrectAnswers = (answers: QuestionType['answers']): number => {
  return answers.filter(a => a.correct).length;
};
