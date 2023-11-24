import express from "express"
const router = express.Router()
import { getArrivee, createArrivee, deleteArrivee, checkNotifications, markAsAnswered } from "../controllers/arrivee.mjs"

router.get("/", getArrivee)
router.post("/", createArrivee)
router.delete("/:id", deleteArrivee)
router.get("/delay", checkNotifications)
router.patch("/delay/:id", markAsAnswered)

export default router
