import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import { addCustomer, addDebt, addPayment, clearDebt, getDebtors } from "../controllers/debtors.controller.js"

const router = Router()

router.use(requireAuth)

router.get("/", getDebtors)

router.post("/customer", addCustomer)

router.post("/:customerId/debt", addDebt)

router.put("/debt/:id/pay", addPayment)

router.put("/debt/:id/clear", clearDebt)

export default router