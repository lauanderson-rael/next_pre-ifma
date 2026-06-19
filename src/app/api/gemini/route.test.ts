jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: { status?: number }) => ({
      status: init?.status || 200,
      json: async () => body,
    }),
  },
}));

const mockGenerateContent = jest.fn();

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: mockGenerateContent,
    }),
  })),
}));

function createRequest(body: any) {
  return {
    json: jest.fn().mockResolvedValue(body),
  };
}

function createInvalidJsonRequest() {
  return {
    json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
  };
}

describe('Gemini API Route', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.GOOGLE_API_KEY = 'test-api-key';
    jest.clearAllMocks();
  });

  it('deve retornar 400 quando o body é inválido', async () => {
    const { POST } = require('@/app/api/gemini/route');
    const req = createInvalidJsonRequest();

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('Body da requisição inválido ou vazio.');
  });

  it('deve retornar 400 quando o prompt está vazio', async () => {
    const { POST } = require('@/app/api/gemini/route');
    const req = createRequest({ prompt: '' });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('O prompt é obrigatório!');
  });

  it('deve retornar 400 quando o prompt não é enviado', async () => {
    const { POST } = require('@/app/api/gemini/route');
    const req = createRequest({});

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.message).toBe('O prompt é obrigatório!');
  });

  it('deve retornar texto gerado com sucesso', async () => {
    mockGenerateContent.mockResolvedValue({
      response: {
        text: jest.fn().mockReturnValue('Texto gerado pelo Gemini'),
      },
    });

    const { POST } = require('@/app/api/gemini/route');
    const req = createRequest({ prompt: 'Explique JavaScript' });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.text).toBe('Texto gerado pelo Gemini');
  });

  it('deve retornar 500 quando a API do Gemini falha', async () => {
    mockGenerateContent.mockRejectedValue(new Error('API Key inválida'));

    const { POST } = require('@/app/api/gemini/route');
    const req = createRequest({ prompt: 'Teste' });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.message).toBe('Erro ao gerar texto com o Gemini');
    expect(data.error).toBe('API Key inválida');
  });

  it('deve lançar erro se GOOGLE_API_KEY não está definida', () => {
    delete process.env.GOOGLE_API_KEY;

    expect(() => {
      require('@/app/api/gemini/route');
    }).toThrow('GOOGLE_API_KEY não definida no .env');
  });
});
