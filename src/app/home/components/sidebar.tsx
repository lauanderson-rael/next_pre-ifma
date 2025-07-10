/* descricao: barra lateral para navegacao desktop*/
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome } from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { FaUserCog,  } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

export default function Sidebar() {
   const pathname = usePathname();

   const menu = [
      { href: "/home", icon: <IoHome size={22} />, texto: "Início" },
      { href: "/home/provas", icon: <AiOutlineProfile size={22} />, texto: "Provas" },
      { href: "/home/ranking", icon: <FaRankingStar size={22} />, texto: "Ranking" },
      { href: "/home/profile", icon: <FaUserCog size={22} />, texto: "Perfil" },
   ];

   return (
      <aside className="hidden md:flex flex-col w-52 h-[calc(100vh-60px)] bg-green-800 text-white p-4 shadow-lg ">
         <h2 className="text-xl font-bold mb-6">Menu</h2>

         <nav className="flex flex-col gap-3">
            {menu.map((item) => (
               <Link key={item.href} href={item.href}>
                  <div
                     className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors duration-200 hover:bg-black/25 ${
                        pathname === item.href ? "bg-black/50 font-semibold" : ""
                     }`}
                  >
                     {item.icon}
                     <span>{item.texto}</span>
                  </div>
               </Link>
            ))}
         </nav>
      </aside>
   );
}
