'use client';
import { FiLogOut } from "react-icons/fi";
import TopTitle from "../components/topTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect , useState} from "react";
import { randomInt } from "crypto";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

    const [user, setUser] = useState<{ email: string; name: string } | null>(null)
    useEffect(() => {
      const stored = localStorage.getItem('user')
      if (!stored) {
        router.push('/') 
        return
      } 
      const parsed = JSON.parse(stored)
      setUser(parsed)
    }, [])

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
