import { render } from '@testing-library/react';
import HeaderTitle from './headerTitle';
import { IoHome } from 'react-icons/io5';

// Mock do next/link necessário apenas para o HeaderTitle que possui navegação
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('HeaderTitle Component', () => {
  it('deve renderizar título e ícone', () => {
    const props = {
      title: 'Página de Teste',
      icon: <IoHome data-testid="header-icon" />,
      href: '/back'
    };

    const { getByText, getByTestId } = render(<HeaderTitle {...props} />);
    
    expect(getByText('Página de Teste')).toBeInTheDocument();
    expect(getByTestId('header-icon')).toBeInTheDocument();
  });

  it('deve criar link com href correto', () => {
    const { container } = render(
      <HeaderTitle title="Test" icon={<div />} href="/test-page" />
    );
    
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/test-page');
  });
});
