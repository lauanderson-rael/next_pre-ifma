// Funções matemáticas e estatísticas
export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
  return Math.abs(a * b) / gcd(a, b);
};

export const power = (base: number, exp: number): number => {
  if (exp === 0) return 1;
  if (exp < 0) return 1 / power(base, -exp);
  return base * power(base, exp - 1);
};

export const round = (num: number, decimals: number = 0): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const median = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export const mode = (arr: number[]): number | null => {
  if (arr.length === 0) return null;
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  let mode = arr[0];

  for (const num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  }
  return mode;
};

export const standardDeviation = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  const mean = sumArrayMath(arr) / arr.length;
  const squaredDifferences = arr.map(x => Math.pow(x - mean, 2));
  const variance = sumArrayMath(squaredDifferences) / arr.length;
  return Math.sqrt(variance);
};

export const sumArrayMath = (arr: number[]): number => {
  return arr.reduce((a, b) => a + b, 0);
};

export const variance = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  const mean = sumArrayMath(arr) / arr.length;
  const squaredDifferences = arr.map(x => Math.pow(x - mean, 2));
  return sumArrayMath(squaredDifferences) / arr.length;
};

export const percentile = (arr: number[], p: number): number => {
  if (arr.length === 0 || p < 0 || p > 100) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
};

export const range = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return maxArrayMath(arr) - minArrayMath(arr);
};

export const maxArrayMath = (arr: number[]): number => Math.max(...arr);

export const minArrayMath = (arr: number[]): number => Math.min(...arr);

// Funções de validação numérica
export const isPositive = (num: number): boolean => num > 0;

export const isNegative = (num: number): boolean => num < 0;

export const isZero = (num: number): boolean => num === 0;

export const isInteger = (num: number): boolean => Number.isInteger(num);

export const isFloat = (num: number): boolean => !Number.isInteger(num);

export const isInRange = (num: number, min: number, max: number): boolean => {
  return num >= min && num <= max;
};

// Funções de string avançadas
export const wordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const charFrequency = (text: string): Record<string, number> => {
  const freq: Record<string, number> = {};
  for (const char of text.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
};

export const toAcronym = (text: string): string => {
  return text.split(' ').map(word => word[0]?.toUpperCase()).join('');
};

export const toCamelCase = (text: string): string => {
  return text
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

export const toSnakeCase = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '_');
};

export const toKebabCase = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

export const titleCase = (text: string): string => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
