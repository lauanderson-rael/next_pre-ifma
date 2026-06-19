import {
  isValidEmail,
  isValidPassword,
  calcularPorcentagem,
  getLetterFromIndex,
  getIndexFromLetter,
  areAllFieldsFilled,
} from './validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    test('should return true for valid email', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
    });

    test('should return true for valid email with subdomain', () => {
      expect(isValidEmail('user@mail.example.com')).toBe(true);
    });

    test('should return false for email without @', () => {
      expect(isValidEmail('userexample.com')).toBe(false);
    });

    test('should return false for email without domain', () => {
      expect(isValidEmail('user@')).toBe(false);
    });

    test('should return false for email with spaces', () => {
      expect(isValidEmail('user @example.com')).toBe(false);
    });

    test('should return false for empty email', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    test('should return true for password with 6 characters', () => {
      expect(isValidPassword('123456')).toBe(true);
    });

    test('should return true for password longer than 6 characters', () => {
      expect(isValidPassword('1234567890')).toBe(true);
    });

    test('should return false for password shorter than 6 characters', () => {
      expect(isValidPassword('12345')).toBe(false);
    });

    test('should return false for empty password', () => {
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('calcularPorcentagem', () => {
    test('should calculate percentage correctly', () => {
      expect(calcularPorcentagem(5, 10)).toBe(50);
    });

    test('should calculate percentage with rounding', () => {
      expect(calcularPorcentagem(1, 3)).toBe(33);
    });

    test('should return 100 for equal values', () => {
      expect(calcularPorcentagem(10, 10)).toBe(100);
    });

    test('should return 0 when numerator is 0', () => {
      expect(calcularPorcentagem(0, 10)).toBe(0);
    });

    test('should return 0 when denominator is 0', () => {
      expect(calcularPorcentagem(10, 0)).toBe(0);
    });
  });

  describe('getLetterFromIndex', () => {
    test('should return "a" for index 0', () => {
      expect(getLetterFromIndex(0)).toBe('a');
    });

    test('should return "b" for index 1', () => {
      expect(getLetterFromIndex(1)).toBe('b');
    });

    test('should return "e" for index 4', () => {
      expect(getLetterFromIndex(4)).toBe('e');
    });

    test('should return "z" for index 25', () => {
      expect(getLetterFromIndex(25)).toBe('z');
    });
  });

  describe('getIndexFromLetter', () => {
    test('should return 0 for letter "a"', () => {
      expect(getIndexFromLetter('a')).toBe(0);
    });

    test('should return 1 for letter "b"', () => {
      expect(getIndexFromLetter('b')).toBe(1);
    });

    test('should return 4 for letter "e"', () => {
      expect(getIndexFromLetter('e')).toBe(4);
    });

    test('should return 25 for letter "z"', () => {
      expect(getIndexFromLetter('z')).toBe(25);
    });
  });

  describe('areAllFieldsFilled', () => {
    test('should return true when all fields have values', () => {
      const fields = {
        name: 'John',
        email: 'john@example.com',
        password: '123456',
      };
      expect(areAllFieldsFilled(fields)).toBe(true);
    });

    test('should return false when one field is empty string', () => {
      const fields = {
        name: 'John',
        email: '',
        password: '123456',
      };
      expect(areAllFieldsFilled(fields)).toBe(false);
    });

    test('should return false when one field is null', () => {
      const fields = {
        name: 'John',
        email: null,
        password: '123456',
      };
      expect(areAllFieldsFilled(fields)).toBe(false);
    });

    test('should return false when one field is undefined', () => {
      const fields = {
        name: 'John',
        email: undefined,
        password: '123456',
      };
      expect(areAllFieldsFilled(fields)).toBe(false);
    });

    test('should return true for empty object', () => {
      expect(areAllFieldsFilled({})).toBe(true);
    });
  });
});
