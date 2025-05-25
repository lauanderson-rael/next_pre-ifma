
import Option from "./components/option";
import CardInfo from "./components/cardInfo";
import { IoBookSharp } from "react-icons/io5";
import { SiLibreofficemath } from "react-icons/si";
import { AiOutlineProfile } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { RiNumbersFill } from "react-icons/ri";
import Link from "next/link";

export default async function Home() {

   return (
      <div className="mx-auto px-3  md:px-[300px]">

         <h1 className="text-2xl font-bold mt-2 text-center">O que deseja estudar?</h1>

         <div className="mt-4 flex flex-col gap-2">
            <Link href={"/questions"}>
            <Option
            name="Português"
            bgColor="#F0BE84"
            icon={<IoBookSharp size={24} fill="blue" />}
            />
            </Link>

            <Option
            name="Matemática"
            bgColor="#6CB1DB"
            icon={<SiLibreofficemath size={24} fill="green" />}
            />

            <Option
            name="Simulados"
            bgColor="#E6E6E6"
            icon={<AiOutlineProfile size={24} fill="black" />}
            />

         </div>

         <p className="text-xl font-bold text-center text-gray-600 mt-5 mb-2.5 ">Estatísticas</p>

         <div className="flex gap-2 mt-4">
            <CardInfo

                  title="Questões Resolvidas"
                  bgColor="#369FFF"
                  qtd={87}
                  icon={<RiNumbersFill size={60} fill="#fff" />}
            />

            <CardInfo

                  title="Quantidade de acertos"
                  bgColor="#319F43"
                  qtd={76}
                  icon={<FaCheckCircle size={60} fill="#fff" />}
            />
         </div>
      </div>
   );
}



// a partir do next13 não fuinciona mais
// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//    console.log(ctx.req.cookies)
//    return {
//        props:{}
//    }
// }