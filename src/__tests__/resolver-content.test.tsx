import { render, fireEvent, waitFor } from '@testing-library/react';
import Content from '@/app/filters/resolver/content';
import { api } from '@/app/services/api';

const mockSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockSearchParams }),
}));

jest.mock('@/app/services/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock('react-hot-toast', () => {
  const toast = jest.fn();
  toast.success = jest.fn();
  toast.error = jest.fn();
  return { __esModule: true, default: toast };
});

const mockApi = api as jest.Mocked<typeof api>;

const mockQuestions = [
  {
    id: 1,
    title: 'Qual a capital do Brasil?',
    description: 'Descrição da questão',
    answers: [
      { id: 1, text: 'Brasília', correct: true },
      { id: 2, text: 'Rio de Janeiro', correct: false },
      { id: 3, text: 'São Paulo', correct: false },
    ],
  },
];

function setupDefaultParams(subject = 'matematica', year = '2024', type = 'integrado') {
  mockSearchParams.mockImplementation((key: string) => {
    if (key === 'subject') return subject;
    if (key === 'year') return year;
    if (key === 'type') return type;
    return null;
  });
}

function setupQuestions() {
  mockApi.get.mockResolvedValue({ data: { questions: mockQuestions } });
}

function renderContent() {
  return render(<Content />);
}

describe('Resolver Content', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.Audio = jest.fn().mockImplementation(() => ({ play: jest.fn() })) as unknown as typeof Audio;
    globalThis.fetch = jest.fn() as jest.Mock;
    setupDefaultParams();
  });

  describe('Estados de carregamento', () => {
    it('deve mostrar loading enquanto busca questoes', () => {
      mockApi.get.mockReturnValue(new Promise(() => {}));
      const { getByText } = renderContent();
      expect(getByText('Carregando questões...')).toBeInTheDocument();
      expect(getByText('Aguarde...')).toBeInTheDocument();
    });

    it('deve mostrar mensagem quando nao ha questoes', async () => {
      mockApi.get.mockResolvedValue({ data: { questions: [] } });
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Nenhuma questão encontrada para os filtros selecionados.')).toBeInTheDocument();
      });
    });
  });

  describe('Carregamento de questoes', () => {
    it('deve tratar erro ao carregar questoes', async () => {
      mockApi.get.mockRejectedValue(new Error('Erro de rede'));
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Nenhuma questão encontrada para os filtros selecionados.')).toBeInTheDocument();
      });
    });
  });

  describe('URI de requisicao', () => {
    it('deve carregar questoes para materia especifica', async () => {
      setupQuestions();
      renderContent();
      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalledWith(
          '/simulates/questions?q[subject_cont]=matematica&q[year_eq]=2024'
        );
      });
    });

    it('deve carregar questoes para simulado', async () => {
      setupDefaultParams('simulado');
      setupQuestions();
      renderContent();
      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalledWith('/simulates/questions');
      });
    });
  });

  describe('Titulos por materia', () => {
    beforeEach(() => {
      setupQuestions();
    });

    it.each([
      ['matematica', /Matemática/],
      ['portugues', /Português/],
      ['biologia', /simulado/],
    ])('deve mostrar titulo para subject=%s', async (subject, expected) => {
      setupDefaultParams(subject);
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText(expected)).toBeInTheDocument();
      });
    });
  });

  describe('Renderizacao principal', () => {
    beforeEach(() => {
      setupQuestions();
    });

    it('deve renderizar questao carregada', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Qual a capital do Brasil?')).toBeInTheDocument();
        expect(getByText('Descrição da questão')).toBeInTheDocument();
        expect(getByText(/Brasília/)).toBeInTheDocument();
        expect(getByText(/Rio de Janeiro/)).toBeInTheDocument();
        expect(getByText(/São Paulo/)).toBeInTheDocument();
      });
    });

    it('deve mostrar numeracao das respostas', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('a)')).toBeInTheDocument();
        expect(getByText('b)')).toBeInTheDocument();
        expect(getByText('c)')).toBeInTheDocument();
      });
    });

    it('deve mostrar navegacao com numero da questao', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('1 de 1')).toBeInTheDocument();
      });
    });

    it('deve renderizar imagens da questao', async () => {
      const questionsWithImages = [
        {
          ...mockQuestions[0],
          image_urls: ['https://imagem.com/img1.jpg', 'https://imagem.com/img2.jpg'],
        },
      ];
      mockApi.get.mockResolvedValue({ data: { questions: questionsWithImages } });

      const { container } = renderContent();
      await waitFor(() => {
        const images = container.querySelectorAll('img[alt="Imagem 0"], img[alt="Imagem 1"]');
        expect(images.length).toBe(2);
      });
    });

    it('deve desabilitar botoes de navegacao quando unica questao', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Anterior')).toBeDisabled();
        expect(getByText('Próxima')).toBeDisabled();
      });
    });

    it('deve habilitar navegacao com multiplas questoes', async () => {
      const multiplasQuestoes = [
        ...mockQuestions,
        { id: 2, title: 'Questão 2', description: 'Desc 2', answers: [{ id: 4, text: 'A', correct: true }] },
      ];
      mockApi.get.mockResolvedValue({ data: { questions: multiplasQuestoes } });

      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Anterior')).toBeDisabled();
        expect(getByText('Próxima')).not.toBeDisabled();
      });
    });
  });

  describe('Selecao de alternativa', () => {
    beforeEach(() => {
      setupQuestions();
    });

    it('deve selecionar alternativa ao clicar', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText(/Brasília/)).toBeInTheDocument();
      });

      const labelBrasilia = getByText(/Brasília/).closest('label')!;
      fireEvent.click(labelBrasilia);

      expect(labelBrasilia.className).toContain('bg-green-100');
    });

    it('deve aplicar estilo diferente para alternativa nao selecionada', async () => {
      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText(/Brasília/)).toBeInTheDocument();
      });

      const labelRio = getByText(/Rio de Janeiro/).closest('label')!;
      expect(labelRio.className).toContain('bg-white');
    });
  });

  describe('Responder questao', () => {
    beforeEach(() => {
      setupQuestions();
    });

    async function selecionarBrasiliaEresponder(container: ReturnType<typeof renderContent>) {
      const { getByText } = container;
      await waitFor(() => {
        expect(getByText(/Brasília/)).toBeInTheDocument();
      });
      fireEvent.click(getByText(/Brasília/).closest('label')!);
      fireEvent.click(getByText('Responder'));
    }

    it('deve responder questao corretamente', async () => {
      mockApi.post.mockResolvedValue({ data: { correct: true } });

      const view = renderContent();
      await selecionarBrasiliaEresponder(view);

      await waitFor(() => {
        expect(mockApi.post).toHaveBeenCalledWith('/simulates/answer', {
          question_id: 1,
          answer_id: 1,
        }, { headers: { 'Content-Type': 'application/json' } });
      });
    });

    it('deve mostrar toast de acerto', async () => {
      mockApi.post.mockResolvedValue({ data: { correct: true } });

      const view = renderContent();
      await selecionarBrasiliaEresponder(view);

      await waitFor(() => {
        expect(require('react-hot-toast').default.success).toHaveBeenCalledWith('Parabéns voce acertou!');
      });
    });

    it('deve mostrar toast de erro', async () => {
      mockApi.post.mockResolvedValue({ data: { correct: false } });

      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText(/Rio de Janeiro/)).toBeInTheDocument();
      });

      fireEvent.click(getByText(/Rio de Janeiro/).closest('label')!);
      fireEvent.click(getByText('Responder'));

      await waitFor(() => {
        expect(require('react-hot-toast').default.error).toHaveBeenCalledWith('Que pena, voce errou!');
      });
    });

    it('deve mostrar botao de explicacao com IA apos responder', async () => {
      mockApi.post.mockResolvedValue({ data: { correct: true } });

      const view = renderContent();
      const { getByText } = view;
      await selecionarBrasiliaEresponder(view);

      await waitFor(() => {
        expect(getByText('Ver explicação com IA')).not.toBeDisabled();
      });
    });
  });

  describe('Navegacao anterior/proxima', () => {
    it('deve navegar entre questoes', async () => {
      const multiplasQuestoes = [
        ...mockQuestions,
        { id: 2, title: 'Questão 2', description: 'Desc 2', answers: [{ id: 4, text: 'A', correct: true }] },
      ];
      mockApi.get.mockResolvedValue({ data: { questions: multiplasQuestoes } });

      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('1 de 2')).toBeInTheDocument();
      });

      expect(getByText('Anterior')).toBeDisabled();
      expect(getByText('Próxima')).not.toBeDisabled();

      fireEvent.click(getByText('Próxima'));
      expect(getByText('2 de 2')).toBeInTheDocument();
      expect(getByText('Anterior')).not.toBeDisabled();
      expect(getByText('Próxima')).toBeDisabled();

      fireEvent.click(getByText('Anterior'));
      expect(getByText('1 de 2')).toBeInTheDocument();
    });
  });

  describe('Explicacao com IA (Gemini)', () => {
    function setupGeminiMocks() {
      setupDefaultParams();
      mockApi.get
        .mockResolvedValueOnce({ data: { questions: mockQuestions } })
        .mockResolvedValueOnce({
          data: {
            answers: [
              { id: 1, text: 'Brasília', correct: true },
              { id: 2, text: 'Rio de Janeiro', correct: false },
            ],
          },
        });
      mockApi.post.mockResolvedValue({ data: { correct: true } });
    }

    async function responderEGemini(container: ReturnType<typeof renderContent>) {
      const { getByText } = container;
      await waitFor(() => {
        expect(getByText(/Brasília/)).toBeInTheDocument();
      });
      fireEvent.click(getByText(/Brasília/).closest('label')!);
      fireEvent.click(getByText('Responder'));
      await waitFor(() => {
        expect(getByText('Ver explicação com IA')).not.toBeDisabled();
      });
      fireEvent.click(getByText('Ver explicação com IA'));
    }

    it('deve carregar e mostrar explicacao da IA', async () => {
      setupGeminiMocks();
      globalThis.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ text: 'Brasília é a capital pois...' }),
      });

      const view = renderContent();
      const { getByText } = view;
      await responderEGemini(view);

      await waitFor(() => {
        expect(getByText('Brasília é a capital pois...')).toBeInTheDocument();
      });
    });

    it('deve mostrar loading enquanto gera explicacao', async () => {
      setupGeminiMocks();
      globalThis.fetch = jest.fn().mockReturnValue(new Promise(() => {}));

      const view = renderContent();
      const { getByText } = view;
      await responderEGemini(view);

      await waitFor(() => {
        expect(getByText('Gerando explicação...')).toBeInTheDocument();
      });
    });

    it('deve tratar erro na chamada da IA', async () => {
      setupGeminiMocks();
      globalThis.fetch = jest.fn().mockRejectedValue(new Error('Erro na API'));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const view = renderContent();
      await responderEGemini(view);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Navegacao e estados avancados', () => {
    it('deve limpar resposta ao navegar', async () => {
      const multiplasQuestoes = [
        ...mockQuestions,
        { id: 2, title: 'Questão 2', description: 'Desc 2', answers: [{ id: 4, text: 'A', correct: true }] },
      ];
      mockApi.get.mockResolvedValue({ data: { questions: multiplasQuestoes } });

      const { getByText } = renderContent();
      await waitFor(() => {
        expect(getByText('Qual a capital do Brasil?')).toBeInTheDocument();
      });

      const labelBrasilia = getByText(/Brasília/).closest('label')!;
      fireEvent.click(labelBrasilia);
      expect(labelBrasilia.className).toContain('bg-green-100');

      fireEvent.click(getByText('Próxima'));
      expect(getByText('2 de 2')).toBeInTheDocument();

      fireEvent.click(getByText('Anterior'));
      expect(getByText('1 de 2')).toBeInTheDocument();

      const labelReRenderizada = getByText(/Brasília/).closest('label')!;
      expect(labelReRenderizada.className).not.toContain('bg-green-100');
    });
  });
});
