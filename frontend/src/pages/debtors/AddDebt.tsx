import { useForm } from "react-hook-form"
import { api } from "../../lib/api"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"

export default function AddDebt() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  async function submit(data: any) {
    await api.post(`/debtors/${customerId}/debt`, {
      totalAmount: Number(data.totalAmount),
    })

    toast.success("Debt added")
    navigate(`/debtors/${customerId}`)
  }

  return (
    <Card className="max-w-md p-6 space-y-4 bg-white border-[#e5ddd5] hover:shadow-sm transition">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[#3e2f25]">
          Add Debt
        </h2>
        <p className="text-sm text-muted-foreground">
          Record a new debt for this customer
        </p>
      </div>


      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          type="number"
          placeholder="Total amount"
          {...register("totalAmount")}
        />

        <Button className="w-full bg-[#6f4e37] hover:bg-[#5c402d]">
          Add Debt
        </Button>
      </form>
    </Card>
  )
}