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

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      hashedPassword: hashedPassword,
    },
  });
};
