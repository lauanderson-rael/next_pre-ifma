'use client'
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"
import HeaderTitle from "../components/headerTitle"

export default function AdminPage() {
  return (
    <>
    <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
    <main className=" flex flex-col items-center justify-center px-4 mt-10">
      
      <h1 className="text-3xl font-bold text-black mb-10 text-center">
        Bem-vindo ao Painel Administrativo
      </h1>

      <div className="grid gap-6 w-full max-w-md">
        <Link
          href="/admin/questions"
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg shadow transition-all"
        >
          Gerenciar Questões
        </Link>

        <Link
          href="/admin/pdfs"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow transition-all"
        >
          Gerenciar PDFs
        </Link>
      </div>
    </main>
    </>
  )
}
