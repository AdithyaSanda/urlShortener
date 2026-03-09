import express from "express"
import getAnalyticsController from "../controllers/getAnalyticsController.js"

const router = express.Router()

router.get("/:id", getAnalyticsController)

export default router