import { useEffect, useMemo, useState } from "react"
import { api } from "../lib/api"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"

type Transfer = {
  id: number
  productName: string
  quantity: number
  createdAt: string
  fromWarehouse: {
    name: string
  }
  toStore: {
    storeName: string
  }
}

export default function TransferHistory() {
  const [transfers, setTransfers] = useState<Transfer[]>([])
  const [loading, setLoading] = useState(true)

  // filters
  const [search, setSearch] = useState("")
  const [warehouseFilter, setWarehouseFilter] = useState("")
  const [storeFilter, setStoreFilter] = useState("")

  useEffect(() => {
    api.get("/store/transfers")
      .then(res => setTransfers(res.data))
      .finally(() => setLoading(false))
  }, [])

  /**
   * Derived filtered data (no refetching)
   */
  const filteredTransfers = useMemo(() => {
    return transfers.filter(t => {
      const matchesSearch =
        t.productName.toLowerCase().includes(search.toLowerCase())

      const matchesWarehouse =
        warehouseFilter === "" ||
        t.fromWarehouse.name === warehouseFilter

      const matchesStore =
        storeFilter === "" ||
        t.toStore.storeName === storeFilter

      return matchesSearch && matchesWarehouse && matchesStore
    })
  }, [transfers, search, warehouseFilter, storeFilter])

  /**
   * Unique values for dropdowns
   */
  const warehouses = [...new Set(
    transfers.map(t => t.fromWarehouse.name)
  )]

  const stores = [...new Set(
    transfers.map(t => t.toStore.storeName)
  )]

  if (loading) {
    return <p className="p-4">Loading transfers...</p>
  }

  return (
    <div className="p-4 space-y-4">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-[#3e2f25]">
          Transfer History
        </h1>
        <p className="text-sm text-muted-foreground">
          All goods transferred from warehouses to stores
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4 grid gap-3 md:grid-cols-3">
        <Input
          placeholder="Search product"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={warehouseFilter}
          onChange={e => setWarehouseFilter(e.target.value)}
        >
          <option value="">All warehouses</option>
          {warehouses.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={storeFilter}
          onChange={e => setStoreFilter(e.target.value)}
        >
          <option value="">All stores</option>
          {stores.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Card>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-[#f5f1ec] text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">From Warehouse</th>
              <th className="p-3">To Store</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransfers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No transfers found
                </td>
              </tr>
            )}

            {filteredTransfers.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.productName}</td>
                <td className="p-3">{t.quantity}</td>
                <td className="p-3">{t.fromWarehouse.name}</td>
                <td className="p-3">{t.toStore.storeName}</td>
                <td className="p-3">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}