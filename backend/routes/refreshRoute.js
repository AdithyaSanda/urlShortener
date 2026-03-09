import express from 'express'
import refreshController from '../controllers/refreshController.js'

const router = express.Router()

router.get('/', refreshController)

export default router