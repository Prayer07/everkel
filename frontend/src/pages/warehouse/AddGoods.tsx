import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../lib/api"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"
import { navigate } from "../../util/navigate"
import {
  addGoodsSchema,
  type AddGoodsInput,
} from "../../schema/goods.schema"

interface Warehouse {
  id: number
  name: string
}

export default function AddGoods() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddGoodsInput>({
    resolver: zodResolver(addGoodsSchema),
    defaultValues: {
      productName: "",
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
    },
  })

  useEffect(() => {
    api.get("/warehouse/stock").then(res => setWarehouses(res.data))
  }, [])

  const onSubmit = async (data: AddGoodsInput) => {
    try {
      await api.post("/warehouse/goods", data)

      toast.success("Goods added")

      reset()

      navigate({
        link: navigateTo,
        url: "/warehouse/stock",
        time: 1500,
      })
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add goods")
    }
  }

  return (
    <Card className="max-w-md p-6 border-[#e5ddd5]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-lg font-semibold text-[#3e2f25]">
          Add Goods
        </h2>

        {/* Product name */}
        <div className="space-y-1">
          <Input
            placeholder="Product name"
            {...register("productName")}
          />
          {errors.productName && (
            <p className="text-xs text-red-500">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-1">
          <Input
            type="number"
            placeholder="Quantity"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-xs text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Cost price */}
        <div className="space-y-1">
          <Input
            type="number"
            placeholder="Cost price"
            {...register("costPrice", { valueAsNumber: true })}
          />
          {errors.costPrice && (
            <p className="text-xs text-red-500">
              {errors.costPrice.message}
            </p>
          )}
        </div>

        {/* Selling price */}
        <div className="space-y-1">
          <Input
            type="number"
            placeholder="Selling price"
            {...register("sellingPrice", { valueAsNumber: true })}
          />
          {errors.sellingPrice && (
            <p className="text-xs text-red-500">
              {errors.sellingPrice.message}
            </p>
          )}
        </div>

        {/* Warehouse */}
        <div className="space-y-1">
          <select
            className="w-full border rounded px-3 py-2"
            onChange={e =>
              setValue("warehouseId", Number(e.target.value))
            }
          >
            <option value="">Select warehouse</option>
            {warehouses.map(w => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>

          {errors.warehouseId && (
            <p className="text-xs text-red-500">
              {errors.warehouseId.message}
            </p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
        >
          {isSubmitting ? "Adding..." : "Add Goods"}
        </Button>
      </form>
    </Card>
  )
}