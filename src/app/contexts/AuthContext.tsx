'use client'
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../services/api";

type AuthcontextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>
}

type User = {
    name: string;
    email: string;
    current_streak: number
}

type SignInData = {
    email: string;
    password: string
}

export const AuthContext = createContext({} as AuthcontextType)

export function AuthProvider({children}: any){
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const token = localStorage.getItem('preifma.token');
        const userData = localStorage.getItem('preifma.user');

        if (token && userData){
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
            } catch (error) {
                console.error('Error parsing user data', error);
            }
        }
    }, [])


    async function signIn({email, password}: SignInData){
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Login bem sucedido!')

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao fazer login');
            }

            localStorage.setItem('preifma.token', data.token);
            localStorage.setItem('preifma.user', JSON.stringify({
                name: data.name,
                email: data.email,
                current_streak: data.current_streak
            }));

            api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

            setUser({
                name: data.name,
                email: data.email,
                current_streak: data.current_streak
            });

            router.push('/home');
            return

        } catch (err: any) {
            console.log(err)
             throw err;
        }
    }

    return (
        <AuthContext.Provider value={{user, signIn, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
