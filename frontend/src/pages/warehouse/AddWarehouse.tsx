import { api } from "../../lib/api"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { useNavigate } from "react-router-dom"
import { navigate } from "../../util/navigate"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addWarehouseSchema, type AddWarehouseInput } from "../../schema/warehouse.schema"

export default function AddWarehouse() {
  const navigateTo = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddWarehouseInput>({
    resolver: zodResolver(addWarehouseSchema),
  })

  const submit = async (data: AddWarehouseInput) => {
    try {
      await api.post("/warehouse", data)

      toast.success("Warehouse added")
      reset()

      navigate({
        link: navigateTo,
        url: "/warehouse/stock",
        time: 1000,
      })
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to add warehouse"
      )
    }
  }

  return (
    <Card className="max-w-md p-6 border-[#e5ddd5]">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <h2 className="text-lg font-semibold text-[#3e2f25]">
          Add Warehouse
        </h2>

        <div>
          <Input placeholder="Warehouse name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input placeholder="Location" {...register("location")} />
          {errors.location && (
            <p className="text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </form>
    </Card>
  )
}