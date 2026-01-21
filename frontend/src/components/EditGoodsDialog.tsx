import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { toast } from "sonner"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { editGoodsSchema, type EditGoodsSchema } from "../utils/goods.schema"

interface Props {
  goods: any
  onUpdated: (updatedItem: any) => void
}

export default function EditGoodsDialog({ goods, onUpdated }: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<EditGoodsSchema>({
    resolver: zodResolver(editGoodsSchema),
    mode: "onChange",
    defaultValues: {
      productName: "",
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
    },
  })

  // 🔥 populate form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset({
        productName: goods.productName,
        quantity: goods.quantity,
        costPrice: goods.costPrice,
        sellingPrice: goods.sellingPrice,
      })
    }
  }, [open, goods, form])

  const onSubmit = async (values: EditGoodsSchema) => {
    await api.put(`/warehouse/goods/${goods.id}`, values)

    onUpdated({
      ...goods,
      ...values,
    })

    toast.success("Item updated")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Edit
      </Button>

      <DialogContent className="bg-[#f5f1ec] border-[#e5ddd5]">
        <DialogHeader>
          <DialogTitle className="text-[#3e2f25]">
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          {/* PRODUCT NAME */}
          <div className="space-y-1">
            <Input {...form.register("productName")} />
            {form.formState.errors.productName && (
              <p className="text-xs text-red-500">
                {form.formState.errors.productName.message}
              </p>
            )}
          </div>

          {/* QUANTITY */}
          <div className="space-y-1">
            <Input type="number" {...form.register("quantity")} />
            {form.formState.errors.quantity && (
              <p className="text-xs text-red-500">
                {form.formState.errors.quantity.message}
              </p>
            )}
          </div>
          
          {/* COST PRICE */}
          <div className="space-y-1">
            <Input type="number" {...form.register("costPrice")} />
            {form.formState.errors.costPrice && (
              <p className="text-xs text-red-500">
                {form.formState.errors.costPrice.message}
              </p>
            )}
          </div>

          {/* SELLING PRICE */}
          <div className="space-y-1">
            <Input type="number" {...form.register("sellingPrice")} />
            {form.formState.errors.sellingPrice && (
              <p className="text-xs text-red-500">
                {form.formState.errors.sellingPrice.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
          >
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}