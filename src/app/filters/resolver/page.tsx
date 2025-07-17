'use client';

import { Suspense } from 'react';
import Content from './content';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-36 text-green-700 font-bold">Carregando questões...</p>}>
      <Content />
    </Suspense>
  );
}
