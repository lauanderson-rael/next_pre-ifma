'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import HeaderTitle from '../../components/headerTitle';
import TopTitle from '@/app/home/components/topTitle';


export default function QuestaoPage() {
  const [alternativaSelecionada, setAlternativaSelecionada] = useState('');
  const [questaoAtual, setQuestaoAtual] = useState(1);

  const totalQuestoes = 25;

  const questao = {
    numero: 34,
    enunciado: "Leia o texto a seguir e responda à pergunta...",
    alternativas: {
      a: "Alternativa A - texto exemplo.",
      b: "Alternativa B - texto exemplo.",
      c: "Alternativa C - texto exemplo.",
      d: "Alternativa D - texto exemplo.",
    },
    tipo: "Integrado",
    ano: 2025,
    disciplina: "Português",
  };

  const responder = () => {
    if (alternativaSelecionada) {
      alert(`Você selecionou a alternativa: ${alternativaSelecionada.toUpperCase()}`);
      // Aqui você pode salvar a resposta ou ir para próxima questão
    } else {
      alert("Selecione uma alternativa antes de responder.");
    }
  };

  const anterior = () => {
    if (questaoAtual > 1) {
      setQuestaoAtual((prev) => prev - 1);
      setAlternativaSelecionada('');
    }
  };

  const proxima = () => {
    if (questaoAtual < totalQuestoes) {
      setQuestaoAtual((prev) => prev + 1);
      setAlternativaSelecionada('');
    }
  };

  return (
    <div>
      <HeaderTitle href='/questions' title={`Questão ${String(questao.numero).padStart(3, '0')}`} icon={<FaArrowLeft size={20} />} />

      <TopTitle title="Português">
            {questao.tipo} {questao.ano} - {questao.disciplina}
      </TopTitle>


      <main className="flex flex-col items-center px-4 pt-4">


        {/* Enunciado da questão */}
        <div className="bg-white border border-gray-300 rounded p-4 w-full max-w-xl shadow-sm mb-4">
          <p className="text-gray-800 font-medium">{questao.enunciado}</p>
        </div>

        {/* Alternativas */}
        <div className="w-full max-w-xl space-y-2">
          {Object.entries(questao.alternativas).map(([letra, texto]) => (
            <label key={letra} className={`block p-3 border rounded-lg cursor-pointer transition-all ${
              alternativaSelecionada === letra
                ? 'bg-green-100 border-green-600'
                : 'bg-white border-gray-300 hover:border-green-400'
            }`}>
              <input
                type="radio"
                name="alternativa"
                value={letra}
                checked={alternativaSelecionada === letra}
                onChange={() => setAlternativaSelecionada(letra)}
                className="mr-2"
              />
              <span className="font-semibold uppercase">{letra})</span> {texto}
            </label>
          ))}
        </div>

        {/* Botão responder */}
        <div className="w-full max-w-xl pt-4">
          <button
            onClick={responder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow"
          >
            Responder
          </button>
        </div>

        {/* Navegação de questões */}
        <div className="flex justify-between items-center w-full max-w-xl mt-6 text-gray-700 font-medium">
          <button
            onClick={anterior}
            disabled={questaoAtual === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm"> {questaoAtual} de {totalQuestoes}</span>
          <button
            onClick={proxima}
            disabled={questaoAtual === totalQuestoes}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
}
