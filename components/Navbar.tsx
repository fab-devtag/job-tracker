"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center h-16 border-b-2 px-4">
      <div className="w-32">
        <h1 className="text-xl font-bold">Jobtracker</h1>
      </div>
      <div className="flex flex-1 justify-center gap-6">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>
        <Link href="/jobs" className="hover:underline">
          Jobs
        </Link>
        <Link href="/statistiques" className="hover:underline">
          Statistiques
        </Link>
      </div>

      <div className="flex w-32 justify-end">
        {session?.user && (
          <Button onClick={() => signOut({ callbackUrl: "/login" })}>
            Déconnexion
          </Button>
        )}
      </div>
    </nav>
  );
};
