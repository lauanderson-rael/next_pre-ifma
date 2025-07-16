
'use client';

import { useState } from "react";
import TopTitle from "../components/topTitle";
import { FaDownload } from "react-icons/fa";
import { api } from "@/app/services/api";
import toast from "react-hot-toast";

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
   const [mostrarResultados, setMostrarResultados] = useState(false);

   const [pdfs, setPdfs] = useState<PDFExam[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const buscarProvas = () => {
      if (tipo && ano) {
         fetchPDFs();
         setMostrarResultados(true);
      }
      else {return toast.error("Preencha todos os campos!");}
   };

   const fetchPDFs = async () => {
      try {
         const res = await api.get('/pdf_exams')
         const filteredPDFs = res.data.filter((pdf: PDFExam) => pdf.type_pdf === tipo && pdf.year === Number(ano))
         setPdfs(filteredPDFs || [])
      } catch (err: any) {
         setError(err.response?.data?.error || 'Erro ao buscar PDFs')
      } finally {
         setLoading(false)
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
                     <option value="integrated">Integrado</option>
                     <option value="subsequent">Subsequente</option>
                     <option value="concomitant">Concomitante</option>
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
                     <option value="2025">2025</option>
                     <option value="2024">2024</option>
                     <option value="2023">2023</option>
                     <option value="2022">2022</option>
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
                  {pdfs.map(pdf =>(
                     <div key={pdf.id} className="flex justify-between items-center gap-8 bg-gray-300 p-4 rounded-lg shadow border border-gray-400">
                        <div>
                           <h3 className="text font-bold text-amber-900 mb-2 text-sm md:text-base">PROCESSO SELETIVO DE ALUNOS - IFMA {pdf.year}</h3>
                           <p className="text-sm font-semibold md:text-base">{pdf.title} - {pdf.year}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                           <a href={pdf.url_exam} className="flex items-center justify-between gap-2  px-4 py-2 text-sm md:text-base bg-red-700 text-white rounded hover:bg-red-900">
                              Prova <FaDownload size={14}/>
                           </a>
                           <a href={pdf.url_jig} className="flex items-center justify-between gap-2  px-4 py-2 text-sm md:text-base bg-green-700 text-white rounded hover:bg-green-900">
                              Gabarito <FaDownload size={14}/>
                           </a>

                        </div>
                     </div>
                  ))}

                  {pdfs.length === 0 && <p className="text-center text-gray-500">Nenhum arquivo encontrado.</p>}
               </section>
            )}
         </main>
      </div>
   );
}
