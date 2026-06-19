import { render } from '@testing-library/react';
import Sidebar from '@/app/home/components/sidebar';
import TopTitle from '@/app/home/components/topTitle';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname()
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os itens do menu', () => {
    mockUsePathname.mockReturnValue('/home');
    const { getByText } = render(<Sidebar />);
    
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Início')).toBeInTheDocument();
    expect(getByText('Provas')).toBeInTheDocument();
    expect(getByText('Ranking')).toBeInTheDocument();
    expect(getByText('Perfil')).toBeInTheDocument();
  });

  it('deve destacar item ativo baseado no pathname', () => {
    mockUsePathname.mockReturnValue('/home/provas');
    const { getByText } = render(<Sidebar />);
    
    const provasItem = getByText('Provas').closest('div');
    expect(provasItem).toHaveClass('bg-black/50');
    expect(provasItem).toHaveClass('font-semibold');
  });

  it('deve renderizar links com hrefs corretos', () => {
    mockUsePathname.mockReturnValue('/home');
    const { container } = render(<Sidebar />);
    
    const links = container.querySelectorAll('a');
    const hrefs = Array.from(links).map(link => link.getAttribute('href'));
    
    expect(hrefs).toContain('/home');
    expect(hrefs).toContain('/home/provas');
    expect(hrefs).toContain('/home/ranking');
    expect(hrefs).toContain('/home/profile');
  });
});

describe('TopTitle', () => {
  it('deve renderizar título simples', () => {
    const { getByText } = render(<TopTitle title="Título Teste" />);
    expect(getByText('Título Teste')).toBeInTheDocument();
  });

  it('deve renderizar título com children', () => {
    const { getByText } = render(
      <TopTitle title="Título Principal">
        <span>Subtítulo</span>
      </TopTitle>
    );
    
    expect(getByText('Título Principal')).toBeInTheDocument();
    expect(getByText('Subtítulo')).toBeInTheDocument();
  });

  it('não deve renderizar children quando não fornecido', () => {
    const { container, getByText } = render(<TopTitle title="Só Título" />);
    
    expect(getByText('Só Título')).toBeInTheDocument();
    expect(container.querySelector('.text-gray-300')).not.toBeInTheDocument();
  });
});