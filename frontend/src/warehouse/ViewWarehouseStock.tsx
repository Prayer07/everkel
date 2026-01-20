import { useEffect, useState } from "react"
import { api } from "../lib/api"
import "../styles/warehouse.css"
import { Link } from "react-router-dom"

interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

interface MyResponse {
  data: Warehouse[];
}


export default function ViewWarehouseStock() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get("/warehouse/stock").then((res: MyResponse) => setData(res.data))
  }, [])

  return (
    <div className="stock">
      <h2>Warehouse Stock</h2>

      {data.map(w => (
      <div key={w.id} className="card">
        <h3>{w.name} — {w.location}</h3>

        <button
          onClick={async () => {
            const newName = prompt("New warehouse name", w.name)
            const newLocation = prompt("New location", w.location)

            if (!newName || !newLocation) return

            await api.put(`/warehouse/${w.id}`, {
              name: newName,
              location: newLocation,
            })

            alert("Warehouse updated")
            window.location.reload()
          }}
        >
          Edit
        </button>

        <button
          onClick={async () => {
            if (!confirm("Delete this warehouse?")) return

            await api.delete(`/warehouse/${w.id}`)
            alert("Warehouse deleted")
            window.location.reload()
          }}
        >
          Delete
        </button>

        {w.goods.length === 0 && <p>No goods</p>}

        {w.goods.map((g: any) => (
          <div key={g.id}>
          <p>
            {g.productName} — Qty: {g.quantity} — ₦{g.sellingPrice}
          </p>

          <button
            onClick={async () => {
              const productName = prompt("Product name", g.productName)
              const quantity = prompt("Quantity", g.quantity)
              const costPrice = prompt("Cost price", g.costPrice)
              const sellingPrice = prompt("Selling price", g.sellingPrice)

              if (!productName || !quantity || !costPrice || !sellingPrice) return

              await api.put(`/warehouse/goods/${g.id}`, {
                productName,
                quantity,
                costPrice,
                sellingPrice,
              })

              window.location.reload()
            }}
          >
            Edit Item
          </button>

          <button
            onClick={async () => {
              if (!confirm("Delete this product?")) return

              await api.delete(`/warehouse/goods/${g.id}`)
              window.location.reload()
            }}
          >
            Delete Item
          </button>
        </div>
        ))}
      </div>
    ))}

      <button> <Link to="/warehouse/add" style={{textDecoration: "none"}}>Add Warehouse</Link> </button>
      <button> <Link to="/warehouse/add-goods" style={{textDecoration: "none"}}>Add Goods</Link> </button>
    </div>
  )
}