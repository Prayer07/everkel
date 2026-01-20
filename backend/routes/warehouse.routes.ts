import { Router } from "express"
import prisma from "../common/prisma.js"

console.log("warehouse exists:", typeof prisma.warehouse)

const router = Router()

// ADD WAREHOUSE
router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body

    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        location,
      },
    })

    res.json(warehouse)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create warehouse" })
  }
})

// ADD GOODS
router.post("/goods", async (req, res) => {
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

    res.json(goods)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add goods" })
  }
})

// VIEW STOCK
router.get("/stock", async (_req, res) => {
  try {
    const stock = await prisma.warehouse.findMany({
      include: {
        goods: true,
      },
    })

    res.json(stock)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch stock" })
  }
})

// EDIT WAREHOUSE
router.put("/:id", async (req, res) => {
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
})

// DELETE WAREHOUSE
router.delete("/:id", async (req, res) => {
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
})


// EDIT GOODS
router.put("/goods/:id", async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { productName, quantity, costPrice, sellingPrice } = req.body

    if (
      !productName ||
      quantity === undefined ||
      costPrice === undefined ||
      sellingPrice === undefined
    ) {
      return res.status(400).json({
        error: "All fields required",
      })
    }

    const updated = await prisma.warehouseGoods.update({
      where: { id },
      data: {
        productName,
        quantity: Number(quantity),
        costPrice: Number(costPrice),
        sellingPrice: Number(sellingPrice),
      },
    })

    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update goods" })
  }
})

// DELETE GOODS
router.delete("/goods/:id", async (req, res) => {
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
})

export default router