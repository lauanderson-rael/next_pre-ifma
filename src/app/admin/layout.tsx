

import { FaArrowLeft } from "react-icons/fa6"
import HeaderTitle from "../components/headerTitle"

import { AuthContext } from "../contexts/AuthContext";
import { redirect} from "next/navigation";
import { useContext } from "react";

export default function DashboardLayout({ children,}: { children: React.ReactNode}) {
    const { signIn, isAuthenticated } = useContext(AuthContext);

   if (!isAuthenticated) {
         redirect('/login')
   }

   return (
      <div>
          <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
            {children}
      </div>
   )
}
