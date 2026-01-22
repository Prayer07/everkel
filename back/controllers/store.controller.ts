import type { Request, Response } from "express"
import prisma from "../common/prisma.js"

/**
 * CREATE STORE
 */
export const addStore = async (req: Request, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" })
    }
    
    const { storeName, location } = req.body

    if (!storeName || !location) {
      return res.status(400).json({ error: "Name and location required" })
    }

    const store = await prisma.store.create({
      data: {
        storeName,
        location,
        userId: req.user.id,
      },
    })

    res.json(store)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create store" })
  }
}

/**
 * GET STORES
 */
export const viewStoreStock = async (req: Request, res: Response) => {
  try {
    const stores = await prisma.store.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: "desc" },
      include: { goods: true },
    })

    res.json(stores)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch stores" })
  }
}

export const transferGoods = async (req: Request, res: Response) => {
  try {
    const { warehouseGoodsId, storeId, quantity } = req.body

    if (!warehouseGoodsId || !storeId || !quantity) {
      return res.status(400).json({ message: "Missing fields" })
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" })
    }

    await prisma.$transaction(async (tx) => {
      const goods = await tx.warehouseGoods.findUnique({
        where: { id: warehouseGoodsId },
      })

      if (!goods) throw new Error("Goods not found")
      if (goods.quantity < quantity)
        throw new Error("Insufficient stock")

      await tx.warehouseGoods.update({
        where: { id: warehouseGoodsId },
        data: { quantity: { decrement: quantity } },
      })

      await tx.storeGoods.upsert({
        where: {
          storeId_productName: {
            storeId,
            productName: goods.productName,
          },
        },
        update: { quantity: { increment: quantity } },
        create: {
          storeId,
          productName: goods.productName,
          quantity,
          costPrice: goods.costPrice,
          sellingPrice: goods.sellingPrice,
        },
      })

      await tx.stockTransfer.create({
        data: {
          userId: req.user.id,
          productName: goods.productName,
          quantity,
          fromWarehouseId: goods.warehouseId,
          toStoreId: storeId,
        },
      })
    })

    res.json({ message: "Transfer successful" })
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Transfer failed" })
  }
}

export const getTransfers = async (req: Request, res: Response) => {
  const transfers = await prisma.stockTransfer.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      fromWarehouse: { select: { name: true } },
      toStore: { select: { storeName: true } },
    },
  })

  res.json(transfers)
}

/**
 * UPDATE STORE
 */
export const updateStore = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { storeName, location } = req.body

    const store = await prisma.store.update({
      where: { id },
      data: { storeName, location },
    })

    res.json(store)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update store" })
  }
}

/**
 * DELETE STORE
 */
export const deleteStore = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    await prisma.store.delete({
      where: { id },
    })

    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete store" })
  }
}