import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { toast } from "sonner"
import EditPosProductDialog from "./EditPosProductDialog"
import { Input } from "../../components/ui/input"

export default function PosList() {
  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get("/pos").then(res => setProducts(res.data))
  }, [])

  async function deleteProduct(id: number) {
    await api.delete(`/pos/${id}`)
    setProducts(prev => prev.filter(p => p.id !== id))
    toast.success("Product deleted")
  }

  const filteredProducts = products.filter(p => {
    const term = search.toLowerCase()

    return (
      p.productName.toLowerCase().includes(term) ||
      p.quantity.toString().includes(term) ||
      p.costPrice.toString().includes(term) ||
      p.sellingPrice.toString().includes(term)
    )
  })

  return (
    <div className="space-y-6">

      {/* Top bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-[#f5f1ec] border border-[#e5ddd5] rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold text-[#3e2f25]">
            POS Records
          </h2>
          <p className="text-sm text-muted-foreground">
            Products sold at point of sale
          </p>
        </div>

        <Input
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="md:w-64"
        />

        <Button asChild className="bg-[#6f4e37] hover:bg-[#5c402d]">
          <a href="/pos/add">Add Product</a>
        </Button>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No POS products recorded yet
        </p>
      )}

      {/* Cards */}
      {products.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(p => (
            <Card
              key={p.id}
                className="p-4 space-y-2 border-[#e5ddd5] bg-white
                          hover:shadow-md hover:-translate-y-[1px]
                          transition-all duration-200"
            >
              <p className="font-semibold text-[#3e2f25]">
                {p.productName}
              </p>

              {p.quantity === 0 && (
                <span className="text-xs text-red-600 font-medium">
                  Sold out
                </span>
              )}

              <div className="text-sm text-muted-foreground space-y-1">
                <p className="flex justify-between">
                  <span>Cost</span>
                  <span className="font-medium">₦{p.costPrice}</span>
                </p>
                <p className="flex justify-between">
                  <span>Selling</span>
                  <span className="font-medium text-green-700">₦{p.sellingPrice}</span>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t mt-3">
                <EditPosProductDialog
                  product={p}
                  onUpdated={updated =>
                    setProducts(prev =>
                      prev.map(x => (x.id === updated.id ? updated : x))
                    )
                  }
                />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}