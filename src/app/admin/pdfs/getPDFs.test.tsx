import { render, waitFor } from '@testing-library/react';
import PDFList from './getPDFs';

const mockGet = jest.fn();

jest.mock('@/app/services/api', () => ({
  api: {
    get: (...args: any[]) => mockGet(...args),
  },
}));

describe('PDFList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve mostrar loading inicialmente', () => {
    mockGet.mockReturnValue(new Promise(() => {}));

    const { getByText } = render(<PDFList />);
    expect(getByText('Carregando PDFs...')).toBeInTheDocument();
  });

  it('deve mostrar erro quando a requisição falha', async () => {
    mockGet.mockRejectedValue({
      response: { data: { error: 'Erro de conexão' } },
    });

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      expect(getByText('Erro de conexão')).toBeInTheDocument();
    });
  });

  it('deve mostrar erro genérico quando não há mensagem do servidor', async () => {
    mockGet.mockRejectedValue(new Error('Network Error'));

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      expect(getByText('Erro ao buscar PDFs')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem quando não há PDFs', async () => {
    mockGet.mockResolvedValue({ data: [] });

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      expect(getByText('Nenhum PDF encontrado.')).toBeInTheDocument();
    });
  });

  it('deve renderizar lista de PDFs', async () => {
    const pdfs = [
      {
        id: 1,
        title: 'Matemática',
        year: 2024,
        type_pdf: 'Prova',
        url_jig: 'https://exemplo.com/gabarito',
        url_exam: 'https://exemplo.com/prova',
      },
      {
        id: 2,
        title: 'Português',
        year: 2023,
        type_pdf: 'Gabarito',
        url_jig: 'https://exemplo.com/gabarito2',
        url_exam: 'https://exemplo.com/prova2',
      },
    ];

    mockGet.mockResolvedValue({ data: pdfs });

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      expect(getByText('Matemática - 2024')).toBeInTheDocument();
      expect(getByText('Português - 2023')).toBeInTheDocument();
      expect(getByText('Lista de PDFs enviados (2)')).toBeInTheDocument();
    });
  });

  it('deve renderizar links com href correto', async () => {
    const pdfs = [
      {
        id: 1,
        title: 'Matemática',
        year: 2024,
        type_pdf: 'Prova',
        url_jig: 'https://exemplo.com/gabarito',
        url_exam: 'https://exemplo.com/prova',
      },
    ];

    mockGet.mockResolvedValue({ data: pdfs });

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      const examLink = getByText('Visualizar prova').closest('a');
      expect(examLink).toHaveAttribute('href', 'https://exemplo.com/prova');

      const jigLink = getByText('Visualizar gabarito (JIG)').closest('a');
      expect(jigLink).toHaveAttribute('href', 'https://exemplo.com/gabarito');
    });
  });

  it('deve tratar data como array vazio quando res.data é undefined', async () => {
    mockGet.mockResolvedValue({});

    const { getByText } = render(<PDFList />);
    await waitFor(() => {
      expect(getByText('Nenhum PDF encontrado.')).toBeInTheDocument();
    });
  });
});
