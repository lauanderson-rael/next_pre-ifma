import {
  findAnswerById,
  getCorrectAnswers,
  areAllAnswersHaveText,
  validateQuestion,
} from './helpers';
import { Answer, Question } from './types';

describe('Resolver Helpers', () => {
  describe('findAnswerById', () => {
    test('should find answer by id', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Answer 1', correct: false },
        { id: 2, text: 'Answer 2', correct: true },
      ];
      const found = findAnswerById(answers, 2);
      expect(found?.id).toBe(2);
      expect(found?.text).toBe('Answer 2');
    });

    test('should return undefined when answer not found', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Answer 1', correct: false },
      ];
      const found = findAnswerById(answers, 999);
      expect(found).toBeUndefined();
    });

    test('should handle empty array', () => {
      expect(findAnswerById([], 1)).toBeUndefined();
    });
  });

  describe('getCorrectAnswers', () => {
    test('should return only correct answers', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Wrong', correct: false },
        { id: 2, text: 'Correct', correct: true },
        { id: 3, text: 'Wrong', correct: false },
      ];
      const correct = getCorrectAnswers(answers);
      expect(correct).toHaveLength(1);
      expect(correct[0].id).toBe(2);
    });

    test('should return empty array when no correct answers', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Wrong', correct: false },
        { id: 2, text: 'Wrong', correct: false },
      ];
      expect(getCorrectAnswers(answers)).toHaveLength(0);
    });

    test('should return multiple correct answers', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Correct', correct: true },
        { id: 2, text: 'Correct', correct: true },
        { id: 3, text: 'Wrong', correct: false },
      ];
      expect(getCorrectAnswers(answers)).toHaveLength(2);
    });
  });

  describe('areAllAnswersHaveText', () => {
    test('should return true when all answers have text', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Answer 1', correct: false },
        { id: 2, text: 'Answer 2', correct: true },
      ];
      expect(areAllAnswersHaveText(answers)).toBe(true);
    });

    test('should return false when answer has empty text', () => {
      const answers: Answer[] = [
        { id: 1, text: 'Answer 1', correct: false },
        { id: 2, text: '', correct: true },
      ];
      expect(areAllAnswersHaveText(answers)).toBe(false);
    });

    test('should return false when answer text is only spaces', () => {
      const answers: Answer[] = [
        { id: 1, text: '   ', correct: false },
      ];
      expect(areAllAnswersHaveText(answers)).toBe(false);
    });

    test('should return true for empty array', () => {
      expect(areAllAnswersHaveText([])).toBe(true);
    });
  });

  describe('validateQuestion', () => {
    test('should validate correct question', () => {
      const question: Question = {
        id: 1,
        title: 'Valid Question',
        description: 'Description',
        answers: [
          { id: 1, text: 'Wrong', correct: false },
          { id: 2, text: 'Correct', correct: true },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    test('should fail when title is empty', () => {
      const question: Question = {
        id: 1,
        title: '',
        description: 'Description',
        answers: [
          { id: 1, text: 'Answer', correct: true },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Título é obrigatório');
    });

    test('should fail when less than 2 answers', () => {
      const question: Question = {
        id: 1,
        title: 'Question',
        description: 'Description',
        answers: [
          { id: 1, text: 'Only one', correct: true },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Deve ter pelo menos 2 respostas');
    });

    test('should fail when no correct answer', () => {
      const question: Question = {
        id: 1,
        title: 'Question',
        description: 'Description',
        answers: [
          { id: 1, text: 'Wrong 1', correct: false },
          { id: 2, text: 'Wrong 2', correct: false },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Deve ter pelo menos 1 resposta correta');
    });

    test('should fail when answer has no text', () => {
      const question: Question = {
        id: 1,
        title: 'Question',
        description: 'Description',
        answers: [
          { id: 1, text: 'Valid', correct: false },
          { id: 2, text: '', correct: true },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Todas as respostas devem ter texto');
    });

    test('should return multiple errors', () => {
      const question: Question = {
        id: 1,
        title: '',
        description: 'Description',
        answers: [
          { id: 1, text: 'Only one', correct: false },
        ],
      };
      const validation = validateQuestion(question);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(1);
    });
  });
});
