import { Routes, Route, Navigate } from 'react-router-dom'

// auth
import Login from './auth/Login'
import Register from './auth/Register'

// layout
import Layout from './components/Layout'

// dashboard
import Dashboard from './dashboard/Dashboard'

// warehouse
import AddWarehouse from './warehouse/AddWarehouse'
import AddGoods from './warehouse/AddGoods'
import ViewWarehouseStock from './warehouse/ViewWarehouseStock'

// store
import AddStore from './store/AddStore'
import TransferGoods from './store/TransferGoods'
import ViewStoreStock from './store/ViewStoreStock'

// pos
import POS from './pos/POS'

// debtors
import AddCustomer from './debtors/AddCustomer'
import AddDebt from './debtors/AddDebt'
import AddPayment from './debtors/AddPayment'
import ClearDebt from './debtors/ClearDebt'

import { Toaster } from "sonner"
import ProtectedRoute from './components/ProtectedRoute'
import WarehouseGoods from './warehouse/WarehouseGoods '
import TransferHistory from './store/TransferHistory'


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
          <Route path="/pos" element={<POS />} />

          {/* debtors */}
          <Route path="/debtors/add-customer" element={<AddCustomer />} />
          <Route path="/debtors/add-debt" element={<AddDebt />} />
          <Route path="/debtors/add-payment" element={<AddPayment />} />
          <Route path="/debtors/clear" element={<ClearDebt />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
    </>
  )
}