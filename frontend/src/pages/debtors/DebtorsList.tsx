import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"

export default function DebtorsList() {
  const [customers, setCustomers] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get("/debtors").then(res => setCustomers(res.data))
  }, [])

  const filtered = customers.filter(c =>
    c.fullName.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="space-y-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-[#f5f1ec] border border-[#e5ddd5] rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            Debtors
          </h2>
          <p className="text-sm text-muted-foreground">
            Customers with outstanding debts
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="md:w-64"
          />

          <Button asChild className="bg-[#6f4e37] hover:bg-[#5c402d]">
            <Link to="/debtors/add">Add Customer</Link>
          </Button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No customers found
        </p>
      )}

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c => {
          const totalOwing = c.debts.reduce(
            (sum: number, d: any) => sum + d.balance,
            0
          )

          return (
            <Card
              key={c.id}
              className="p-4 space-y-3 border-[#e5ddd5] bg-white hover:shadow-sm transition"
            >
              <div>
                <p className="font-semibold text-[#3e2f25]">
                  {c.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {c.phone}
                </p>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Total owing
                </span>
                <span className="font-semibold text-[#6f4e37]">
                  ₦{totalOwing}
                </span>
              </div>

              <Button
                asChild
                size="sm"
                className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
              >
                <Link to={`/debtors/${c.id}`}>
                  View Debts
                </Link>
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}