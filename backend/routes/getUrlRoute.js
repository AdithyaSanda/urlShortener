import express from "express"
import getUrlsController from "../controllers/getUrlsController.js"

const router = express.Router()

router.get('/', getUrlsController)

export default router