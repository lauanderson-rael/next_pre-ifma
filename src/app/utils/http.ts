// Utilitários para API e requisições
export const buildQueryString = (params: Record<string, any>): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
};

export const parseQueryString = (queryString: string): Record<string, string> => {
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const params: Record<string, string> = {};
  query.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
  });
  return params;
};

export const buildURL = (baseURL: string, path: string, params?: Record<string, any>): string => {
  let url = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
  url += path.startsWith('/') ? path.slice(1) : path;
  if (params) {
    url += buildQueryString(params);
  }
  return url;
};

export const isSuccessStatus = (status: number): boolean => status >= 200 && status < 300;

export const isClientError = (status: number): boolean => status >= 400 && status < 500;

export const isServerError = (status: number): boolean => status >= 500 && status < 600;

export const getStatusMessage = (status: number): string => {
  const messages: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  };
  return messages[status] || 'Unknown Status';
};

export const setHeader = (headers: Record<string, string>, key: string, value: string): Record<string, string> => {
  return { ...headers, [key]: value };
};

export const removeHeader = (headers: Record<string, string>, key: string): Record<string, string> => {
  const { [key]: _, ...rest } = headers;
  return rest;
};

export const addAuthHeader = (headers: Record<string, string>, token: string): Record<string, string> => {
  return setHeader(headers, 'Authorization', `Bearer ${token}`);
};

export const addContentType = (headers: Record<string, string>, contentType: string): Record<string, string> => {
  return setHeader(headers, 'Content-Type', contentType);
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const stringifyJSON = (obj: any, pretty: boolean = false): string => {
  return JSON.stringify(obj, null, pretty ? 2 : 0);
};
