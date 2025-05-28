'use client';
import { FiLogOut } from "react-icons/fi";
import TopTitle from "../components/topTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";
 
export default function ProfilePage() {
  const router = useRouter();
  const {isAuthenticated, user} = useContext(AuthContext)

  const handleLogout = () => {
    localStorage.removeItem('preifma.token');
    localStorage.removeItem('preifma.user')
    router.push('/');
  };

   useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);



  return (
    <div className="flex flex-col justify-between h-100">
      <main className="flex flex-col items-center bg-gray-300 rounded-b-3xl">
        <TopTitle title="Perfil" />
        <div className="py-4">
          <Image className="mx-auto mb-4 rounded-full" src="/user.png" alt="logo" width={90} height={90} quality={100} />
          <div><b>Nome:</b> {user?.name || 'carregando'}</div>
          <div><b>Email:</b> {user?.email || 'carregando'}</div>
          <div><b>Nível:</b> Iniciante</div>
          <div><b>Questões resolvidas:</b> 46</div>

        </div>
      </main>

      <button
        onClick={handleLogout}
        className="mx-auto flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
        <FiLogOut />
      </button>
    </div>
  );
}
