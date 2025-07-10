
import { ReactNode } from "react";
import Link from "next/link";

interface Props {
   title: string;
   icon: ReactNode;
   href: string;
 }

export default function HeaderTitle({title, icon, href}: Props){
   return(
      <header className="sticky top-0 z-50 bg-green-600 h-[60px] w-screen flex justify-between items-center text-white px-10 ">

         <Link href={href} className="">
            {icon}
         </Link>

            <div className="font-semibold">{title}</div>

      </header>
   )
}
