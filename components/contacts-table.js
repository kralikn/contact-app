export const dynamic = "force-dynamic"

import { getContacts } from "@/utils/actions"
import TableRow from "./table-row"

export default async function ContactsTable() {

  const { data } = await getContacts()
  const table = data || []
  const error = data?.error || ''

  if (error) {
    return <p className="text-md w-1/2 mx-auto px-8 py-4">{error}</p>
  }

  if (table.length === 0) {
    return (
      <div>
        <p>a table üres tömb</p>
      </div>
    )
  }

  return (
    <div>
      {table.map(row => {
        return (
          <TableRow key={row.id} row={row} />
        )
      })}
    </div>
  )
}
