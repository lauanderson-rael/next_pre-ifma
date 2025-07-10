
'use client'

// import { AuthContext } from "../contexts/AuthContext";
import { BsFire } from "react-icons/bs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "../services/api";

type UserDataType = {
   name: string;
   current_streak: number;
};


export default function Header() {
//   const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const [dataUser, setDataUser] = useState<UserDataType | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
        api.get("/users/data")
           .then((res) => setDataUser(res.data))
           .catch((err) => console.error(err))
           .finally(() => setLoading(false));
     }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-green-600 h-[60px] w-full flex justify-between items-center text-white px-4">
        <div className="flex gap-2 justify-center items-center">
          <Link href="/home/profile">
            <img className="w-9 h-9 rounded-full hover:opacity-80" src="/user.png" alt="Usuário" />
          </Link>
          {dataUser ? (
            <div>Olá, {dataUser.name || 'Nome não informado'}</div>
          ) : (
            <p>Carregando...</p>
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex justify-between items-center gap-1 bg-white hover:opacity-80 rounded text-black py-1 pl-1 pr-2"
        >
          <BsFire size={18} fill="orange" />
          {dataUser?.current_streak}
        </button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-lg font-bold hover:text-gray-800"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">O que é uma sequência 🔥?</h2>
            <p className="text-gray-700">
              Uma sequência representa os dias consecutivos em que você estuda sem interrupções.
              Mantenha sua sequência ativa praticando todos os dias!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
