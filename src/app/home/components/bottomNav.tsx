/* descricao: barra inferior para navegacao mobile */
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHome} from "react-icons/io5";
import { AiOutlineProfile } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

export default function BottomNav() {
   const pathname = usePathname();

   const navItems = [
      { href: "/home", icon: <IoHome size={24} />, label: "Início" },
      { href: "/home/provas", icon: <AiOutlineProfile size={24} />, label: "Provas" },
      { href: "/home/profile", icon: <FaUserCog size={24} />, label: "Perfil" },
   ];

   return (
      <div className="w-screen flex justify-center md:hidden">

         <nav className="fixed bottom-0 w-[92%] bg-green-600 z-50 mb-3 rounded">
            <div className="flex justify-around items-center h-16">
               {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                     <div
                        className={`flex flex-col items-center text-sm hover:bg-black/25 py-1 px-2 rounded
                           ${ pathname === item.href ? "bg-black/60 text-white py-1 px-2 rounded " : "text-white"}`
                        }>
                        {item.icon}
                        <span>{item.label}</span>
                     </div>
                  </Link>
               ))}
            </div>
         </nav>
      </div>
   );
}
