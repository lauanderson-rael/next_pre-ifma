
'use client';

import { useState } from "react";
import TopTitle from "../components/topTitle";
import { api } from "@/app/services/api";

type PDFExam = {
   id: number
   title: string
   year: number
   type_pdf: string
   url_jig: string
   url_exam: string
}

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
         fetchPDFs();
         setMostrarResultados(true);
      }
   };

   const [pdfs, setPdfs] = useState<PDFExam[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchPDFs = async () => {
      try {
         const res = await api.get('/pdf_exams')
         console.log('PDFs:', res.data)
         setPdfs(res.data || [])
      } catch (err: any) {
         setError(err.response?.data?.error || 'Erro ao buscar PDFs')
      } finally {
         // setLoading(false)
      }
   }

   return (
      <div >
         <TopTitle title="Baixar seletivos anteriores" />
         <main className=" flex flex-col items-center gap-4  max-h-[calc(100dvh-160px)] overflow-y-auto">

            <section className="w-full max-w-3xl space-y-2 px-4 mt-2">
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
                     Buscar
                  </button>
               </div>
            </section>

            {mostrarResultados && (
               <section className="w-full max-w-3xl flex flex-col gap-6 px-4 mt-6 mb-20">
                  <div className="text-center text-gray-700 font-semibold">Resultado:</div>
                  {pdfs.map(pdf => (
                     <div key={pdf.id} className="flex justify-between items-center gap-8 bg-gray-300 p-4 rounded-lg shadow">
                        <div>
                           <h3 className="text font-bold text-amber-900 mb-2 text-sm md:text-base">{pdf.title}</h3>
                           <p className="text-sm font-semibold md:text-base">{pdf.year} - Prova Forma {pdf.type_pdf}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                           <a href={pdf.url_exam} className="inline-block  px-4 py-2 text-sm md:text-base bg-red-700 text-white rounded hover:bg-red-900">
                              Prova
                           </a>
                           <a href={pdf.url_jig} className="inline-block px-4 py-2 text-sm md:text-base bg-green-700 text-white rounded hover:bg-green-900">
                              Gabarito
                           </a>

                        </div>
                     </div>
                  ))}


               </section>
            )}
         </main>
      </div>
   );
}
