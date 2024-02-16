"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export const getTodos = async () => {
  const session = await auth();

  if (!session) return { success: false };

  try {
    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
    });

    return { success: true, todos };
  } catch (error) {
    return { success: false, error };
  }
};
