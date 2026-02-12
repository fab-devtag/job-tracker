import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { createJobSchema } from "@/lib/validations/job";

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Utilisateur non authentifié" },
      { status: 401 },
    );
  }

  const jobs = await prisma.job.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json({ success: true, data: jobs }, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Utilisateur non authentifié" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const validatedFields = createJobSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        success: false,
        error: z.flattenError(validatedFields.error).fieldErrors,
      },
      { status: 400 }, //revoir le statut
    );
  }

  try {
    const job = await prisma.job.create({
      data: {
        ...validatedFields.data,
        user: { connect: { id: session?.user?.id } },
      },
    });
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error("Erreur création job:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 },
    );
  }
};
