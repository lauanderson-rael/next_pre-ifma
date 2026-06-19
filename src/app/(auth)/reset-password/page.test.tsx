import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPasswordPage from './page';
import { api } from '@/app/services/api';

jest.mock('@/app/services/api', () => ({
  api: {
    patch: jest.fn(),
  },
}));

const mockSearchParamsGet = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockSearchParamsGet }),
}));

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

const mockApi = api as jest.Mocked<typeof api>;

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParamsGet.mockReturnValue('valid-token-123');
  });

  it('deve renderizar o titulo', () => {
    const { getByText } = render(<ResetPasswordPage />);
    expect(getByText('PRÉ-IFMA')).toBeInTheDocument();
    expect(getByText('Redefina sua Senha')).toBeInTheDocument();
  });

  it('deve renderizar campos de senha', () => {
    const { getByPlaceholderText } = render(<ResetPasswordPage />);
    expect(getByPlaceholderText('Nova senha')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirme a nova senha')).toBeInTheDocument();
  });

  it('deve ter botao de redefinir senha', () => {
    const { getByRole } = render(<ResetPasswordPage />);
    expect(getByRole('button', { name: /redefinir senha/i })).toBeInTheDocument();
  });

  it('deve mostrar erro quando senhas nao coincidem', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<ResetPasswordPage />);

    const senhaInput = getByPlaceholderText('Nova senha');
    const confirmInput = getByPlaceholderText('Confirme a nova senha');

    fireEvent.change(senhaInput, { target: { value: 'senha123' } });
    fireEvent.change(confirmInput, { target: { value: 'senha456' } });

    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('As senhas não coincidem')).toBeInTheDocument();
    });
  });

  it('deve redefinir senha com sucesso', async () => {
    mockApi.patch.mockResolvedValue({ status: 200 });

    const { getByText, getByRole, getByPlaceholderText } = render(<ResetPasswordPage />);

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'nova123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'nova123' } });

    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('Senha redefinida com sucesso!')).toBeInTheDocument();
    });

    expect(mockApi.patch).toHaveBeenCalledWith('password_resets/valid-token-123', {
      password: expect.any(String),
      password_confirmation: expect.any(String),
    });
  });

  it('deve mostrar erro quando redefinicao falha', async () => {
    mockApi.patch.mockRejectedValue({ response: { data: { message: 'Token inválido' } } });

    const { getByText, getByRole, getByPlaceholderText } = render(<ResetPasswordPage />);

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'nova123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'nova123' } });

    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('Token inválido')).toBeInTheDocument();
    });
  });

  it('deve tratar resposta sem status 200', async () => {
    mockApi.patch.mockResolvedValue({ status: 400 });

    const { getByText, getByRole, getByPlaceholderText } = render(<ResetPasswordPage />);

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'nova123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'nova123' } });

    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(mockApi.patch).toHaveBeenCalled();
    });

    expect(getByText('Redefina sua Senha')).toBeInTheDocument();
    expect(getByText('Redefinir Senha')).toBeInTheDocument();
  });

  it('deve mostrar mensagem padrao quando erro nao tem response', async () => {
    mockApi.patch.mockRejectedValue(new Error('Rede indisponivel'));

    const { getByText, getByRole, getByPlaceholderText } = render(<ResetPasswordPage />);

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'nova123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'nova123' } });

    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('Erro ao redefinir senha')).toBeInTheDocument();
    });
  });

  it('deve usar token dos search params', () => {
    mockSearchParamsGet.mockReturnValue('meu-token');

    render(<ResetPasswordPage />);

    expect(mockSearchParamsGet).toHaveBeenCalledWith('token');
  });

  it('deve limpar erro ao reenviar com dados validos', async () => {
    mockApi.patch.mockResolvedValue({ status: 200 });

    const { getByText, getByRole, getByPlaceholderText, queryByText } = render(<ResetPasswordPage />);

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'senha123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'senha456' } });
    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('As senhas não coincidem')).toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('Nova senha'), { target: { value: 'nova123' } });
    fireEvent.change(getByPlaceholderText('Confirme a nova senha'), { target: { value: 'nova123' } });
    fireEvent.click(getByRole('button', { name: /redefinir senha/i }));

    await waitFor(() => {
      expect(getByText('Senha redefinida com sucesso!')).toBeInTheDocument();
    });

    expect(queryByText('As senhas não coincidem')).not.toBeInTheDocument();
  });
});
