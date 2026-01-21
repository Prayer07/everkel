import { useState } from "react"
import { api } from "../lib/api"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card } from "../components/ui/card"

export default function AddWarehouse() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post("/warehouse", { name, location })
    toast.success("Warehouse added")
    setName("")
    setLocation("")
  }

  return (
    <Card className="max-w-md p-6 border-[#e5ddd5]">
      <form onSubmit={submit} className="space-y-4">
        <h2 className="text-lg font-semibold text-[#3e2f25]">Add Warehouse</h2>

        <Input placeholder="Warehouse name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />

        <Button className="w-full bg-[#6f4e37] hover:bg-[#5c402d]">Add</Button>

        <div className="flex justify-between text-sm">
          <Link to="/warehouse/add-goods" className="text-[#6f4e37]">Add Goods</Link>
          <Link to="/warehouse/stock" className="text-[#6f4e37]">View Warehouse</Link>
        </div>
      </form>
    </Card>
  )
}