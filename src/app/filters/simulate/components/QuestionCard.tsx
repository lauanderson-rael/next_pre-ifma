// components/QuestionCard.tsx
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  alternativaSelecionada: string;
  onSelecionarAlternativa: (letra: string) => void;
}

export default function QuestionCard({
  question,
  alternativaSelecionada,
  onSelecionarAlternativa
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <p className='mb-2'>{question.description}</p>

      {question.image_urls?.map((url, index) => (
        <div key={index} className="mb-4 bg-gray-200 flex flex-col items-center justify-center gap-2 py-2">
          <img src={url} alt={`Imagem ${index}`} className="w-[70%]" />
        </div>
      ))}

      <div className="bg-white border border-gray-300 rounded p-4 shadow-sm mb-4">
        <p className="text-gray-800 font-medium">{question.title}</p>
      </div>

      <div className="space-y-3">
        {question.answers.map((answer, index) => {
          const letra = String.fromCharCode(97 + index);
          return (
            <label
              key={answer.id}
              className={`block p-3 border rounded-lg cursor-pointer transition-all ${
                alternativaSelecionada === letra
                  ? 'bg-blue-100 border-blue-600'
                  : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
            >
              <input
                type="radio"
                name="alternativa"
                value={letra}
                checked={alternativaSelecionada === letra}
                onChange={() => onSelecionarAlternativa(letra)}
                className="mr-2"
              />
              <span className="font-semibold uppercase">{letra})</span> {answer.text}
            </label>
          );
        })}
      </div>
    </div>
  );
}