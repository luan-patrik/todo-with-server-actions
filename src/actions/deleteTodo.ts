"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { success: true, error };
  }
};
