import { api } from "../lib/api"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface Props {
  goodsId: number
  onDeleted: () => void
}

export default function DeleteGoodsButton({ goodsId, onDeleted }: Props) {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        if (!confirm("Delete this product?")) return

        await api.delete(`/warehouse/goods/${goodsId}`)
        toast.success("Item deleted")
        onDeleted()
      }}
    >
      Delete
    </Button>
  )
}