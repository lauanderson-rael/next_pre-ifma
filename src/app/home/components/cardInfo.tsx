/*descricao: componente de Card de informacoes da tela home */
import { ReactNode } from "react";

interface CardProps {
   title: string;
   bgColor: string;
   qtd: number;
   icon: ReactNode
 }

export default function CardInfo({title, bgColor,qtd, icon}: CardProps) {
   return (
      <div className="text-white rounded-xl shadow-md w-full  p-4"  style={{ backgroundColor: bgColor }}>
         <div className="text-center text-lg font-semibold mb-4">
            {title}
         </div>
         <div className="flex items-center justify-between">
            <span className="text-6xl font-bold">{qtd}</span>
            {icon}
         </div>
      </div>
   );
}
