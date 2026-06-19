import { render, fireEvent } from '@testing-library/react';
import Content from '@/app/filters/simulate/content';

const mockSearchParams = jest.fn();
const mockUseSimulado = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: mockSearchParams }),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/app/filters/simulate/hooks/useSimulado', () => ({
  useSimulado: () => mockUseSimulado(),
}));

jest.mock('@/app/filters/simulate/components/LoadingScreen', () => {
  return function MockLoadingScreen({ title, message }: any) {
    return <div data-testid="loading-screen"><span>{title}</span><span>{message}</span></div>;
  };
});

jest.mock('@/app/filters/simulate/components/ResultsScreen', () => {
  return function MockResultsScreen({ score, results, onVoltarHome }: any) {
    return <div data-testid="results-screen">Acertos: {score.correct}/{score.total}</div>;
  };
});

jest.mock('@/app/filters/simulate/components/QuestionCard', () => {
  return function MockQuestionCard({ question, alternativaSelecionada, onSelecionarAlternativa }: any) {
    return <div data-testid="question-card">{question.title}</div>;
  };
});

jest.mock('@/app/filters/simulate/components/NavigationFooter', () => {
  return function MockNavigationFooter({ children, ...props }: any) {
    return (
      <div data-testid="nav-footer">
        {children}
        <button data-testid="btn-anterior" onClick={props.onAnterior}>Anterior</button>
        <button data-testid="btn-proxima" onClick={props.onProxima}>Próxima</button>
        {props.isUltimaQuestao && (
          <button data-testid="btn-finalizar" onClick={props.onFinalizar}>Finalizar</button>
        )}
      </div>
    );
  };
});

jest.mock('@/app/filters/simulate/components/Progressbar', () => {
  return function MockProgressBar({ respostasCount, totalQuestions }: any) {
    return <div data-testid="progress-bar">{respostasCount}/{totalQuestions}</div>;
  };
});

describe('Simulate Content', () => {
  const mockQuestions = [
    { id: 1, title: 'Questão 1', description: 'Desc 1', answers: [{ id: 1, text: 'A', correct: true }] },
    { id: 2, title: 'Questão 2', description: 'Desc 2', answers: [{ id: 2, text: 'B', correct: false }] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams.mockReturnValue('simulado');
  });

  it('deve mostrar loading quando loading é true', () => {
    mockUseSimulado.mockReturnValue({
      loading: true,
      submitting: false,
      finished: false,
      results: [],
      score: { correct: 0, total: 0 },
      questions: [],
      questaoAtual: 0,
      respostas: [],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: jest.fn(),
      proxima: jest.fn(),
      finalizarSimulado: jest.fn(),
    });

    const { getByTestId, getByText } = render(<Content />);
    expect(getByTestId('loading-screen')).toBeInTheDocument();
    expect(getByText('Aguarde...')).toBeInTheDocument();
    expect(getByText('Carregando questões...')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando nao ha questoes', () => {
    mockUseSimulado.mockReturnValue({
      loading: false,
      submitting: false,
      finished: false,
      results: [],
      score: { correct: 0, total: 0 },
      questions: [],
      questaoAtual: 0,
      respostas: [],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: jest.fn(),
      proxima: jest.fn(),
      finalizarSimulado: jest.fn(),
    });

    const { getByTestId, getByText } = render(<Content />);
    expect(getByTestId('loading-screen')).toBeInTheDocument();
    expect(getByText('Sem questões :(')).toBeInTheDocument();
    expect(getByText('Nenhuma questão encontrada para os filtros selecionados.')).toBeInTheDocument();
  });

  it('deve mostrar tela de resultados quando finished é true', () => {
    mockUseSimulado.mockReturnValue({
      loading: false,
      submitting: false,
      finished: true,
      results: [
        { question_id: 1, correct: true, correct_answer: 'a', selected_answer: 'a' },
      ],
      score: { correct: 1, total: 2 },
      questions: mockQuestions,
      questaoAtual: 0,
      respostas: [{ question_id: 1, answer_id: 1, selected_letter: 'a' }],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: jest.fn(),
      proxima: jest.fn(),
      finalizarSimulado: jest.fn(),
    });

    const { getByTestId, getByText } = render(<Content />);
    expect(getByTestId('results-screen')).toBeInTheDocument();
    expect(getByText('Acertos: 1/2')).toBeInTheDocument();
  });

  it('deve renderizar tela principal com questoes', () => {
    mockUseSimulado.mockReturnValue({
      loading: false,
      submitting: false,
      finished: false,
      results: [],
      score: { correct: 0, total: 0 },
      questions: mockQuestions,
      questaoAtual: 0,
      respostas: [],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: jest.fn(),
      proxima: jest.fn(),
      finalizarSimulado: jest.fn(),
    });

    const { getByTestId, getByText } = render(<Content />);
    expect(getByTestId('question-card')).toBeInTheDocument();
    expect(getByTestId('nav-footer')).toBeInTheDocument();
    expect(getByTestId('progress-bar')).toBeInTheDocument();
    expect(getByText('Questão 1')).toBeInTheDocument();
    expect(getByText('0/2')).toBeInTheDocument();
  });

  it('deve navegar entre questoes', () => {
    const mockAnterior = jest.fn();
    const mockProxima = jest.fn();

    mockUseSimulado.mockReturnValue({
      loading: false,
      submitting: false,
      finished: false,
      results: [],
      score: { correct: 0, total: 0 },
      questions: mockQuestions,
      questaoAtual: 0,
      respostas: [],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: mockAnterior,
      proxima: mockProxima,
      finalizarSimulado: jest.fn(),
    });

    const { getByTestId } = render(<Content />);

    fireEvent.click(getByTestId('btn-proxima'));
    expect(mockProxima).toHaveBeenCalled();

    fireEvent.click(getByTestId('btn-anterior'));
    expect(mockAnterior).toHaveBeenCalled();
  });

  it('deve mostrar nome do simulado no header', () => {
    mockSearchParams.mockReturnValue('2024');
    const searchParamsMock = jest.fn();
    searchParamsMock.mockReturnValueOnce('simulado');
    searchParamsMock.mockReturnValueOnce('2024');
    searchParamsMock.mockReturnValueOnce('integrado');
    mockSearchParams.mockImplementation(searchParamsMock);

    mockUseSimulado.mockReturnValue({
      loading: false,
      submitting: false,
      finished: false,
      results: [],
      score: { correct: 0, total: 0 },
      questions: mockQuestions,
      questaoAtual: 0,
      respostas: [],
      getRespostaSelecionada: jest.fn(() => ''),
      selecionarAlternativa: jest.fn(),
      anterior: jest.fn(),
      proxima: jest.fn(),
      finalizarSimulado: jest.fn(),
    });

    const { getByText } = render(<Content />);
    expect(getByText(/Simulado de 30 questões/)).toBeInTheDocument();
  });
});
