import {
  transformAnswersToLetters,
  findCorrectAnswerIndex,
  calculateScorePercentage,
  isPassingScore,
  formatScore,
  groupQuestionsBySubject,
  filterQuestionsByYear,
  sortQuestionsByDifficulty,
} from './transformers';

describe('Transformers', () => {
  describe('transformAnswersToLetters', () => {
    test('should transform array to letters starting from a', () => {
      const answers = [
        { id: 1, text: 'Answer A' },
        { id: 2, text: 'Answer B' },
        { id: 3, text: 'Answer C' },
      ];
      expect(transformAnswersToLetters(answers)).toEqual(['a', 'b', 'c']);
    });

    test('should handle empty array', () => {
      expect(transformAnswersToLetters([])).toEqual([]);
    });

    test('should handle single answer', () => {
      expect(transformAnswersToLetters([{}])).toEqual(['a']);
    });
  });

  describe('findCorrectAnswerIndex', () => {
    test('should find correct answer at index 0', () => {
      const answers = [
        { text: 'Correct', correct: true },
        { text: 'Wrong', correct: false },
      ];
      expect(findCorrectAnswerIndex(answers)).toBe(0);
    });

    test('should find correct answer at index 2', () => {
      const answers = [
        { text: 'Wrong', correct: false },
        { text: 'Wrong', correct: false },
        { text: 'Correct', correct: true },
      ];
      expect(findCorrectAnswerIndex(answers)).toBe(2);
    });

    test('should return -1 when no correct answer', () => {
      const answers = [
        { text: 'Wrong', correct: false },
        { text: 'Wrong', correct: false },
      ];
      expect(findCorrectAnswerIndex(answers)).toBe(-1);
    });
  });

  describe('calculateScorePercentage', () => {
    test('should calculate 50% for 5 correct out of 10', () => {
      expect(calculateScorePercentage(5, 10)).toBe(50);
    });

    test('should calculate 100% for perfect score', () => {
      expect(calculateScorePercentage(10, 10)).toBe(100);
    });

    test('should calculate 0% for no correct answers', () => {
      expect(calculateScorePercentage(0, 10)).toBe(0);
    });

    test('should return 0 for zero total', () => {
      expect(calculateScorePercentage(5, 0)).toBe(0);
    });

    test('should round percentage correctly', () => {
      expect(calculateScorePercentage(1, 3)).toBe(33);
    });
  });

  describe('isPassingScore', () => {
    test('should return true for percentage >= 60', () => {
      expect(isPassingScore(60)).toBe(true);
    });

    test('should return true for percentage > 60', () => {
      expect(isPassingScore(75)).toBe(true);
    });

    test('should return false for percentage < 60', () => {
      expect(isPassingScore(50)).toBe(false);
    });

    test('should accept custom passing grade', () => {
      expect(isPassingScore(75, 80)).toBe(false);
      expect(isPassingScore(85, 80)).toBe(true);
    });
  });

  describe('formatScore', () => {
    test('should format score correctly', () => {
      expect(formatScore(5, 10)).toBe('5/10 (50%)');
    });

    test('should format perfect score', () => {
      expect(formatScore(10, 10)).toBe('10/10 (100%)');
    });

    test('should format zero score', () => {
      expect(formatScore(0, 10)).toBe('0/10 (0%)');
    });

    test('should handle zero total', () => {
      expect(formatScore(0, 0)).toBe('0/0 (0%)');
    });
  });

  describe('groupQuestionsBySubject', () => {
    test('should group questions by subject', () => {
      const questions = [
        { subject: 'Math', id: 1 },
        { subject: 'Portuguese', id: 2 },
        { subject: 'Math', id: 3 },
      ];
      const grouped = groupQuestionsBySubject(questions);
      expect(grouped['Math']).toHaveLength(2);
      expect(grouped['Portuguese']).toHaveLength(1);
    });

    test('should handle empty array', () => {
      expect(groupQuestionsBySubject([])).toEqual({});
    });

    test('should create new group for new subject', () => {
      const questions = [{ subject: 'Physics', id: 1 }];
      const grouped = groupQuestionsBySubject(questions);
      expect(grouped['Physics']).toBeDefined();
    });
  });

  describe('filterQuestionsByYear', () => {
    test('should filter questions by year', () => {
      const questions = [
        { year: '2024', id: 1 },
        { year: '2023', id: 2 },
        { year: '2024', id: 3 },
      ];
      const filtered = filterQuestionsByYear(questions, '2024');
      expect(filtered).toHaveLength(2);
      expect(filtered[0].id).toBe(1);
    });

    test('should return empty array when no match', () => {
      const questions = [
        { year: '2024', id: 1 },
        { year: '2023', id: 2 },
      ];
      const filtered = filterQuestionsByYear(questions, '2022');
      expect(filtered).toHaveLength(0);
    });

    test('should handle empty array', () => {
      expect(filterQuestionsByYear([], '2024')).toEqual([]);
    });
  });

  describe('sortQuestionsByDifficulty', () => {
    test('should sort by difficulty ascending', () => {
      const questions = [
        { difficulty: 3, id: 1 },
        { difficulty: 1, id: 2 },
        { difficulty: 2, id: 3 },
      ];
      const sorted = sortQuestionsByDifficulty(questions, 'asc');
      expect(sorted[0].difficulty).toBe(1);
      expect(sorted[1].difficulty).toBe(2);
      expect(sorted[2].difficulty).toBe(3);
    });

    test('should sort by difficulty descending', () => {
      const questions = [
        { difficulty: 3, id: 1 },
        { difficulty: 1, id: 2 },
        { difficulty: 2, id: 3 },
      ];
      const sorted = sortQuestionsByDifficulty(questions, 'desc');
      expect(sorted[0].difficulty).toBe(3);
      expect(sorted[1].difficulty).toBe(2);
      expect(sorted[2].difficulty).toBe(1);
    });

    test('should not mutate original array', () => {
      const questions = [
        { difficulty: 3, id: 1 },
        { difficulty: 1, id: 2 },
      ];
      const original = [...questions];
      sortQuestionsByDifficulty(questions, 'asc');
      expect(questions).toEqual(original);
    });

    test('should handle questions without difficulty', () => {
      const questions = [
        { id: 1 },
        { difficulty: 2, id: 2 },
      ];
      const sorted = sortQuestionsByDifficulty(questions, 'asc');
      expect(sorted).toBeDefined();
    });
  });
});
