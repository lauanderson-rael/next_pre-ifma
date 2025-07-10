/*descricao: componente de opcao de disciplina da tela home */
import { ReactNode } from "react";

interface OptionProps {
   name: string;
   bgColor: string;
   icon: ReactNode
 }

export default function Option({name, bgColor, icon}: OptionProps) {
   return (
      <div className="flex gap-2 justify-between rounded p-4 hover:opacity-75 shadow transition-transform duration-300 md:hover:scale-105" style={{ backgroundColor: bgColor }}>
         <div className="font-bold text-gray-800">{name}</div>
         {icon}
      </div>
   );
}
