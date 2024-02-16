"use server";

import { auth } from "@/lib/auth";
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
  const session = await auth();

  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.todo.update({
      where: { id: id, userId: session.user.id },
      data: { status: status },
    });
  } catch (error) {
    return { success: false, error: "Failed to update status todo" };
  }

  revalidatePath("/");
};
