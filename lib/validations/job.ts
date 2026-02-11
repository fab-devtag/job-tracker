import * as z from "zod";

export const createJobSchema = z.object({
  title: z.string(),
  company: z.string(),
  link: z.url().optional(),
  status: z.enum(["WISHLIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"]),
  salary: z.string().optional(),
  localisation: z.string().optional(),
  notes: z.string().optional(),
});

export const updateJobSchema = createJobSchema.partial();
