'use client';

import { Suspense } from 'react';
import ResolveContent from './ResolverContent';

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center mt-36 text-green-700 font-bold">Carregando questões...</p>}>
      <ResolveContent />
    </Suspense>
  );
}
