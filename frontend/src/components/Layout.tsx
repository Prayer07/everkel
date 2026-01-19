import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import "../styles/layout.css"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar />
        <div className="page">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}