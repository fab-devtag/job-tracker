import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("login");
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p className="text-lg">
        Bienvenue, <span className="font-semibold">{session.user.name}</span> !
      </p>
      <p className="text-muted-foreground mt-2">Email : {session.user.email}</p>
    </div>
  );
}
