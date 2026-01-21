import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { api } from "../lib/api"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"

import EditGoodsDialog from "../components/EditGoodsDialog"
import DeleteGoodsButton from "../components/DeleteGoodsButton"
import { Input } from "../components/ui/input"

export default function WarehouseGoods() {
  const { id } = useParams()
  const [warehouse, setWarehouse] = useState<any | null>(null)
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const handleGoBack = () => {
    navigate(-1); // Navigates back one step in the history stack
  };

  useEffect(() => {
    api.get("/warehouse/stock").then(res => {
      const found = res.data.find((w: any) => w.id === Number(id))
      setWarehouse(found)
    })
  }, [id])

  if (!warehouse) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  const filteredGoods = warehouse.goods.filter((g: any) =>
    g.productName.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-[#f5f1ec] border border-[#e5ddd5] rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            {warehouse.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {warehouse.location}
          </p>
        </div>

        <div className="w-full md:w-72">
          <Input
            placeholder="Search goods by product name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Button variant="outline" onClick={handleGoBack}>
          ← Back
        </Button>
      </div>

      {filteredGoods.length === 0 && query && (
        <p className="text-muted-foreground">
          No goods found for "{query}"
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGoods.map((g: any) => (
          <Card key={g.id} className="p-4 space-y-2">
            <p className="font-medium">
              ProductName: {g.productName}
            </p>

            <p className="text-sm">Qty: {g.quantity}</p>
            <p className="text-sm">Cost: ₦{g.costPrice}</p>
            <p className="text-sm">Selling: ₦{g.sellingPrice}</p>

            <div className="flex gap-2 pt-2">
              <EditGoodsDialog
                goods={g}
                onUpdated={(updatedItem) => {
                  setWarehouse((prev: any) => ({
                    ...prev,
                    goods: prev.goods.map((x: any) =>
                      x.id === updatedItem.id ? updatedItem : x
                    ),
                  }))
                }}
              />

              <DeleteGoodsButton
                goodsId={g.id}
                onDeleted={() => {
                  setWarehouse((prev: any) => ({
                    ...prev,
                    goods: prev.goods.filter((x: any) => x.id !== g.id),
                  }))
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}