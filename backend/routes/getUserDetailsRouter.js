import express from 'express'
import getUserDetailsController from '../controllers/getUserDetailsController.js'

const router = express.Router()

router.get('/me', getUserDetailsController)

export default router