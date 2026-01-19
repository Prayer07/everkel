// import type { Request, Response } from 'express'
// import * as warehouseService from './warehouse.service.js'

// export const createWarehouse = async (req: Request, res: Response) => {
//   const { name, location } = req.body

//   if (!name || !location) {
//     return res.status(400).json({ message: 'Name and location required' })
//   }

//   const warehouse = await warehouseService.createWarehouse({ name, location })
//   res.status(201).json(warehouse)
// }

// export const getWarehouses = async (_req: Request, res: Response) => {
//   const warehouses = await warehouseService.getWarehouses()
//   res.json(warehouses)
// }

// export const addGoods = async (req: Request, res: Response) => {
//   const warehouseId = Number(req.params.id)
//   const { productName, quantity, costPrice, sellingPrice } = req.body

//   if (!productName || !quantity || !costPrice || !sellingPrice) {
//     return res.status(400).json({ message: 'All fields required' })
//   }

//   const goods = await warehouseService.addGoodsToWarehouse({
//     warehouseId,
//     productName,
//     quantity,
//     costPrice,
//     sellingPrice
//   })

//   res.status(201).json(goods)
// }

// export const getWarehouseStock = async (req: Request, res: Response) => {
//   const warehouseId = Number(req.params.id)
//   const stock = await warehouseService.getWarehouseStock(warehouseId)
//   res.json(stock)
// }