"use client";

import { updateStatusTodo } from "@/actions/updateStatusTodo";

interface UpdateStatusTodoProps {
  id: string;
  checked?: boolean;
}

export const UpdateStatusTodo = ({ id, checked }: UpdateStatusTodoProps) => {
  const handleChange = async (id: string) => {
    await updateStatusTodo({
      id,
      status: checked ? "UNCOMPLETED" : "COMPLETED",
    });
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={async () => await handleChange(id)}
    />
  );
};
