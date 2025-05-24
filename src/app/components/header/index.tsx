'use client';

import { FaRegCircleUser } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Header(){

   const [user, setUser] = useState<{ nome?: string; email?: string } | null>(null);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.error || 'Erro ao buscar usuário');
        }
      } catch (err: any) {
        setError(err.message || 'Erro na requisição');
      }
    }

    fetchUser();
  }, []);

   return(
      <header className=" bg-green-600 h-[80px] w-screen flex justify-between items-center text-white px-4 ">
         <div className="flex gap-2">
            <FaRegCircleUser size={26} fill="white"/>
            <div>Olá, Júnior</div>
         </div>
         {/* icone ofensiva */}
         <div className="flex justify-between items-center gap-1 bg-white rounded text-black py-1 pl-1 pr-2">
            <BsFire size={18} fill="orange"/>
            12
         </div>
      </header>
   )
}
