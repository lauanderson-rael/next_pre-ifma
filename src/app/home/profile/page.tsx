'use client';
import { FiLogOut } from "react-icons/fi";
import TopTitle from "../components/topTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
import { api } from "@/app/services/api";
import { Mail } from "lucide-react";

interface UserAnswer {
   id: number;
   user_id: number;
   question_id: number;
   answer_id: number;
   correct: boolean;
   created_at: string; // ou Date, se você quiser converter
   updated_at: string;
}

export default function ProfilePage() {
   const router = useRouter();
   const { isAuthenticated, user, logout } = useContext(AuthContext);
   const [showModal, setShowModal] = useState(false);
   const [showAnswersModal, setShowAnswersModal] = useState(false);


   const handleLogout = () => {
      logout();
      router.push('/login');
   };

   useEffect(() => {
      if (!isAuthenticated) {
         router.push('/login');
      }
   }, [isAuthenticated, router]);



   const [answers, setAnswers] = useState<UserAnswer[]>([]);
   useEffect(() => {
      api.get("/simulates/results")
         .then((res) => {
            setAnswers(res.data.user_answers)
            console.log("data user: ", res.data.user_answers)
         })
         .catch((err) => console.error(err));
   }, []);

   const total = answers.length;
   const corretas = answers.filter(r => r.correct).length;
   const incorretas = total - corretas;
   const taxaAcerto = ((corretas / total) * 100).toFixed(2);
   const pontos = corretas * 10;

   return (
      <div className="flex flex-col justify-between h-100 relative">
         <main className="flex flex-col items-center bg-gray-300 rounded-b-3xl">
            <TopTitle title="Perfil" />
            <div className="py-4">
               <Image
                  className="mx-auto mb-4 rounded-full "
                  src={'/user.png'}
                  alt="logo"
                  width={90}
                  height={90}
                  quality={100}
               />

               <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'Carregando...'}</h2>
                  <p className="text-gray-600 flex items-center gap-1 justify-center mt-1">
                     <Mail className="w-4 h-4" />
                     {user?.email || 'Carregando...'}
                  </p>
               </div>

               <div className="text-center mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded shadow-lg">
                  <span className="font-bold text-lg">{pontos} XP</span>
               </div >

               <div className="text-center mt-4 text-gray-600">

                  <div><b>Total de respostas:</b> {answers.length}</div>
                  <div><b>Respostas corretas:</b> {corretas}</div>
                  <div><b>Respostas incorretas:</b> {incorretas}</div>
                  <div><b>Taxa de acerto:</b> {taxaAcerto}%</div>
               </div>
            </div>
         </main>

         {/* novo */}
         <button
            onClick={() => setShowAnswersModal(true)}
            className="sm:w-50 flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-3 m-4 px-4 rounded sm:mx-auto "
         >
            Ver últimas respostas
         </button>

         {showAnswersModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
                  <button
                     onClick={() => setShowAnswersModal(false)}
                     className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-gray-800"
                  >
                     &times;
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Últimas respostas</h2>
                  {answers.length === 0 ? (
                     <p>Nenhuma resposta encontrada.</p>
                  ) : (
                     <ul className="space-y-2 max-h-96 overflow-y-auto">
                        {answers
                           .slice(-5)
                           .reverse()
                           .map((r) => (
                              <li key={r.id} className="bg-gray-100 p-3 rounded shadow-sm">
                                 <p><strong>Questão:</strong> {r.question_id}</p>
                                 <p><strong>Resposta:</strong> {r.answer_id}</p>
                                 <p className={r.correct ? "text-green-600" : "text-red-600"}>
                                    {r.correct ? "Correta" : "Incorreta"}
                                 </p>
                                 <p className="text-sm text-gray-500">
                                    Respondida em: {new Date(r.created_at).toLocaleString()}
                                 </p>
                              </li>
                           ))}
                     </ul>
                  )}
               </div>
            </div>
         )}

         {/* novo */}

         <button
            onClick={() => setShowModal(true)}
            className="sm:mx-auto sm:w-50  flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold mx-4 py-3 px-4  rounded  "
         >
            Logout
            <FiLogOut />
         </button>


         {/* Modal de confirmação */}
         {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
               <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative text-center">
                  <button
                     onClick={() => setShowModal(false)}
                     className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-gray-800"
                  >
                     &times;
                  </button>
                  <h2 className="text-xl font-bold mb-4">Deseja sair?</h2>
                  <p className="mb-6">Você será desconectado da sua conta.</p>
                  <div className="flex justify-center gap-4">
                     <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                     >
                        Sim, sair
                     </button>
                     <button
                        onClick={() => setShowModal(false)}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                     >
                        Cancelar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
