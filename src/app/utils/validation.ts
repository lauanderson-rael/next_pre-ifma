// Funções de data, hora e validação avançada
export const isDate = (date: any): boolean => date instanceof Date && !Number.isNaN(date.getTime());

export const isValidDate = (dateString: string): boolean => {
  const timestamp = Date.parse(dateString);
  return !Number.isNaN(timestamp);
};

export const daysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

export const getMonthName = (month: number): string => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month] || '';
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => addDays(date, -days);

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export const getDaysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

// Funções de validação
export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

export const isPhoneNumber = (str: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(str);
};

export const isCreditCard = (str: string): boolean => {
  const cardRegex = /^\d{13,19}$/;
  return cardRegex.test(str.replaceAll(/\s/g, ''));
};

export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^a-zA-Z\d]/.test(password)
  );
};

export const isIPAddress = (str: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(str)) return false;
  return str.split('.').every(part => Number.parseInt(part) <= 255);
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const isHexColor = (str: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
};

export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

export const isAlphabetic = (str: string): boolean => {
  return /^[a-zA-Z]+$/.test(str);
};

export const isNumeric = (str: string): boolean => {
  return /^\d+$/.test(str);
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isTruthy = (value: any): boolean => !!value;

export const isFalsy = (value: any): boolean => !value;

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isObject = (value: any): boolean => typeof value === 'object' && value !== null && !Array.isArray(value);

export const isArray = (value: any): boolean => Array.isArray(value);
