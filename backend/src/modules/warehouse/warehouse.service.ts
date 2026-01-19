// import prisma from '../../common/prisma.js'
// import type { AddWarehouseGoodsDTO, CreateWarehouseDTO } from './warehouse.types.js'

// export const createWarehouse = async (data: CreateWarehouseDTO) => {
//   return prisma.warehouse.create({
//     data
//   })
// }

// export const getWarehouses = async () => {
//   return prisma.warehouse.findMany({
//     orderBy: { createdAt: 'desc' }
//   })
// }

// export const addGoodsToWarehouse = async (data: AddWarehouseGoodsDTO) => {
//   return prisma.warehouseGoods.create({
//     data: {
//       warehouseId: data.warehouseId,
//       productName: data.productName,
//       quantity: data.quantity,
//       costPrice: data.costPrice,
//       sellingPrice: data.sellingPrice
//     }
//   })
// }

// export const getWarehouseStock = async (warehouseId: number) => {
//   return prisma.warehouseGoods.findMany({
//     where: { warehouseId },
//     orderBy: { dateAdded: 'desc' }
//   })
// }