// components/ResultsScreen.tsx
import HeaderTitle from '../../../components/headerTitle';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { SimulateResult, Score } from '../types';

interface ResultsScreenProps {
  score: Score;
  results: SimulateResult[];
  onVoltarHome: () => void;
}

export default function ResultsScreen({ 
  score, 
  results, 
  onVoltarHome 
}: ResultsScreenProps) {
  const porcentagem = Math.round((score.correct / score.total) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <HeaderTitle
          href={`/filters?option=simulado`}
          title='Resultado do Simulado'
          icon={<FaArrowLeft size={20} />}
        />
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="w-full  mx-auto overflow-y-auto max-h-[100vh] md:max-h-[70vh] ">
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mb-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Simulado Finalizado!</h2>
            <div className="text-4xl font-bold mb-2">
              <span className="text-green-600">{score.correct}</span>
              <span className="text-gray-500">/{score.total}</span>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              Você acertou {porcentagem}% das questões
            </p>
            <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${
              porcentagem >= 70 ? 'bg-green-100 text-green-800' :
              porcentagem >= 60 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {porcentagem >= 70 ? 'Excelente!' : 
               porcentagem >= 60 ? 'Bom!' : 'Continue estudando!'}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {results.map((result, index) => (
              <div key={result.question_id} className={`border rounded-lg p-4 ${
                result.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Questão {index + 1}</span>
                  <div className="flex items-center gap-2">
                    {result.correct ? 
                      <FaCheck className="text-green-600" /> : 
                      <FaTimes className="text-red-600" />
                    }
                    <span className={`font-bold ${
                      result.correct ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.correct ? 'Correto' : 'Incorreto'}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Sua resposta: <span className="font-semibold uppercase">{result.selected_answer})</span></p>
                  {!result.correct && (
                    <p>Resposta correta: <span className="font-semibold uppercase text-green-600">{result.correct_answer})</span></p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onVoltarHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow"
            >
              Voltar para Tela inicial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}