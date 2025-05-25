
'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import HeaderTitle from '@/app/components/headerTitle';
import TopTitle from '../home/components/topTitle';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

export default function CreateQuestionPage() {
  const { handleSubmit } = useForm();

  const [enunciado, setEnunciado] = useState('');
  const [alternativas, setAlternativas] = useState({ A: '', B: '', C: '', D: '' });
  const [respostaCorreta, setRespostaCorreta] = useState('');

  const handleChangeAlternativa = (letra: string, valor: string) => {
    setAlternativas(prev => ({ ...prev, [letra]: valor }));
  };

  const handleCreateQuestion = async () => {
    if (!enunciado || !respostaCorreta || Object.values(alternativas).includes('')) {
      alert('Preencha todos os campos!');
      return;
    }

    const payload = {
  enunciado,
  alternativas: [
    alternativas.A,
    alternativas.B,
    alternativas.C,
    alternativas.D
  ],
  resposta_correta: alternativas['A'] // ex: alternativas['A'] => "Paris"
};

    try {
      const response = await api.post('/questions/create', payload);

      if (response.status === 201) {
        alert('Questão criada com sucesso!');
        setEnunciado('');
        setAlternativas({ A: '', B: '', C: '', D: '' });
        setRespostaCorreta('');
      } else {
        alert('Erro ao criar questão!');
      }
    } catch (error: any) {
      alert('Erro na requisição: ' + (error.message || 'Erro inesperado'));
      console.log(error)
    }
  };

  return (
    <div>
      <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
      <TopTitle title="Adicionar nova questão" />
      <main className="flex flex-col items-center max-h-[calc(100dvh-160px)] overflow-y-auto">
        <form
          onSubmit={handleSubmit(handleCreateQuestion)}
          className="w-full max-w-xl space-y-4 px-4 mt-2"
        >
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Enunciado</label>
            <textarea
              value={enunciado}
              onChange={(e) => setEnunciado(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              rows={4}
            />
          </div>

          {['A', 'B', 'C', 'D'].map((letra) => (
            <div key={letra}>
              <label className="block mb-2 text-gray-700 font-medium">Alternativa {letra}</label>
              <input
                type="text"
                value={alternativas[letra as keyof typeof alternativas]}
                onChange={(e) => handleChangeAlternativa(letra, e.target.value)}
                className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Resposta Correta</label>
            <select
              value={respostaCorreta}
              onChange={(e) => setRespostaCorreta(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              {['A', 'B', 'C', 'D'].map((letra) => (
                <option key={letra} value={letra}>{letra}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
          >
            Criar Questão
          </button>
        </form>
      </main>
    </div>
  );
}
