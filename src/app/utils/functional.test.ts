import {
  retry,
  debounce,
  throttle,
  memoize,
  compose,
  pipe,
  partial,
  curry,
  once,
} from './functional';

describe('Functional Programming Utilities', () => {
  describe('retry', () => {
    test('should succeed on first try', async () => {
      const fn = jest.fn(async () => 'Success');
      const result = await retry(fn, 3, 0);
      expect(result).toBe('Success');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    test('should debounce function calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 1000);

      debounced(1);
      debounced(2);
      debounced(3);

      expect(fn).not.toHaveBeenCalled();

      jest.runAllTimers();
      expect(fn).toHaveBeenCalledWith(3);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should clear previous timeout', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 1000);

      debounced(1);
      jest.advanceTimersByTime(500);
      debounced(2);
      jest.advanceTimersByTime(500);

      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(2);
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    test('should throttle function calls', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 1000);

      throttled(1);
      throttled(2);
      throttled(3);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(1);
    });

    test('should allow subsequent calls after delay', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 1000);

      throttled(1);
      jest.advanceTimersByTime(1000);
      throttled(2);

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    test('should cache results', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      const result1 = memoized(5);
      const result2 = memoized(5);

      expect(result1).toBe(10);
      expect(result2).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should handle different arguments', () => {
      const fn = jest.fn((x: number, y: number) => x + y);
      const memoized = memoize(fn);

      memoized(1, 2);
      memoized(1, 2);
      memoized(2, 3);

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('compose', () => {
    test('should compose functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const composed = compose(double, add1);

      expect(composed(5)).toBe(12); // (5 + 1) * 2
    });

    test('should handle multiple functions', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      const composed = compose(subtract3, double, add1);

      expect(composed(5)).toBe(9); // ((5 + 1) * 2) - 3
    });
  });

  describe('pipe', () => {
    test('should pipe functions left to right', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const piped = pipe(add1, double);

      expect(piped(5)).toBe(12); // (5 + 1) * 2
    });

    test('should handle multiple functions', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const subtract3 = (x: number) => x - 3;
      const piped = pipe(add1, double, subtract3);

      expect(piped(5)).toBe(9); // ((5 + 1) * 2) - 3
    });
  });

  describe('partial', () => {
    test('should create partial function', () => {
      const add = (a: number, b: number) => a + b;
      const addFive = partial(add, 5);

      expect(addFive(3)).toBe(8);
    });

    test('should handle multiple fixed arguments', () => {
      const concat = (a: string, b: string, c: string) => a + b + c;
      const concatHello = partial(concat, 'Hello', ' ');

      expect(concatHello('World')).toBe('Hello World');
    });
  });

  describe('curry', () => {
    test('should curry function', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
    });

    test('should allow partial application', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);

      const addOne = curriedAdd(1);
      const addOneAndTwo = addOne(2);

      expect(addOneAndTwo(3)).toBe(6);
    });
  });

  describe('once', () => {
    test('should call function only once', () => {
      const fn = jest.fn((x: number) => x * 2);
      const onceFn = once(fn);

      const result1 = onceFn(5);
      const result2 = onceFn(10);

      expect(result1).toBe(10);
      expect(result2).toBe(10); // Returns first result
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('should work with different types', () => {
      const fn = jest.fn(() => 'Called');
      const onceFn = once(fn);

      const result1 = onceFn();
      const result2 = onceFn();

      expect(result1).toBe('Called');
      expect(result2).toBe('Called');
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
