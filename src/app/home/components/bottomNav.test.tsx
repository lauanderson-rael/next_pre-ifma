import { render } from '@testing-library/react';
import BottomNav from './bottomNav';

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname()
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('BottomNav Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve destacar item Home quando pathname é /home', () => {
    mockUsePathname.mockReturnValue('/home');
    const { getByText } = render(<BottomNav />);
    
    const homeItem = getByText('Início').closest('div');
    expect(homeItem).toHaveClass('bg-black/60');
  });

  it('deve destacar item Provas quando pathname é /home/provas', () => {
    mockUsePathname.mockReturnValue('/home/provas');
    const { getByText } = render(<BottomNav />);
    
    const provasItem = getByText('Provas').closest('div');
    expect(provasItem).toHaveClass('bg-black/60');
    
    const homeItem = getByText('Início').closest('div');
    expect(homeItem).toHaveClass('text-white');
    expect(homeItem).not.toHaveClass('bg-black/60');
  });

  it('deve destacar item Ranking quando pathname é /home/ranking', () => {
    mockUsePathname.mockReturnValue('/home/ranking');
    const { getByText } = render(<BottomNav />);
    
    const rankingItem = getByText('Ranking').closest('div');
    expect(rankingItem).toHaveClass('bg-black/60');
  });

  it('deve destacar item Perfil quando pathname é /home/profile', () => {
    mockUsePathname.mockReturnValue('/home/profile');
    const { getByText } = render(<BottomNav />);
    
    const perfilItem = getByText('Perfil').closest('div');
    expect(perfilItem).toHaveClass('bg-black/60');
  });

  it('deve renderizar todos os links com hrefs corretos', () => {
    mockUsePathname.mockReturnValue('/home');
    const { container } = render(<BottomNav />);
    
    const links = container.querySelectorAll('a');
    const hrefs = Array.from(links).map(link => link.getAttribute('href'));
    
    expect(hrefs).toContain('/home');
    expect(hrefs).toContain('/home/provas');
    expect(hrefs).toContain('/home/ranking');
    expect(hrefs).toContain('/home/profile');
  });
});