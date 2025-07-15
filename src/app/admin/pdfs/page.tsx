// 'use client'
// import { useState } from "react"
// import { FaArrowLeft } from "react-icons/fa6"
// import HeaderTitle from "../../components/headerTitle"
// import PDFList from "./getPDFs"

// export default function UploadPDFPage() {
//   const [formData, setFormData] = useState({
//     title: "",
//     year: "2025",
//     type_pdf: "integrated",
//     url_jig: "",
//     url_exam: ""
//   })

//   const [status, setStatus] = useState<string | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const res = await fetch("https://www.preifma.site/api/pdf_exams", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem('preifma.token') || ''}`
//         },
//         body: JSON.stringify({
//           ...formData,
//           year: Number(formData.year)
//         })
//       })

//       const data = await res.json()

//       if (!res.ok) {
//         throw new Error(data.error || "Erro ao enviar o PDF")
//       }

//       setStatus("PDF enviado com sucesso!")
//       setFormData({
//         title: "",
//         year: "2025",
//         type_pdf: "integrated",
//         url_jig: "",
//         url_exam: ""
//       })
//     } catch (error: any) {
//       setStatus(`Erro: ${error.message}`)
//     }
//   }

//   return (
//     <div>
//     <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
   
//     <main className="flex flex-col items-center justify-center px-4 bg-gray-50">
//       <h1 className="text-2xl font-bold text-black mb-6 mt-4">Cadastrar PDF de Prova</h1>

//       <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Título da prova"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
//         />

//         <select
//           name="year"
//           value={formData.year}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
//         >
//           <option value="">Selecione o ano</option>
//           <option value="2025">2025</option>
//           <option value="2024">2024</option>
//           <option value="2023">2023</option>
//           <option value="2023">2022</option>
//         </select>

//         <select
//           name="type_pdf"
//           value={formData.type_pdf}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
//         >
//           <option value="integrated">Integrado</option>
//           <option value="subsequent">Subsequente</option>
//           <option value="concomitant">Concomitante</option>
//         </select>

//         <input
//           type="url"
//           name="url_jig"
//           placeholder="URL do gabarito (JIG)"
//           value={formData.url_jig}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
//         />

//         <input
//           type="url"
//           name="url_exam"
//           placeholder="URL do PDF da prova"
//           value={formData.url_exam}
//           onChange={handleChange}
//           required
//           className="w-full p-3 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
//         >
//           Enviar PDF
//         </button>

//         {status && (
//           <div className={`mt-4 text-center font-medium ${status.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
//             {status}
//           </div>
//         )}
//       </form>

//       <div className="mt-2 w-full max-w-lg">
//         <PDFList/>
//       </div>
//     </main>
//      </>
//   )
// }
'use client'
import { useState } from "react"
import { api } from '../../services/api'
import TopTitle from "@/app/home/components/topTitle"
import { FaArrowLeft } from "react-icons/fa6"
import HeaderTitle from "../../components/headerTitle"
import PDFList from "./getPDFs"

export default function UploadPDFPage() {
  const [formData, setFormData] = useState({
    title: "",
    year: "2025",
    type_pdf: "integrated",
    url_jig: "",
    url_exam: ""
  })

  const [status, setStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post('/pdf_exams', {
        ...formData,
        year: Number(formData.year)
      }, )

      setStatus("PDF enviado com sucesso!")

      setFormData({
        title: "",
        year: "2025",
        type_pdf: "integrated",
        url_jig: "",
        url_exam: ""
      })

    } catch (error: any) {
      console.error("Erro ao enviar PDF:", error)
      setStatus(`Erro: ${error.response?.data?.error || error.message}`)
    }
  }

  return (
    <div>
    <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/admin" />
    <TopTitle title="Gerenciamento de PDFs (provas e gabaritos)" />
    
    <main className=" flex flex-col items-center justify-center max-h-[calc(100dvh-100px)] overflow-y-auto">
      <div className="w-[140px]"></div>
      <h1 className="text-2xl font-bold text-black mb-6 mt-6">Enviar PDF de Prova</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título da prova"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
        />

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecione o ano</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          name="type_pdf"
          value={formData.type_pdf}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
        >
          <option value="integrated">Integrado</option>
          <option value="subsequent">Subsequente</option>
          <option value="concomitant">Concomitante</option>
        </select>

        <input
          type="url"
          name="url_jig"
          placeholder="URL do gabarito (JIG)"
          value={formData.url_jig}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
        />

        <input
          type="url"
          name="url_exam"
          placeholder="URL do PDF da prova"
          value={formData.url_exam}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
        >
          Enviar PDF
        </button>

        {status && (
          <div className={`mt-4 text-center font-medium ${status.startsWith("") ? "text-green-600" : "text-red-600"}`}>
            {status}
          </div>
        )}
      </form>

      <div className="w-full max-w-3xl">
      <PDFList/>
    </div>
    </main>
    
    </div>
  )
}
