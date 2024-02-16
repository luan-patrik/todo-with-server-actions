"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/Button";

export const AuthForm = () => {
  const handleLogin = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <form action={handleLogin} className="w-full flex flex-col gap-4">
      <input
        type="text"
        name="email"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="What needs to be done?"
        autoComplete="email"
        autoFocus
        required
      />
      <input
        type="password"
        name="password"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="What needs to be done?"
        autoComplete="current-password"
        autoFocus
        required
      />
      <Button
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
        isPending="Entrando..."
      >
        Entrar
      </Button>
    </form>
  );
};
