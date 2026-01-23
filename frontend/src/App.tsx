import { Routes, Route, Navigate } from 'react-router-dom'

// auth
import Login from './auth/Login'
import Register from './auth/Register'

// layout
import Layout from './components/Layout'

// dashboard
import Dashboard from './pages/dashboard/Dashboard'

// warehouse
import AddWarehouse from './pages/warehouse/AddWarehouse'
import AddGoods from './pages/warehouse/AddGoods'
import ViewWarehouseStock from './pages/warehouse/ViewWarehouseStock'
import WarehouseGoods from './pages/warehouse/WarehouseGoods '

// store
import AddStore from './pages/store/AddStore'
import TransferGoods from './pages/store/TransferGoods'
import ViewStoreStock from './pages/store/ViewStoreStock'
import TransferHistory from './pages/store/TransferHistory'

// pos
import PosList from './pages/pos/PosList'
import AddPosProduct from './pages/pos/AddPosProduct'

// debtors
import DebtorsList from "./pages/debtors/DebtorsList"
import AddCustomer from "./pages/debtors/AddCustomer"
import AddDebt from "./pages/debtors/AddDebt"
import DebtDetails from "./pages/debtors/DebtDetails"

import { Toaster } from "sonner"
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  return (
    <>
    {/* <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#f5f1ec",
          color: "#3e2f25",
          border: "1px solid #e5ddd5",
        },
      }}
    /> */}
    <Toaster position="top-center" richColors />

    <Routes>
      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* warehouse */}
          <Route path="/warehouse/add" element={<AddWarehouse />} />
          <Route path="/warehouse/add-goods" element={<AddGoods />} />
          <Route path="/warehouse/stock" element={<ViewWarehouseStock />} />
          <Route path="/warehouse/:id/goods" element={<WarehouseGoods />} />

          {/* store */}
          <Route path="/store/add" element={<AddStore />} />
          <Route path="/store/transfer" element={<TransferGoods />} />
          <Route path="/store/stock" element={<ViewStoreStock />} />
          <Route path="/transfer-history" element={<TransferHistory />} />

          {/* pos */}
          <Route path="/pos" element={<PosList />} />
          <Route path="/pos/add" element={<AddPosProduct />} />


          {/* debtors */}
          <Route path="/debtors" element={<DebtorsList />} />
          <Route path="/debtors/add" element={<AddCustomer />} />
          <Route path="/debtors/:customerId" element={<DebtDetails />} />
          <Route
            path="/debtors/add-debt/:customerId"
            element={<AddDebt />}
          />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
    </>
  )
}