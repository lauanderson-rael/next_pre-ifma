import { render, fireEvent } from '@testing-library/react';
import QuestionCard from './QuestionCard';

const mockQuestion = {
  id: 1,
  title: 'Qual a capital do Brasil?',
  description: 'Descrição da questão',
  answers: [
    { id: 1, correct: true, text: 'Brasília' },
    { id: 2, correct: false, text: 'Rio de Janeiro' },
    { id: 3, correct: false, text: 'São Paulo' },
  ],
};

const defaultProps = {
  question: mockQuestion,
  alternativaSelecionada: '',
  onSelecionarAlternativa: jest.fn(),
};

describe('QuestionCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar titulo e descricao', () => {
    const { getByText } = render(<QuestionCard {...defaultProps} />);
    expect(getByText('Qual a capital do Brasil?')).toBeInTheDocument();
    expect(getByText('Descrição da questão')).toBeInTheDocument();
  });

  it('deve renderizar todas as alternativas', () => {
    const { getByText } = render(<QuestionCard {...defaultProps} />);
    expect(getByText(/Brasília/)).toBeInTheDocument();
    expect(getByText(/Rio de Janeiro/)).toBeInTheDocument();
    expect(getByText(/São Paulo/)).toBeInTheDocument();
  });

  it('deve mostrar letras das alternativas', () => {
    const { getByText } = render(<QuestionCard {...defaultProps} />);
    expect(getByText('a)')).toBeInTheDocument();
    expect(getByText('b)')).toBeInTheDocument();
    expect(getByText('c)')).toBeInTheDocument();
  });

  it('deve chamar onSelecionarAlternativa ao clicar em alternativa', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <QuestionCard {...defaultProps} onSelecionarAlternativa={onSelect} />
    );

    fireEvent.click(getByText(/Brasília/));
    expect(onSelect).toHaveBeenCalledWith('a');
  });

  it('deve radio estar checked quando alternativa selecionada', () => {
    const { container } = render(
      <QuestionCard {...defaultProps} alternativaSelecionada="b" />
    );

    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
    expect(radios[2]).not.toBeChecked();
  });

  it('deve aplicar estilo azul na alternativa selecionada', () => {
    const { getByText } = render(
      <QuestionCard {...defaultProps} alternativaSelecionada="a" />
    );

    const labelBrasilia = getByText(/Brasília/).closest('label')!;
    expect(labelBrasilia.className).toContain('bg-blue-100');
    expect(labelBrasilia.className).toContain('border-blue-600');
  });

  it('deve aplicar estilo branco na alternativa nao selecionada', () => {
    const { getByText } = render(
      <QuestionCard {...defaultProps} alternativaSelecionada="a" />
    );

    const labelRio = getByText(/Rio de Janeiro/).closest('label')!;
    expect(labelRio.className).toContain('bg-white');
    expect(labelRio.className).toContain('border-gray-300');
  });

  it('deve renderizar imagens quando fornecidas', () => {
    const questionWithImages = {
      ...mockQuestion,
      image_urls: ['https://img.com/1.jpg', 'https://img.com/2.jpg'],
    };

    const { container } = render(
      <QuestionCard {...defaultProps} question={questionWithImages} />
    );

    const images = container.querySelectorAll('img');
    expect(images[0]).toHaveAttribute('src', 'https://img.com/1.jpg');
    expect(images[1]).toHaveAttribute('src', 'https://img.com/2.jpg');
  });

  it('deve renderizar alt nas imagens', () => {
    const questionWithImages = {
      ...mockQuestion,
      image_urls: ['https://img.com/1.jpg'],
    };

    const { container } = render(
      <QuestionCard {...defaultProps} question={questionWithImages} />
    );

    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('alt', 'Imagem 0');
  });

  it('nao deve renderizar secao de imagens quando image_urls nao existe', () => {
    const { container } = render(<QuestionCard {...defaultProps} />);

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
