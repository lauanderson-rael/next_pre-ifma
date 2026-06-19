import { renderHook, act, waitFor } from '@testing-library/react';
import { useSimulado } from '@/app/filters/simulate/hooks/useSimulado';
import { api } from '@/app/services/api';
import toast from 'react-hot-toast';

jest.mock('@/app/services/api');
jest.mock('react-hot-toast');

const mockApi = api as jest.Mocked<typeof api>;
const mockToast = toast as jest.Mocked<typeof toast>;

const mockQuestions = [
  {
    id: 1,
    title: 'Questão 1',
    description: 'Descrição 1',
    answers: [
      { id: 1, text: 'A', correct: true },
      { id: 2, text: 'B', correct: false }
    ]
  },
  {
    id: 2,
    title: 'Questão 2', 
    description: 'Descrição 2',
    answers: [
      { id: 3, text: 'A', correct: false },
      { id: 4, text: 'B', correct: true }
    ]
  }
];

describe('useSimulado', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.Audio = jest.fn().mockImplementation(() => ({
      play: jest.fn()
    }));
  });

  it('deve carregar questões ao inicializar', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    const { result } = renderHook(() => useSimulado());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockApi.get).toHaveBeenCalledWith('/simulates/questions');
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it('deve tratar erro ao carregar questões', async () => {
    mockApi.get.mockRejectedValueOnce(new Error('Erro'));

    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockToast.error).toHaveBeenCalledWith('Erro ao carregar questões');
  });

  it('deve selecionar alternativa corretamente', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.selecionarAlternativa('a');
    });

    expect(result.current.getRespostaSelecionada(1)).toBe('a');
  });

  it('deve navegar entre questões', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.proxima();
    });

    expect(result.current.questaoAtual).toBe(1);

    act(() => {
      result.current.anterior();
    });

    expect(result.current.questaoAtual).toBe(0);
  });

   it('deve finalizar simulado com sucesso', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    mockApi.post
      .mockResolvedValueOnce({ data: { correct: true } })  // resposta da questão 1
      .mockResolvedValueOnce({ data: { correct: true } }); // resposta da questão 2

    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.selecionarAlternativa('a');
    });

    act(() => {
      result.current.proxima();
    });

    act(() => {
      result.current.selecionarAlternativa('b');
    });

    act(() => {
      result.current.finalizarSimulado();
    });

    // Aguarda todas as atualizações de estado assíncronas terminarem
    await waitFor(() => {
      expect(result.current.submitting).toBe(false);
      expect(result.current.finished).toBe(true);
      expect(result.current.score.correct).toBe(2);
      expect(mockToast.success).toHaveBeenCalled();
    });
  });

  it('deve exigir todas as respostas para finalizar', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.finalizarSimulado();
    });

    expect(mockToast.error).toHaveBeenCalledWith('Por favor, responda todas as questões antes de finalizar!');
  });

  it('deve tratar alternativa inválida', async () => {
    mockApi.get.mockResolvedValueOnce({
      data: { questions: mockQuestions }
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { result } = renderHook(() => useSimulado());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.selecionarAlternativa('z');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Alternativa inválida');
    consoleSpy.mockRestore();
  });
});