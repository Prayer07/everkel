import { useEffect, useState } from "react"
import { api } from "../lib/api"
import '../styles/warehouse.css'
import { Link } from "react-router-dom"

interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

interface MyResponse {
  data: Warehouse[];
}

export default function AddGoods() {
  const [warehouses, setWarehouses] = useState<any[]>([])
  const [productName, setProductName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [warehouseId, setWarehouseId] = useState("")

  useEffect(() => {
    api.get("/warehouse/stock").then((res: MyResponse) => setWarehouses(res.data))
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

    alert("Goods added")
  }

  return (
    <>
    <form className="form" onSubmit={submit}>
      <h2>Add Goods</h2>

      <input
        placeholder="Product name"
        value={productName}
        onChange={e => setProductName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Cost price"
        value={costPrice}
        onChange={e => setCostPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Selling price"
        value={sellingPrice}
        onChange={e => setSellingPrice(e.target.value)}
      />

      <select onChange={e => setWarehouseId(e.target.value)}>
        <option value="">Select warehouse</option>
        {warehouses.map(w => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>

      <button>Add</button>
    </form>
    <button> <Link to="/warehouse/add" style={{textDecoration: "none"}}>Add Warehouse</Link> </button>
    <button> <Link to="/warehouse/stock" style={{textDecoration: "none"}}>View Warehouse</Link> </button>
    </>
  )
}





// import '../styles/form.css'

// export default function AddGoods() {
//   return (
//     <div>
//       <h2>Add Goods to Warehouse</h2>

//       <input placeholder="Warehouse ID" />
//       <input placeholder="Product Name" />
//       <input type="number" placeholder="Quantity" />
//       <input type="number" placeholder="Cost Price" />
//       <input type="number" placeholder="Selling Price" />

//       <button>Add Goods</button>
//     </div>
//   )
// }