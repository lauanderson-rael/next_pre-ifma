// Funções de conversão e parsing
export const stringToNumber = (str: string): number | null => {
  const num = Number(str);
  return isNaN(num) ? null : num;
};

export const stringToBoolean = (str: string): boolean => {
  return ['true', '1', 'yes', 'on'].includes(str.toLowerCase());
};

export const booleanToNumber = (bool: boolean): number => bool ? 1 : 0;

export const numberToBoolean = (num: number): boolean => num !== 0;

export const toJSON = (obj: any): string => JSON.stringify(obj);

export const fromJSON = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
};

export const toBase64 = (str: string): string => {
  if (typeof window !== 'undefined') {
    return btoa(str);
  }
  return Buffer.from(str).toString('base64');
};

export const fromBase64 = (encoded: string): string => {
  if (typeof window !== 'undefined') {
    return atob(encoded);
  }
  return Buffer.from(encoded, 'base64').toString();
};

export const stringToArray = (str: string, delimiter: string = ','): string[] => {
  return str.split(delimiter).map(s => s.trim());
};

export const arrayToString = (arr: any[], delimiter: string = ','): string => {
  return arr.join(delimiter);
};

export const toUpper = (str: string): string => str.toUpperCase();

export const toLower = (str: string): string => str.toLowerCase();

export const toLocaleDateString = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleDateString(locale);
};

export const toLocaleTimeString = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleTimeString(locale);
};

export const toLocaleString = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleString(locale);
};

export const toISOString = (date: Date): string => {
  return date.toISOString();
};

export const parseISO = (isoString: string): Date | null => {
  try {
    return new Date(isoString);
  } catch {
    return null;
  }
};

export const toPercentage = (num: number, decimals: number = 0): string => {
  return `${(num * 100).toFixed(decimals)}%`;
};

export const toCurrency = (num: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
};

export const toOrdinal = (num: number): string => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const toFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const toDuration = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
};
