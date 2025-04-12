'use client';
export default function ProvasPage() {
   return (
      <main className="flex flex-col items-center gap-20 bg-gray-100">


        <h1>Pagina de Provas</h1>
         <div>
            <b>selecione o ano:</b>
            <select>
               <option>2023</option>
               <option>2022</option>
               <option>2021</option>

            </select>
         </div>
      </main>
   );
}
