'use client';
import { FiLogOut } from "react-icons/fi";
import TopTitle from "../components/topTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('preifma.token');
    localStorage.removeItem('preifma.user');
    router.push('/');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex flex-col justify-between h-100 relative">
      <main className="flex flex-col items-center bg-gray-300 rounded-b-3xl">
        <TopTitle title="Perfil" />
        <div className="py-4">
          <Image
            className="mx-auto mb-4 rounded-full"
            src="/user.png"
            alt="logo"
            width={90}
            height={90}
            quality={100}
          />
          <div><b>Nome:</b> {user?.name || 'carregando'}</div>
          <div><b>Email:</b> {user?.email || 'carregando'}</div>
          <div><b>Nível:</b> Iniciante</div>
          <div><b>Questões resolvidas:</b> 46</div>
        </div>
      </main>

      <button
        onClick={() => setShowModal(true)}
        className="mx-auto flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
