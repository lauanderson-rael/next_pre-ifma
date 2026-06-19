import {
  gcd,
  lcm,
  power,
  round,
  median,
  mode,
  standardDeviation,
  sumArrayMath,
  variance,
  percentile,
  range,
  maxArrayMath,
  minArrayMath,
  isPositive,
  isNegative,
  isZero,
  isInteger,
  isFloat,
  isInRange,
  wordCount,
  charFrequency,
  toAcronym,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  titleCase,
} from './math';

describe('Math & String Utilities', () => {
  describe('gcd', () => {
    test('should find greatest common divisor', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(100, 50)).toBe(50);
      expect(gcd(17, 19)).toBe(1);
    });
  });

  describe('lcm', () => {
    test('should find least common multiple', () => {
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(3, 5)).toBe(15);
    });
  });

  describe('power', () => {
    test('should calculate power correctly', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
      expect(power(2, 0)).toBe(1);
    });

    test('should handle negative exponents', () => {
      expect(power(2, -1)).toBe(0.5);
    });
  });

  describe('round', () => {
    test('should round to specified decimals', () => {
      expect(round(3.14159, 2)).toBe(3.14);
      expect(round(3.14159, 0)).toBe(3);
    });
  });

  describe('median', () => {
    test('should find median of array', () => {
      expect(median([1, 2, 3])).toBe(2);
      expect(median([1, 2, 3, 4])).toBe(2.5);
    });

    test('should return 0 for empty array', () => {
      expect(median([])).toBe(0);
    });
  });

  describe('mode', () => {
    test('should find most frequent number', () => {
      expect(mode([1, 2, 2, 3, 2])).toBe(2);
    });

    test('should return null for empty array', () => {
      expect(mode([])).toBeNull();
    });
  });

  describe('standardDeviation', () => {
    test('should calculate standard deviation', () => {
      const result = standardDeviation([1, 2, 3, 4, 5]);
      expect(result).toBeGreaterThan(1);
      expect(result).toBeLessThan(2);
    });

    test('should return 0 for empty array', () => {
      expect(standardDeviation([])).toBe(0);
    });
  });

  describe('variance', () => {
    test('should calculate variance', () => {
      expect(variance([1, 2, 3, 4, 5])).toBeGreaterThan(0);
    });
  });

  describe('percentile', () => {
    test('should calculate percentile', () => {
      expect(percentile([1, 2, 3, 4, 5], 50)).toBe(3);
    });

    test('should return 0 for invalid input', () => {
      expect(percentile([], 50)).toBe(0);
      expect(percentile([1, 2], 150)).toBe(0);
    });
  });

  describe('range', () => {
    test('should calculate range', () => {
      expect(range([1, 5, 3])).toBe(4);
    });

    test('should return 0 for empty array', () => {
      expect(range([])).toBe(0);
    });
  });

  describe('isPositive', () => {
    test('should return true for positive numbers', () => {
      expect(isPositive(5)).toBe(true);
    });

    test('should return false for non-positive', () => {
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-5)).toBe(false);
    });
  });

  describe('isNegative', () => {
    test('should return true for negative numbers', () => {
      expect(isNegative(-5)).toBe(true);
    });

    test('should return false for non-negative', () => {
      expect(isNegative(0)).toBe(false);
    });
  });

  describe('isZero', () => {
    test('should return true for zero', () => {
      expect(isZero(0)).toBe(true);
    });

    test('should return false for non-zero', () => {
      expect(isZero(1)).toBe(false);
    });
  });

  describe('isInteger', () => {
    test('should return true for integers', () => {
      expect(isInteger(5)).toBe(true);
    });

    test('should return false for floats', () => {
      expect(isInteger(5.5)).toBe(false);
    });
  });

  describe('isFloat', () => {
    test('should return true for floats', () => {
      expect(isFloat(5.5)).toBe(true);
    });

    test('should return false for integers', () => {
      expect(isFloat(5)).toBe(false);
    });
  });

  describe('isInRange', () => {
    test('should return true for values in range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
    });

    test('should return false for values outside range', () => {
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe('wordCount', () => {
    test('should count words', () => {
      expect(wordCount('hello world')).toBe(2);
      expect(wordCount('one two three')).toBe(3);
    });

    test('should handle multiple spaces', () => {
      expect(wordCount('hello  world')).toBe(2);
    });
  });

  describe('charFrequency', () => {
    test('should count character frequency', () => {
      const freq = charFrequency('aab');
      expect(freq['a']).toBe(2);
      expect(freq['b']).toBe(1);
    });
  });

  describe('toAcronym', () => {
    test('should convert to acronym', () => {
      expect(toAcronym('Hello World Test')).toBe('HWT');
    });
  });

  describe('toCamelCase', () => {
    test('should convert to camel case', () => {
      expect(toCamelCase('hello world test')).toBe('helloWorldTest');
    });
  });

  describe('toSnakeCase', () => {
    test('should convert to snake case', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world');
    });
  });

  describe('toKebabCase', () => {
    test('should convert to kebab case', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
    });
  });

  describe('titleCase', () => {
    test('should convert to title case', () => {
      expect(titleCase('hello world')).toBe('Hello World');
    });
  });

  describe('sumArrayMath', () => {
    test('should sum array', () => {
      expect(sumArrayMath([1, 2, 3])).toBe(6);
    });
  });

  describe('maxArrayMath', () => {
    test('should return max', () => {
      expect(maxArrayMath([1, 5, 3])).toBe(5);
    });
  });

  describe('minArrayMath', () => {
    test('should return min', () => {
      expect(minArrayMath([5, 2, 8])).toBe(2);
    });
  });
});
