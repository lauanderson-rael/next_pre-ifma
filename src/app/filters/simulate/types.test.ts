import { Answer, Question, UserAnswer, SimulateResult, Score } from './types';

describe('Types - TypeScript Interface Validation', () => {
  describe('Answer interface', () => {
    test('should create valid Answer object', () => {
      const answer: Answer = {
        id: 1,
        correct: true,
        text: 'Resposta correta',
      };
      expect(answer.id).toBe(1);
      expect(answer.correct).toBe(true);
      expect(answer.text).toBe('Resposta correta');
    });
  });

  describe('Question interface', () => {
    test('should create valid Question object', () => {
      const question: Question = {
        id: 1,
        title: 'Qual é a capital do Brasil?',
        description: 'Uma pergunta sobre geografia',
        answers: [
          { id: 1, text: 'Brasília', correct: true },
          { id: 2, text: 'Rio de Janeiro', correct: false },
        ],
      };
      expect(question.id).toBe(1);
      expect(question.title).toBe('Qual é a capital do Brasil?');
      expect(question.answers.length).toBe(2);
    });

    test('should create Question with optional image_urls', () => {
      const question: Question = {
        id: 1,
        title: 'Questão com imagem',
        description: 'Uma pergunta com imagens',
        answers: [],
        image_urls: ['https://example.com/image1.jpg'],
      };
      expect(question.image_urls).toBeDefined();
      expect(question.image_urls?.length).toBe(1);
    });
  });

  describe('UserAnswer interface', () => {
    test('should create valid UserAnswer object', () => {
      const userAnswer: UserAnswer = {
        question_id: 1,
        answer_id: 1,
        selected_letter: 'a',
      };
      expect(userAnswer.question_id).toBe(1);
      expect(userAnswer.answer_id).toBe(1);
      expect(userAnswer.selected_letter).toBe('a');
    });
  });

  describe('SimulateResult interface', () => {
    test('should create valid SimulateResult object', () => {
      const result: SimulateResult = {
        correct: true,
        correct_answer: 'a',
        selected_answer: 'a',
        question_id: 1,
      };
      expect(result.correct).toBe(true);
      expect(result.correct_answer).toBe('a');
      expect(result.selected_answer).toBe('a');
    });

    test('should handle incorrect answer', () => {
      const result: SimulateResult = {
        correct: false,
        correct_answer: 'b',
        selected_answer: 'a',
        question_id: 1,
      };
      expect(result.correct).toBe(false);
      expect(result.correct_answer).not.toBe(result.selected_answer);
    });
  });

  describe('Score interface', () => {
    test('should create valid Score object', () => {
      const score: Score = {
        correct: 8,
        total: 10,
      };
      expect(score.correct).toBe(8);
      expect(score.total).toBe(10);
    });

    test('should handle zero score', () => {
      const score: Score = {
        correct: 0,
        total: 10,
      };
      expect(score.correct).toBe(0);
    });

    test('should handle perfect score', () => {
      const score: Score = {
        correct: 10,
        total: 10,
      };
      expect(score.correct).toBe(score.total);
    });
  });
});
