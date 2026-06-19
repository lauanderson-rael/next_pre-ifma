// Funções de manipulação de objetos
export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]): T => {
  return { ...obj, [key]: value };
};

export const deleteProperty = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
  const { [key]: _, ...rest } = obj as any;
  return rest;
};

export const merge = <T extends object, U extends object>(obj1: T, obj2: U): T & U => {
  return { ...obj1, ...obj2 } as T & U;
};

export const deepMerge = <T extends object>(target: T, source: any): T => {
  const output = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        output[key as keyof T] = deepMerge(
          target[key as keyof T] as any || {},
          source[key]
        );
      } else {
        output[key as keyof T] = source[key];
      }
    }
  }
  return output;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj } as any;
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

export const mapObject = <T extends object, U>(
  obj: T,
  fn: (value: any, key: keyof T) => U
): Record<keyof T, U> => {
  const result = {} as Record<keyof T, U>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key as keyof T] = fn(obj[key], key as keyof T);
    }
  }
  return result;
};

export const filterObject = <T extends object>(
  obj: T,
  predicate: (value: any, key: keyof T) => boolean
): Partial<T> => {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key as keyof T)) {
      result[key as keyof T] = obj[key];
    }
  }
  return result;
};

export const invertObject = <T extends Record<string, string | number>>(
  obj: T
): Record<string, keyof T> => {
  const result = {} as Record<string, keyof T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[String(obj[key])] = key as keyof T;
    }
  }
  return result;
};

export const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }
  return result;
};

export const findKey = <T extends object>(
  obj: T,
  predicate: (value: any, key: keyof T) => boolean
): keyof T | undefined => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key as keyof T)) {
      return key as keyof T;
    }
  }
  return undefined;
};

export const findValue = <T extends object>(
  obj: T,
  predicate: (value: any, key: keyof T) => boolean
): any | undefined => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key as keyof T)) {
      return obj[key];
    }
  }
  return undefined;
};

export const someProperty = <T extends object>(
  obj: T,
  predicate: (value: any, key: keyof T) => boolean
): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key as keyof T)) {
      return true;
    }
  }
  return false;
};

export const everyProperty = <T extends object>(
  obj: T,
  predicate: (value: any, key: keyof T) => boolean
): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !predicate(obj[key], key as keyof T)) {
      return false;
    }
  }
  return true;
};
