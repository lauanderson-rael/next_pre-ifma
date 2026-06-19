import {
  setCache,
  getCache,
  clearCache,
  isCacheExpired,
  getErrorMessage,
  isNetworkError,
  isValidationError,
  isUnauthorizedError,
} from './storage';

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllTimers();
  });

  describe('setCache and getCache', () => {
    test('should set and get cache', () => {
      const data = { name: 'Test', age: 25 };
      setCache('user', data);
      const retrieved = getCache('user');
      expect(retrieved).toEqual(data);
    });

    test('should get null for non-existent cache', () => {
      expect(getCache('non-existent')).toBeNull();
    });

    test('should store with expiration', () => {
      const data = { id: 1 };
      setCache('test', data, 60);
      const stored = localStorage.getItem('cache_test');
      expect(stored).toBeDefined();
      const parsed = JSON.parse(stored!);
      expect(parsed.expirationTime).toBeGreaterThan(Date.now());
    });

    test('should handle invalid JSON in cache', () => {
      localStorage.setItem('cache_invalid', 'not-json');
      expect(getCache('invalid')).toBeNull();
    });

    test('should store complex objects', () => {
      const data = {
        users: [{ id: 1, name: 'User1' }],
        metadata: { count: 1 }
      };
      setCache('complex', data);
      expect(getCache('complex')).toEqual(data);
    });
  });

  describe('isCacheExpired', () => {
    test('should return true for non-existent cache', () => {
      expect(isCacheExpired('non-existent')).toBe(true);
    });

    test('should return false for valid cache', () => {
      setCache('valid', { data: 'test' }, 60);
      expect(isCacheExpired('valid')).toBe(false);
    });

    test('should return true for expired cache', () => {
      const expirationTime = Date.now() - 1000; // Already expired
      const data = { value: 'test', expirationTime };
      localStorage.setItem('cache_expired', JSON.stringify(data));
      expect(isCacheExpired('expired')).toBe(true);
    });

    test('should return true for invalid JSON', () => {
      localStorage.setItem('cache_bad', 'invalid-json');
      expect(isCacheExpired('bad')).toBe(true);
    });
  });

  describe('clearCache', () => {
    test('should clear specific cache key', () => {
      setCache('key1', { data: 1 });
      setCache('key2', { data: 2 });
      clearCache('key1');
      expect(getCache('key1')).toBeNull();
      expect(getCache('key2')).not.toBeNull();
    });

    test('should clear all cache when no key provided', () => {
      setCache('key1', { data: 1 });
      setCache('key2', { data: 2 });
      localStorage.setItem('other_key', 'value');
      clearCache();
      expect(getCache('key1')).toBeNull();
      expect(getCache('key2')).toBeNull();
      expect(localStorage.getItem('other_key')).toBe('value');
    });

    test('should not affect non-cache keys', () => {
      localStorage.setItem('regular_key', 'value');
      clearCache();
      expect(localStorage.getItem('regular_key')).toBe('value');
    });
  });

  describe('getErrorMessage', () => {
    test('should extract message from Error object', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    test('should return string error as is', () => {
      expect(getErrorMessage('String error')).toBe('String error');
    });

    test('should extract from response.data.message', () => {
      const error = {
        response: { data: { message: 'API error message' } }
      };
      expect(getErrorMessage(error)).toBe('API error message');
    });

    test('should extract from response.data.error', () => {
      const error = {
        response: { data: { error: 'Validation error' } }
      };
      expect(getErrorMessage(error)).toBe('Validation error');
    });

    test('should return default message for unknown error', () => {
      expect(getErrorMessage(null)).toBe('Erro desconhecido');
      expect(getErrorMessage({})).toBe('Erro desconhecido');
    });
  });

  describe('isNetworkError', () => {
    test('should return true for Network Error', () => {
      const error = { message: 'Network Error' };
      expect(isNetworkError(error)).toBe(true);
    });

    test('should return true for ENOTFOUND code', () => {
      const error = { code: 'ENOTFOUND' };
      expect(isNetworkError(error)).toBe(true);
    });

    test('should return true for ECONNREFUSED code', () => {
      const error = { code: 'ECONNREFUSED' };
      expect(isNetworkError(error)).toBe(true);
    });

    test('should return true when no response', () => {
      const error = { message: 'Some error' };
      expect(isNetworkError(error)).toBe(true);
    });

    test('should return false for null error', () => {
      expect(isNetworkError(null)).toBe(false);
    });

    test('should return false for server error with response', () => {
      const error = { response: { status: 500 } };
      expect(isNetworkError(error)).toBe(false);
    });
  });

  describe('isValidationError', () => {
    test('should return true for 400 status', () => {
      const error = { response: { status: 400 } };
      expect(isValidationError(error)).toBe(true);
    });

    test('should return false for other status codes', () => {
      expect(isValidationError({ response: { status: 500 } })).toBe(false);
      expect(isValidationError({ response: { status: 401 } })).toBe(false);
    });

    test('should return false when no response', () => {
      expect(isValidationError({ message: 'error' })).toBe(false);
    });
  });

  describe('isUnauthorizedError', () => {
    test('should return true for 401 status', () => {
      const error = { response: { status: 401 } };
      expect(isUnauthorizedError(error)).toBe(true);
    });

    test('should return false for other status codes', () => {
      expect(isUnauthorizedError({ response: { status: 400 } })).toBe(false);
      expect(isUnauthorizedError({ response: { status: 500 } })).toBe(false);
    });

    test('should return false when no response', () => {
      expect(isUnauthorizedError({ message: 'error' })).toBe(false);
    });
  });
});
