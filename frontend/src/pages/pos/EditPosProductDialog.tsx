import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { api } from "../../lib/api"
import { toast } from "sonner"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

type Props = {
  product: any
  onUpdated: (p: any) => void
}

type FormData = {
  productName: string
  quantity: number
  costPrice: number
  sellingPrice: number
}

export default function EditPosProductDialog({ product, onUpdated }: Props) {
  const form = useForm<FormData>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) return form.reset(product)
  }, [open, product, form])

  async function submit(values: FormData) {
    const res = await api.put(`/pos/${product.id}`, values)
    onUpdated(res.data)
    toast.success("Updated")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#f5f1ec] border-[#e5ddd5]">
        <DialogHeader>
          <DialogTitle className="text-[#3e2f25]">Edit Product</DialogTitle>
        </DialogHeader>

      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-3"
      >
        <Input {...form.register("productName")} />
        <Input
          type="number"
          {...form.register("quantity", { valueAsNumber: true })}
        />
        <Input
          type="number"
          {...form.register("costPrice", { valueAsNumber: true })}
        />
        <Input
          type="number"
          {...form.register("sellingPrice", { valueAsNumber: true })}
        />

        <Button className="w-full bg-[#6f4e37] hover:bg-[#5c402d]">Save</Button>
      </form>
      </DialogContent>
    </Dialog>
  )
}