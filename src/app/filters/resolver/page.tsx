'use client';

import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import HeaderTitle from '../../components/headerTitle';
import TopTitle from '@/app/home/components/topTitle';
import type { Question} from './types'; // ajuste o caminho conforme onde salvou os tipos
import { api } from '@/app/services/api';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function QuestaoPage() {
   const searchParams = useSearchParams();
   const year = searchParams.get('year');
   const subject = searchParams.get('subject');
   const type = searchParams.get('type');

   const [questions, setQuestions] = useState<Question[]>([]);
   const [questaoAtual, setQuestaoAtual] = useState(0);
   const [alternativaSelecionada, setAlternativaSelecionada] = useState('');

   useEffect(() => {
      const carregarQuestoes = async () => {
         try {
         let response;
         if (subject === "simulado"){
               response = await api.get('/simulates/questions');
               setQuestions(response.data.questions.slice(0,10));
         }else{
               response = await api.get(`/simulates/questions?q[subject_cont]=${subject}&q[year_eq]=${year}`);
               setQuestions(response.data.questions);
               //console.log(`questoes de ${subject} do ano ${year}: \n`, response.data.questions);
         }
         } catch (error) {
         console.error('Erro ao buscar questões:', error);
         }
      };
      carregarQuestoes();
   }, []);

const questao = questions[questaoAtual];

const responder = async () => {
  if (!alternativaSelecionada) return;

  const index = alternativaSelecionada.charCodeAt(0) - 97;
  const question = questions[questaoAtual];
  const answerId = question.answers[index]?.id;
  if (!answerId) {
    console.error("Alternativa inválida");
    return;
  }

  try {
    const payload = {
      question_id: question.id,
      answer_id: answerId
    };

    console.log("Enviando (debug):", payload);
    const response = await api.post('/simulates/answer', payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Respondido:", response.data);
    const result = response.data.correct
    const somAcerto = new Audio('/sounds/success.mp3');
    const somErro = new Audio('/sounds/error.mp3');
    if (result) {
      somAcerto.play();
      toast.success('Parabéns voce acertou!')
    } else {
      somErro.play();
      toast.error('Que pena, voce errou!');
    }
    setTimeout(() => { proxima();}, 2500);

  } catch (err) {
    console.error("Erro ao responder:", err);
  }
};

  const anterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
      setAlternativaSelecionada('');
    }
  };

  const proxima = () => {
    if (questaoAtual < questions.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
      setAlternativaSelecionada('');
    }
  };

  if (!questao){
   return <div>
      <p className="text-center text-xl  mt-36 animate-bounce text-green-700 font-bold">Carregando questões...</p>
   </div>
  }


  let title = ""
  switch (subject) {
    case 'matematica':
      title = "Matemática"
      break;
    case 'portugues':
      title = "Português"
      break;
    default:
      title = "Simulado de 10 questões"
      break;
  }

  return (
    <div>
      <HeaderTitle
        href={`/filters?option=${subject}`}
        title={`Questão ${String(questao.id).padStart(3, '0')}`}
        icon={<FaArrowLeft size={20} />}
      />

      <TopTitle title={`${type} - ${year}`}>
         {title}
      </TopTitle>

      <main className="flex flex-col items-center px-4 pt-4">
        <div className="bg-white border border-gray-300 rounded p-4 w-full max-w-xl shadow-sm mb-4">
          <p className="text-gray-800 font-medium">{questao.title}</p>
        </div>

        <div className="w-full max-w-xl space-y-2">
          {questao.answers.map((answer, index) => {
            const letra = String.fromCharCode(97 + index); // 'a', 'b', 'c', etc.
            return (
              <label
                key={answer.id}
                className={`block p-3 border rounded-lg cursor-pointer transition-all ${
                  alternativaSelecionada === letra
                    ? 'bg-green-100 border-green-600'
                    : 'bg-white border-gray-300 hover:border-green-400'
                }`}
              >
                <input
                  type="radio"
                  name="alternativa"
                  value={letra}
                  checked={alternativaSelecionada === letra}
                  onChange={() => setAlternativaSelecionada(letra)}
                  className="mr-2"
                />
                <span className="font-semibold uppercase">{letra})</span> {answer.text}
              </label>
            );
          })}
        </div>

        <div className="w-full max-w-xl pt-4">
          <button
            onClick={responder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow"
          >
            Responder
          </button>
        </div>

        <div className="flex justify-between items-center w-full max-w-xl mt-6 text-gray-700 font-medium">
          <button
            onClick={anterior}
            disabled={questaoAtual === 0}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm"> {questaoAtual + 1} de {questions.length}</span>
          <button
            onClick={proxima}
            disabled={questaoAtual === questions.length - 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
}
