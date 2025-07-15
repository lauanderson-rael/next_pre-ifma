
import { FaArrowLeft } from "react-icons/fa6"
import HeaderTitle from "../components/headerTitle"


export default function DashboardLayout({ children,}: { children: React.ReactNode}) {

   return (
      <div>
          <HeaderTitle title="ADMIN" icon={<FaArrowLeft size={24} />} href="/home" />
            {children}
      </div>
   )
}
