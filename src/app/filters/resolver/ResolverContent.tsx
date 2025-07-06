'use client';
import HeaderTitle from '../../components/headerTitle';
import TopTitle from '@/app/home/components/topTitle';
import toast from 'react-hot-toast';

import type { Question } from './types';
import { useEffect, useState, Suspense } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { api } from '@/app/services/api';
import { useSearchParams } from 'next/navigation';
import { RiAiGenerate2 } from "react-icons/ri";

export default function ResolverContent() {
   const [loading, setLoading] = useState(true);
   const searchParams = useSearchParams();
   const year = searchParams.get('year');
   const subject = searchParams.get('subject');
   const type = searchParams.get('type');

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

   const [questions, setQuestions] = useState<Question[]>([]);
   const [questaoAtual, setQuestaoAtual] = useState(0);
   const [alternativaSelecionada, setAlternativaSelecionada] = useState('');

   const [resposta, setResposta] = useState('');
   const [loadingAi, setLoadingAi] = useState(false);


   useEffect(() => {
      const carregarQuestoes = async () => {
         try {
            let response;
            if (subject === "simulado") {
               response = await api.get('/simulates/questions');
               setQuestions(response.data.questions.slice(0, 10));
            } else {
               response = await api.get(`/simulates/questions?q[subject_cont]=${subject}&q[year_eq]=${year}`);
               setQuestions(response.data.questions);
            }
         } catch (error) {
            console.error('Erro ao buscar questões:', error);
         }finally{
            setLoading(false);
         }
      };
      carregarQuestoes();
      console.log('quantidade de questoes', questions.length);
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
         console.log("resultado: ", result);
         const somAcerto = new Audio('/sounds/success.mp3');
         const somErro = new Audio('/sounds/error.mp3');
         if (result) {
            somAcerto.play();
            toast.success('Parabéns voce acertou!')
         } else {
            somErro.play();
            toast.error('Que pena, voce errou!');
         }
         //setTimeout(() => { proxima(); }, 2500);

      } catch (err) {
         console.error("Erro ao responder:", err);
      }
   };

   const anterior = () => {
      if (questaoAtual > 0) {
         setQuestaoAtual(questaoAtual - 1);
         setAlternativaSelecionada('');
         setResposta('');
      }
   };

   const proxima = () => {
      if (questaoAtual < questions.length - 1) {
         setQuestaoAtual(questaoAtual + 1);
         setAlternativaSelecionada('');
         setResposta('');
         setLoadingAi(false);
      }
   };

   // gemini
   async function geminiSubmit() {
      setLoadingAi(true);
      const res = await api.get(`/simulates/questions/${questao.id}`)
      const answers = res.data.answers;
      const correct = answers.find((answer: any) => answer.correct === true);
      const incorrects = answers
         .filter((answer: any) => answer.correct !== true)
         .map((answer: any) => answer.text);

      console.log("corrreto:", correct.text);
      console.log("incorrreto:", incorrects);

      try {
         const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: `Explique de forma resumida porque a alternativa correta para a questão, ${questao.title}, é ${correct.text} .As alternativas incorretas eram: ${incorrects.join(', ')}` }),
         });

         const data = await response.json();

         if (!response.ok) throw new Error(data.message || 'Erro desconhecido');
         setResposta(data.text)
         setLoadingAi(false);
         console.log(data.text);
      } catch (err) {
         console.error(err);
      }
   }
   // gemini

if (loading) {
   return (
      <div>
         <p className="text-center text-xl mt-36 animate-bounce text-green-700 font-bold">
            Carregando questões...
         </p>
      </div>
   );
}

if (questions.length === 0) {
   return (
      <div>
         <HeaderTitle
               href={`/filters?option=${subject}`}
               title='Sem questões :('
               icon={<FaArrowLeft size={20} />}
            />

             <p className="text-center text-xl mt-36 text-red-600 font-semibold">
            Nenhuma questão encontrada para os filtros selecionados.
         </p>
      </div>
   );
}

   return (

      <div className="min-h-screen flex flex-col">
         {/* Header */}
         <header>
            <HeaderTitle
               href={`/filters?option=${subject}`}
               title={`Questão ${String(questao.id).padStart(3, '0')}`}
               icon={<FaArrowLeft size={20} />}
            />
            <TopTitle title={`${type} - ${year}`}>
               {title}
            </TopTitle>
         </header>

         {/* Main */}
         <main className="flex-1 px-4 pb-28 mt-3 overflow-y-auto max-h-[60vh]">
            <div className="w-full max-w-xl mx-auto">

               <div className="bg-white border border-gray-300 rounded p-4 shadow-sm mb-4">
                  <p className="text-gray-800 font-medium">{questao.title}</p>
               </div>

               <div className="space-y-3">
                  {questao.answers.map((answer, index) => {
                     const letra = String.fromCharCode(97 + index); // 'a', 'b', 'c', etc.
                     return (
                        <label
                           key={answer.id}
                           className={`block p-3 border rounded-lg cursor-pointer transition-all ${alternativaSelecionada === letra
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

                  {resposta && (
                     <div className="mt-6 p-4 rounded bg-indigo-100 whitespace-pre-wrap">
                        <h3 className="flex justify-center gap-2 items-center text-xl font-bold text-indigo-600">
                           Explicação com <RiAiGenerate2 size={20} />
                        </h3>
                        {resposta}
                     </div>
                  )}

                  {loadingAi && (
                     <div className="mt-6 p-4 rounded bg-indigo-100">
                        <h3 className="flex justify-center gap-2 items-center text-xl font-bold text-indigo-600 animate-bounce">
                           Gerando explicação...
                        </h3>
                     </div>
                  )}
               </div>


            </div>
         </main>

         {/* Footer fixo */}
         <footer className="fixed bottom-0 w-full left-0 bg-white">
            {/* Botões */}
            <div className="pt-6 space-y-2 max-w-xl mx-auto px-4 sm:px-0">
               <button
                  onClick={geminiSubmit}
                  className="flex justify-center gap-2 items-center w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-bold shadow"
               >
                  Ver explicação com IA <RiAiGenerate2 size={20} />
               </button>

               <button
                  onClick={responder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold shadow"
               >
                  Responder
               </button>
            </div>

            <div className='flex justify-between items-center max-w-xl mx-auto m-4 px-4 sm:px-0'>
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
         </footer>
      </div>


   );
}
