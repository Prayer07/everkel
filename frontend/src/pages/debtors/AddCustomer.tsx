import { useForm } from "react-hook-form"
import { api } from "../../lib/api"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"

export default function AddCustomer() {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  async function submit(data: any) {
    await api.post("/debtors/customer", data)
    toast.success("Customer added")
    reset()
    navigate("/debtors")
  }

  return (
    <Card className="max-w-md p-6 space-y-4 bg-white border-[#e5ddd5] hover:shadow-sm transition">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[#3e2f25]">
          Add Customer
        </h2>
        <p className="text-sm text-muted-foreground">
          Register a new debtor
        </p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input {...register("fullName")} placeholder="Full name" />
        <Input {...register("phone")} placeholder="Phone" />
        <Input {...register("address")} placeholder="Address" />

        <Button className="w-full bg-[#6f4e37] hover:bg-[#5c402d]">
          Add Customer
        </Button>
      </form>
      <Button asChild className="bg-[#6f4e37] hover:bg-[#5c402d]">
      </Button>
    </Card>
  )
}