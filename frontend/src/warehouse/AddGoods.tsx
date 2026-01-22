import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"

interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

export default function AddGoods() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [warehouseId, setWarehouseId] = useState("")

  useEffect(() => {
    api.get("/warehouse/stock").then(res => setWarehouses(res.data))
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    await api.post("/warehouse/goods", {
      warehouseId,
      productName,
      quantity,
      costPrice,
      sellingPrice,
    })

    toast.success("Goods added")
    setProductName("")
    setQuantity("")
    setCostPrice("")
    setSellingPrice("")
    setWarehouseId("")
  }

  return (
    <Card className="max-w-md p-6 border-[#e5ddd5]">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-lg font-semibold text-[#3e2f25]">Add Goods</h2>

        <Input placeholder="Product name" value={productName} onChange={e => setProductName(e.target.value)} />
        <Input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <Input type="number" placeholder="Cost price" value={costPrice} onChange={e => setCostPrice(e.target.value)} />
        <Input type="number" placeholder="Selling price" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />

        <select
          className="w-full border rounded px-3 py-2"
          onChange={e => setWarehouseId(e.target.value)}
        >
          <option value="">Select warehouse</option>
          {warehouses.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>

        <Button className="w-full bg-[#6f4e37] hover:bg-[#5c402d]">Add</Button>

        <div className="flex justify-between text-sm">
          <Link to="/warehouse/add" className="text-[#6f4e37]">Add Warehouse</Link>
          <Link to="/warehouse/stock" className="text-[#6f4e37]">View Warehouse</Link>
        </div>
      </form>
    </Card>
  )
}