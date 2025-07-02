'use client';
import { useState } from 'react';

export default function GeminiForm() {
  const [prompt, setPrompt] = useState('');
  const [resposta, setResposta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResposta('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Erro desconhecido');

      setResposta(data.text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite seu prompt..."
          rows={4}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Enviar'}
        </button>
      </form>

      {resposta && (
        <div className="mt-6 p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          {resposta}
        </div>
      )}
    </div>
  );
}
