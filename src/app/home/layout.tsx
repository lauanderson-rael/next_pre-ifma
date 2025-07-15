'use client'
import Header from "../components/header"
import BottomNav from "./components/bottomNav"
import Sidebar from "./components/sidebar"

export default function DashboardLayout({ children, }: { children: React.ReactNode }) {
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
