// components/ProgressBar.tsx
interface ProgressBarProps {
  respostasCount: number;
  totalQuestions: number;
  questaoAtual: number;
}

export default function ProgressBar({ 
  respostasCount, 
  totalQuestions, 
  questaoAtual 
}: ProgressBarProps) {
  return (
    <div className="bg-gray-100 p-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Progresso: {respostasCount}/{totalQuestions}</span>
          {/* <span>{questaoAtual + 1} de {totalQuestions}</span> */}
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(respostasCount / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}