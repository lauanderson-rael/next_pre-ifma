

"use client";
import { MdAlternateEmail } from "react-icons/md";
import { FiLock, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { api } from "../services/api";
import { useForm } from 'react-hook-form'

export default function RegisterPage() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const { register, handleSubmit } = useForm()

  async function handleRegister(data: any) {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      console.log(data)
      const response = await api.post('/users/register', data)

      if (response.status === 201) {
        setSuccess('Usuário cadastrado com sucesso!');
      }

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

        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><FiUser size={24} /></label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-2 border-b outline-none"
              placeholder="Digite seu nome completo"
              value={username}
              onChange={(e) =>  setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="block text-sm font-medium text-gray-700"><MdAlternateEmail size={24} /></label>
            <input
              {...register('email')}
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
              {...register('password')}
              type="password"
              className="w-full p-2 border-b outline-none"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError('')}}
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
              onChange={(e) => {setConfirmPassword(e.target.value); setError("")}}
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          {success && <p className="bg-green-100 border border-green-400 text-green-700 p-3 rounded text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-4xl hover:bg-green-700 transition"
          >
            Criar conta
          </button>
        </form>

        <div className="mt-2 text-center text-[14px]">
          <span>Já possui uma conta? </span>
          <Link href="/login" className="text-sm text-black underline">Faça o login</Link>
        </div>
      </div>
    </main>
  );
}
