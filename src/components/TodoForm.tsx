"use client";

import { addTodo } from "@/actions/addTodo";
import { Todo } from "@prisma/client";
import { Session } from "next-auth";
import { useOptimistic, useRef } from "react";
import { DeleteTodo } from "./DeleteTodo";
import { UpdateStatusTodo } from "./UpdateStatusTodo";
import { Button } from "./ui/Button";

interface TodoFormProps {
  todos: Todo[];
  session: Session;
}

export const TodoForm = ({ todos, session }: TodoFormProps) => {
  const ref = useRef<HTMLFormElement>(null);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => {
      return [newTodo, ...state];
    }
  );

  return (
    <div className="flex flex-col justify-center items-center gap-4 max-w-xl w-full">
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          addOptimisticTodo({
            id: crypto.randomUUID(),
            userId: session.user.id,
            content: formData.get("content".trim()) as string,
            status: "UNCOMPLETED",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          await addTodo(formData);
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
        <Button className="hover:bg-slate-950 transition border-slate-950 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md border outline-none focus-visible:bg-slate-950">
          Adicionar
        </Button>
      </form>
      <ul className="flex flex-col w-full gap-y-4">
        {optimisticTodos.map((todo) => (
          <div key={todo.id} className="flex justify-between items-center">
            <li className="w-full flex break-all">
              {todo.status === "COMPLETED" ? (
                <s>{todo.content}</s>
              ) : (
                todo.content
              )}
            </li>
            <div className="flex items-center gap-2">
              <UpdateStatusTodo id={todo.id} value={todo.status} />
              <DeleteTodo id={todo.id} />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
