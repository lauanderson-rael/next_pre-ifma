'use client'
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

    // se falso - redireciona ao login
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('--------- nao logado ------------')
      router.push("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; 
  }

  return <>{children}</>;
}
