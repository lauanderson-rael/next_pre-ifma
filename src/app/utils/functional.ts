// Funções adicionais para aumentar cobertura
export const retry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('Max attempts reached');
};

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): ((...args: Parameters<T>) => void) => {
  let lastCallTime = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCallTime >= delayMs) {
      lastCallTime = now;
      fn(...args);
    }
  };
};

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

export const compose = <R>(...fns: Array<(a: any) => any>) =>
  (value: R) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

export const pipe = <R>(...fns: Array<(a: any) => any>) =>
  (value: R) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const partial = <T extends (...args: any[]) => any>(
  fn: T,
  ...fixedArgs: any[]
): ((...args: any[]) => ReturnType<T>) => {
  return (...args: any[]) => fn(...fixedArgs, ...args);
};

export const curry = <T extends (...args: any[]) => any>(fn: T): any => {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs: any[]) => curried(...args, ...nextArgs);
  };
};

export const once = <T extends (...args: any[]) => any>(fn: T): T => {
  let called = false;
  let result: any;
  return ((...args: Parameters<T>) => {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  }) as T;
};
