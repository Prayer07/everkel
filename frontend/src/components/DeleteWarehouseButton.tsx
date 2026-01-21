import { api } from "../lib/api"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface Props {
  warehouseId: number
  onDeleted: () => void
}

export default function DeleteWarehouseButton({ warehouseId, onDeleted }: Props) {
  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={async () => {
        if (!confirm("Delete this warehouse?")) return

        await api.delete(`/warehouse/${warehouseId}`)
        toast.success("Warehouse deleted")
        onDeleted()
      }}
    >
      Delete
    </Button>
  )
}