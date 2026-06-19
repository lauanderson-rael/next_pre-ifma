import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './page';

const mockPush = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  AuthContext: React.createContext({ signIn: jest.fn(), isAuthenticated: false }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: Object.assign(jest.fn(), { success: jest.fn(), error: jest.fn() }),
}));

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

function getMockSignIn() {
  const { AuthContext } = jest.requireMock('../../contexts/AuthContext');
  return (AuthContext as any)._currentValue.signIn;
}

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o titulo', () => {
    const { getByText } = render(<LoginPage />);
    expect(getByText('PRÉ-IFMA')).toBeInTheDocument();
    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('deve renderizar campos de email e senha', () => {
    const { getByPlaceholderText } = render(<LoginPage />);
    expect(getByPlaceholderText('Digite seu e-mail')).toBeInTheDocument();
    expect(getByPlaceholderText('Digite sua senha')).toBeInTheDocument();
  });

  it('deve ter link para cadastro', () => {
    const { getByText } = render(<LoginPage />);
    const link = getByText('Cadastre-se').closest('a');
    expect(link).toHaveAttribute('href', '/register');
  });

  it('deve ter link para esqueceu senha', () => {
    const { getByText } = render(<LoginPage />);
    const link = getByText('Esqueceu-se da senha').closest('a');
    expect(link).toHaveAttribute('href', '/forgot-password');
  });

  it('deve ter botao de acessar', () => {
    const { getByRole } = render(<LoginPage />);
    expect(getByRole('button', { name: /acessar/i })).toBeInTheDocument();
  });

  it('deve mostrar erro quando login falha', async () => {
    getMockSignIn().mockRejectedValue(new Error('Credenciais inválidas'));

    const { getByText, getByRole, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: 'errada' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(getByText('Erro no login. Verifique suas credenciais.')).toBeInTheDocument();
    });
  });

  it('deve chamar signIn com dados do formulario', async () => {
    getMockSignIn().mockResolvedValue(undefined);

    const { getByRole, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'user@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: '123456' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(getMockSignIn()).toHaveBeenCalled();
    });
  });

  it('deve mostrar toast de sucesso ao logar', async () => {
    const toast = require('react-hot-toast').default;
    getMockSignIn().mockResolvedValue(undefined);

    const { getByRole, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'user@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: '123456' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login realizado com sucesso!');
    });
  });

  it('deve mostrar loading durante o login', async () => {
    getMockSignIn().mockReturnValue(new Promise(() => {}));

    const { getByRole, getByPlaceholderText, getByText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'user@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: '123456' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(getByText('Carregando...')).toBeInTheDocument();
    });
  });

  it('deve desabilitar botao durante loading', async () => {
    getMockSignIn().mockReturnValue(new Promise(() => {}));

    const { getByRole, getByPlaceholderText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'user@email.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: '123456' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(getByRole('button', { name: /carregando/i })).toBeDisabled();
    });
  });

  it('deve limpar erro ao digitar', async () => {
    getMockSignIn().mockRejectedValue(new Error('erro'));

    const { getByText, getByRole, getByPlaceholderText, queryByText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'teste@teste.com' } });
    fireEvent.change(getByPlaceholderText('Digite sua senha'), { target: { value: 'errada' } });
    fireEvent.click(getByRole('button', { name: /acessar/i }));

    await waitFor(() => {
      expect(getByText('Erro no login. Verifique suas credenciais.')).toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), { target: { value: 'outro@email.com' } });

    expect(queryByText('Erro no login. Verifique suas credenciais.')).not.toBeInTheDocument();
  });

  it('deve redirecionar para home se ja autenticado', () => {
    const { AuthContext } = jest.requireMock('../../contexts/AuthContext');
    (AuthContext as any)._currentValue = { signIn: getMockSignIn(), isAuthenticated: true };

    render(<LoginPage />);

    expect(mockPush).toHaveBeenCalledWith('/home');
  });
});
