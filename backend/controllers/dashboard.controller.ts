import type{ Request, Response } from "express"
import prisma from "../common/prisma.js"

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id

    const warehouses = await prisma.warehouse.count({
      where: { userId },
    })

    const products = await prisma.warehouseGoods.count({
      where: {
        warehouse: {
          userId,
        },
      },
    })

    res.json({
      warehouses,
      products,
      stores: 0,
      debtors: 0,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to load dashboard" })
  }
}
