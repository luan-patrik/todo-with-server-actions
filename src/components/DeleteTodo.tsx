"use client";

import { deleteTodo } from "@/actions/deleteTodo";
import { useState } from "react";
import { Trash } from "./Icons/Trash";

interface DeleteTodoProps {
  id: string;
}

export const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setIsPending(true);
    try {
      await deleteTodo(id);
    } catch (error) {
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      className="text-red-500/50 hover:text-red-500 transition focus-visible:ring-1 focus-visible:ring-offset-transparent focus-visible:ring-slate-950 outline-none rounded-md p-0.5 focus-visible:text-red-700 disabled:opacity-50"
      onClick={async () => await handleDelete(id)}
      disabled={isPending}
    >
      <Trash className="size-5" />
    </button>
  );
};
