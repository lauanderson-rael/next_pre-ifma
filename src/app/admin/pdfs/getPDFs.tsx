'use client'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

type PDFExam = {
  id: number
  title: string
  year: number
  type_pdf: string
  url_jig: string
  url_exam: string
}

export default function PDFList() {
  const [pdfs, setPdfs] = useState<PDFExam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const res = await api.get('/pdf_exams')
        setPdfs(res.data || [])
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao buscar PDFs')
      } finally {
        setLoading(false)
      }
    }
    fetchPDFs()
  }, [])

  if (loading) return <p className="text-center text-gray-500">Carregando PDFs...</p>
  if (error) return <p className="text-center text-red-600">{error}</p>
  if (pdfs.length === 0) return <p className="text-center text-gray-500">Nenhum PDF encontrado.</p>

  return (
    <div className="mt-2 w-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-black text-center">Lista de PDFs enviados ({pdfs.length})</h2>
      <ul className="space-y-4">
        {pdfs.map(pdf => (
          <li key={pdf.id} className="p-4  shadow rounded-md shadow-sm bg-gray-200 mb-2">
            <div className=" gap-2  items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{pdf.title} - {pdf.year}</h3>
    
              <span className="text-sm text-gray-500"><strong>Tipo: </strong>{pdf.type_pdf}</span>
            </div>
            <div className="text-sm text-blue-700 underline space-y-1">
              <p><a href={pdf.url_exam} target="_blank"> Visualizar prova</a></p>
              <p><a href={pdf.url_jig} target="_blank"> Visualizar gabarito (JIG)</a></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
