import type{ Request, Response } from "express"
import prisma from "../../back/common/prisma.js"

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

    res.json({
      warehouses,
      products,
      stores,
      debtors: 0,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to load dashboard" })
  }
}
