import { FaRegCircleUser } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
export default function Header(){
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
