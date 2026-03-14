import { Router, json } from "express"
import { charityController } from "../controllers/charity"

const router = Router()
router.use(json());
router.get("/", charityController.getPaginated)
router.get("/:id", charityController.getById)
router.post("/", charityController.create)
router.patch("/:id", charityController.update)
router.delete("/:id", charityController.delete)

export default router