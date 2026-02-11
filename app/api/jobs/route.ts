import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { succes: false, error: "Utilisateur non authentifié" },
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
