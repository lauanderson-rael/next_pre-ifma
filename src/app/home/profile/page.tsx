'use client';
import { FiLogOut } from "react-icons/fi";
import TopTitle from "../components/topTitle";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
   return (
      <div className="flex flex-col justify-between h-100">

         <main className="flex flex-col items-center bg-gray-300 rounded-b-3xl">
            <TopTitle title="Perfil" />

            <div className="py-4 ">
               <Image className="mx-auto mb-4 rounded-full"  src="/user.png" alt="logo" width={90} height={90} quality={100} />
               <div><b>Nome:</b>Junior Teste Da Silva</div>
               <div><b>Email:</b>juniorteste19@gmail.com</div>
               <div><b>Nível:</b>Iniciante</div>
               <div><b>Questões resolvidas:</b>113</div>

            </div>
         </main>

         <Link href="/" className="mx-auto flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
            <FiLogOut />
         </Link>
      </div>
   );
}
