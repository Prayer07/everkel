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

export default router





// import { Router } from "express"
// import prisma from "../common/prisma.js"

// const router = Router()

// console.log("Prisma models:", Object.keys(prisma))


// // Add warehouse
// router.post("/", async (req, res) => {
//   const { name, location } = req.body

//   const warehouse = await prisma.warehouse.create({
//     data: { name, location },
//   })

//   res.json(warehouse)
// })

// // Add goods to warehouse
// router.post("/goods", async (req, res) => {
//   const { name, quantity, warehouseId } = req.body

//   const goods = await prisma.goods.create({
//     data: {
//       name,
//       quantity: Number(quantity),
//       warehouseId: Number(warehouseId),
//     },
//   })

//   res.json(goods)
// })

// // View warehouse stock
// router.get("/stock", async (req, res) => {
//   const stock = await prisma.warehouse.findMany({
//     include: {
//       goods: true,
//     },
//   })

//   res.json(stock)
// })

// export default router