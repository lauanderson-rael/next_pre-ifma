"use client";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../services/api";
import Image from "next/image";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, reset } = useForm();
  const password = watch("password");
  const confirmPassword = watch("password_confirmation");

  const onSubmit = async (data: any) => {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await api.patch(`password_resets/${token}`, {
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status === 200) {
        setSuccess("Senha redefinida com sucesso!");
        reset();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao redefinir senha");
    }
  };

  return (
   <>
       <div className="bg-green-600 h-[200px] w-screen flex flex-col justify-center items-center">
              <h1 className="text-4xl font-extrabold text-white">PRÉ-IFMA</h1>
              <div className="text-sm text-white">O seu preparatório para ingressar no IFMA</div>
              <Image className="mt-5" src="/logo.png" alt="logo" width={90} height={90} quality={100} />
      </div>

    <main className="flex flex-col items-center justify-center mt-8 px-4">


      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Redefina sua Senha</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("password")}
            type="password"
            placeholder="Nova senha"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            {...register("password_confirmation")}
            type="password"
            placeholder="Confirme a nova senha"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Redefinir Senha
          </button>
        </form>
      </div>
    </main>
      </>
  );
}
