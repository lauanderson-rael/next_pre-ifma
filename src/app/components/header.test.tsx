import { render, fireEvent, waitFor } from '@testing-library/react';
import Header from './header';
import { api } from '@/app/services/api';

jest.mock('@/app/services/api');
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockApi = api as jest.Mocked<typeof api>;

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve mostrar loading inicialmente', () => {
    mockApi.get.mockReturnValue(new Promise(() => {})); // Promise que nunca resolve
    
    const { getByText } = render(<Header />);
    expect(getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve carregar dados do usuário com sucesso', async () => {
    mockApi.get.mockResolvedValue({
      data: { name: 'João Silva', current_streak: 5 }
    });

    const { getByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('Olá, João Silva')).toBeInTheDocument();
    });

    expect(mockApi.get).toHaveBeenCalledWith('/users/data');
  });

  it('deve tratar erro ao carregar dados', async () => {
    mockApi.get.mockRejectedValue(new Error('Erro de API'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('Carregando...')).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('deve mostrar nome padrão quando name é null/undefined', async () => {
    mockApi.get.mockResolvedValue({
      data: { name: null, current_streak: 3 }
    });

    const { getByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('Olá, Nome não informado')).toBeInTheDocument();
    });
  });

  it('deve abrir modal ao clicar no botão streak', async () => {
    mockApi.get.mockResolvedValue({
      data: { name: 'Maria', current_streak: 7 }
    });

    const { getByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('Olá, Maria')).toBeInTheDocument();
    });

    const streakButton = getByText('7').closest('button')!;
    fireEvent.click(streakButton);

    expect(getByText('O que é uma sequência 🔥?')).toBeInTheDocument();
    expect(getByText(/Uma sequência representa/)).toBeInTheDocument();
  });

  it('deve fechar modal ao clicar no X', async () => {
    mockApi.get.mockResolvedValue({
      data: { name: 'Pedro', current_streak: 2 }
    });

    const { getByText, queryByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('Olá, Pedro')).toBeInTheDocument();
    });

    // Abrir modal
    const streakButton = getByText('2').closest('button')!;
    fireEvent.click(streakButton);

    // Fechar modal
    const closeButton = getByText('×');
    fireEvent.click(closeButton);

    expect(queryByText('O que é uma sequência 🔥?')).not.toBeInTheDocument();
  });

  it('deve mostrar streak correta do usuário', async () => {
    mockApi.get.mockResolvedValue({
      data: { name: 'Ana', current_streak: 15 }
    });

    const { getByText } = render(<Header />);

    await waitFor(() => {
      expect(getByText('15')).toBeInTheDocument();
    });
  });

  it('deve ter link para perfil na imagem do usuário', () => {
    mockApi.get.mockResolvedValue({
      data: { name: 'Carlos', current_streak: 1 }
    });

    const { container } = render(<Header />);
    const profileLink = container.querySelector('a[href="/home/profile"]');
    
    expect(profileLink).toBeInTheDocument();
    expect(profileLink?.querySelector('img')).toHaveAttribute('src', '/user.png');
  });
});