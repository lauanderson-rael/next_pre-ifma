import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from './page';
import { api } from '@/app/services/api';

jest.mock('@/app/services/api', () => ({
  api: {
    post: jest.fn(),
  },
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockApi = api as jest.Mocked<typeof api>;

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o titulo', () => {
    const { getByText, getByRole } = render(<RegisterPage />);
    expect(getByText('PRÉ-IFMA')).toBeInTheDocument();
    expect(getByRole('heading', { name: /criar conta/i })).toBeInTheDocument();
  });

  it('deve renderizar todos os campos do formulario', () => {
    const { getByPlaceholderText } = render(<RegisterPage />);
    expect(getByPlaceholderText('Digite seu nome completo')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
    expect(getByPlaceholderText('Repita sua senha')).toBeInTheDocument();
  });

  it('deve ter link para pagina de login', () => {
    const { getByText } = render(<RegisterPage />);
    const link = getByText('Faça o login').closest('a');
    expect(link).toHaveAttribute('href', '/login');
  });

  it('deve mostrar erro quando senhas nao coincidem', async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<RegisterPage />);

    const nameInput = getByPlaceholderText('Digite seu nome completo');
    const emailInput = getByPlaceholderText('Digite seu e-mail');
    const passwordInput = getByPlaceholderText('Digite sua senha');
    const confirmInput = getByPlaceholderText('Repita sua senha');

    fireEvent.change(nameInput, { target: { value: 'João' } });
    fireEvent.change(emailInput, { target: { value: 'joao@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmInput, { target: { value: 'senha456' } });

    fireEvent.click(getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(getByText('As senhas não coincidem')).toBeInTheDocument();
    });
  });

  it('deve cadastrar usuario com sucesso', async () => {
    mockApi.post.mockResolvedValue({ status: 201 });

    const { getByText, getByPlaceholderText, getByRole } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText('Digite seu nome completo'), { target: { value: 'João' } });
    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'joao@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: 'senha123' } });
    fireEvent.change(getByPlaceholderText('Repita sua senha'), { target: { value: 'senha123' } });

    fireEvent.click(getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(getByText('Usuário cadastrado com sucesso!')).toBeInTheDocument();
    });

    expect(mockApi.post).toHaveBeenCalledWith('/users/register', expect.any(Object));
  });

  it('deve mostrar erro quando cadastro falha', async () => {
    mockApi.post.mockRejectedValue(new Error('Email já cadastrado'));

    const { getByText, getByPlaceholderText, getByRole } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText('Digite seu nome completo'), { target: { value: 'João' } });
    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'joao@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: 'senha123' } });
    fireEvent.change(getByPlaceholderText('Repita sua senha'), { target: { value: 'senha123' } });

    fireEvent.click(getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(getByText('Email já cadastrado')).toBeInTheDocument();
    });
  });

  it('deve mostrar mensagem padrao quando erro nao tem mensagem', async () => {
    mockApi.post.mockRejectedValue({});

    const { getByText, getByPlaceholderText, getByRole } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText('Digite seu nome completo'), { target: { value: 'João' } });
    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'joao@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: 'senha123' } });
    fireEvent.change(getByPlaceholderText('Repita sua senha'), { target: { value: 'senha123' } });

    fireEvent.click(getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(getByText('Erro inesperado')).toBeInTheDocument();
    });
  });

  it('deve limpar erro ao digitar senha', async () => {
    const { getByText, getByPlaceholderText, getByRole, queryByText } = render(<RegisterPage />);

    const nameInput = getByPlaceholderText('Digite seu nome completo');
    const emailInput = getByPlaceholderText('Digite seu e-mail');
    const passwordInput = getByPlaceholderText('Digite sua senha');
    const confirmInput = getByPlaceholderText('Repita sua senha');

    fireEvent.change(nameInput, { target: { value: 'João' } });
    fireEvent.change(emailInput, { target: { value: 'joao@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmInput, { target: { value: 'senha456' } });

    fireEvent.click(getByRole('button', { name: /criar conta/i }));

    await waitFor(() => {
      expect(getByText('As senhas não coincidem')).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'nova' } });

    expect(queryByText('As senhas não coincidem')).not.toBeInTheDocument();
  });
});
