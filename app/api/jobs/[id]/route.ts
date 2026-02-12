import { auth } from "@/lib/auth";
import { updateJobSchema } from "@/lib/validations/job";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { prisma } from "@/lib/prisma";

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Utilisateur non authentifié" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const validatedFields = updateJobSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        success: false,
        error: z.flattenError(validatedFields.error).fieldErrors,
      },
      { status: 400 }, //revoir le statut
    );
  }

  const job = await prisma.job.findUnique({
    where: { id: id },
  });

  if (!job) {
    return NextResponse.json(
      { success: false, error: "Le job n'existe pas" },
      { status: 404 },
    );
  }

  if (job.userId !== session.user.id) {
    return NextResponse.json(
      { success: false, error: "Non autorisé" },
      { status: 403 },
    );
  }

  try {
    const updateJob = await prisma.job.update({
      data: validatedFields.data,
      where: { id: job.id },
    });

    return NextResponse.json(
      { success: true, data: updateJob },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur update job", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Utilisateur non authentifié" },
      { status: 401 },
    );
  }

  const job = await prisma.job.findUnique({
    where: { id: id },
  });

  if (!job) {
    return NextResponse.json(
      { success: false, error: "Le job n'existe pas" },
      { status: 404 },
    );
  }

  if (job.userId !== session.user.id) {
    return NextResponse.json(
      { success: false, error: "Non autorisé" },
      { status: 403 },
    );
  }

  try {
    await prisma.job.delete({
      where: { id: id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur delete job");
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 },
    );
  }
};
