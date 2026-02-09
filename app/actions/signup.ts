"use server";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import z from "zod";

export const signupAction = async (data: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      error: "Un utilisateur avec cet email existe déjà",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashedPassword: hashedPassword,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Erreur lors de la création du compte",
    };
  }
};
