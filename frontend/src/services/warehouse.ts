import { api } from '../lib/api

export const getWarehouses = async () => {
  const res = await api.get('/api/warehouses')
  return res.data
}

export const createWarehouse = async (data: {
  name: string
  location: string
}) => {
  const res = await api.post('/api/warehouses', data)
  return res.data
}

export const getWarehouseGoods = async (warehouseId: number) => {
  const res = await api.get(`/api/warehouses/${warehouseId}/goods`)
  return res.data
}

export const addGoodsToWarehouse = async (
  warehouseId: number,
  data: {
    productName: string
    quantity: number
    costPrice: number
    sellingPrice: number
  }
) => {
  const res = await api.post(
    `/api/warehouses/${warehouseId}/goods`,
    data
  )
  return res.data
}