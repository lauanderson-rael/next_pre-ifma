import { render } from '@testing-library/react';
import CardInfo from '@/app/home/components/cardInfo';
import Option from '@/app/home/components/option';
import { IoHome } from 'react-icons/io5';

describe('Home Components', () => {
  describe('CardInfo', () => {
    it('deve renderizar com props corretas', () => {
      const props = {
        title: 'Questões Resolvidas',
        bgColor: '#22c55e',
        qtd: 42,
        icon: <IoHome data-testid="card-icon" />
      };

      const { getByText, getByTestId } = render(<CardInfo {...props} />);
      
      expect(getByText('Questões Resolvidas')).toBeInTheDocument();
      expect(getByText('42')).toBeInTheDocument();
      expect(getByTestId('card-icon')).toBeInTheDocument();
    });

    it('deve aplicar cor de fundo correta', () => {
      const { container } = render(
        <CardInfo title="Test" bgColor="#ff0000" qtd={5} icon={<div />} />
      );
      
      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });
  });

  describe('Option', () => {
    it('deve renderizar nome e ícone', () => {
      const props = {
        name: 'Matemática',
        bgColor: '#3b82f6',
        icon: <IoHome data-testid="option-icon" />
      };

      const { getByText, getByTestId } = render(<Option {...props} />);
      
      expect(getByText('Matemática')).toBeInTheDocument();
      expect(getByTestId('option-icon')).toBeInTheDocument();
    });

    it('deve aplicar cor de fundo correta', () => {
      const { container } = render(
        <Option name="Test" bgColor="#00ff00" icon={<div />} />
      );
      
      const optionDiv = container.firstChild as HTMLElement;
      expect(optionDiv.style.backgroundColor).toBe('rgb(0, 255, 0)');
    });
  });
});
