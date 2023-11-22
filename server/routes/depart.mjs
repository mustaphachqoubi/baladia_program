import express from "express";
const router = express.Router()
import {getDepart, createDepart, deleteDepart, checkNotifications } from "../controllers/depart.mjs";

router.get("/", getDepart)
router.post("/", createDepart)
router.delete("/:id", deleteDepart)
router.get("/delay", checkNotifications)

export default router
