import { Link } from "react-router-dom"

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64
          bg-[#f5f1ec] border-r border-[#e5ddd5]
          p-6 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-xl font-bold mb-6 text-[#3e2f25]">
          Everkel
        </h2>

        <nav className="flex flex-col gap-2 text-sm">
          {[
            ["Dashboard", "/dashboard"],
            ["Warehouse", "/warehouse/stock"],
            ["Store", "/store/stock"],
            ["POS", "/pos"],
            ["Debtors", "/debtors"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-[#3e2f25] hover:bg-[#e5ddd5] hover:text-[#6f4e37] transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}