import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import prisma from "../../back/common/prisma.js"
import { createSession } from "../utils/session.js"


// REGISTER
export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields required" })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(400).json({ error: "Email already exists" })
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { fullName, email, password: hashed },
  })

  console.log(user)

  const { sessionId, expiresAt } = await createSession(user.id)

  res
    .cookie("session_id", sessionId, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 🔥
      expires: expiresAt,
      secure: process.env.NODE_ENV === "production",
    })
    .json({ id: user.id, fullName: user.fullName, email: user.email })
}

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const { sessionId, expiresAt } = await createSession(user.id)

  res
    .cookie("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 🔥
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 🔥
      expires: expiresAt,
    })
    .json({ id: user.id, fullName: user.fullName, email: user.email })
}

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session_id

  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {})
  }

  res.clearCookie("session_id").json({ message: "Logged out" })
}

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user })
}