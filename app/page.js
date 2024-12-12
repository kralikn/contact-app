'use client'

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession()

  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center p-10">
      {!session && <button onClick={() => signIn("azure-ad")}>Belépés</button>}
      {session && <div className="flex gap-10">
        <div>
          <Link href='/contacts'>Elérhetőségek</Link>
        </div>
        <button onClick={() => signOut()}>Kilépés</button>
      </div>}

      <h1 className="text-5xl font-bold">Contact App</h1>
    </div>
  );
}
