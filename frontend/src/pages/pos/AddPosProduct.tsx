import { useForm } from "react-hook-form"
import { api } from "../../lib/api"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"

type FormData = {
  productName: string
  quantity: number
  costPrice: number
  sellingPrice: number
}

export default function AddPosProduct() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    await api.post("/pos", data)
    toast.success("Product recorded")
    navigate("/pos")
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 border-[#e5ddd5] bg-white">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            Add POS Product
          </h2>
          <p className="text-sm text-muted-foreground">
            Record a new product for sales
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Product name"
              {...register("productName", { required: "Required" })}
            />
            {errors.productName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          <Input
            type="number"
            placeholder="Quantity"
            {...register("quantity", { valueAsNumber: true, min: 1 })}
          />

          <Input
            type="number"
            placeholder="Cost price"
            {...register("costPrice", { valueAsNumber: true, min: 0 })}
          />

          <Input
            type="number"
            placeholder="Selling price"
            {...register("sellingPrice", { valueAsNumber: true, min: 0 })}
          />

          <Button
            disabled={isSubmitting}
            className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </Card>
    </div>
  )
}