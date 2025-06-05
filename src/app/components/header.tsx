
import { FaRegCircleUser } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";

export default function Header() {
  const {user} = useContext(AuthContext)
  
  return (
    <header className=" bg-green-600 h-[80px] w-screen flex justify-between items-center text-white px-4 ">
      <div className="flex gap-2">
        <Link href={'/home/profile'}>
          <FaRegCircleUser size={26} fill="white" />
         </Link>
        {user ? (
            <div>Olá, {user.name || 'Nome não informado'}</div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
     
      <div className="flex justify-between items-center gap-1 bg-white rounded text-black py-1 pl-1 pr-2">
        <BsFire size={18} fill="orange" />
        {user?.current_streak}
      </div>
    </header>
  )
}