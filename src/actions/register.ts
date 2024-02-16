"use server";

import prisma from "@/lib/db";
import bcryptjs from "bcryptjs";

export const registerUser = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    if (userExists) {
      return { success: false, error: "User already exists" };
    }

    const passwordHashed = await bcryptjs.hash(password as string, 12);

    await prisma.user.create({
      data: {
        email: email as string,
        password: passwordHashed,
      },
    });
  } catch (error) {
    return { success: false, error: "Failed to register user" };
  }
};
