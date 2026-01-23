import type { Request, Response } from "express"
import prisma from "../common/prisma.js"

export const addPosProduct = async (req: Request, res: Response) => {
  const { productName, quantity, costPrice, sellingPrice } = req.body

  if (!productName) {
    return res.status(400).json({ error: "Product name is required" })
  }

  const product = await prisma.posProduct.create({
    data: {
      userId: req.user.id,
      productName,
      quantity: Number(quantity),
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
    },
  })

  res.status(201).json(product)
}

export const getPosProducts = async (req: Request, res: Response) => {
  const products = await prisma.posProduct.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  })

  res.json(products)
}

export const updatePosProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { productName, quantity, costPrice, sellingPrice } = req.body

  const existing = await prisma.posProduct.findFirst({
    where: { id, userId: req.user.id },
  })

  if (!existing) {
    return res.status(404).json({ error: "Product not found" })
  }

  const updated = await prisma.posProduct.update({
    where: { id },
    data: {
      productName,
      quantity: Number(quantity),
      costPrice: Number(costPrice),
      sellingPrice: Number(sellingPrice),
    },
  })

  res.json(updated)
}

export const deletePosProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const product = await prisma.posProduct.findFirst({
    where: { id, userId: req.user.id },
  })

  if (!product) {
    return res.status(404).json({ error: "Product not found" })
  }

  await prisma.posProduct.delete({ where: { id } })

  res.json({ success: true })
}