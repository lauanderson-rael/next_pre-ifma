// hooks/useSimulado.ts
import { useState, useEffect } from 'react';
import { api } from '@/app/services/api';
import { Question, UserAnswer, SimulateResult, Score } from '../types';
import toast from 'react-hot-toast';

export const useSimulado = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<SimulateResult[]>([]);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<UserAnswer[]>([]);

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        const response = await api.get('/simulates/questions');
        console.log("Todas as questoes", response.data.questions);
        setQuestions(response.data.questions.slice(0, 10));
      } catch (error) {
        console.log('Erro ao buscar questões DO SIMULADO:', error);
        toast.error('Erro ao carregar questões');
      } finally {
        setLoading(false);
      }
    };
    carregarQuestoes();
  }, []);

  const getRespostaSelecionada = (questionId: number): string => {
    const resposta = respostas.find(r => r.question_id === questionId);
    return resposta ? resposta.selected_letter : '';
  };

  const selecionarAlternativa = (letra: string) => {
    const question = questions[questaoAtual];
    const index = letra.codePointAt(0)! - 97;
    const answerId = question.answers[index]?.id;
    
    if (!answerId) {
      console.error("Alternativa inválida");
      return;
    }

    const novaResposta: UserAnswer = {
      question_id: question.id,
      answer_id: answerId,
      selected_letter: letra
    };

    setRespostas(prev => {
      const filtered = prev.filter(r => r.question_id !== question.id);
      return [...filtered, novaResposta];
    });
  };

  const anterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const proxima = () => {
    if (questaoAtual < questions.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const finalizarSimulado = async () => {
    if (respostas.length !== questions.length) {
      toast.error('Por favor, responda todas as questões antes de finalizar!');
      return;
    }

    setSubmitting(true);
    
    try {
      const promises = respostas.map(resposta => 
        api.post('/simulates/answer', {
          question_id: resposta.question_id,
          answer_id: resposta.answer_id
        })
      );

      const responses = await Promise.all(promises);
      
      const resultados: SimulateResult[] = responses.map((response, index) => {
        const question = questions.find(q => q.id === respostas[index].question_id) as Question;
        const correctAnswer = question?.answers.find(a => a.correct);
        const correctLetter = correctAnswer ? String.fromCodePoint(97 + question.answers.indexOf(correctAnswer)) : '';
        
        return {
          correct: response.data.correct,
          correct_answer: correctLetter,
          selected_answer: respostas[index].selected_letter,
          question_id: respostas[index].question_id
        };
      });

      const acertos = resultados.filter(r => r.correct).length;
      
      setResults(resultados);
      setScore({ correct: acertos, total: questions.length });
      setFinished(true);
      
      // Som baseado na performance
      const porcentagemAcertos = (acertos / questions.length) * 100;
      const somAcerto = new Audio('/sounds/success.mp3');
      const somErro = new Audio('/sounds/error.mp3');
      
      if (porcentagemAcertos >= 60) {
        somAcerto.play();
        toast.success(`Parabéns! Você acertou ${acertos} de ${questions.length} questões!`);
      } else {
        somErro.play();
        toast.error(`Você acertou ${acertos} de ${questions.length} questões. Continue estudando!`);
      }

    } catch (error) {
      console.error("Erro ao finalizar simulado:", error);
      toast.error('Erro ao finalizar simulado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    submitting,
    finished,
    results,
    score,
    questions,
    questaoAtual,
    respostas,
    getRespostaSelecionada,
    selecionarAlternativa,
    anterior,
    proxima,
    finalizarSimulado
  };
};