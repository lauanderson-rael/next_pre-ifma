import Header from "../components/header"
import BottomNav from "./components/bottomNav/bottomNav"

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
         <>
            <Header/>
               <main>{children}</main>
            <BottomNav/>
         </>
   )
}
