import express from "express";
const router = express.Router()
import {getDepart, createDepart, deleteDepart, markAsAnswered, checkNotifications } from "../controllers/depart.mjs";

router.get("/", getDepart)
router.post("/", createDepart)
router.delete("/:id", deleteDepart)
router.patch("/delay", checkNotifications)
router.patch("/delay/:id", markAsAnswered)

export default router
