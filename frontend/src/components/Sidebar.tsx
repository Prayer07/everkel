import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Everkel</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/warehouse/stock">Warehouse</Link>
        <Link to="/store/stock">Store</Link>
        <Link to="/pos">POS</Link>
        <Link to="/debtors/add-customer">Debtors</Link>
      </nav>
    </aside>
  )
}
