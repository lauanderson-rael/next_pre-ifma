'use client';

import { Suspense } from "react";
import HeaderTitle from "../components/headerTitle";
import { FaArrowLeft } from "react-icons/fa";
import Content from "./content";

export default function ProvasPage() {
  return (
    <div>
      <HeaderTitle title="Filtros" icon={<FaArrowLeft size={24} />} href='/home' />
      <Suspense fallback={<div>Carregando...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
