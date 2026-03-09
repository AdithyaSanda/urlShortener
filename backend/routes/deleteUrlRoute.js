import express from "express"
import deleteUrlController from "../controllers/deleteUrlController.js"

const router = express.Router()

router.delete("/:id", deleteUrlController)

export default router