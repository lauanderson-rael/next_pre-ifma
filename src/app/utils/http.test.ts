import {
  buildQueryString,
  parseQueryString,
  buildURL,
  isSuccessStatus,
  isClientError,
  isServerError,
  getStatusMessage,
  setHeader,
  removeHeader,
  addAuthHeader,
  addContentType,
  isJSON,
  stringifyJSON,
} from './http';

describe('HTTP Utilities', () => {
  describe('buildQueryString', () => {
    test('should build query string from params', () => {
      const params = { name: 'John', age: 30 };
      expect(buildQueryString(params)).toBe('?name=John&age=30');
    });

    test('should filter null and undefined values', () => {
      const params = { name: 'John', age: null, city: undefined };
      expect(buildQueryString(params)).toBe('?name=John');
    });

    test('should encode special characters', () => {
      const params = { email: 'test@example.com', msg: 'Hello World' };
      expect(buildQueryString(params)).toContain('test%40example.com');
      expect(buildQueryString(params)).toContain('Hello%20World');
    });

    test('should return empty string for empty params', () => {
      expect(buildQueryString({})).toBe('');
    });
  });

  describe('parseQueryString', () => {
    test('should parse query string to object', () => {
      const result = parseQueryString('?name=John&age=30');
      expect(result).toEqual({ name: 'John', age: '30' });
    });

    test('should handle query string without ?', () => {
      const result = parseQueryString('name=John&age=30');
      expect(result).toEqual({ name: 'John', age: '30' });
    });

    test('should decode URL encoded values', () => {
      const result = parseQueryString('?email=test%40example.com');
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('buildURL', () => {
    test('should build URL with base and path', () => {
      expect(buildURL('https://api.example.com', '/users')).toBe('https://api.example.com/users');
    });

    test('should handle trailing slashes', () => {
      expect(buildURL('https://api.example.com/', '/users')).toBe('https://api.example.com/users');
    });

    test('should add query parameters', () => {
      const url = buildURL('https://api.example.com', '/users', { id: 1 });
      expect(url).toBe('https://api.example.com/users?id=1');
    });
  });

  describe('Status code checks', () => {
    test('isSuccessStatus should return true for 2xx', () => {
      expect(isSuccessStatus(200)).toBe(true);
      expect(isSuccessStatus(201)).toBe(true);
      expect(isSuccessStatus(299)).toBe(true);
    });

    test('isClientError should return true for 4xx', () => {
      expect(isClientError(400)).toBe(true);
      expect(isClientError(401)).toBe(true);
      expect(isClientError(499)).toBe(true);
    });

    test('isServerError should return true for 5xx', () => {
      expect(isServerError(500)).toBe(true);
      expect(isServerError(502)).toBe(true);
      expect(isServerError(599)).toBe(true);
    });
  });

  describe('getStatusMessage', () => {
    test('should return status messages', () => {
      expect(getStatusMessage(200)).toBe('OK');
      expect(getStatusMessage(404)).toBe('Not Found');
      expect(getStatusMessage(500)).toBe('Internal Server Error');
    });

    test('should return unknown for unknown status', () => {
      expect(getStatusMessage(999)).toBe('Unknown Status');
    });
  });

  describe('Header utilities', () => {
    test('setHeader should add header immutably', () => {
      const headers = { 'Content-Type': 'application/json' };
      const updated = setHeader(headers, 'Authorization', 'Bearer token');
      expect(updated['Authorization']).toBe('Bearer token');
      expect(headers).not.toHaveProperty('Authorization');
    });

    test('removeHeader should remove header immutably', () => {
      const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer token' };
      const updated = removeHeader(headers, 'Authorization');
      expect(updated).not.toHaveProperty('Authorization');
      expect(headers).toHaveProperty('Authorization');
    });

    test('addAuthHeader should add authorization header', () => {
      const headers = {};
      const result = addAuthHeader(headers, 'my-token');
      expect(result['Authorization']).toBe('Bearer my-token');
    });

    test('addContentType should add content-type header', () => {
      const headers = {};
      const result = addContentType(headers, 'application/json');
      expect(result['Content-Type']).toBe('application/json');
    });
  });

  describe('JSON utilities', () => {
    test('isJSON should validate JSON strings', () => {
      expect(isJSON('{"key":"value"}')).toBe(true);
      expect(isJSON('not json')).toBe(false);
    });

    test('stringifyJSON should convert objects to JSON', () => {
      const obj = { name: 'John', age: 30 };
      expect(stringifyJSON(obj)).toBe('{"name":"John","age":30}');
    });

    test('stringifyJSON should pretty print with pretty flag', () => {
      const obj = { name: 'John' };
      const result = stringifyJSON(obj, true);
      expect(result).toContain('\n');
    });
  });
});
