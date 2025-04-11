import { ReactNode } from "react";
import { IoBookSharp } from "react-icons/io5";

interface OptionProps {
   name: string;
   bgColor: string;
   icon: ReactNode
 }

export default function Option({name, bgColor, icon}: OptionProps) {
   return (
      <div className={`flex gap-2 justify-between rounded p-4 sm:w-[300px] hover:opacity-75`} style={{ backgroundColor: bgColor }}>
         <div className="font-bold text-gray-800">{name}</div>
         {icon}
      </div>
   );
}
