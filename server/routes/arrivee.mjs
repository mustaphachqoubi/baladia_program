import express from "express"
const router = express.Router()
import { getArrivee, createArrivee, deleteArrivee, checkNotifications } from "../controllers/arrivee.mjs"

router.get("/", getArrivee)
router.post("/", createArrivee)
router.delete("/:id", deleteArrivee)
router.get("/delay", checkNotifications)

export default router
