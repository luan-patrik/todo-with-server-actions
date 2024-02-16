"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteTodo = async (id: string) => {
  const session = await auth();

  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.todo.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { success: false, error: "Failed to delete todo" };
  }

  revalidatePath("/");
};
