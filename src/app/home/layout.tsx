'use client'
import Header from "../components/header"
import BottomNav from "./components/bottomNav"
import Sidebar from "./components/sidebar"

import { AuthContext } from "../contexts/AuthContext";
import { redirect} from "next/navigation";
import { useContext } from "react";

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

   const { signIn, isAuthenticated } = useContext(AuthContext);
   if (!isAuthenticated) {
      redirect('/login')
   }

   return (
      <>
         <Header />

         <main className="md:flex">
            <Sidebar />
            <div className=" md:w-[100%] ">
               {children}
            </div>
         </main>

         <BottomNav />
      </>
   )
}
