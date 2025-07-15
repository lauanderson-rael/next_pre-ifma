'use client';

import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import Image from "next/image";

export default function ForgotPasswordPage() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const { register, handleSubmit } = useForm();
   const router = useRouter();

   async function handlePasswordReset(data: any) {
      setLoading(true);
      setError('');

      try {
         await api.post('/password_resets', {
            email: data.email,
         });

         toast.success('E-mail enviado com sucesso!');
         router.push('/login');
      } catch (err) {
         setError('Não foi possível enviar o e-mail. Verifique se está correto.');
      } finally {
         setLoading(false);
      }
   }

   return (
      <main className="flex flex-col min-h-screen items-center gap-4 sm:gap-16 bg-gray-100">
         <div className="bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>

             <div className="text-sm text-white">O seu preparatório para ingressar no IFMA</div>
                        <Image className="mt-5" src="/logo.png" alt="logo" width={90} height={90} quality={100} priority />
         </div>

         <div className="w-full max-w-md sm:bg-white p-6 sm:rounded-lg sm:shadow-md">
            <h2 className="text-2xl font-extrabold text-center text-black mb-6">Redefinir Senha</h2>

            <form className="space-y-4" onSubmit={handleSubmit(handlePasswordReset)}>
               <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                     <MdAlternateEmail size={24} />
                  </label>
                  <input
                     {...register('email')}
                     type="email"
                     className="w-full p-2 border-b outline-none"
                     placeholder="Digite seu e-mail"
                     onChange={() => setError('')}
                     required
                  />
               </div>

               {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm text-center">
                     {error}
                  </div>
               )}

               <button
                  type="submit"
                  className={`w-full p-3 rounded-4xl transition text-white ${loading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  disabled={loading}
               >
                  {loading ? 'Enviando...' : 'Enviar e-mail'}
               </button>
            </form>

            <div className="mt-4 text-center text-[14px]">
               <span>Lembrou sua senha? </span>
               <a href="/login" className="text-black underline">Voltar ao login</a>
            </div>
         </div>
      </main>
   );
}
