// Funções auxiliares gerais - mais funções testáveis
export const isEven = (num: number): boolean => num % 2 === 0;

export const isOdd = (num: number): boolean => num % 2 !== 0;

export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

export const factorial = (n: number): number => {
  if (n < 0) throw new Error('Número não pode ser negativo');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

export const sumArray = (arr: number[]): number => arr.reduce((a, b) => a + b, 0);

export const averageArray = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return sumArray(arr) / arr.length;
};

export const maxInArray = (arr: number[]): number => Math.max(...arr);

export const minInArray = (arr: number[]): number => Math.min(...arr);

export const reverseArray = <T>(arr: T[]): T[] => [...arr].reverse();

export const removeDuplicatesFromArray = <T>(arr: T[]): T[] => [...new Set(arr)];

export const sortArrayAscending = (arr: number[]): number[] => [...arr].sort((a, b) => a - b);

export const sortArrayDescending = (arr: number[]): number[] => [...arr].sort((a, b) => b - a);

export const chunk = <T>(arr: T[], size: number): T[][] => {
  if (size <= 0) throw new Error('Tamanho do chunk deve ser positivo');
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.reduce((acc: T[], val) => {
    if (Array.isArray(val)) {
      return acc.concat(flatten(val as any));
    }
    return acc.concat(val);
  }, []);
};

export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));

export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => arr2.includes(item));
};

export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter(item => !arr2.includes(item));
};

export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  return unique([...arr1, ...arr2]);
};

export const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replaceAll(/\s+/g, '');
  return cleaned === cleaned.split('').reverse().join('');
};

export const countOccurrences = <T>(arr: T[], item: T): number => {
  return arr.filter(x => x === item).length;
};

export const groupBy = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): Record<string, T[]> => {
  return arr.reduce((acc, item) => {
    const k = String(item[key]);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};
