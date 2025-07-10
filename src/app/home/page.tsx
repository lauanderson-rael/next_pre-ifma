"use client"
import { useEffect, useState } from "react";
import Option from "./components/option";
import CardInfo from "./components/cardInfo";
import { IoBookSharp } from "react-icons/io5";
import { SiLibreofficemath } from "react-icons/si";
import { AiOutlineProfile } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { RiNumbersFill } from "react-icons/ri";
import Link from "next/link";
import { api } from "../services/api";
import Carousel from "./components/carousel";

type UserDataType = {
   email: string;
   name: string;
   current_streak: number;
   count_user_answers: number;
   count_user_correct_answers: number;
};


export default function Home() {

   const [dataUser, setDataUser] = useState<UserDataType | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      api.get("/users/data")
         .then((res) => setDataUser(res.data))
         .catch((err) => console.error(err))
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <p className="text-center text-xl text-green-700 font-semibold mt-8 ">
      Carregando...
   </p>;

   return (
      <div className="mx-auto px-3 md:px-[250px] h-[calc(100vh-60px)] overflow-y-auto">

         {/* <div className="w-full mt-2 bg-gray-200 relative flex items-center justify-center">
            <img
               src='/banner1.png'
               alt='image'
               className="object-contain w-full h-full bg-white"
               draggable={false}
            />
         </div> */}

         <div className="mt-2">
            {<Carousel images={['/banner1.png', '/banner2.png']} /> }
         </div>

         <h1 className="text-2xl font-bold mt-2 text-center">O que deseja estudar?</h1>

         <div className="mt-4 flex flex-col gap-2 md:gap-4 md:flex-row md:justify-around">
            <Link href={"/filters?option=portugues"} className="md:w-full">
               <Option
                  name="Português"
                  bgColor="#F0BE84"
                  icon={<IoBookSharp size={24} fill="blue" />}
               />
            </Link>

            <Link href={"/filters?option=matematica"} className="md:w-full">
               <Option
                  name="Matemática"
                  bgColor="#6CB1DB"
                  icon={<SiLibreofficemath size={24} fill="green" />}
               />
            </Link>

            <Link href={"/filters?option=simulado"} className="md:w-full">
               <Option
                  name="Simulados"
                  bgColor="#E6E6E6"
                  icon={<AiOutlineProfile size={24} fill="black" />}
               />
            </Link>

         </div>

         <p className="text-xl font-bold text-center text-gray-600 mt-5 mb-2.5 ">Estatísticas</p>

         <div className="flex gap-2 mt-4 mb-32 sm:mb-20">
            <CardInfo
               title="Questões Resolvidas"
               bgColor="#369FFF"
               qtd={dataUser?.count_user_answers as number}
               icon={<RiNumbersFill size={60} fill="#fff" />}
            />

            <CardInfo

               title="Quantidade de acertos"
               bgColor="#319F43"
               qtd={dataUser?.count_user_correct_answers as number}
               icon={<FaCheckCircle size={60} fill="#fff" />}
            />
         </div>
      </div>
   );
}
