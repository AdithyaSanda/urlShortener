import express from "express"
import getOriginalUrlController from "../controllers/getOriginalUrlController.js"

const router = express.Router()

router.get("/:shortCode", getOriginalUrlController)

export default router