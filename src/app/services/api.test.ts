import axios from "axios";

jest.mock('axios', () => {
  const mockInterceptors = {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  };
  const mockInstance = {
    interceptors: mockInterceptors,
    defaults: { headers: {} },
    get: jest.fn(),
    post: jest.fn(),
  };
  return {
    create: jest.fn(() => mockInstance),
  };
});

describe('api service', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    delete (global as any).window;
  });

  it('deve criar instância axios com baseURL do env', () => {
    const axios = require('axios');
    require('@/app/services/api');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    });
  });

  it('deve registrar interceptor de request', () => {
    const { api } = require('@/app/services/api');
    expect(api.interceptors.request.use).toHaveBeenCalled();
  });

  it('interceptor adiciona token quando existe no localStorage', () => {
    (global as any).window = {};
    const mockGetItem = jest.fn().mockReturnValue('token-123');
    Object.defineProperty(window, 'localStorage', {
      value: { getItem: mockGetItem },
    });

    const { api } = require('@/app/services/api');
    const interceptorFn = (api.interceptors.request.use as jest.Mock).mock.calls[0][0];

    const config = { headers: {} };
    const result = interceptorFn(config);

    expect(mockGetItem).toHaveBeenCalledWith('preifma.token');
    expect(result.headers.Authorization).toBe('Bearer token-123');
  });

  it('interceptor não adiciona token quando não existe', () => {
    (global as any).window = {};
    const mockGetItem = jest.fn().mockReturnValue(null);
    Object.defineProperty(window, 'localStorage', {
      value: { getItem: mockGetItem },
    });

    const { api } = require('@/app/services/api');
    const interceptorFn = (api.interceptors.request.use as jest.Mock).mock.calls[0][0];

    const config = { headers: {} };
    interceptorFn(config);

    expect(config.headers.Authorization).toBeUndefined();
  });
});