import { useState } from "react"
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

interface Warehouse {
  id: number;
  name: string;
  location: string;
}

interface Props {
  warehouse: Warehouse
  onUpdated: (updatedWarehouse: Warehouse) => void
}

export default function EditWarehouseDialog({ warehouse, onUpdated }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: warehouse.name,
    location: warehouse.location,
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setForm({ name: warehouse.name, location: warehouse.location })
          setOpen(true)
        }}
      >
        Edit
      </Button>

      <DialogContent className="bg-[#f5f1ec] border-[#e5ddd5]">
        <DialogHeader>
          <DialogTitle className="text-[#3e2f25]">
            Edit Warehouse
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Warehouse name"
          />

          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location"
          />

          <Button
            className="w-full bg-[#6f4e37] hover:bg-[#5c402d]"
            onClick={async () => {
              await api.put(`/warehouse/${warehouse.id}`, form)

              const updatedWarehouse = {
                ...warehouse,
                ...form,
                updatedAt: new Date().toISOString(),
              }

              onUpdated(updatedWarehouse)

              setOpen(false)
              toast.success("Warehouse updated")
            }}
          >
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}