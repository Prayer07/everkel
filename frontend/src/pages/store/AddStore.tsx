import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { api } from "../../lib/api"
import { type AddStoreInput, addStoreSchema } from "../../schema/store.schema"

export default function AddStore() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddStoreInput>({
    resolver: zodResolver(addStoreSchema),
  })

  async function onSubmit(data: AddStoreInput) {
    try {
      await api.post("/store", data)
      toast.success("Store created")
      reset()
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create store")
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-6 border-[#e5ddd5]">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            Add New Store
          </h2>
          <p className="text-sm text-muted-foreground">
            Create a new store location
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Input
              placeholder="Store name"
              {...register("storeName")}
            />
            {errors.storeName && (
              <p className="text-xs text-red-500">
                {errors.storeName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Location"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
          >
            {isSubmitting ? "Creating..." : "Create Store"}
          </Button>
        </form>
      </Card>
    </div>
  )
}