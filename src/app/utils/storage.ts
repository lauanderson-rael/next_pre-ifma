// Funções utilitárias de cache e storage
export const setCache = (key: string, value: any, expirationMinutes: number = 60): void => {
  const expirationTime = Date.now() + expirationMinutes * 60000;
  const data = { value, expirationTime };
  localStorage.setItem(`cache_${key}`, JSON.stringify(data));
};

export const getCache = (key: string): any | null => {
  const cached = localStorage.getItem(`cache_${key}`);
  if (!cached) return null;

  try {
    const data = JSON.parse(cached);
    if (Date.now() > data.expirationTime) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    return data.value;
  } catch {
    return null;
  }
};

export const clearCache = (key?: string): void => {
  if (key) {
    localStorage.removeItem(`cache_${key}`);
  } else {
    const keys = Object.keys(localStorage);
    keys.forEach(k => {
      if (k.startsWith('cache_')) {
        localStorage.removeItem(k);
      }
    });
  }
};

export const isCacheExpired = (key: string): boolean => {
  const cached = localStorage.getItem(`cache_${key}`);
  if (!cached) return true;

  try {
    const data = JSON.parse(cached);
    return Date.now() > data.expirationTime;
  } catch {
    return true;
  }
};

// Funções para tratamento de erros
export const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  return 'Erro desconhecido';
};

export const isNetworkError = (error: any): boolean => {
  if (!error) return false;
  return (
    error.message === 'Network Error' ||
    error.code === 'ENOTFOUND' ||
    error.code === 'ECONNREFUSED' ||
    !error.response
  );
};

export const isValidationError = (error: any): boolean => {
  return error?.response?.status === 400;
};

export const isUnauthorizedError = (error: any): boolean => {
  return error?.response?.status === 401;
};
