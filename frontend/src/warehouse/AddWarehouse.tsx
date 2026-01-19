import { useState } from "react"
import { api } from "../lib/api"
import "../styles/warehouse.css"
import { Link } from "react-router-dom"

export default function AddWarehouse() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post("/warehouse", { name, location })
    alert("Warehouse added")
    setName("")
    setLocation("")
  }

  return (
    <>
    <form className="form" onSubmit={submit}>
      <h2>Add Warehouse</h2>
      <input placeholder="Warehouse name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <button>Add</button>
    </form>
    <button> <Link to="/warehouse/add-goods" style={{textDecoration: "none"}}>Add Goods</Link> </button>
    <button> <Link to="/warehouse/stock" style={{textDecoration: "none"}}>View Warehouse</Link> </button>
    </>
  )
}




// import "../styles/form.css"

// export default function AddWarehouse() {
//   return (
//     <>
//       <h2>Add Warehouse</h2>
//       <input placeholder="Warehouse Name" />
//       <input placeholder="Location" />
//       <button>Add</button>
//     </>
//   )
// }