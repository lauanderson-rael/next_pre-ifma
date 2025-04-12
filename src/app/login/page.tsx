import { MdAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
   return (
      <main className="flex flex-col min-h-screen items-center gap-4 sm:gap-16 bg-gray-100">

         <div className=" bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>
            <div className="text-sm text-gray-200">O seu preparatório para ingressar no IFMA</div>

            <Image className="mt-5"  src="/logo.png" alt="logo" width={90} height={90} quality={100} />
         </div>


         <div className="w-full max-w-md sm:bg-white p-6 sm:rounded-lg sm:shadow-md">
            <h2 className="text-2xl font-extrabold text-center text-black mb-6">
               Entrar
            </h2>

            <form className="space-y-4">
               <div className="flex items-center gap-2 ">
                  <label className="block text-sm font-medium text-gray-700"><MdAlternateEmail size={24} /></label>
                  <input
                     type="email"
                     className="w-full p-2 border-b  outline-none"
                     placeholder="Digite seu e-mail"
                  />
               </div>

               <div className="flex items-center gap-2 ">
                  <label className="block text-sm font-medium text-gray-700"><FiLock size={24} /></label>
                  <input
                     type="password"
                     className="w-full p-2 border-b outline-none"
                     placeholder="Digite sua senha"
                  />
               </div>

               <Link href='/home'>
               <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded-4xl hover:bg-green-700 transition"
               >
                  Acessar
               </button>
               </Link>
            </form>

            <div className="mt-2 text-center text-[14px]">
           <span>Ainda não possue uma conta? </span>

               <Link href="/register" className=" text-black underline">Cadastre-se</Link>
            </div>
         </div>
      </main>
   );
}
