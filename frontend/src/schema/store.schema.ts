import { z } from "zod"


export const addStoreSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  location: z.string().min(1, "Location is required"),
})
export type AddStoreInput = z.infer<typeof addStoreSchema>


export const transferGoodsSchema = z.object({
  warehouseGoodsId: z
  .number(),

  storeId: z
  .number(),

  quantity: z
  .number()
  .min(1, "Quantity must be at least 1"),
})
export type TransferGoodsInput = z.infer<typeof transferGoodsSchema>