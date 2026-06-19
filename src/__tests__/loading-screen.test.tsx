import { render } from '@testing-library/react';
import LoadingScreen from '@/app/filters/simulate/components/LoadingScreen';

jest.mock('@/app/components/headerTitle', () => {
  return ({ title, href, icon }: any) => (
    <header>
      <a href={href}>{icon}</a>
      <div>{title}</div>
    </header>
  );
});

describe('LoadingScreen', () => {
  const defaultProps = {
    title: 'Carregando',
    message: 'Carregando questões...'
  };

  it('deve renderizar componente de loading', () => {
    const { getByText } = render(<LoadingScreen {...defaultProps} />);
    expect(getByText('Carregando questões...')).toBeInTheDocument();
    expect(getByText('Carregando')).toBeInTheDocument();
  });

  it('deve renderizar com propriedades customizadas', () => {
    const customProps = {
      title: 'Título Custom',
      message: 'Mensagem Custom'
    };
    
    const { getByText } = render(<LoadingScreen {...customProps} />);
    expect(getByText('Mensagem Custom')).toBeInTheDocument();
    expect(getByText('Título Custom')).toBeInTheDocument();
  });

  it('deve ter classes CSS corretas no texto', () => {
    const { getByText } = render(<LoadingScreen {...defaultProps} />);
    const messageElement = getByText('Carregando questões...');
    
    expect(messageElement).toHaveClass('text-center');
    expect(messageElement).toHaveClass('text-xl');
    expect(messageElement).toHaveClass('animate-bounce');
  });
});