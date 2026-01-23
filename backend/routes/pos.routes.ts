import { Router } from "express"
import {
  addPosProduct,
  getPosProducts,
  updatePosProduct,
  deletePosProduct,
} from "../controllers/pos.controller.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()

router.use(requireAuth)

router.post("/", addPosProduct)
router.get("/", getPosProducts)
router.put("/:id", updatePosProduct)
router.delete("/:id", deletePosProduct)

export default router