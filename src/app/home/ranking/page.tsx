'use client';
import TopTitle from "../components/topTitle";
import { IoBuild } from "react-icons/io5";

export default function rankingPage() {

   return (
      <div className="flex flex-col justify-between  relative">
         <main className="flex flex-col items-center bg-gray-300">
            <TopTitle title="Ranking de Usuários" />

            <h1 className="text-xl font-bold"> Página em desenvolvimento...</h1>

         </main>

         <div className="animate-pulse flex justify-center mt-20 items-center">
            <IoBuild size={60} />
         </div>

      </div>
   );
}
