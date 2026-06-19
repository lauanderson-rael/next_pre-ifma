import {
  isEven,
  isOdd,
  isPrime,
  fibonacci,
  factorial,
  sumArray,
  averageArray,
  maxInArray,
  minInArray,
  reverseArray,
  removeDuplicatesFromArray,
  sortArrayAscending,
  sortArrayDescending,
  chunk,
  flatten,
  unique,
  intersection,
  difference,
  union,
  isPalindrome,
  countOccurrences,
  groupBy,
} from './helpers';

describe('Helper Functions', () => {
  describe('isEven', () => {
    test('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(100)).toBe(true);
    });

    test('should return false for odd numbers', () => {
      expect(isEven(3)).toBe(false);
      expect(isEven(99)).toBe(false);
    });

    test('should return true for 0', () => {
      expect(isEven(0)).toBe(true);
    });
  });

  describe('isOdd', () => {
    test('should return true for odd numbers', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(99)).toBe(true);
    });

    test('should return false for even numbers', () => {
      expect(isOdd(2)).toBe(false);
      expect(isOdd(100)).toBe(false);
    });
  });

  describe('isPrime', () => {
    test('should return true for prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });

    test('should return false for non-prime numbers', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    test('should return false for numbers <= 1', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-5)).toBe(false);
    });
  });

  describe('fibonacci', () => {
    test('should return fibonacci numbers', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(3)).toBe(2);
      expect(fibonacci(4)).toBe(3);
      expect(fibonacci(5)).toBe(5);
      expect(fibonacci(10)).toBe(55);
    });
  });

  describe('factorial', () => {
    test('should calculate factorial correctly', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(10)).toBe(3628800);
    });

    test('should throw for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Número não pode ser negativo');
    });
  });

  describe('sumArray', () => {
    test('should sum array elements', () => {
      expect(sumArray([1, 2, 3])).toBe(6);
      expect(sumArray([10, 20, 30])).toBe(60);
    });

    test('should return 0 for empty array', () => {
      expect(sumArray([])).toBe(0);
    });
  });

  describe('averageArray', () => {
    test('should calculate average', () => {
      expect(averageArray([1, 2, 3, 4])).toBe(2.5);
      expect(averageArray([10, 20, 30])).toBe(20);
    });

    test('should return 0 for empty array', () => {
      expect(averageArray([])).toBe(0);
    });
  });

  describe('maxInArray', () => {
    test('should return maximum value', () => {
      expect(maxInArray([1, 5, 3])).toBe(5);
      expect(maxInArray([100, 50, 75])).toBe(100);
    });
  });

  describe('minInArray', () => {
    test('should return minimum value', () => {
      expect(minInArray([5, 2, 8])).toBe(2);
      expect(minInArray([100, 50, 75])).toBe(50);
    });
  });

  describe('reverseArray', () => {
    test('should reverse array', () => {
      expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test('should not mutate original array', () => {
      const arr = [1, 2, 3];
      reverseArray(arr);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe('sortArrayAscending', () => {
    test('should sort in ascending order', () => {
      expect(sortArrayAscending([3, 1, 2])).toEqual([1, 2, 3]);
    });

    test('should not mutate original array', () => {
      const arr = [3, 1, 2];
      sortArrayAscending(arr);
      expect(arr).toEqual([3, 1, 2]);
    });
  });

  describe('sortArrayDescending', () => {
    test('should sort in descending order', () => {
      expect(sortArrayDescending([1, 3, 2])).toEqual([3, 2, 1]);
    });
  });

  describe('chunk', () => {
    test('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    test('should throw for invalid chunk size', () => {
      expect(() => chunk([1, 2], 0)).toThrow('Tamanho do chunk deve ser positivo');
    });
  });

  describe('flatten', () => {
    test('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('unique', () => {
    test('should remove duplicates', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('intersection', () => {
    test('should return common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    test('should return empty array when no common elements', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });
  });

  describe('difference', () => {
    test('should return elements only in first array', () => {
      expect(difference([1, 2, 3], [2])).toEqual([1, 3]);
    });
  });

  describe('union', () => {
    test('should return all unique elements', () => {
      expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('isPalindrome', () => {
    test('should identify palindromes', () => {
      expect(isPalindrome('aba')).toBe(true);
      expect(isPalindrome('a ba')).toBe(true);
      expect(isPalindrome('abc')).toBe(false);
    });
  });

  describe('countOccurrences', () => {
    test('should count occurrences', () => {
      expect(countOccurrences([1, 2, 2, 3, 2], 2)).toBe(3);
      expect(countOccurrences(['a', 'b', 'a'], 'a')).toBe(2);
    });

    test('should return 0 when not found', () => {
      expect(countOccurrences([1, 2, 3], 4)).toBe(0);
    });
  });

  describe('groupBy', () => {
    test('should group objects by key', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
      ];
      const grouped = groupBy(data, 'category');
      expect(grouped['A']).toHaveLength(2);
      expect(grouped['B']).toHaveLength(1);
    });
  });

  describe('removeDuplicatesFromArray', () => {
    test('should remove duplicates', () => {
      expect(removeDuplicatesFromArray([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });
  });
});
