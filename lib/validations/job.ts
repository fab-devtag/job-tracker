import * as z from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, { message: "Le titre du poste est obligatoire" }),
  company: z.string(),
  link: z.url().nullable().optional().default(null),
  status: z
    .enum(["WISHLIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"])
    .default("WISHLIST"),
  salary: z.string().nullable().optional().default(null),
  localisation: z.string().nullable().optional().default(null),
  notes: z.string().nullable().optional().default(null),
});

export const updateJobSchema = createJobSchema.partial();
