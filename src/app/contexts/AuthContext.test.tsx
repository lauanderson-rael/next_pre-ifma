import { render, act, waitFor } from '@testing-library/react';
import { AuthContext, AuthProvider } from './AuthContext';
import { useContext } from 'react';
import '@testing-library/jest-dom'; // Garante os matchers como toHaveTextContent

// 1. Cria um mock completo do localStorage 
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value.toString(); }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

// 2. Define o mock globalmente antes de qualquer teste iniciar
Object.defineProperty(global, 'localStorage', { value: localStorageMock });
// Sincroniza com o objeto window do ambiente JSDOM sem quebrá-lo
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush })
}));

global.fetch = jest.fn();

const TestComponent = () => {
  const { user, isAuthenticated, signIn, logout } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="user">{user?.name || 'null'}</span>
      <button onClick={() => signIn({ email: 'test@test.com', password: '123' })}>Sign In</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Limpa os dados gravados de forma segura
  });

  it('deve inicializar sem usuário', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('authenticated')).toHaveTextContent('false');
    expect(getByTestId('user')).toHaveTextContent('null');
  });

  it('deve restaurar usuário do localStorage', () => {
    const userData = JSON.stringify({ name: 'João', email: 'joao@test.com', current_streak: 5 });
    
    // Altera apenas a implementação do mock já existente, sem destruir o objeto
    (localStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'preifma.token') return 'token-123';
      if (key === 'preifma.user') return userData;
      return null;
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('authenticated')).toHaveTextContent('true');
    expect(getByTestId('user')).toHaveTextContent('João');
  });

  it('deve fazer login com sucesso', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'new-token',
        name: 'Maria',
        email: 'maria@test.com',
        current_streak: 3
      })
    } as Response);

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      getByText('Sign In').click();
    });

    await waitFor(() => {
      expect(getByTestId('authenticated')).toHaveTextContent('true');
      expect(getByTestId('user')).toHaveTextContent('Maria');
    });

    expect(mockPush).toHaveBeenCalledWith('/home');
    expect(localStorage.setItem).toHaveBeenCalledWith('preifma.token', 'new-token');
  });

 it('deve tratar erro de login', async () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  mockFetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Credenciais inválidas' }),
  } as Response);

  const TestErrorComponent = () => {
    const { signIn } = useContext(AuthContext);

    return (
      <button
        onClick={async () => {
          try {
            await signIn({ email: 'test@test.com', password: '123' });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro desconhecido';
            document.body.dataset.error = message;
          }
        }}
      >
        Sign In
      </button>
    );
  };

  const { getByText } = render(
    <AuthProvider>
      <TestErrorComponent />
    </AuthProvider>
  );

  await act(async () => {
    getByText('Sign In').click();
  });

  await waitFor(() => {
    expect(document.body.dataset.error).toBe('Credenciais inválidas');
  });

  expect(mockPush).not.toHaveBeenCalled();
  expect(localStorage.setItem).not.toHaveBeenCalledWith('preifma.token', expect.any(String));
});

  it('deve fazer logout', async () => {
    (localStorage.getItem as jest.Mock).mockImplementation(() => 'token-123');

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      getByText('Logout').click();
    });

    expect(getByTestId('authenticated')).toHaveTextContent('false');
    expect(localStorage.removeItem).toHaveBeenCalledWith('preifma.token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('preifma.user');
  });

  it('deve tratar erro ao fazer parse dos dados do usuário', () => {
    (localStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'preifma.token') return 'token-123';
      if (key === 'preifma.user') return 'invalid-json';
      return null;
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith('Error parsing user data', expect.any(SyntaxError));
    consoleSpy.mockRestore();
  });
});
