"use client";

import { deleteTodo } from "@/actions/deleteTodo";
import { Button } from "./ui/Button";

interface DeleteTodoProps {
  id: string;
}

export const DeleteTodo = ({ id }: DeleteTodoProps) => {
  return (
    <Button
      className="text-red-700 hover:text-red-600 transition focus-visible:ring-1 focus-visible:ring-offset-transparent focus-visible:ring-slate-950 font-semibold outline-none rounded-md p-0.5 focus-visible:text-red-600"
      onClick={() => deleteTodo(id)}
    >
      Apagar
    </Button>
  );
};
