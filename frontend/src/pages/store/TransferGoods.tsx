import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { api } from "../../lib/api"
import { type TransferGoodsInput, transferGoodsSchema } from "../../schema/store.schema"
import { useNavigate } from "react-router-dom"

export default function TransferGoods() {
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [stores, setStores] = useState<any[]>([])
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransferGoodsInput>({
    resolver: zodResolver(transferGoodsSchema),
  })

  useEffect(() => {
    api.get("/warehouse/stock").then(res => setWarehouses(res.data))
    api.get("/store/stock").then(res => setStores(res.data))
  }, [])

  async function onSubmit(data: TransferGoodsInput) {
    try {
      await api.post("/store/transfer", data)
      toast.success("Goods transferred")
      navigate("/transfer-history")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Transfer failed")
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="bg-white border border-[#e5ddd5] rounded-xl p-6 space-y-6">

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-[#3e2f25]">
              Transfer Goods
            </h2>
            <p className="text-sm text-muted-foreground">
              Move goods from warehouse to store
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Warehouse goods */}
            <div className="space-y-1">
              <select
                className="w-full border border-[#e5ddd5] bg-transparent px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
                onChange={e =>
                  setValue("warehouseGoodsId", Number(e.target.value))
                }
              >
                <option value="">Select warehouse goods</option>
                {warehouses.map(w =>
                  w.goods.map((g: any) => (
                    <option key={g.id} value={g.id}>
                      {w.name} — {g.productName} ({g.quantity})
                    </option>
                  ))
                )}
              </select>

              {errors.warehouseGoodsId && (
                <p className="text-xs text-red-500">
                  {errors.warehouseGoodsId.message}
                </p>
              )}
            </div>

            {/* Store */}
            <div className="space-y-1">
              <select
                className="w-full border border-[#e5ddd5] bg-transparent px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6f4e37]"
                onChange={e => setValue("storeId", Number(e.target.value))}
              >
                <option value="">Select store</option>
                {stores.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.storeName}
                  </option>
                ))}
              </select>

              {errors.storeId && (
                <p className="text-xs text-red-500">
                  {errors.storeId.message}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <Input
                type="number"
                placeholder="Quantity to transfer"
                {...register("quantity", { valueAsNumber: true })}
              />

              {errors.quantity && (
                <p className="text-xs text-red-500">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              disabled={isSubmitting}
              className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
            >
              {isSubmitting ? "Transferring..." : "Transfer Goods"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}