import type{ Request, Response } from "express"
import prisma from "../common/prisma.js"

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }
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

    const stores = await prisma.store.count({
      where: { userId },
    })
    
    const debtors = await prisma.debt.count({
      where: { id: userId },
    })

    res.json({
      warehouses,
      products,
      stores,
      debtors,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to load dashboard" })
  }
}
