import type { Request, Response } from "express"
import prisma from "../common/prisma.js"

export const addCustomer = async (req: Request, res: Response) => {
  const { fullName, phone, address } = req.body

  if (!fullName || !phone) {
    return res.status(400).json({ message: "Full name and phone required" })
  }

  const customer = await prisma.customer.create({
    data: {
      userId: req.user.id,
      fullName,
      phone,
      address,
    },
  })

  res.json(customer)
}

export const addDebt = async (req: Request, res: Response) => {
  const customerId = Number(req.params.customerId)
  const { totalAmount } = req.body

  if (!totalAmount || totalAmount <= 0) {
    return res.status(400).json({ message: "Invalid amount" })
  }

  const debt = await prisma.debt.create({
    data: {
      customerId,
      totalAmount,
      amountPaid: 0,
      balance: totalAmount,
    },
  })

  res.json(debt)
}

export const addPayment = async (req: Request, res: Response) => {
  const debtId = Number(req.params.id)
  const { amount } = req.body

  const debt = await prisma.debt.findUnique({ where: { id: debtId } })
  if (!debt) return res.status(404).json({ message: "Debt not found" })

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid payment" })
  }

  const newAmountPaid = debt.amountPaid + amount
  const newBalance = debt.totalAmount - newAmountPaid

  if (newBalance < 0) {
    return res.status(400).json({ message: "Payment exceeds debt" })
  }

  const updated = await prisma.debt.update({
    where: { id: debtId },
    data: {
      amountPaid: newAmountPaid,
      balance: newBalance,
      isCleared: newBalance === 0,
    },
  })

  res.json(updated)
}

export const clearDebt = async (req: Request, res: Response) => {
  try {
    const debtId = Number(req.params.id)

    // 1️⃣ Read the debt first
    const debt = await prisma.debt.findUnique({
      where: { id: debtId },
    })

    if (!debt) {
      return res.status(404).json({ error: "Debt not found" })
    }

    if (debt.isCleared) {
      return res.status(400).json({ error: "Debt already cleared" })
    }

    // 2️⃣ Update using REAL values
    const clearedDebt = await prisma.debt.update({
      where: { id: debtId },
      data: {
        balance: 0,
        amountPaid: debt.totalAmount,
        isCleared: true,
      },
    })

    res.json(clearedDebt)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to clear debt" })
  }
}

export const getDebtors = async (req: Request, res: Response) => {
  const customers = await prisma.customer.findMany({
    where: { userId: req.user.id },
    include: {
      debts: {
        where: { isCleared: false },
      },
    },
  })

  res.json(customers)
}