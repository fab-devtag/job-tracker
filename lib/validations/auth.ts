import * as z from "zod";

export const signupSchema = z.object({
  email: z.email("Email invalide"),
  name: z.string().min(1, "Le nom doit contenir au moins 1 caractère"),
  password: z
    .string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
