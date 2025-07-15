'use client';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../services/api';
import TopTitle from '../home/components/topTitle';
import type { FormInputsType, QuestionType } from './types.ts'

export default function CreateQuestionPage() {
   const anos = ['2025', '2024', '2023', '2022'];

   const { register, handleSubmit, control, setValue, getValues, watch, reset } = useForm<FormInputsType>({
      defaultValues: {
         title: '',
         description: '',
         year: '',
         subject: '',
         answers: ['', '', '', ''],
         correctIndex: 0,
         images: null
      },
   });

   const [status, setStatus] = useState<string | null>(null);
   const answers = watch('answers');
   const correctIndex = watch('correctIndex');

   const onSubmit = async (data: FormInputsType) => {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('year', data.year);
      formData.append('subject', data.subject);

      if (data.images && data.images.length > 0) {
         for (let i = 0; i < data.images.length; i++) {
            formData.append('images[]', data.images[i]);
         }
      }
      // Adicionando respostas
      data.answers.forEach((text, i) => {
         formData.append(`answers_attributes[${i}][text]`, text);
         formData.append(`answers_attributes[${i}][correct]`, String(i === Number(data.correctIndex)));
      });

      try {
         console.log('Body enviado:');
         for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
         }

         const res = await api.post('/questions/create', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });

         if (res) {
            setStatus('Questão criada com sucesso!');
            reset();
         } else {
            setStatus('Erro ao criar a questão.');
         }
      } catch (err) {
         console.error(err);
         setStatus('Erro de rede.');
      }
   };

   const [questionsList, setQuestionsList] = useState<QuestionType[]>([])

   useEffect(() => {
      async function getQuestions() {
         await api.get("/simulates/questions")
            .then((res) => {
               console.log("Questions:", res.data)
               setQuestionsList(res.data.questions)
               return res.data
            }).catch((err) => { console.log(err) })
      }
      getQuestions()
   }, [])


   return (
      <div>
         <TopTitle title="Adicionar nova questão" />

         <main className="flex flex-col items-center max-h-[calc(100dvh-160px)] overflow-y-auto">

            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl space-y-4 px-4 mt-2">
               <input
                  type="text"
                  placeholder="Título"
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  {...register('title', { required: true })}
               />

               <textarea
                  placeholder="Descrição"
                  rows={4}
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  {...register('description', { required: true })}
               />

               <select
                  {...register('year', { required: true })}
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
               >
                  <option value="">Selecione o ano...</option>
                  {anos.map((ano) => (
                     <option key={ano} value={ano}>
                        {ano}
                     </option>
                  ))}
               </select>

               <select
                  {...register('subject', { required: true })}
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
               >
                  <option value="">Selecione a disciplina...</option>
                  <option value="matematica">Matemática</option>
                  <option value="portugues">Português</option>
               </select>

               <label className="font-medium block mb-1">Imagem (Opcional)</label>
               <input
                  type="file"
                  multiple
                  accept='image/*'
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  {...register('images', { required: false })}
               />

               <div>
  <label className="font-medium block mb-1">Defina as alternativas</label>
  {answers.map((ans, i) => (
    <div key={i} className="flex items-center mb-2 gap-3">
      <input
        type="radio"
        value={i}
        checked={Number(correctIndex) === i}
        onChange={() => setValue('correctIndex', i)}
        className="w-5 h-5 accent-green-600 focus:ring-green-400 focus:outline-none"
      />
      <input
        type="text"
        value={ans}
        onChange={(e) => {
          const newAnswers = [...answers];
          newAnswers[i] = e.target.value;
          setValue('answers', newAnswers);
        }}
        placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
        className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
      />
      {answers.length > 2 && (
        <button
          type="button"
          onClick={() => {
            const newAnswers = answers.filter((_, index) => index !== i);
            setValue('answers', newAnswers);

            // Ajusta o índice da resposta correta, se necessário
            if (correctIndex === i) {
              setValue('correctIndex', 0);
            } else if (correctIndex > i) {
              setValue('correctIndex', correctIndex - 1);
            }
          }}
          className="text-red-500 hover:underline text-sm"
        >
          Remover
        </button>
      )}
    </div>
  ))}

  <button
    type="button"
    onClick={() => setValue('answers', [...answers, ''])}
    className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
  >
    Adicionar alternativa
  </button>
</div>

               <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
               >
                  Enviar
               </button>
            </form>

            {status && (
               <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-green-100 mx-4 p-6 rounded-lg shadow-lg text-center max-w-sm w-full border border-green-400">
                     <p className="text-gray-800 text-lg mb-4">{status}</p>
                     <button
                        onClick={() => setStatus(null)}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                     >
                        Fechar
                     </button>
                  </div>
               </div>
            )}

            <div className="mt-6 max-w-4xl mx-auto px-4">
               <h2 className="text-2xl font-bold mb-6 text-center">Lista de Questões -Total({questionsList.length})</h2>

               {questionsList.map((question) => (
                  <div key={question.id} className="border rounded-lg mb-4 p-4 bg-white">
                     <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold">Título: {question.title}</h3>
                        <div className="text-sm text-gray-500">ID: {question.id} | {question.year}</div>
                     </div>

                     <p className="text-gray-600 mb-3">Descrição:{question.description}</p>

                     <div>Imagens: </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                        {question.image_urls?.map((url) => (
                           <img key={url} src={url} alt="Questão" className="w-full h-40 object-cover rounded border" />
                        ))}
                     </div>


                     <ul className="space-y-1">
                        {question.answers.map((answer, i) => (
                           <li key={answer.id} className={`p-2 rounded text-sm ${answer.correct ? 'bg-green-50 text-green-800' : 'text-gray-700'}`}>
                              {String.fromCharCode(97 + i)}) {answer.text}
                              {answer.correct && <span className="ml-2 text-xs font-medium">(✓)</span>}
                              <span className="text-xs text-gray-400 ml-2">ID: {answer.id}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

         </main>
      </div>
   );
}
