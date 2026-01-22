import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { api } from "../lib/api";

type TopbarProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Topbar({ setOpen }: TopbarProps) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me")
        setUser(res.data.user)
      } catch {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  return (
    <header className="h-14 border-b border-[#e5ddd5] bg-[#f5f1ec] flex items-center justify-between px-3 sm:px-4 md:px-6">
      <div className="flex items-center gap-2">
        {/* Hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[#3e2f25] hover:bg-[#e5ddd5]"
          onClick={() => setOpen(prev => !prev)}
        >
          ☰
        </Button>

        <span className="text-sm sm:text-base font-medium text-[#3e2f25]">
          Welcome, {user?.fullName}
        </span>
      </div>

      <Button
        // size="sm"
        className="bg-[#6f4e37] hover:bg-[#5c402d] text-white"
      >
        Logout
      </Button>
    </header>
  )
}