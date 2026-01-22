import { Router } from "express"
import {
  addStore,
  viewStoreStock,
  updateStore,
  deleteStore,
  transferGoods,
  getTransfers,
} from "../controllers/store.controller.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()

router.use(requireAuth)

router.post("/", addStore)
router.get("/stock", viewStoreStock)
router.post("/transfer", transferGoods)
router.get("/transfers", getTransfers)
router.put("/:id", updateStore)
router.delete("/:id", deleteStore)

export default router