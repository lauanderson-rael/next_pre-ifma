import Header from "../components/header"
import BottomNav from "./components/bottomNav"
import Sidebar from "./components/sidebar"

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <>
         <Header />
         <main className="md:flex">
            <Sidebar />

            <div className=" md:w-[100%] md:px-[300px] md:mt-4">
               {children}
            </div>
         </main>
         <BottomNav />
      </>
   )
}



{/* <>
<Header />
<Sidebar />
<main className="pt-16 p-4 sm:pl-52">{children}</main>
<BottomNav />
</> */}
