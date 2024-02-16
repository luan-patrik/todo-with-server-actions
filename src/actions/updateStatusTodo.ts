"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface updateStatusTodoProps {
  id: string;
  status: "COMPLETED" | "UNCOMPLETED";
}

export const updateStatusTodo = async ({
  id,
  status,
}: updateStatusTodoProps) => {
  try {
    await prisma.todo.update({
      where: { id: id },
      data: { status: status },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { success: true, error };
  }
};
