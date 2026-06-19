import {
  getProperty,
  setProperty,
  deleteProperty,
  merge,
  deepMerge,
  pick,
  omit,
  mapObject,
  filterObject,
  invertObject,
  flattenObject,
  findKey,
  findValue,
  someProperty,
  everyProperty,
} from './objects';

describe('Object Utilities', () => {
  describe('getProperty', () => {
    test('should get property from object', () => {
      const obj = { name: 'John', age: 30 };
      expect(getProperty(obj, 'name')).toBe('John');
    });
  });

  describe('setProperty', () => {
    test('should set property immutably', () => {
      const obj = { name: 'John', age: 30 };
      const updated = setProperty(obj, 'name', 'Jane');
      expect(updated.name).toBe('Jane');
      expect(obj.name).toBe('John');
    });
  });

  describe('deleteProperty', () => {
    test('should delete property immutably', () => {
      const obj = { name: 'John', age: 30, city: 'NYC' };
      const result = deleteProperty(obj, 'age');
      expect(result).not.toHaveProperty('age');
      expect(obj).toHaveProperty('age');
    });
  });

  describe('merge', () => {
    test('should merge two objects', () => {
      const obj1 = { name: 'John', age: 30 };
      const obj2 = { city: 'NYC', age: 31 };
      const result = merge(obj1, obj2);
      expect(result).toEqual({ name: 'John', age: 31, city: 'NYC' });
    });

    test('should not mutate original objects', () => {
      const obj1 = { name: 'John' };
      const obj2 = { age: 30 };
      merge(obj1, obj2);
      expect(obj1).toEqual({ name: 'John' });
    });
  });

  describe('deepMerge', () => {
    test('should deep merge objects', () => {
      const target = { a: { b: 1 }, c: 2 };
      const source = { a: { d: 3 } };
      const result = deepMerge(target, source);
      expect(result.a).toEqual({ b: 1, d: 3 });
    });
  });

  describe('pick', () => {
    test('should pick specific properties', () => {
      const obj = { name: 'John', age: 30, city: 'NYC' };
      const result = pick(obj, ['name', 'age']);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    test('should not include unpicked properties', () => {
      const obj = { name: 'John', age: 30, city: 'NYC' };
      const result = pick(obj, ['name']);
      expect(result).not.toHaveProperty('city');
    });
  });

  describe('omit', () => {
    test('should omit specific properties', () => {
      const obj = { name: 'John', age: 30, city: 'NYC' };
      const result = omit(obj, ['age']);
      expect(result).toEqual({ name: 'John', city: 'NYC' });
    });
  });

  describe('mapObject', () => {
    test('should map object values', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = mapObject(obj, (val) => val * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });
  });

  describe('filterObject', () => {
    test('should filter object properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = filterObject(obj, (val) => val > 1);
      expect(result).toEqual({ b: 2, c: 3 });
    });
  });

  describe('invertObject', () => {
    test('should invert object keys and values', () => {
      const obj = { name: 'john', age: '30' };
      const result = invertObject(obj);
      expect(result).toEqual({ john: 'name', 30: 'age' });
    });
  });

  describe('flattenObject', () => {
    test('should flatten nested object', () => {
      const obj = { a: { b: { c: 1 } }, d: 2 };
      const result = flattenObject(obj);
      expect(result).toEqual({ 'a.b.c': 1, d: 2 });
    });
  });

  describe('findKey', () => {
    test('should find key by predicate', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const key = findKey(obj, (val) => val === 2);
      expect(key).toBe('b');
    });

    test('should return undefined if not found', () => {
      const obj = { a: 1, b: 2 };
      const key = findKey(obj, (val) => val === 5);
      expect(key).toBeUndefined();
    });
  });

  describe('findValue', () => {
    test('should find value by predicate', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const value = findValue(obj, (val) => val === 2);
      expect(value).toBe(2);
    });

    test('should return undefined if not found', () => {
      const obj = { a: 1, b: 2 };
      const value = findValue(obj, (val) => val === 5);
      expect(value).toBeUndefined();
    });
  });

  describe('someProperty', () => {
    test('should return true if some property matches', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(someProperty(obj, (val) => val > 2)).toBe(true);
    });

    test('should return false if no property matches', () => {
      const obj = { a: 1, b: 2 };
      expect(someProperty(obj, (val) => val > 5)).toBe(false);
    });
  });

  describe('everyProperty', () => {
    test('should return true if all properties match', () => {
      const obj = { a: 2, b: 3, c: 4 };
      expect(everyProperty(obj, (val) => val > 1)).toBe(true);
    });

    test('should return false if some property does not match', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(everyProperty(obj, (val) => val > 1)).toBe(false);
    });
  });
});
