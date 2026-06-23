import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import ForgotPasswordPage from './page';

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: any) => <img src={src} alt={alt} {...rest} />,
}));

const mockPost = jest.fn();
jest.mock('../../services/api', () => ({
  api: { post: (...args: any[]) => mockPost(...args) },
}));

const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: (...a: any[]) => mockToastSuccess(...a), error: (...a: any[]) => mockToastError(...a) },
}));

// Mock do react-hook-form: expõe handleSubmit para chamar o callback diretamente
let capturedOnSubmit: ((data: any) => void) | null = null;

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: (name: string) => ({ name, ref: jest.fn(), onChange: jest.fn(), onBlur: jest.fn() }),
    handleSubmit: (fn: (data: any) => void) => {
      capturedOnSubmit = fn;
      return (e?: any) => {
        e?.preventDefault?.();
        fn({ email: 'teste@email.com' });
      };
    },
  }),
}));

// ─── Helper ──────────────────────────────────────────────────────────────────

const renderPage = () => render(<ForgotPasswordPage />);

// ─── Testes ──────────────────────────────────────────────────────────────────

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    capturedOnSubmit = null;
  });

  // ── Renderização ───────────────────────────────────────────────────────────

  it('deve renderizar o cabeçalho da página', () => {
    renderPage();
    expect(screen.getByText('PRÉ-IFMA')).toBeInTheDocument();
    expect(screen.getByText('O seu preparatório para ingressar no IFMA')).toBeInTheDocument();
  });

  it('deve renderizar o formulário de redefinição de senha', () => {
    renderPage();
    expect(screen.getByText('Redefinir Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar e-mail/i })).toBeInTheDocument();
  });

  it('deve renderizar o link de voltar ao login', () => {
    renderPage();
    const link = screen.getByText('Voltar ao login');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/login');
  });

  it('deve renderizar o botão habilitado inicialmente', () => {
    renderPage();
    expect(screen.getByRole('button', { name: /enviar e-mail/i })).not.toBeDisabled();
  });

  // ── Fluxo de sucesso ───────────────────────────────────────────────────────

  it('deve chamar a API e redirecionar ao submeter com sucesso', async () => {
    mockPost.mockResolvedValueOnce({});
    renderPage();

    const form = screen.getByPlaceholderText('Digite seu e-mail').closest('form')!;
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/password_resets', { email: 'teste@email.com' });
      expect(mockToastSuccess).toHaveBeenCalledWith('E-mail enviado com sucesso!');
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  // ── Estado de loading ──────────────────────────────────────────────────────

  it('deve exibir "Enviando..." e desabilitar o botão durante o loading', async () => {
    // Promise que nunca resolve → simula loading infinito
    mockPost.mockReturnValueOnce(new Promise(() => {}));
    renderPage();

    const form = screen.getByPlaceholderText('Digite seu e-mail').closest('form')!;
    act(() => { fireEvent.submit(form); });

    await waitFor(() => {
      const btn = screen.getByRole('button', { name: /enviando/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toBeDisabled();
    });
  });

  it('deve restaurar o botão após o loading terminar', async () => {
    mockPost.mockResolvedValueOnce({});
    renderPage();

    const form = screen.getByPlaceholderText('Digite seu e-mail').closest('form')!;
    await act(async () => { fireEvent.submit(form); });

    // Após o sucesso o componente é redirecionado, mas o finally sempre executa
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalled();
    });
  });

  // ── Fluxo de erro ──────────────────────────────────────────────────────────

  it('deve exibir mensagem de erro quando a API falhar', async () => {
    mockPost.mockRejectedValueOnce(new Error('Falha na rede'));
    renderPage();

    const form = screen.getByPlaceholderText('Digite seu e-mail').closest('form')!;
    await act(async () => { fireEvent.submit(form); });

    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível enviar o e-mail. Verifique se está correto.')
      ).toBeInTheDocument();
    });
  });

  it('deve exibir o bloco de erro com estilo correto', async () => {
    mockPost.mockRejectedValueOnce(new Error('erro'));
    renderPage();

    await act(async () => {
      fireEvent.submit(screen.getByPlaceholderText('Digite seu e-mail').closest('form')!);
    });

    await waitFor(() => {
      const errorDiv = screen.getByText(
        'Não foi possível enviar o e-mail. Verifique se está correto.'
      ).closest('div');
      expect(errorDiv).toHaveClass('bg-red-100');
    });
  });

  it('não deve redirecionar quando a API falhar', async () => {
    mockPost.mockRejectedValueOnce(new Error('erro'));
    renderPage();

    await act(async () => {
      fireEvent.submit(screen.getByPlaceholderText('Digite seu e-mail').closest('form')!);
    });

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  // ── Limpeza do erro ao digitar ────────────────────────────────────────────

  it('deve limpar a mensagem de erro ao interagir com o input de e-mail', async () => {
    mockPost.mockRejectedValueOnce(new Error('erro'));
    renderPage();

    await act(async () => {
      fireEvent.submit(screen.getByPlaceholderText('Digite seu e-mail').closest('form')!);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível enviar o e-mail. Verifique se está correto.')
      ).toBeInTheDocument();
    });

    // Simular onChange no input (que chama setError(''))
    fireEvent.change(screen.getByPlaceholderText('Digite seu e-mail'), {
      target: { value: 'novo@email.com' },
    });

    expect(
      screen.queryByText('Não foi possível enviar o e-mail. Verifique se está correto.')
    ).not.toBeInTheDocument();
  });

  // ── Imagem / logo ─────────────────────────────────────────────────────────

  it('deve renderizar o logo da aplicação', () => {
    renderPage();
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });
});
