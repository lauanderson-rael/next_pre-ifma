'use client';
import Container from "../components/container";
import Option from "./components/option";
import { IoBookSharp } from "react-icons/io5";
import { SiLibreofficemath } from "react-icons/si";
import { AiOutlineProfile } from "react-icons/ai";
export default function Home() {
   return (
      <Container>
         <h1 className="text-2xl font-bold mt-1">Estude</h1>

         <div className="mt-4 flex flex-col gap-2">
            <Option
            name="Português"
            bgColor="#F0BE84"
            icon={<IoBookSharp size={24} fill="blue" />}
            />

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
      </Container>
   );
}
