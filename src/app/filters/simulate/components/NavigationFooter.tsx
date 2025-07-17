import { Children } from "react";

// components/NavigationFooter.tsx
interface NavigationFooterProps {
  questaoAtual: number;
  totalQuestions: number;
  isUltimaQuestao: boolean;
  todasRespondidas: boolean;
  submitting: boolean;
  children: React.ReactNode
  onAnterior: () => void;
  onProxima: () => void;
  onFinalizar: () => void;
}

export default function NavigationFooter({
  questaoAtual,
  totalQuestions,
  isUltimaQuestao,
  todasRespondidas,
  submitting,
  onAnterior,
  onProxima,
  onFinalizar,
  children,
}: NavigationFooterProps) {
  return (
    <footer className="fixed bottom-0 w-full left-0 bg-white">
      <div className="max-w-3xl mx-auto p-4">
        {/* Botão de finalizar (apenas na última questão) */}
        {isUltimaQuestao && (
          <button
            onClick={onFinalizar}
            disabled={submitting || !todasRespondidas}
            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-3 rounded-lg font-bold shadow mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {submitting ? 'Enviando...' : 'Finalizar Simulado'}
          </button>
        )}

        {/* Navegação */}
        <div className='flex justify-between items-center text-sm'>
          <button
            onClick={onAnterior}
            disabled={questaoAtual === 0}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-60"
          >
            Anterior
          </button>
          
           <span className="text-sm text-gray-600">
            {questaoAtual + 1} de {totalQuestions}
          </span>
           
           <div className="">
             {/*md:w-[60%] w-[40%] */}
           {children}
           </div>
          <button
            onClick={onProxima}
            disabled={questaoAtual === totalQuestions - 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-60"
          >
            Próxima
          </button>
        </div>
      </div>
    </footer>
  );
}
