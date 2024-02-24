"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/Button";

export const LoginForm = () => {
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      return null;
    }
    redirect("/");
  };

  return (
    <form action={handleLogin} className="w-full flex flex-col max-w-xl gap-4">
      <h1 className="text-xl font-bold">Entrar</h1>
      <input
        type="email"
        name="email"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="Email"
        autoComplete="email"
        autoFocus
        required
      />
      <input
        type="password"
        name="password"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="Senha"
        autoComplete="current-password"
        autoFocus
        required
      />
      <span>
        Não possui uma conta?{" "}
        <Link href="/register" className="underline-offset-2 hover:underline">
          Crie aqui.
        </Link>
      </span>
      <Button
        type="submit"
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
      >
        Entrar
      </Button>
    </form>
  );
};
