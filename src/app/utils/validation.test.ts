import {
  isDate,
  isValidDate,
  daysInMonth,
  isLeapYear,
  getDayOfWeek,
  getMonthName,
  addDays,
  subtractDays,
  isSameDay,
  getWeekNumber,
  getDaysBetween,
  isUrl,
  isPhoneNumber,
  isCreditCard,
  isStrongPassword,
  isIPAddress,
  isJSON,
  isHexColor,
  isAlphanumeric,
  isAlphabetic,
  isNumeric,
  isEmpty,
  isTruthy,
  isFalsy,
  isBoolean,
  isObject,
  isArray,
} from './validation';

describe('Validation & Date Utilities', () => {
  describe('isDate', () => {
    test('should return true for valid Date', () => {
      expect(isDate(new Date())).toBe(true);
    });

    test('should return false for invalid date', () => {
      expect(isDate('not a date')).toBe(false);
      expect(isDate(new Date('invalid'))).toBe(false);
    });
  });

  describe('isValidDate', () => {
    test('should return true for valid date string', () => {
      expect(isValidDate('2024-01-01')).toBe(true);
    });

    test('should return false for invalid date string', () => {
      expect(isValidDate('invalid-date')).toBe(false);
    });
  });

  describe('daysInMonth', () => {
    test('should return correct days in month', () => {
      expect(daysInMonth(2024, 0)).toBe(31); // January
      expect(daysInMonth(2024, 1)).toBe(29); // February (leap year)
      expect(daysInMonth(2024, 3)).toBe(30); // April
    });
  });

  describe('isLeapYear', () => {
    test('should identify leap years', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2023)).toBe(false);
    });
  });

  describe('getDayOfWeek', () => {
    test('should return day name', () => {
      const date = new Date('2024-01-01');
      const dayName = getDayOfWeek(date);
      expect(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).toContain(dayName);
    });
  });

  describe('getMonthName', () => {
    test('should return month name', () => {
      expect(getMonthName(0)).toBe('January');
      expect(getMonthName(11)).toBe('December');
    });
  });

  describe('addDays', () => {
    test('should add days to date', () => {
      const date = new Date('2024-01-01');
      const originalDate = new Date(date);
      const result = addDays(date, 5);
      const daysDiff = (result.getTime() - originalDate.getTime()) / (24 * 60 * 60 * 1000);
      expect(daysDiff).toBe(5);
    });
  });

  describe('subtractDays', () => {
    test('should subtract days from date', () => {
      const date = new Date('2024-01-10');
      const originalDate = new Date(date);
      const result = subtractDays(date, 5);
      const daysDiff = (originalDate.getTime() - result.getTime()) / (24 * 60 * 60 * 1000);
      expect(daysDiff).toBe(5);
    });
  });

  describe('isSameDay', () => {
    test('should return true for same day', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    test('should return false for different days', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('getWeekNumber', () => {
    test('should return week number', () => {
      const date = new Date('2024-01-01');
      const week = getWeekNumber(date);
      expect(week).toBeGreaterThan(0);
      expect(week).toBeLessThanOrEqual(53);
    });
  });

  describe('getDaysBetween', () => {
    test('should calculate days between dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-11');
      expect(getDaysBetween(date1, date2)).toBe(10);
    });
  });

  describe('isUrl', () => {
    test('should validate URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('not a url')).toBe(false);
    });
  });

  describe('isPhoneNumber', () => {
    test('should validate phone numbers', () => {
      expect(isPhoneNumber('123-456-7890')).toBe(true);
      expect(isPhoneNumber('abc')).toBe(false);
    });
  });

  describe('isCreditCard', () => {
    test('should validate credit card numbers', () => {
      expect(isCreditCard('4532015112830366')).toBe(true);
      expect(isCreditCard('1234')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    test('should validate strong passwords', () => {
      expect(isStrongPassword('StrongPass123!')).toBe(true);
      expect(isStrongPassword('weak')).toBe(false);
    });
  });

  describe('isIPAddress', () => {
    test('should validate IP addresses', () => {
      expect(isIPAddress('203.0.113.1')).toBe(true);
      expect(isIPAddress('256.1.1.1')).toBe(false);
      expect(isIPAddress('not.an.ip.addr')).toBe(false);
    });
  });

  describe('isJSON', () => {
    test('should validate JSON', () => {
      expect(isJSON('{"key": "value"}')).toBe(true);
      expect(isJSON('not json')).toBe(false);
    });
  });

  describe('isHexColor', () => {
    test('should validate hex colors', () => {
      expect(isHexColor('#FF0000')).toBe(true);
      expect(isHexColor('#FFF')).toBe(true);
      expect(isHexColor('red')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    test('should validate alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('abc-123')).toBe(false);
    });
  });

  describe('isAlphabetic', () => {
    test('should validate alphabetic strings', () => {
      expect(isAlphabetic('abcXYZ')).toBe(true);
      expect(isAlphabetic('abc123')).toBe(false);
    });
  });

  describe('isNumeric', () => {
    test('should validate numeric strings', () => {
      expect(isNumeric('12345')).toBe(true);
      expect(isNumeric('123a')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    test('should check if value is empty', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty('text')).toBe(false);
    });
  });

  describe('isTruthy', () => {
    test('should check truthy values', () => {
      expect(isTruthy(1)).toBe(true);
      expect(isTruthy('text')).toBe(true);
      expect(isTruthy(0)).toBe(false);
    });
  });

  describe('isFalsy', () => {
    test('should check falsy values', () => {
      expect(isFalsy(0)).toBe(true);
      expect(isFalsy('')).toBe(true);
      expect(isFalsy(1)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    test('should check if boolean', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
    });
  });

  describe('isObject', () => {
    test('should check if object', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(false);
      expect(isObject('string')).toBe(false);
    });
  });

  describe('isArray', () => {
    test('should check if array', () => {
      expect(isArray([])).toBe(true);
      expect(isArray({})).toBe(false);
    });
  });
});
