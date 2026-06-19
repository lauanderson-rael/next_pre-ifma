import {
  stringToNumber,
  stringToBoolean,
  booleanToNumber,
  numberToBoolean,
  toJSON,
  fromJSON,
  toBase64,
  fromBase64,
  stringToArray,
  arrayToString,
  toUpper,
  toLower,
  toLocaleDateString,
  toLocaleTimeString,
  toLocaleString,
  toISOString,
  parseISO,
  toPercentage,
  toCurrency,
  toOrdinal,
  toFileSize,
  toDuration,
} from './converters';

describe('Converter Utilities', () => {
  describe('stringToNumber', () => {
    test('should convert valid string to number', () => {
      expect(stringToNumber('123')).toBe(123);
      expect(stringToNumber('45.67')).toBe(45.67);
    });

    test('should return null for invalid string', () => {
      expect(stringToNumber('abc')).toBeNull();
    });
  });

  describe('stringToBoolean', () => {
    test('should convert truthy strings', () => {
      expect(stringToBoolean('true')).toBe(true);
      expect(stringToBoolean('1')).toBe(true);
      expect(stringToBoolean('yes')).toBe(true);
      expect(stringToBoolean('on')).toBe(true);
    });

    test('should convert falsy strings', () => {
      expect(stringToBoolean('false')).toBe(false);
      expect(stringToBoolean('0')).toBe(false);
    });
  });

  describe('booleanToNumber', () => {
    test('should convert true to 1', () => {
      expect(booleanToNumber(true)).toBe(1);
    });

    test('should convert false to 0', () => {
      expect(booleanToNumber(false)).toBe(0);
    });
  });

  describe('numberToBoolean', () => {
    test('should convert non-zero to true', () => {
      expect(numberToBoolean(1)).toBe(true);
      expect(numberToBoolean(-1)).toBe(true);
    });

    test('should convert zero to false', () => {
      expect(numberToBoolean(0)).toBe(false);
    });
  });

  describe('toJSON / fromJSON', () => {
    test('should convert to and from JSON', () => {
      const obj = { name: 'John', age: 30 };
      const json = toJSON(obj);
      expect(fromJSON(json)).toEqual(obj);
    });

    test('should return null for invalid JSON', () => {
      expect(fromJSON('invalid')).toBeNull();
    });
  });

  describe('toBase64 / fromBase64', () => {
    test('should encode and decode base64', () => {
      const text = 'Hello World';
      const encoded = toBase64(text);
      expect(fromBase64(encoded)).toBe(text);
    });
  });

  describe('stringToArray / arrayToString', () => {
    test('should convert string to array', () => {
      expect(stringToArray('a,b,c')).toEqual(['a', 'b', 'c']);
    });

    test('should convert array to string', () => {
      expect(arrayToString(['a', 'b', 'c'])).toBe('a,b,c');
    });

    test('should handle custom delimiter', () => {
      expect(stringToArray('a;b;c', ';')).toEqual(['a', 'b', 'c']);
      expect(arrayToString(['x', 'y'], ';')).toBe('x;y');
    });
  });

  describe('toUpper / toLower', () => {
    test('should convert to uppercase', () => {
      expect(toUpper('hello')).toBe('HELLO');
    });

    test('should convert to lowercase', () => {
      expect(toLower('HELLO')).toBe('hello');
    });
  });

  describe('toPercentage', () => {
    test('should convert to percentage', () => {
      expect(toPercentage(0.5)).toBe('50%');
      expect(toPercentage(0.333, 2)).toBe('33.30%');
    });
  });

  describe('toOrdinal', () => {
    test('should convert to ordinal', () => {
      expect(toOrdinal(1)).toBe('1st');
      expect(toOrdinal(2)).toBe('2nd');
      expect(toOrdinal(3)).toBe('3rd');
      expect(toOrdinal(4)).toBe('4th');
      expect(toOrdinal(21)).toBe('21st');
    });
  });

  describe('toFileSize', () => {
    test('should convert bytes to file size', () => {
      expect(toFileSize(0)).toBe('0 Bytes');
      expect(toFileSize(1024)).toBe('1 KB');
      expect(toFileSize(1048576)).toBe('1 MB');
    });
  });

  describe('toDuration', () => {
    test('should convert milliseconds to duration', () => {
      expect(toDuration(1000)).toBe('1s');
      expect(toDuration(60000)).toBe('1m');
      expect(toDuration(3600000)).toBe('1h');
      expect(toDuration(3661000)).toBe('1h 1m 1s');
    });

    test('should handle 0 milliseconds', () => {
      expect(toDuration(0)).toBe('0s');
    });
  });

  describe('toISOString / parseISO', () => {
    test('should convert to ISO string', () => {
      const date = new Date('2024-01-01');
      const iso = toISOString(date);
      expect(iso).toMatch(/2024-01-01/);
    });

    test('should parse ISO string', () => {
      const iso = '2024-01-01T00:00:00Z';
      const date = parseISO(iso);
      expect(date).toBeInstanceOf(Date);
    });
  });

  describe('toLocaleDateString', () => {
    test('should format date to locale string', () => {
      const date = new Date('2024-01-01');
      const result = toLocaleDateString(date);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('toLocaleTimeString', () => {
    test('should format time to locale string', () => {
      const date = new Date('2024-01-01T12:30:45');
      const result = toLocaleTimeString(date);
      expect(typeof result).toBe('string');
    });
  });

  describe('toLocaleString', () => {
    test('should format date and time to locale string', () => {
      const date = new Date('2024-01-01T12:30:45');
      const result = toLocaleString(date);
      expect(typeof result).toBe('string');
    });
  });

  describe('toCurrency', () => {
    test('should format as currency', () => {
      const result = toCurrency(1000);
      expect(result).toContain('$');
      expect(result).toContain('1,000');
    });
  });
});
