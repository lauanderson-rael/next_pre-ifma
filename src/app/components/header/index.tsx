import { FaRegCircleUser } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
export default function Header(){
   return(
      <header className=" bg-green-600 h-[80px] w-screen flex justify-between items-center text-white px-4 sm:px-18">
         <div className="flex gap-2">
            <FaRegCircleUser size={26} fill="white"/>
            <div>Olá, Júnior</div>
         </div>

         <div className="flex gap-1 bg-white p-1 rounded text-black">
            <BsFire size={20} fill="orange"/>
            12
         </div>
      </header>
   )
}
