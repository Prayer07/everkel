import type{ Request, Response, NextFunction } from "express"
import { getUserFromSession } from "../utils/session.js"

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies.session_id
  if (!sessionId) return res.status(401).json({ error: "Not authenticated" })

  const user = await getUserFromSession(sessionId)
  if (!user) return res.status(401).json({ error: "Invalid session" })

  req.user = user
  next()
}