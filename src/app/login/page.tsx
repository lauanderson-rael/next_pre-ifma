
// 'use client';

// import { MdAlternateEmail } from "react-icons/md";
// import { FiLock } from "react-icons/fi";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//    const router = useRouter();


//    const handleLogin = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setError('');

//       try {
//          const response = await fetch('/api/proxy/login', {
//             method: 'POST',
//             headers: {
//                'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//          });

//          const data = await response.json();

//          if (!response.ok) {
//             throw new Error(data.error || 'Erro ao fazer login');
//          }

//          localStorage.setItem('token', data.token);
//          router.push('/home');
//       } catch (err: any) {
//          setError(err.message || 'Erro inesperado');
//       }
//    };

//    return (
//       <main className="flex flex-col min-h-screen items-center gap-4 sm:gap-16 bg-gray-100">
//          <div className="bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center">
//             <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>
//             <div className="text-sm text-gray-200">O seu preparatório para ingressar no IFMA</div>
//             <Image className="mt-5" src="/logo.png" alt="logo" width={90} height={90} quality={100} />
//          </div>

//          <div className="w-full max-w-md sm:bg-white p-6 sm:rounded-lg sm:shadow-md">
//             <h2 className="text-2xl font-extrabold text-center text-black mb-6">Entrar</h2>

//             <form className="space-y-4" onSubmit={handleLogin}>
//                <div className="flex items-center gap-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                      <MdAlternateEmail size={24} />
//                   </label>
//                   <input
//                      type="email"
//                      className="w-full p-2 border-b outline-none"
//                      placeholder="Digite seu e-mail"
//                      value={email}
//                      onChange={(e) => setEmail(e.target.value)}
//                      required
//                   />
//                </div>

//                <div className="flex items-center gap-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                      <FiLock size={24} />
//                   </label>
//                   <input
//                      type="password"
//                      className="w-full p-2 border-b outline-none"
//                      placeholder="Digite sua senha"
//                      value={password}
//                      onChange={(e) => setPassword(e.target.value)}
//                      required
//                   />
//                </div>

//                <button
//                   type="submit"
//                   className="w-full bg-green-600 text-white p-3 rounded-4xl hover:bg-green-700 transition"
//                >
//                   Acessar
//                </button>
//             </form>

//             {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

//             <div className="mt-2 text-center text-[14px]">
//                <span>Ainda não possue uma conta? </span>
//                <Link href="/register" className="text-black underline">Cadastre-se</Link>
//             </div>
//          </div>
//       </main>
//    );
// }
'use client';

import { MdAlternateEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
         const response = await fetch('/api/proxy/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.error || 'Erro ao fazer login');
         }

         localStorage.setItem('token', data.token);
         router.push('/home');
      } catch (err: any) {
         setError(err.message || 'Erro inesperado');
      } finally {
         setLoading(false);
      }
   };

   return (
      <main className="flex flex-col min-h-screen items-center gap-4 sm:gap-16 bg-gray-100">
         <div className="bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>
            <div className="text-sm text-gray-200">O seu preparatório para ingressar no IFMA</div>
            <Image className="mt-5" src="/logo.png" alt="logo" width={90} height={90} quality={100} />
         </div>

         <div className="w-full max-w-md sm:bg-white p-6 sm:rounded-lg sm:shadow-md">
            <h2 className="text-2xl font-extrabold text-center text-black mb-6">Entrar</h2>

            <form className="space-y-4" onSubmit={handleLogin}>
               <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                     <MdAlternateEmail size={24} />
                  </label>
                  <input
                     type="email"
                     className="w-full p-2 border-b outline-none"
                     placeholder="Digite seu e-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>

               <div className="flex items-center gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                     <FiLock size={24} />
                  </label>
                  <input
                     type="password"
                     className="w-full p-2 border-b outline-none"
                     placeholder="Digite sua senha"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>

               <button
                  type="submit"
                  className={`w-full p-3 rounded-4xl transition text-white ${
                     loading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
                  disabled={loading}
               >
                  {loading ? 'Carregando...' : 'Acessar'}
               </button>
            </form>

            {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

            <div className="mt-2 text-center text-[14px]">
               <span>Ainda não possue uma conta? </span>
               <Link href="/register" className="text-black underline">Cadastre-se</Link>
            </div>
         </div>
      </main>
   );
}
