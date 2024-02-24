"use client";

import { registerUser } from "@/actions/register";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/Button";

export const RegisterForm = () => {
  const handleRegister = async (formData: FormData) => {
    const result = await registerUser(formData);

    if (result?.error) {
      return null;
    }

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    redirect("/");
  };

  return (
    <form
      action={handleRegister}
      className="w-full flex flex-col mx-auto justify-center gap-4 max-w-xl"
    >
      <h1 className="text-xl font-bold">Cadastrar</h1>
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
        Já possui uma conta?{" "}
        <Link href="/login" className="underline-offset-2 hover:underline">
          Entre aqui.
        </Link>
      </span>
      <Button
        type="submit"
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
      >
        Cadastrar
      </Button>
    </form>
  );
};
