import Link from "next/link";
import LoginPage from "./login/page";

export default function Home() {
  return (
   <LoginPage/>
   //  <div className="">
   //    <main className="flex flex-col  row-start-2 items-center sm:items-start">

   //       <div className=" bg-gray-900 h-[200px] w-screen  flex justify-center items-center gap-3">
   //          <h1 className="text-4xl font-bold text-white">Bem vindo ao PRE-IFMA</h1>

   //          <button className="text-white bg-green-600 p-4 rounded-lg">
   //             <Link href="login">PAGINA DE LOGIN</Link>
   //          </button>

   //          <button className="text-white bg-blue-600 p-4 rounded-lg">
   //             <Link href="signUp">PAGINA DE CADASTRO</Link>
   //          </button>
   //       </div>
   //    </main>
   //  </div>
  );
}
