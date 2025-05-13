
'use client';

import { useState } from "react";
import TopTitle from "../home/components/topTitle";
import HeaderTitle from "../components/headerTitle";
import { FaArrowLeft } from "react-icons/fa";

export default function ProvasPage() {
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [campus, setCampus] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const tipos = ["Integrado", "Subsequente", "Concomitante"];
  const anos = ["2024", "2023", "2022", "2021", "2020"];
  const campi = ["Coelho Neto"]; // agora é um array

  const buscarProvas = () => {
   //  if (tipo && ano && campus) {
   //    setMostrarResultados(true);
   //  }
    window.location.href = `/questions/questionExample`;
  };

  return (
    <div >
      <HeaderTitle title="Filtros" icon={<FaArrowLeft size={24}/> } href='/home'/>
      <TopTitle title="Português"  />
      <main className=" flex flex-col items-center gap-4  max-h-[calc(100dvh-160px)] overflow-y-auto">

      <section className="w-full max-w-xl space-y-2 px-4 mt-2">
        {/* Tipo de prova */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Selecione o tipo de prova</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Campus */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Campus</label>
          <select
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione...</option>
            {campi.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Ano */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Ano</label>
          <select
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            className="w-full p-3 border border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione...</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de buscar */}
        <div className="pt-2">

          <button
            onClick={buscarProvas}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
          >
            Avancar
          </button>
        </div>
      </section>
      </main>
    </div>
  );
}
