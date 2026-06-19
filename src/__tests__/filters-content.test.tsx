import { render, fireEvent } from '@testing-library/react';
import Content from '@/app/filters/content';

const mockSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockSearchParams }),
}));

jest.mock('react-hot-toast', () => {
  const toast = jest.fn();
  toast.success = jest.fn();
  toast.error = jest.fn();
  return { __esModule: true, default: toast };
});

beforeEach(() => {
  jest.clearAllMocks();
});

function renderContent() {
  return render(<Content />);
}

function preencherSelects() {
  const selects = document.querySelectorAll('select');
  fireEvent.change(selects[0], { target: { value: 'Integrado' } });
  fireEvent.change(selects[1], { target: { value: '2025' } });
}

describe('Filters Content', () => {
  it.each([
    ['matematica', 'Matemática'],
    ['portugues', 'Português'],
  ])('deve renderizar titulo de %s', (subject, expected) => {
    mockSearchParams.mockReturnValue(subject);
    const { getByText } = renderContent();
    expect(getByText(expected)).toBeInTheDocument();
  });

  it('deve renderizar titulo de simulado quando option nao é materia', () => {
    mockSearchParams.mockReturnValue('simulado');
    const { getByText } = renderContent();
    expect(getByText('Simulado de 30 questões')).toBeInTheDocument();
  });

  it('deve exibir "Iniciar simulado" quando option é simulado', () => {
    mockSearchParams.mockReturnValue('simulado');
    const { getByText } = renderContent();
    expect(getByText('Iniciar simulado')).toBeInTheDocument();
  });

  it('deve exibir "avancar" quando option nao é simulado', () => {
    mockSearchParams.mockReturnValue('matematica');
    const { getByText } = renderContent();
    expect(getByText('avancar')).toBeInTheDocument();
  });

  it('deve mostrar toast quando campos estao vazios', () => {
    const toast = require('react-hot-toast').default;
    mockSearchParams.mockReturnValue('matematica');

    const { getByText } = renderContent();

    fireEvent.click(getByText('avancar'));

    expect(toast.error).toHaveBeenCalledWith('Preencha todos os campos!');
  });

  it('deve tentar navegar para simulate quando option é simulado e campos preenchidos', () => {
    const toast = require('react-hot-toast').default;
    mockSearchParams.mockReturnValue('simulado');

    renderContent();
    preencherSelects();

    fireEvent.click(document.querySelector('button')!);

    expect(toast.error).not.toHaveBeenCalled();
  });

  it('deve tentar navegar para resolver quando option nao é simulado', () => {
    const toast = require('react-hot-toast').default;
    mockSearchParams.mockReturnValue('matematica');

    renderContent();
    preencherSelects();

    fireEvent.click(document.querySelector('button')!);

    expect(toast.error).not.toHaveBeenCalled();
  });
});