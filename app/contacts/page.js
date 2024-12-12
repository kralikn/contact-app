export const dynamic = "force-dynamic"

import ContactsTable from "@/components/contacts-table";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 items-center p-10">
      <div>
        <Link href='/'>Kezdőlap</Link>
      </div>
      <h1 className="text-5xl font-bold">Elérhetőségek</h1>
      <div>
        <ContactsTable />
      </div>
    </div>
  )
}
