"use server";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import z from "zod";

export const signupAction = async (data: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.message,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      errors: "Un utilisateur avec cet email existe déjà",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      hashedPassword: hashedPassword,
    },
  });
};
