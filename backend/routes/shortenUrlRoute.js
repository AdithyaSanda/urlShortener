import express from 'express'
import shortenUrlController from '../controllers/shortenUrlController.js'

const router = express()

router.post("/", shortenUrlController)

export default router