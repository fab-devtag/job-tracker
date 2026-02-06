// lib/prisma.ts

import { PrismaClient } from "./generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// Instancie l’adapter avec ta connection string
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
