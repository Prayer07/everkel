import { Router } from "express"
import { 
  addGoods, 
  addWarehouse, 
  deleteGoods, 
  deleteWarehouse, 
  editGoods, 
  editWarehouse, 
  viewStocks 
} from "../controllers/warehouse.controller.js"
import { requireAuth } from "../middleware/auth.js"

const router = Router()

router.post("/", requireAuth, addWarehouse)

router.post("/goods", requireAuth, addGoods)

router.get("/stock", requireAuth, viewStocks)

router.put("/:id", requireAuth, editWarehouse)

router.delete("/:id", requireAuth, deleteWarehouse)

router.put("/goods/:id", requireAuth, editGoods)

router.delete("/goods/:id", requireAuth, deleteGoods)

export default router