import { MdAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";

export default function LoginPage() {
   return (
      <main className="flex flex-col min-h-screen items-center gap-20 bg-gray-100">

         <div className=" bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-extrabold text-white">PRE-IFMA</h1>
            <div className="text-sm text-gray-100">O seu preparatório para ingressar no IFMA</div>
         </div>

         <img className="fixed mt-[138px]" src="/logo.png" alt="logo" width={130} />

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

               <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded-4xl hover:bg-green-700 transition"
               >
                  Acessar
               </button>
            </form>

            <div className="mt-2 text-center text-[14px]">
           <span>Ainda não possue uma conta? </span>
               <a href="signUp" className=" text-black underline">
               Cadastre-se
               </a>
            </div>
         </div>
      </main>
   );
}
