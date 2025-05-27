
'use client';

import { useState } from 'react';
import { api } from '../services/api';

import HeaderTitle from '@/app/components/headerTitle';
import TopTitle from '../home/components/topTitle';
import { FaArrowLeft } from 'react-icons/fa6';

export default function CreateQuestionPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: 2025,
    subject: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const handleCorrectIndexChange = (index: number) => {
    setFormData({ ...formData, correctIndex: index });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      year: Number(formData.year),
      subject: formData.subject,
      answers_attributes: formData.answers.map((text, i) => ({
        text,
        correct: i === Number(formData.correctIndex),
      })),
    };

    try {
      const res = await api.post('/questions/create', payload)

      if (res) {
        setStatus('Questão criada com sucesso!');
        console.log(res.status)
        console.log(res.data)
      } else {
        setStatus('Erro ao criar a questão.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Erro de rede.');
    }
  };

  async function listQuestions (){
    const res = await api.get('/questions/create')
    return res.data
  }

  return (
    <div>
      <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
      <TopTitle title="Adicionar nova questão" />

      <main className="flex flex-col items-center max-h-[calc(100dvh-160px)] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Criar nova questão</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4 px-4 mt-2">
          <input
            type="text"
            name="title"
            placeholder="Título"
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            rows={4}
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Ano"
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Disciplina"
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <div>
            <label className="font-medium block mb-1">Alternativas</label>
            {formData.answers.map((ans, i) => (
              <div key={i} className="flex items-center mb-2 gap-2">
                <input
                  type="radio"
                  name="correctIndex"
                  value={i}
                  checked={formData.correctIndex === i}
                  onChange={() => handleCorrectIndexChange(i)}
                  className="w-5 h-5 accent-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={ans}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                  required
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
      </main>
    </div>
  );
}

