
export default function TableRow({ row }) {

  return (
    <div className="flex">
      <div className="w-48">{row.customer_name}</div>
      <div className="w-48">{row.customer_contact}</div>
    </div>
  )
}
