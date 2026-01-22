import type { Request, Response } from "express"
import prisma from "../common/prisma.js"

console.log("warehouse exists:", typeof prisma.warehouse)

// ADD WAREHOUSE
export const addWarehouse = async (req: Request, res: Response) => {
  try {
    const { name, location } = req.body

    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        location,
        userId: req.user.id,
      },
    })

    res.json(warehouse)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create warehouse" })
  }
}

// ADD GOODS
export const addGoods = async (req: Request, res: Response) => {
  try {
    const {
      warehouseId,
      productName,
      quantity,
      costPrice,
      sellingPrice,
    } = req.body

    if (
      !warehouseId ||
      !productName ||
      quantity === undefined ||
      costPrice === undefined ||
      sellingPrice === undefined
    ) {
      return res.status(400).json({
        error: "All fields are required",
      })
    }

    const goods = await prisma.warehouseGoods.create({
      data: {
        warehouseId: Number(warehouseId),
        productName,
        quantity: Number(quantity),
        costPrice: Number(costPrice),
        sellingPrice: Number(sellingPrice),
      },
    })

    await prisma.warehouse.update({
      where: {id: Number(warehouseId)},
      data: {updatedAt: new Date()}
    })

    res.json(goods)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add goods" })
  }
}

// VIEW STOCK
export const viewStocks = async (req: Request, res: Response) => {
  try {
    const stock = await prisma.warehouse.findMany({
      where: { userId: req.user.id },   // 👈 per user
      orderBy: { updatedAt: "desc" },   // 👈 latest on top
      include: { goods: true },
    })

    res.json(stock)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch stock" })
  }
}

// EDIT WAREHOUSE
export const editWarehouse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { name, location } = req.body

    if (!name || !location) {
      return res.status(400).json({ error: "Name and location required" })
    }

    const updated = await prisma.warehouse.update({
      where: { id },
      data: { name, location },
    })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update warehouse" })
  }
}

// DELETE WAREHOUSE
export const deleteWarehouse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    // delete goods first
    await prisma.warehouseGoods.deleteMany({
      where: { warehouseId: id },
    })

    await prisma.warehouse.delete({
      where: { id },
    })

    res.json({ message: "Warehouse deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete warehouse" })
  }
}

// EDIT GOODS
export const editGoods = async (req: Request, res: Response) => {
  const goodsId = Number(req.params.id)
  const { productName, quantity, costPrice, sellingPrice } = req.body

  try {
    const goods = await prisma.warehouseGoods.findUnique({
      where: { id: goodsId },
    })

    if (!goods) {
      return res.status(404).json({ error: "Goods not found" })
    }

    await prisma.$transaction([
      prisma.warehouseGoods.update({
        where: { id: goodsId },
        data: {
          productName,
          quantity: Number(quantity),
          costPrice: Number(costPrice),
          sellingPrice: Number(sellingPrice),
        },
      }),

      // 🔥 touch warehouse so it goes up
      prisma.warehouse.update({
        where: { id: goods.warehouseId },
        data: { updatedAt: new Date() },
      }),
    ])

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update goods" })
  }
}

// DELETE GOODS
export const deleteGoods = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    await prisma.warehouseGoods.delete({
      where: { id },
    })

    res.json({ message: "Goods deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete goods" })
  }
}