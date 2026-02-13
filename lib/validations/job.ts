import * as z from "zod";

export const createJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  link: z.url().nullable().optional().default(null),
  status: z.enum(["WISHLIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"]),
  salary: z.string().nullable().optional().default(null),
  localisation: z.string().nullable().optional().default(null),
  notes: z.string().nullable().optional().default(null),
});

export const updateJobSchema = createJobSchema.partial();
