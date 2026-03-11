import express from 'express'
import changeUsernameController from '../controllers/changeUsernameController.js'

const router = express.Router()

router.put('/me', changeUsernameController)

export default router