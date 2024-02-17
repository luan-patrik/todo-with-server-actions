"use client";

import { addTodo } from "@/actions/addTodo";
import { useRef } from "react";
import { Button } from "./ui/Button";

export const TodoForm = async () => {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await addTodo(formData);
        ref.current?.reset();
      }}
      className="w-full flex flex-col gap-4"
    >
      <input
        type="text"
        name="content"
        className="text-slate-950 outline-none rounded-md p-2"
        placeholder="Qual sua tarefa do dia?"
        autoFocus
        required
      />
      <Button
        className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950"
        isPending="Adicionando..."
      >
        Adicionar
      </Button>
    </form>
  );
};
