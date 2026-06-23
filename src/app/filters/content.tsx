'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import TopTitle from "../home/components/topTitle";

export default function Content() {
  const searchParams = useSearchParams();
  const option = searchParams.get('option');

  let title = "";
  switch (option) {
    case 'matematica':
      title = "Matemática";
      break;
    case 'portugues':
      title = "Português";
      break;
    default: // option=simulado
      title = "Simulado de 30 questões";
  }

  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");

  const tipos = ["Integrado", "Subsequente", "Concomitante"];
  const anos = ["2025", "2024", "2023", "2022"];

  const buscarProvas = () => {
    if (!ano || !tipo)
      return toast.error("Preencha todos os campos!");

    const params = new URLSearchParams({
      year: ano,
      subject: option || "",
      type: tipo
    });


    if (option === 'simulado') {
      window.location.href = `/filters/simulate?${params.toString()}`;
      return
    }

    window.location.href = `/filters/resolver?${params.toString()}`;
  };

  return (
    <>
      <TopTitle title={title} />
      <main className="flex flex-col items-center gap-4 max-h-[calc(100dvh-160px)] overflow-y-auto">
        <section className="w-full max-w-3xl space-y-2 px-4 mt-2">
          <div>
            <label htmlFor="tipo-prova" className="block mb-2 text-gray-700 font-medium">Tipo de prova</label>
            <select
              id="tipo-prova"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              {tipos.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="ano-prova" className="block mb-2 text-gray-700 font-medium">Ano</label>
            <select
              id="ano-prova"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              {anos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="pt-2">

            <button
              onClick={buscarProvas}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
            >
              {option === 'simulado' ? 'Iniciar simulado' : 'avancar'}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
