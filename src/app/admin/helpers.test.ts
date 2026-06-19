import {
  validateFormInputs,
  convertFormToQuestion,
  formatYearOptions,
  countCorrectAnswers,
} from './helpers';
import { FormInputsType } from './types';

describe('Admin Helpers', () => {
  describe('validateFormInputs', () => {
    test('should validate correct form inputs', () => {
      const inputs: FormInputsType = {
        title: 'Question Title',
        description: 'Question Description',
        year: '2024',
        subject: 'Mathematics',
        type_question: 'multiple-choice',
        answers: ['Answer A', 'Answer B'],
        correctIndex: 0,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should fail when title is empty', () => {
      const inputs: FormInputsType = {
        title: '',
        description: 'Description',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A', 'B'],
        correctIndex: 0,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Título é obrigatório');
    });

    test('should fail when description is empty', () => {
      const inputs: FormInputsType = {
        title: 'Title',
        description: '',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A', 'B'],
        correctIndex: 0,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.errors).toContain('Descrição é obrigatória');
    });

    test('should fail when less than 2 answers', () => {
      const inputs: FormInputsType = {
        title: 'Title',
        description: 'Description',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A'],
        correctIndex: 0,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.errors).toContain('Deve ter pelo menos 2 respostas');
    });

    test('should fail when answer is empty', () => {
      const inputs: FormInputsType = {
        title: 'Title',
        description: 'Description',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A', ''],
        correctIndex: 0,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.errors).toContain('Todas as respostas devem ter texto');
    });

    test('should fail with invalid correctIndex', () => {
      const inputs: FormInputsType = {
        title: 'Title',
        description: 'Description',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A', 'B'],
        correctIndex: 5,
      };
      const validation = validateFormInputs(inputs);
      expect(validation.errors).toContain('Índice da resposta correta é inválido');
    });
  });

  describe('convertFormToQuestion', () => {
    test('should convert form to question', () => {
      const form: FormInputsType = {
        title: 'Question',
        description: 'Desc',
        year: '2024',
        subject: 'Math',
        type_question: 'multiple-choice',
        answers: ['A', 'B', 'C'],
        correctIndex: 1,
      };
      const question = convertFormToQuestion(form);
      expect(question.title).toBe('Question');
      expect(question.answers).toHaveLength(3);
      expect(question.answers?.[1].correct).toBe(true);
      expect(question.answers?.[0].correct).toBe(false);
    });

    test('should set correct answer at correctIndex', () => {
      const form: FormInputsType = {
        title: 'Q',
        description: 'D',
        year: '2024',
        subject: 'S',
        type_question: 'mc',
        answers: ['Wrong1', 'Correct', 'Wrong2'],
        correctIndex: 1,
      };
      const question = convertFormToQuestion(form);
      const correctAnswers = question.answers?.filter(a => a.correct);
      expect(correctAnswers).toHaveLength(1);
      expect(correctAnswers?.[0].text).toBe('Correct');
    });
  });

  describe('formatYearOptions', () => {
    test('should return array of years', () => {
      const years = formatYearOptions();
      expect(Array.isArray(years)).toBe(true);
      expect(years.length).toBeGreaterThan(0);
    });

    test('should include current year', () => {
      const years = formatYearOptions();
      const currentYear = new Date().getFullYear().toString();
      expect(years).toContain(currentYear);
    });

    test('should include year 2000', () => {
      const years = formatYearOptions();
      expect(years).toContain('2000');
    });

    test('should be in descending order', () => {
      const years = formatYearOptions();
      for (let i = 0; i < years.length - 1; i++) {
        expect(Number.parseInt(years[i])).toBeGreaterThan(Number.parseInt(years[i + 1]));
      }
    });
  });

  describe('countCorrectAnswers', () => {
    test('should count correct answers', () => {
      const answers = [
        { id: 1, text: 'A', correct: true },
        { id: 2, text: 'B', correct: false },
        { id: 3, text: 'C', correct: true },
      ];
      expect(countCorrectAnswers(answers)).toBe(2);
    });

    test('should return 0 when no correct answers', () => {
      const answers = [
        { id: 1, text: 'A', correct: false },
        { id: 2, text: 'B', correct: false },
      ];
      expect(countCorrectAnswers(answers)).toBe(0);
    });

    test('should handle single correct answer', () => {
      const answers = [
        { id: 1, text: 'A', correct: true },
        { id: 2, text: 'B', correct: false },
      ];
      expect(countCorrectAnswers(answers)).toBe(1);
    });
  });
});
