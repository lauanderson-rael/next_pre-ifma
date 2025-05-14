

"use client";
import { MdAlternateEmail } from "react-icons/md";
import { FiLock, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  // Estado para os campos do formulário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/proxy/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      setSuccess('Conta criada com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-4 sm:gap-16 bg-gray-100">
      <div className="bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>
        <div className="text-sm text-gray-200">O seu preparatório para ingressar no IFMA</div>
        <Image className="mt-5" src="/logo.png" alt="logo" width={90} height={90} quality={100} />
      </div>

      <div className="w-full max-w-md sm:bg-white p-6 sm:rounded-lg sm:shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-black mb-6">Criar conta</h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><FiUser size={24} /></label>
            <input
              type="text"
              className="w-full p-2 border-b outline-none"
              placeholder="Digite seu nome completo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><MdAlternateEmail size={24} /></label>
            <input
              type="email"
              className="w-full p-2 border-b outline-none"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><FiLock size={24} /></label>
            <input
              type="password"
              className="w-full p-2 border-b outline-none"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><FiLock size={24} /></label>
            <input
              type="password"
              className="w-full p-2 border-b outline-none"
              placeholder="Repita sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-4xl hover:bg-green-700 transition"
          >
            Criar conta
          </button>
        </form>

        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4 text-center">{success}</p>}

        <div className="mt-2 text-center text-[14px]">
          <span>Já possui uma conta? </span>
          <Link href="/login" className="text-sm text-black underline">Faça o login</Link>
        </div>
      </div>
    </main>
  );
}
