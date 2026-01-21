import { z } from "zod"

export const editGoodsSchema = z.object({
  productName: z.string().min(1, "Product name is required"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),

  costPrice: z
    .number()
    .min(0, "Cost price cannot be negative"),

  sellingPrice: z
    .number()
    .min(0, "Selling price cannot be negative"),
})
.refine(data => data.sellingPrice >= data.costPrice, {
  message: "Selling price must be greater than or equal to cost price",
})

export type EditGoodsSchema = z.infer<typeof editGoodsSchema>