'use client';
import HeaderTitle from '../../components/headerTitle';
import TopTitle from '@/app/home/components/topTitle';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Suspense } from 'react';

// Componentes
import LoadingScreen from './components/LoadingScreen';
import ProgressBar from './components/Progressbar';
import QuestionCard from './components/QuestionCard';
import NavigationFooter from './components/NavigationFooter';
import ResultsScreen from './components/ResultsScreen';

// Hook
import { useSimulado } from './hooks/useSimulado';

function SimuladoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const year = searchParams.get('year');
  const type = searchParams.get('type');
  const title = "Simulado de 30 questões";

  const {
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
  } = useSimulado();

  const voltarHome = () => {
    router.push('/home');
  };

  // Loading state
  if (loading) {
    return (
      <LoadingScreen
        title="Aguarde..."
        message="Carregando questões..."
      />
    );
  }

  // No questions state
  if (questions.length === 0) {
    return (
      <LoadingScreen
        title="Sem questões :("
        message="Nenhuma questão encontrada para os filtros selecionados."
      />
    );
  }

  // Results screen
  if (finished) {
    return (
      <ResultsScreen
        score={score}
        results={results}
        onVoltarHome={voltarHome}
      />
    );
  }

  // Main simulado screen
  const questao = questions[questaoAtual];
  const alternativaSelecionada = getRespostaSelecionada(questao.id);
  const isUltimaQuestao = questaoAtual === questions.length - 1;
  const todasRespondidas = respostas.length === questions.length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <HeaderTitle
          href={`/filters?option=simulado`}
          title={`Questão ${String(questao.id).padStart(3, '0')}`}
          icon={<FaArrowLeft size={20} />}
        />
        <TopTitle title={`${type} - ${year}`}>
          <div className='flex gap-2'>
            ({title})
          </div>
        </TopTitle>
      </header>


      {/* Main Content */}
      <main className="flex-1 px-4 pb-32 overflow-y-auto max-h-[70vh]">
        <QuestionCard
          question={questao}
          alternativaSelecionada={alternativaSelecionada}
          onSelecionarAlternativa={selecionarAlternativa}
        />
      </main>

      {/* Navigation Footer */}
      <NavigationFooter
        questaoAtual={questaoAtual}
        totalQuestions={questions.length}
        isUltimaQuestao={isUltimaQuestao}
        todasRespondidas={todasRespondidas}
        submitting={submitting}
        onAnterior={anterior}
        onProxima={proxima}
        onFinalizar={finalizarSimulado}
      >
        <ProgressBar
          respostasCount={respostas.length}
          totalQuestions={questions.length}
          questaoAtual={questaoAtual}
        />
      </NavigationFooter>
    </div>
  );
}

export default function Content() {
  return (
    <Suspense fallback={<LoadingScreen title="Carregando..." message="Aguarde..." />}>
      <SimuladoContent />
    </Suspense>
  );
}