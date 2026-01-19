import { Routes, Route } from 'react-router-dom'

// auth
// import Login from './auth/Login'
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

export default function App() {
  return (
    <Routes>
      {/* auth */}
      {/* <Route path='/' element={<Login />} /> */}
      <Route path='/register' element={<Register />} />

      {/* protected / layout routes */}
      <Route element={<Layout />}>
        {/* dashboard */}
        <Route path='/' element={<Dashboard />} />

        {/* warehouse */}
        <Route path='/warehouse/add' element={<AddWarehouse />} />
        <Route path='/warehouse/add-goods' element={<AddGoods />} />
        <Route path='/warehouse/stock' element={<ViewWarehouseStock />} />

        {/* store */}
        <Route path='/store/add' element={<AddStore />} />
        <Route path='/store/transfer' element={<TransferGoods />} />
        <Route path='/store/stock' element={<ViewStoreStock />} />

        {/* pos */}
        <Route path='/pos' element={<POS />} />

        {/* debtors */}
        <Route path='/debtors/add-customer' element={<AddCustomer />} />
        <Route path='/debtors/add-debt' element={<AddDebt />} />
        <Route path='/debtors/add-payment' element={<AddPayment />} />
        <Route path='/debtors/clear' element={<ClearDebt />} />
      </Route>
    </Routes>
  )
}