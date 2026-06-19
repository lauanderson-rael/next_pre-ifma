// Utilitários de localização e internacionalização
export const getLocale = (): string => {
  if (typeof window !== 'undefined') {
    return window.navigator.language || 'en-US';
  }
  return 'en-US';
};

export const formatCurrency = (amount: number, currency: string = 'USD', locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

export const formatNumber = (num: number, locale: string = 'en-US', decimals?: number): string => {
  return num.toLocaleString(locale, decimals !== undefined ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals } : {});
};

export const formatDate = (date: Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleDateString(locale, options);
};

export const formatTime = (date: Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleTimeString(locale, options);
};

export const formatDateTime = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleString(locale);
};

// Utilitários de limites e paginação
export const calculatePages = (total: number, pageSize: number): number => {
  return Math.ceil(total / pageSize);
};

export const getPaginationRange = (currentPage: number, totalPages: number, range: number = 5): (number | string)[] => {
  const pages: (number | string)[] = [];
  const start = Math.max(1, currentPage - Math.floor(range / 2));
  const end = Math.min(totalPages, start + range - 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};

export const getOffset = (page: number, pageSize: number): number => {
  return (page - 1) * pageSize;
};

export const getPageFromOffset = (offset: number, pageSize: number): number => {
  return Math.floor(offset / pageSize) + 1;
};

// Utilitários de URL e navegação
export const parseURL = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export const getQueryParam = (url: string, param: string): string | null => {
  const parsed = parseURL(url);
  return parsed ? parsed.searchParams.get(param) : null;
};

export const setQueryParam = (url: string, param: string, value: string): string => {
  const parsed = parseURL(url);
  if (!parsed) return url;
  parsed.searchParams.set(param, value);
  return parsed.toString();
};

export const removeQueryParam = (url: string, param: string): string => {
  const parsed = parseURL(url);
  if (!parsed) return url;
  parsed.searchParams.delete(param);
  return parsed.toString();
};

export const getPathname = (url: string): string | null => {
  const parsed = parseURL(url);
  return parsed ? parsed.pathname : null;
};

export const getHostname = (url: string): string | null => {
  const parsed = parseURL(url);
  return parsed ? parsed.hostname : null;
};
