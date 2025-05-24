'use client';

import { FaRegCircleUser } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {

  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
    } else {
      router.push('/')
    }
  }, [])

  return (
    <header className=" bg-green-600 h-[80px] w-screen flex justify-between items-center text-white px-4 ">
      <div className="flex gap-2">
        <FaRegCircleUser size={26} fill="white" />
        {user ? (
            <div>Olá, {user.name || 'Nome não informado'}</div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
      </div>
     
      <div className="flex justify-between items-center gap-1 bg-white rounded text-black py-1 pl-1 pr-2">
        <BsFire size={18} fill="orange" />
        12
      </div>
    </header>
  )
}
