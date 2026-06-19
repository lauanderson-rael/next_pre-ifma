import { FormInputsType, QuestionType } from './types';

describe('Admin Types - Interface Validation', () => {
  describe('FormInputsType interface', () => {
    test('should create valid FormInputsType object', () => {
      const formInputs: FormInputsType = {
        title: 'Qual é a capital do Brasil?',
        description: 'Uma pergunta sobre geografia',
        year: '2024',
        subject: 'Geografia',
        type_question: 'multiple-choice',
        answers: ['Brasília', 'Rio de Janeiro', 'São Paulo'],
        correctIndex: 0,
      };
      expect(formInputs.title).toBe('Qual é a capital do Brasil?');
      expect(formInputs.answers.length).toBe(3);
      expect(formInputs.correctIndex).toBe(0);
    });

    test('should create FormInputsType with optional images', () => {
      const formInputs: FormInputsType = {
        title: 'Questão com imagem',
        description: 'Uma pergunta com imagens',
        year: '2024',
        subject: 'Artes',
        type_question: 'image-question',
        answers: ['Opção A', 'Opção B'],
        correctIndex: 1,
        images: null,
      };
      expect(formInputs.images).toBeNull();
    });

    test('should create FormInputsType with multiple answers', () => {
      const formInputs: FormInputsType = {
        title: 'Questão com muitas opções',
        description: 'Uma pergunta com 5 opções',
        year: '2023',
        subject: 'Português',
        type_question: 'multiple-choice',
        answers: ['A', 'B', 'C', 'D', 'E'],
        correctIndex: 2,
      };
      expect(formInputs.answers).toHaveLength(5);
      expect(formInputs.correctIndex).toBe(2);
    });
  });

  describe('QuestionType interface', () => {
    test('should create valid QuestionType object', () => {
      const question: QuestionType = {
        id: '1',
        title: 'Qual é a capital do Brasil?',
        description: 'Uma pergunta sobre geografia',
        year: '2024',
        subject: 'Geografia',
        type_question: 'multiple-choice',
        answers: [
          { id: 1, text: 'Brasília', correct: true },
          { id: 2, text: 'Rio de Janeiro', correct: false },
        ],
      };
      expect(question.id).toBe('1');
      expect(question.title).toBe('Qual é a capital do Brasil?');
      expect(question.answers.length).toBe(2);
      expect(question.answers[0].correct).toBe(true);
    });

    test('should create QuestionType with optional image_urls', () => {
      const question: QuestionType = {
        id: '2',
        title: 'Questão com imagem',
        description: 'Uma pergunta com imagens',
        year: '2024',
        subject: 'Artes',
        image_urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        answers: [
          { id: 1, text: 'Opção A', correct: false },
          { id: 2, text: 'Opção B', correct: true },
        ],
      };
      expect(question.image_urls).toBeDefined();
      expect(question.image_urls?.length).toBe(2);
    });

    test('should have multiple answers with correct flag', () => {
      const question: QuestionType = {
        id: '3',
        title: 'Questão',
        description: 'Descrição',
        year: '2024',
        subject: 'Matemática',
        answers: [
          { id: 1, text: 'A', correct: false },
          { id: 2, text: 'B', correct: false },
          { id: 3, text: 'C', correct: true },
          { id: 4, text: 'D', correct: false },
        ],
      };
      const correctAnswers = question.answers.filter(a => a.correct);
      expect(correctAnswers).toHaveLength(1);
      expect(correctAnswers[0].text).toBe('C');
    });

    test('should validate string IDs', () => {
      const question: QuestionType = {
        id: 'abc123',
        title: 'Questão',
        description: 'Descrição',
        year: '2024',
        subject: 'Ciências',
        answers: [],
      };
      expect(typeof question.id).toBe('string');
    });
  });

  describe('QuestionType validation scenarios', () => {
    test('should handle question with minimum data', () => {
      const question: QuestionType = {
        id: '1',
        title: 'Pergunta?',
        description: 'Desc',
        year: '2024',
        subject: 'Geral',
        answers: [{ id: 1, text: 'Resposta', correct: true }],
      };
      expect(question).toBeDefined();
      expect(question.answers).toHaveLength(1);
    });
  });
});
