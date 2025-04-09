

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col  row-start-2 items-center sm:items-start">
         <div className=" bg-green-600 h-[100px] w-screen  flex justify-center items-center ">

         </div>
         <div className=" bg-green-600 h-[200px] w-screen  flex justify-center items-center rounded-[0px_0px_64px_64px]">
            <h1 className="text-4xl font-bold text-white">Bem vindo ao PRE-IFMA</h1>

            <button className="text-white bg-green-600 p-4 rounded-lg">
               <a href="login">PAGINA DE LOGIN</a>
            </button>

            <button className="text-white bg-blue-600 p-4 rounded-lg">
               <a href="singUp">PAGINA DE CRIAR CONTA</a>
            </button>
         </div>
      </main>
    </div>
  );
}
