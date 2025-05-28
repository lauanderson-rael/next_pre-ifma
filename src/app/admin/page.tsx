'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { api } from '../services/api';
import HeaderTitle from '@/app/components/headerTitle';
import TopTitle from '../home/components/topTitle';
import { FaArrowLeft } from 'react-icons/fa6';

type FormInputs = {
  title: string;
  description: string;
  year: string;
  subject: string;
  answers: string[];
  correctIndex: number;
};

type QuestionType = {
  id: string;
  title: string;
  description: string;
  answers: {
    id: number;
    correct: boolean;
    text: string;
  }[];
};


export default function CreateQuestionPage() {
  const disciplinas = ['Matemática', 'Português'];
  const anos = ['2025', '2024', '2023', '2022', '2021', '2020'];

  const { register, handleSubmit, control, setValue, getValues, watch, reset } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      description: '',
      year: '',
      subject: '',
      answers: ['', '', '', ''],
      correctIndex: 0,
    },
  });

  const [status, setStatus] = useState<string | null>(null);
  const answers = watch('answers');
  const correctIndex = watch('correctIndex');

  const onSubmit = async (data: FormInputs) => {
    const payload = {
      title: data.title,
      description: data.description,
      year: Number(data.year),
      subject: data.subject,
      answers_attributes: data.answers.map((text, i) => ({
        text,
        correct: i === Number(data.correctIndex),
      })),
    };

    try {
      const res = await api.post('/questions/create', payload);
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
        .then((r) => {
          console.log(Array.isArray(r.data));
          console.log(r.data)
          setQuestionsList(r.data.questions)
          return r.data
        }).catch((e) => { console.log(e) })
    }
    getQuestions()
  }, [])


  return (
    <div>
      <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
      <TopTitle title="Adicionar nova questão" />

      <main className="flex flex-col items-center max-h-[calc(100dvh-160px)] overflow-y-auto">


        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl space-y-4 px-4 mt-2">
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
            {disciplinas.map((dis) => (
              <option key={dis} value={dis}>
                {dis}
              </option>
            ))}
          </select>

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
                <Controller
                  control={control}
                  name={`answers.${i}`}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
                      className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                      required
                    />
                  )}
                />
              </div>
            ))}
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
            <div className="bg-green-300 mx-4 p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
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

        <div className="mt-4 w-full max-w-xl mx-auto ">
          <h2 className="text-3xl font-bold mb-6 text-center">Lista de Questoes</h2>
          {questionsList.map((question) => (
            <div key={question.id} className='border rounded mb-2'>
              <h3 className="text-xl font-semibold text-gray-800">{question.title}</h3>
              <p className="text-gray-600 mb-3">Descrição: {question.description}</p>

              <ul>
                {question.answers.map((answer, i) => (
                  <li key={answer.id}>
                    {String.fromCharCode(97 + i)}) {answer.text} 
                    <span className='text-green-700'>{answer.correct && '(verdadeira)'}</span>
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

