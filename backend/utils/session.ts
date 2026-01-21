import prisma from "../common/prisma.js"
import { randomUUID } from "crypto"

const SESSION_DURATION_HOURS = 24

export async function createSession(userId: number) {
  const sessionId = randomUUID()

  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS)

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  })

  return { sessionId, expiresAt }
}

export async function getUserFromSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) return null

  return session.user
}