import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { useParams, Link } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { toast } from "sonner"

export default function DebtDetails() {
  const { customerId } = useParams()
  const [customer, setCustomer] = useState<any>(null)
  const [amounts, setAmounts] = useState<Record<number, string>>({})

  useEffect(() => {
    api.get("/debtors").then(res => {
      const found = res.data.find((c: any) => c.id === Number(customerId))
      setCustomer(found)
    })
  }, [])

  async function payDebt(debtId: number) {
    const amount = Number(amounts[debtId])

    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount")
      return
    }

    await api.put(`/debtors/debt/${debtId}/pay`, { amount })
    toast.success("Payment recorded")
    window.location.reload()
  }

  async function clearDebt(debtId: number) {
    await api.put(`/debtors/debt/${debtId}/clear`)
    toast.success("Debt cleared")
    window.location.reload()
  }

  if (!customer) return null

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-[#f5f1ec] border border-[#e5ddd5] rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            {customer.fullName}
          </h2>
          <p className="text-sm text-muted-foreground">
            Customer debt records
          </p>
        </div>

        <Button
          asChild
          className="bg-[#6f4e37] hover:bg-[#5c402d]"
          size="sm"
        >
          <Link to={`/debtors/add-debt/${customer.id}`}>
            Add New Debt
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {customer.debts.map((d: any) => (
        <Card 
          key={d.id} 
          className="p-4 space-y-3 border-[#e5ddd5] bg-white hover:shadow-sm transition"
        >
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-medium">₦{d.totalAmount}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Paid</p>
              <p className="font-medium">₦{d.amountPaid}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Balance</p>
              <p className="font-semibold text-[#6f4e37]">
                ₦{d.balance}
              </p>
            </div>
          </div>

          {!d.isCleared && (
            <>
              <Input
                placeholder="Payment amount"
                value={amounts[d.id] || ""}
                onChange={e =>
                  setAmounts(prev => ({
                    ...prev,
                    [d.id]: e.target.value,
                  }))
                }
              />

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-[#6f4e37] hover:bg-[#5c402d]"
                  onClick={() => payDebt(d.id)}>
                  Add Payment
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => clearDebt(d.id)}
                >
                  Clear Debt
                </Button>
              </div>
            </>
          )}
        </Card>
      ))}
      </div>
    </div>
  )
}