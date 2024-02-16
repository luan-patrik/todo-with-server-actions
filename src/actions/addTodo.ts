"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
  const session = await auth();
  try {
    const content = formData.get("content");

    if (!session) return { success: false };

    await prisma.todo.create({
      data: {
        userId: session.user.id as string,
        content: content as string,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
