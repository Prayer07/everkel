import { useEffect, useState } from "react"
import { api } from "../lib/api"
import "../styles/warehouse.css"
import { Link } from "react-router-dom"

export default function ViewWarehouseStock() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    api.get("/warehouse/stock").then(res => setData(res.data))
  }, [])

  return (
    <div className="stock">
      <h2>Warehouse Stock</h2>

      {data.map(w => (
        <div key={w.id} className="card">
          <h3>{w.name} — {w.location}</h3>

          {w.goods.length === 0 && <p>No goods</p>}

          {w.goods.map((g: any) => (
            <p key={g.id}>{g.name || "Name"} ({g.quantity})</p>
          ))}
        </div>
      ))}
      <button> <Link to="/warehouse/add" style={{textDecoration: "none"}}>Add Warehouse</Link> </button>
      <button> <Link to="/warehouse/add-goods" style={{textDecoration: "none"}}>Add Goods</Link> </button>
    </div>
  )
}



// import '../styles/table.css'

// const goods = [
//   {
//     product_name: 'Rice',
//     quantity: 50,
//     cost_price: 12000,
//     selling_price: 15000,
//     date_added: '2026-01-10'
//   }
// ]

// export default function ViewWarehouseStock() {
//   return (
//     <div>
//       <h2>Warehouse Stock</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Qty</th>
//             <th>Cost</th>
//             <th>Selling</th>
//             <th>Date Added</th>
//           </tr>
//         </thead>
//         <tbody>
//           {goods.map((g, i) => (
//             <tr key={i}>
//               <td>{g.product_name}</td>
//               <td>{g.quantity}</td>
//               <td>{g.cost_price}</td>
//               <td>{g.selling_price}</td>
//               <td>{g.date_added}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p>Other links to help u navigate</p>
        
//     </div>
//   )
// }