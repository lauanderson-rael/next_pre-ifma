import {
  formatDate,
  formatTime,
  truncateText,
  capitalizeFirstLetter,
  capitalizeWords,
  removeDuplicates,
  removeSpecialCharacters,
  generateGradeMessage,
} from './formatters';

describe('Formatters', () => {
  describe('formatDate', () => {
    test('should format date object correctly', () => {
      const date = new Date('2024-06-17');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    test('should format date string correctly', () => {
      const formatted = formatDate('2024-06-17');
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });
  });

  describe('formatTime', () => {
    test('should format 0 seconds', () => {
      expect(formatTime(0)).toBe('00:00');
    });

    test('should format 60 seconds as 1 minute', () => {
      expect(formatTime(60)).toBe('01:00');
    });

    test('should format 125 seconds correctly', () => {
      expect(formatTime(125)).toBe('02:05');
    });

    test('should format 3661 seconds correctly', () => {
      expect(formatTime(3661)).toBe('61:01');
    });

    test('should pad single digits', () => {
      expect(formatTime(5)).toBe('00:05');
    });
  });

  describe('truncateText', () => {
    test('should not truncate text shorter than maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    test('should truncate text longer than maxLength', () => {
      expect(truncateText('Hello World', 5)).toBe('Hello...');
    });

    test('should truncate exactly at maxLength', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });

    test('should add ellipsis when truncating', () => {
      const result = truncateText('JavaScript is awesome', 10);
      expect(result.endsWith('...')).toBe(true);
    });
  });

  describe('capitalizeFirstLetter', () => {
    test('should capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
    });

    test('should keep already capitalized text', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    test('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    test('should not change other letters', () => {
      expect(capitalizeFirstLetter('hELLO')).toBe('HELLO');
    });
  });

  describe('capitalizeWords', () => {
    test('should capitalize all words', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('should handle single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('should handle multiple spaces', () => {
      const result = capitalizeWords('hello  world');
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });
  });

  describe('removeDuplicates', () => {
    test('should remove duplicate numbers', () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test('should remove duplicate strings', () => {
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('should handle empty array', () => {
      expect(removeDuplicates([])).toEqual([]);
    });

    test('should preserve order of first occurrence', () => {
      const result = removeDuplicates([3, 1, 2, 1, 3]);
      expect(result[0]).toBe(3);
      expect(result[1]).toBe(1);
    });
  });

  describe('removeSpecialCharacters', () => {
    test('should remove special characters', () => {
      expect(removeSpecialCharacters('Hello@World!')).toBe('HelloWorld');
    });

    test('should keep alphanumeric characters', () => {
      expect(removeSpecialCharacters('Test123')).toBe('Test123');
    });

    test('should keep spaces', () => {
      expect(removeSpecialCharacters('Hello World')).toBe('Hello World');
    });

    test('should handle empty string', () => {
      expect(removeSpecialCharacters('')).toBe('');
    });

    test('should remove multiple special characters', () => {
      expect(removeSpecialCharacters('C++#Java@Python')).toBe('CJavaPython');
    });
  });

  describe('generateGradeMessage', () => {
    test('should return "Excelente!" for 90+', () => {
      expect(generateGradeMessage(90)).toBe('Excelente!');
      expect(generateGradeMessage(95)).toBe('Excelente!');
    });

    test('should return "Muito Bom!" for 80-89', () => {
      expect(generateGradeMessage(80)).toBe('Muito Bom!');
      expect(generateGradeMessage(85)).toBe('Muito Bom!');
    });

    test('should return "Bom!" for 70-79', () => {
      expect(generateGradeMessage(70)).toBe('Bom!');
      expect(generateGradeMessage(75)).toBe('Bom!');
    });

    test('should return "Satisfatório" for 60-69', () => {
      expect(generateGradeMessage(60)).toBe('Satisfatório');
      expect(generateGradeMessage(65)).toBe('Satisfatório');
    });

    test('should return "Precisa melhorar" for <60', () => {
      expect(generateGradeMessage(50)).toBe('Precisa melhorar');
      expect(generateGradeMessage(0)).toBe('Precisa melhorar');
    });
  });
});
