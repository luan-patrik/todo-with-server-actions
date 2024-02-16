"use client";

import { updateStatusTodo } from "@/actions/updateStatusTodo";
import { useState } from "react";
import { Check } from "./Icons/Check";
import { CheckCheck } from "./Icons/CheckCheck";

interface UpdateStatusTodoProps {
  id: string;
  value: "COMPLETED" | "UNCOMPLETED";
}

export const UpdateStatusTodo = ({ id, value }: UpdateStatusTodoProps) => {
  const [currentValue, setCurrentValue] =
    useState<UpdateStatusTodoProps["value"]>(value);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleChange = async (id: string) => {
    setIsPending(true);
    try {
      const newValue =
        currentValue === "COMPLETED" ? "UNCOMPLETED" : "COMPLETED";
      setCurrentValue(newValue);
      await updateStatusTodo({
        id,
        status: newValue,
      });
    } catch (error) {
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={async () => await handleChange(id)}
      className="group flex focus-visible:ring-1 focus-visible:ring-offset-transparent focus-visible:ring-slate-950 font-semibold outline-none rounded-md p-0.5 disabled:opacity-50"
      disabled={isPending}
    >
      {value === "UNCOMPLETED" ? (
        <Check className="size-5 transition text-green-500/50 group-hover:text-green-500 group-focus-visible:text-green-500" />
      ) : (
        <CheckCheck className="size-5 transition text-green-500 group-hover:text-green-500/50 group-focus-visible:text-green-500/50" />
      )}
    </button>
  );
};
