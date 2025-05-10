// 'use client';
// export default function ProvasPage() {
//    return (
//       <main className="flex flex-col items-center gap-20 bg-gray-100">

//         <h1>Pagina de Provas</h1>
//          <div>
//             <b>selecione o ano:</b>
//             <select>
//                <option>2023</option>
//                <option>2022</option>
//                <option>2021</option>
//             </select>
//          </div>
//       </main>
//    );
// }

'use client';

import { useState } from "react";
import TopTitle from "../components/topTitle";

export default function ProvasPage() {
  const [tipo, setTipo] = useState("");
  const [ano, setAno] = useState("");
  const [campus, setCampus] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const tipos = ["Integrado", "Subsequente", "Concomitante"];
  const anos = ["2024", "2023", "2022", "2021", "2020"];
  const campi = ["Coelho Neto"]; // agora é um array

  const buscarProvas = () => {
    if (tipo && ano && campus) {
      setMostrarResultados(true);
    }
  };

  return (
    <main className="flex flex-col items-center gap-10 bg-gray-100 h-100">
      <TopTitle title="Baixar seletivos anteriores" />

      <section className="w-full max-w-xl space-y-6 px-4">
        {/* Tipo de prova */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Tipo de prova</label>
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
            Buscar
          </button>
        </div>
      </section>

      {/* Resultados */}
      {mostrarResultados && (
        <section className="w-full max-w-3xl mt-8 grid md:grid-cols-2 gap-6 px-4">
          <div className="bg-green-50 border border-green-300 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Prova - {ano} ({campus})
            </h3>
            <a
              href="#"
              className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Baixar PDF
            </a>
          </div>

          <div className="bg-green-50 border border-green-300 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Gabarito - {ano} ({campus})
            </h3>
            <a
              href="#"
              className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Baixar PDF
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
